<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $guarded = []; // Mengizinkan pengisian data masal (mass assignment)

    // Definisikan relasi: Satu kuis memiliki BANYAK soal (hasMany)
    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}