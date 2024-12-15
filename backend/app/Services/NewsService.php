<?php

namespace App\Services;

use App\Models\News;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class NewsService
{
    public function fetchNews(array $filters, $preferences = null)
    {
        $newsQuery = News::query()->latest();
        
        $this->applyFilters($newsQuery, $filters);

        if ($filters) {
            $preferences = [];
        }
        
        if ($preferences) {
            $this->applyPreferences($newsQuery, $preferences);
        }

        $result = $newsQuery->get();

        return $this->categorizeNews($result);
    }

    private function applyPreferences($query, $preferences)
    {
        $query->where(function ($subQuery) use ($preferences) {
            if (!empty($preferences['categories'])) {
                $subQuery->whereIn('category', $preferences['categories']);
            }
            if (!empty($preferences['authors'])) {
                $subQuery->orWhereIn('author', $preferences['authors']);
            }
            if (!empty($preferences['sources'])) {
                $subQuery->orWhereIn('source', $preferences['sources']);
            }
        });
    }

    // Apply filters to the query
    private function applyFilters($query, $filters)
    {
        $query->when($filters['keyword'] ?? null, function ($query, $keyword) {
            $query->where('title', 'like', "%$keyword%")
                ->orWhere('description', 'like', "%$keyword%");
        });

        $query->when($filters['date'] ?? null, function ($query, $date) {
            $query->whereDate('publishedAt', $date);
        });

        $query->when($filters['category'] ?? null, function ($query, $category) {
            $query->where('category', 'like', "%$category%");
        });

        $query->when($filters['source'] ?? null, function ($query, $source) {
            $query->where('source', 'like', "%$source%");
        });
    }

    // Categorize news
    private function categorizeNews($news)
    {
        $news = $news->map(function ($item) {
            $item->publishedAt = Carbon::parse($item->publishedAt)->diffForHumans();
            return $item;
        });

        // Filter news items that meet the criteria
        $validNews = $news->filter(function ($item) {
            return $item->title && $item->description && $item->urlToImage && $item->category;
        });

        // Select a random featured news item
        $featuredNews = $validNews->isNotEmpty() ? $validNews->random() : $news->first();   

        $articles = $this->getRandomItems($this->mapArticles($news), 20);
        $headlines = $this->getRandomItems($this->mapHeadlines($news), 9);
        $stories = $this->getRandomItems($this->mapStories($news), 20);

        return [
            'featuredNews' => $featuredNews,
            'articles' => $articles,
            'headlines' => $headlines,
            'stories' => $stories,
        ];
    }

    // Function to get random items
    private function getRandomItems($collection, $count)
    {
        return $collection->count() > $count ? $collection->random($count)->values()->all() : $collection->values()->all();
    }

    // Map articles (latest news)
    private function mapArticles($news)
    {
        return $news->filter(fn($item) => $item->urlToImage && $item->title && $item->description)
                    ->map(fn($item) => [
                        'url' => $item->url,
                        'src' => $item->urlToImage,
                        'title' => $item->title,
                        'description' => $item->description,
                        'category' => $item->category,
                        'date' => $item->publishedAt,
                    ]);
    }

    // Map headlines
    private function mapHeadlines($news)
    {
        return $news->filter(fn($item) => $item->title && $item->category && !$item->urlToImage && !$item->description)
                    ->map(fn($item) => [
                        'id' => $item->id,
                        'date' => $item->publishedAt,
                        'category' => $item->category,
                        'title' => $item->title,
                        'url' => $item->url,
                        'description' => $item->description,
                    ]);
    }

    // Map stories
    private function mapStories($news)
    {
        return $news->filter(fn($item) => $item->urlToImage && $item->source)
                    ->unique('source') // Remove duplicate sources
                    ->map(fn($item) => [
                        'src' => $item->urlToImage,
                        'title' => $item->source,
                        'url' => $item->url,
                    ]);
    }

    // get navbar 4 categories
    public function getTopCategories($limit = 5)
    {
        $categoriesCount = News::select('category')
                                ->groupBy('category')
                                ->count();

        $limit = min($limit, $categoriesCount);

        return News::select('category')
                    ->groupBy('category')
                    ->orderByRaw('COUNT(*) DESC')
                    ->limit($limit)
                    ->pluck('category');
    }
}