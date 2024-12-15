<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Category;
use App\Models\Author;
use App\Models\Source;
use App\Models\News;

class FetchNewsMetaData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:fetch-meta';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Extract authors, sources, and categories from the news table and store them without duplicates';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        // Fetch unique authors, sources, and categories from the news table
        $news = News::all();

        $categories = $news->pluck('category')->unique()->filter();
        $authors = $news->pluck('author')->unique()->filter();
        $sources = $news->pluck('source')->unique()->filter();

        // Save categories
        foreach ($categories as $categoryName) {
            Category::firstOrCreate(['name' => $categoryName]);
        }

        // Save authors
        foreach ($authors as $authorName) {
            Author::firstOrCreate(['name' => $authorName]);
        }

        // Save sources
        foreach ($sources as $sourceName) {
            Source::firstOrCreate(['name' => $sourceName]);
        }

        $this->info('Authors, sources, and categories have been updated successfully.');
    }
}