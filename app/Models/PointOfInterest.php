<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PointOfInterest extends Model
{
    // Mengizinkan penyimpanan masal (Mass Assignment)
    protected $guarded = [];

    // Mengubah database JSON 'position' otomatis menjadi Array di PHP
    protected $casts = [
        'position' => 'array',
    ];

    // Relasi: Satu titik POI hanya milik SATU Modul (BelongsTo)
    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}
