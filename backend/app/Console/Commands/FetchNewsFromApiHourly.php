<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use App\Models\News;
use Illuminate\Support\Str;

class FetchNewsFromApiHourly extends Command
{
    protected $signature = 'news:fetch-hourly';
    protected $description = 'Fetch news from APIs and store in the database';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $this->info('Fetching news from APIs...');
        
        $newsOrgApiKey = env('NEWS_ORG_API_KEY');
        $guardianApiKey = env('GUARDIAN_API_KEY');

        // First API - NewsAPI
        $newsApiResponse = Http::get('https://newsapi.org/v2/everything', [
            'q' => 'politics',
            'sortBy' => 'popularity',
            'apiKey' => $newsOrgApiKey,
        ]);

        $this->storeNews($newsApiResponse->json());

        // Second API - The Guardian API
        $guardianApiResponse = Http::get('https://content.guardianapis.com/search', [
            'api-key' => $guardianApiKey,
        ]);

        $this->storeGuardianNews($guardianApiResponse->json());
        
        $this->info('News fetched and stored successfully!');
    }

    private function storeNews(array $data)
    {
        if (!$data['articles']) {
            return;
        }

        foreach ($data['articles'] as $article) {
            if ($article['url'] == 'https://removed.com') {
                continue;
            }
            
            $publishedAt = Carbon::parse($article['publishedAt'])->format('Y-m-d H:i:s');
            News::updateOrCreate(
                ['url' => $article['url']],
                [
                    'source' => $article['source']['name'] ?? 'Unknown',
                    'author' => $article['author'] ?? 'Unknown',
                    'title' => Str::limit($article['title'], 35, '...'),
                    'description' => Str::limit($article['description'], 250, '...'),
                    'url' => $article['url'],
                    'urlToImage' => $article['urlToImage'],
                    'content' => $article['content'],
                    'publishedAt' => $publishedAt,
                ]
            );
        }
    }

    private function storeGuardianNews(array $data)
    {
        if (!$data['response']['results']) {
            return;
        }
        foreach ($data['response']['results'] as $article) {
            $publishedAt = Carbon::parse($article['webPublicationDate'])->format('Y-m-d H:i:s');
            News::updateOrCreate(
                ['url' => $article['webUrl']],
                [
                    'source' => $article['sectionName'],
                    'author' => 'Unknown',
                    'title' => Str::limit($article['webTitle'], 35, '...'),
                    'url' => $article['webUrl'],
                    'category' => $article['pillarName'],
                    'publishedAt' => $publishedAt,
                ]
            );
        }
    }
}
