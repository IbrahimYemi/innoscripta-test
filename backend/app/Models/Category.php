<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name'];
    
    // Users who follow this category
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_category');
    }
}
