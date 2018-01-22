<?php

namespace App\Http\Controllers;

use App\seg_area;

class Seg_areaController extends Controller
{
    public function index()
    {
        return view('administration.area.area');
    }

    public function getData()
    {
        $model   = seg_area::searchPaginateAndOrder();
        $columns = seg_area::$columns;

        return response()
            ->json([
                'model'   => $model,
                'columns' => $columns,
            ]);
    }
}
