<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $guarded = []; // Wajib ada agar Answer::create() di Seeder tidak error
    protected $fillable = [
        'question_id',
        'answer_text',
        'is_correct', // Pastikan baris ini ada
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}