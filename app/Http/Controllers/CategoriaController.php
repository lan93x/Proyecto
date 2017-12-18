<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Categoria;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('categorias.index');
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
          'nombre'=>'required',
        ]);
        Categoria::create($request->all());
        return;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $categoria = Servicio::findOrFail($id);

        return $servicio;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        Categoria::find($id)->update($request->all());

        return;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $categoria = Categoria::findOrFail($id);
        $categoria->delete();

        return $categoria;
    }

    public function getCategorias(Request $request)
    {
        $categorias = Categoria::orderBy('id', 'DESC')->paginate(5);
        //   $data2 = [];
        //   $contador=0;
        //   $data2[] = [
        // 'id' => '0',
        // 'parent' => '#',
        // 'text'=>'Categorias'
        // ];
        //   foreach ($categorias as $cat) {
        //       if ($cat->idPadre==0) {
        //           $data2[] = [
        //         'id' => $cat->id,
        //         'parent' => 0,
        //         'text'=>$cat->nombre
        //         ];
        //       } else {
        //           $data2[] = [
        //         'id' => $cat->id,
        //         'parent' => $cat->idPadre,
        //         'text'=>$cat->nombre
        //         ];
        //       }
        //   }
        return [
        'pagination'=>[
          'total'=> $categorias->total(),
          'current_page' => $categorias->currentPage(),
          'per_page' => $categorias->perPage(),
          'last_page' => $categorias->lastPage(),
          'from'=> $categorias->firstItem(),
          'to'=> $categorias->lastPage(),
        ],
        'categorias' => $categorias
      ];
        // return $categorias;
    }
    public function getCategoriasPadre()
    {
        $categorias = Categoria::where('idPadre', 0)->get();

        return $categorias;
    }
}
