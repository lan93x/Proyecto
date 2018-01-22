<?php

namespace App;

use App\Support\DataViewer;
use Illuminate\Database\Eloquent\Model;

class seg_area extends Model
{
    use DataViewer;

    public static $columns = [
        'id', 'namearea', 'created_at', 'updated_at',
    ];
}
