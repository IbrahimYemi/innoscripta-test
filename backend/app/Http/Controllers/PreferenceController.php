<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use App\Services\PreferenceService;
use Illuminate\Http\Request;
use Auth;

class PreferenceController extends Controller
{
    protected $preferenceService;

    public function __construct(PreferenceService $preferenceService)
    {
        $this->preferenceService = $preferenceService;
    }

    // Set user preferences
    public function setPreferences(Request $request)
    {
        $preferences = $request->only('categories', 'sources', 'authors');

        // Preprocess the preferences to get the IDs
        $processedPreferences = $this->preprocessPreferences($preferences);
        $this->preferenceService->setPreferences($processedPreferences);
        
        return $this->sendResponse([], 'Preferences updated successfully', 201);
    }

    public function preprocessPreferences($preferences)
    {
        $categories = Category::whereIn('name', $preferences['categories'] ?? [])->pluck('id')->toArray();
        $authors = Author::whereIn('name', $preferences['authors'] ?? [])->pluck('id')->toArray();
        $sources = Source::whereIn('name', $preferences['sources'] ?? [])->pluck('id')->toArray();

        return [
            'categories' => array_unique($categories),
            'authors' => array_unique($authors),
            'sources' => array_unique($sources),
        ];
    }

    // Get user preferences
    public function getPreferences()
    {
        $preferences = $this->preferenceService->getPreferences();
        
        return $this->sendResponse($preferences, 'Preferences retrieved successfully', 201);
    }

    public function getAttributes()
    {
        return $this->sendResponse(
            $this->preferenceService->getUniqueAttributes(), 
            'Preferences retrieved successfully',
            201
        );
    }
}

