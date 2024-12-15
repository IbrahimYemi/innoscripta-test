<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

class News extends Model
{

    // Define the fillable fields for mass assignment
    protected $fillable = [
        'source',
        'author',
        'title',
        'description',
        'url',
        'urlToImage',
        'content',
        'category',
        'publishedAt',
    ];

    protected $table = 'news';

    // News articles can be bookmarked by many users
    public function users()
    {
        return $this->belongsToMany(User::class, 'bookmarks');
    }

    /**
     * Get the human-readable publishedAt date.
     */
    public function getPublishedAtAttribute($value)
    {
        return Carbon::parse($value)->diffForHumans();
    }
}
