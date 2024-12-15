<?php

namespace App\Services;

use App\Models\Bookmark;
use App\Models\News;
use Illuminate\Support\Facades\Auth;

class BookmarkService
{
    // Set bookmark for user
    public function setBookmark($newsId)
    {
        $user = Auth::user();

        // Check if the bookmark exists for this user and newsId
        $bookmark = Bookmark::where('user_id', $user->id)
                            ->where('news_id', $newsId)
                            ->first();

        if ($bookmark) {
            // If the bookmark exists, delete it
            $bookmark->delete();
            return collect([]);
        } else {
            // If the bookmark doesn't exist, create it
            return Bookmark::create([
                'user_id' => $user->id,
                'news_id' => $newsId,
            ]);
        }
    }

    // Get all bookmarked news for the authenticated user by news_id
    public function getBookmarks()
    {
        $user = Auth::user();
        
        $bookmarkedNewsIds = Bookmark::where('user_id', $user->id)
            ->pluck('news_id');
            
        $bookmarkedNews = News::whereIn('id', $bookmarkedNewsIds)
            ->get()
            ->map(fn($item) => [
                'id' => $item->id,
                'date' => $item->publishedAt,
                'category' => $item->category,
                'title' => $item->title,
                'url' => $item->url,
                'description' => $item->description,
            ]);
        
        return $bookmarkedNews;
    }

}