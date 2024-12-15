<?php

namespace App\Http\Controllers;

use App\Services\BookmarkService;

class BookmarkController extends Controller
{
    protected $bookmarkService;

    public function __construct(BookmarkService $bookmarkService)
    {
        $this->bookmarkService = $bookmarkService;
    }

    // Set a bookmark for an article
    public function setBookmark($newsId)
    {
        $this->bookmarkService->setBookmark($newsId);
        
        return $this->sendResponse([], 'News bookmarked successfully', 201);
    }

    // Get all bookmarked news for the authenticated user
    public function getBookmarkedNews()
    {
        $bookmarks = $this->bookmarkService->getBookmarks();
        
        return $this->sendResponse($bookmarks, 'Bookmarked news retrieved successfully', 201);
    }
}

