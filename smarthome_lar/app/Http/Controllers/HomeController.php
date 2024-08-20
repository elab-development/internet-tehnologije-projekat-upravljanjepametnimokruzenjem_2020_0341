<?php

namespace App\Http\Controllers;

use App\Http\Resources\Home\HomeCollection;
use App\Http\Resources\Home\HomeResource;
use App\Models\Home;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $homes = Home::all();
        if (is_null($homes) || count($homes) === 0) {
            return response()->json('No homes found!', 404);
        }
        return response()->json([
            'homes' => new HomeCollection($homes)
        ]);
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
        $validator = Validator::make($request->all(), [
            'address' =>  'required|string|max:255',
            'size' =>  'required|integer|between:15,400'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $home = Home::create([
            'address' => $request->address,
            'size' => $request->size,
        ]);

        return response()->json([
            'Home created' => new HomeResource($home)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Home  $home
     * @return \Illuminate\Http\Response
     */
    public function show($home_id)
    {
        $home = Home::find($home_id);
        if (is_null($home)) {
            return response()->json('Home not found', 404);
        }
        return response()->json(new HomeResource($home));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Home  $home
     * @return \Illuminate\Http\Response
     */
    public function edit(Home $home)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Home  $home
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Home $home)
    {
        $validator = Validator::make($request->all(), [
            'address' =>  'required|string|max:255',
            'size' =>  'required|integer|between:15,400'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $home->address = $request->address;
        $home->size = $request->size;

        $home->save();

        return response()->json([
            'Home updated' => new HomeResource($home)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Home  $home
     * @return \Illuminate\Http\Response
     */
    public function destroy(Home $home)
    {
        $home->delete();
        return response()->json('Home deleted');
    }
}