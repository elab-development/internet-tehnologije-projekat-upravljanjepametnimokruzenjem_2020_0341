<?php

namespace App\Http\Controllers;

use App\Http\Resources\Resident\ResidentCollection;
use App\Http\Resources\Resident\ResidentResource;
use App\Models\Home;
use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ResidentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $residents = Resident::all();
        if (is_null($residents) || count($residents) === 0) {
            return response()->json('No residents found!', 404);
        }
        return response()->json([
            'residents' => new ResidentCollection($residents)
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
            'name' =>  'required|string|max:255',
            'privilege' =>  'required|string|max:255',
            'home_id' =>  'required|integer|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $home = Home::find($request->home_id);
        if (is_null($home)) {
            return response()->json('Home not found', 404);
        }

        $resident = Resident::create([
            'name' => $request->name,
            'privilege' => $request->privilege,
            'home_id' => $request->home_id,
        ]);

        return response()->json([
            'Resident created' => new ResidentResource($resident)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Resident  $resident
     * @return \Illuminate\Http\Response
     */
    public function show($resident_id)
    {
        $resident = Resident::find($resident_id);
        if (is_null($resident)) {
            return response()->json('Resident not found', 404);
        }
        return response()->json(new ResidentResource($resident));
    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Resident  $resident
     * @return \Illuminate\Http\Response
     */
    public function edit(Resident $resident)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Resident  $resident
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Resident $resident)
    {
        $validator = Validator::make($request->all(), [
            'name' =>  'required|string|max:255',
            'privilege' =>  'required|string|max:255',
            'home_id' =>  'required|integer|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $home = Home::find($request->home_id);
        if (is_null($home)) {
            return response()->json('Home not found', 404);
        }

        $resident->name = $request->name;
        $resident->privilege = $request->privilege;
        $resident->home_id = $request->home_id;

        $resident->save();

        return response()->json([
            'Resident updated' => new ResidentResource($resident)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Resident  $resident
     * @return \Illuminate\Http\Response
     */
    public function destroy(Resident $resident)
    {
        $resident->delete();
        return response()->json('Resident deleted');
    }
}