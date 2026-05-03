<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserProgress extends Model
{
    use HasFactory;
    // Membuka gembok agar bisa menerima data dari Frontend
    protected $guarded = [];
    // Mengubah data mentah database menjadi array asli secara otomatis tiap kali ditarik
    protected $casts = [
        'visited_pois' => 'array',
        'completed' => 'boolean',
    ];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}
