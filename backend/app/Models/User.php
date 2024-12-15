<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Builder;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'id',
        'password',
        'remember_token',
        'email_verified_at',
        'created_at',
        'updated_at',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Categories user follows
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'user_category');
    }

    // Authors user follows
    public function authors()
    {
        return $this->belongsToMany(Author::class, 'user_author');
    }

    // Sources user follows
    public function sources()
    {
        return $this->belongsToMany(Source::class, 'user_source');
    }

    // Combine all preferences into a single collection
    public function getPreferencesAttribute()
    {
        return [
            'categories' => $this->categories->pluck('name'),
            'authors' => $this->authors->pluck('name'),
            'sources' => $this->sources->pluck('name'),
        ];
    }

    // Users can bookmark many news articles
    public function bookmarks()
    {
        return $this->belongsToMany(News::class, 'bookmarks');
    }
}
