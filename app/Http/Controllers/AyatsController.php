<?php

namespace App\Http\Controllers;

use App\Models\Ayat;

class AyatsController extends Controller
{
    /**
     * Display a listing of the ayats by surat number.
     *
     * @param $suratNumber
     * @return \Illuminate\Http\Response
     */
    public function index($suratNumber)
    {
        $ayats = Ayat::with('translation')->where('surat_number', $suratNumber)->get();

        return response()->json($ayats);
    }

    /**
     * Display the specified resource.
     *
     * @param  int $suratId
     * @return \Illuminate\Http\Response
     */
    public function show($suratId)
    {
        //
    }
}
