<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $guarded = [];

    // Relasi WBS 2.3.3: Satu Modul memiliki BANYAK titik POI (HasMany)
    public function pois()
    {
        return $this->hasMany(PointOfInterest::class);
    }
}
