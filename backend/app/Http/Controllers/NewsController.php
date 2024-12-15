<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Services\NewsService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NewsController extends Controller
{
    protected $newsService;

    public function __construct(NewsService $newsService)
    {
        $this->newsService = $newsService;
    }

    public function fetchNews(Request $request)
    {
        $filters = $request->only(['keyword', 'date', 'category', 'source']);

        $preferences = $this->getPreferences();

        $news = $this->newsService->fetchNews($filters, $preferences);

        return $this->sendResponse($news, 'News retrieved successfully');
    }

    private function getPreferences()
    {
        if (!auth()->check()) {
            return null;
        }

        $user = User::with(['categories', 'authors', 'sources'])->find(auth()->id());

        $preferences = [
            'categories' => $user->categories->pluck('name')->toArray(),
            'authors' => $user->authors->pluck('name')->toArray(),
            'sources' => $user->sources->pluck('name')->toArray(),
        ];

        if (empty($preferences['categories']) && empty($preferences['authors']) && empty($preferences['sources'])) {
            return null;
        }

        return $preferences;
    }

    public function getTopCategories()
    {
        return $this->sendResponse($this->newsService->getTopCategories(), 'Top Categories');
    }
}
