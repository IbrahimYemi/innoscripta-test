<?php

namespace App\Services;

use App\Models\News;
use Illuminate\Support\Facades\Auth;

class PreferenceService
{
    public function setPreferences($preferences)
    {
        $user = Auth::user();

        foreach ($preferences as $type => $ids) {
            switch ($type) {
                case 'categories':
                    $user->categories()->sync($ids);
                    break;
                case 'authors':
                    $user->authors()->sync($ids);
                    break;
                case 'sources':
                    $user->sources()->sync($ids);
                    break;
                default:
                    throw new \InvalidArgumentException("Invalid preference type: $type");
            }
        }
    }

    public function getPreferences()
    {
        $user = Auth::user();
        return $user->preferences;
    }

    // get data to set the preference
    public function getUniqueAttributes()
    {
        return [
            'categories' => News::select('category')->distinct()->pluck('category'),
            'sources' => News::select('source')->distinct()->pluck('source'),
            'authors' => News::select('author')->distinct()->pluck('author'),
        ];
    }
}
