<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Source extends Model
{
    protected $fillable = ['name'];
    
    // Users who follow this source
    public function users()
    {
        return $this->belongsToMany(User::class, 'user_source');
    }
}
