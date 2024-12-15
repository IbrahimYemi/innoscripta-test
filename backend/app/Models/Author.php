<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    protected $fillable = ['name'];
    
    // Users who follow this author
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_author');
    }
}
