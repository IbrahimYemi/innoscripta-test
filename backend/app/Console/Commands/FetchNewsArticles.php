<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use App\Models\News;
use Illuminate\Support\Str;

class FetchNewsArticles extends Command
{
    protected $signature = 'news:fetch-12-hourly';
    protected $description = 'Fetch news articles from event registry API and store them in the database';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        $eventRegistryApiKey = env('EVENT_REGISTRY_API_KEY');
        $url = "https://eventregistry.org/api/v1/article/getArticles?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22conceptUri%22%3A%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSport%22%7D%2C%7B%22conceptUri%22%3A%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FTechnology%22%7D%2C%7B%22lang%22%3A%22eng%22%7D%5D%7D%2C%22%24filter%22%3A%7B%22forceMaxDataTimeWindow%22%3A%2231%22%7D%7D&resultType=articles&articlesSortBy=date&apiKey=".$eventRegistryApiKey;

        $response = Http::get($url);

        $this->info('Fetching news from Event Registry API...');
        if ($response->successful()) {
            $articles = $response->json()['articles']['results'];

            foreach ($articles as $article) {
                
                $publishedAt = Carbon::parse($article['dateTimePub'])->format('Y-m-d H:i:s');
                // Store the article in the database
                News::updateOrCreate(
                    ['uri' => $article['uri']],
                    [
                        'source' => $article['source']['title'],
                        'author' => $article['authors'] ?? null,
                        'title' => Str::limit($article['title'], 35, '...'),
                        'description' => Str::limit($article['body'], 250, '...'),
                        'url' => $article['url'],
                        'urlToImage' => $article['image'] ?? null,
                        'content' => $article['body'],
                        'category' => $article['category'],
                        'publishedAt' => $publishedAt,
                    ]
                );
            }

            $this->info('Articles fetched and stored successfully.');
        } else {
            $this->error('Failed to fetch articles from API.');
        }
    }
}