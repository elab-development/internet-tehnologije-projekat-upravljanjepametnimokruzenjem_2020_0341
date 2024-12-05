<?php

namespace App\Http\Controllers;

use App\Exports\SettingsExport;
use App\Http\Resources\Setting\SettingCollection;
use App\Http\Resources\Setting\SettingResource;
use App\Models\Room;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use CSV;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $settings = Setting::all();
        if (is_null($settings) || count($settings) === 0) {
            return response()->json('No settings found!', 404);
        }
        return response()->json([
            'settings' => new SettingCollection($settings)
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
    public function exportCSV()
    {
        return CSV::download(new SettingsExport, 'settings-history.csv');
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
            'value' =>  'required|string|max:255',
            'active' =>  'required|boolean',
            'room_id' =>  'required|integer|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $room = Room::find($request->room_id);
        if (is_null($room)) {
            return response()->json('Room not found', 404);
        }

        $setting = Setting::create([
            'name' => $request->name,
            'value' => $request->value,
            'active' => $request->active,
            'room_id' => $request->room_id,
        ]);

        return response()->json([
            'Setting created' => new SettingResource($setting)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function show($setting_id)
    {
        $setting = Setting::find($setting_id);
        if (is_null($setting)) {
            return response()->json('Setting not found', 404);
        }
        return response()->json(new SettingResource($setting));
    }
    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function edit(Setting $setting)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Setting $setting)
    {
        $validator = Validator::make($request->all(), [
            'name' =>  'required|string|max:255',
            'value' =>  'required|string|max:255',
            'active' =>  'required|boolean',
            'room_id' =>  'required|integer|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $room = Room::find($request->room_id);
        if (is_null($room)) {
            return response()->json('Room not found', 404);
        }

        $setting->name = $request->name;
        $setting->value = $request->value;
        $setting->active = $request->active;
        $setting->room_id = $request->room_id;

        $setting->save();

        return response()->json([
            'Setting updated' => new SettingResource($setting)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function destroy(Setting $setting)
    {
        $setting->delete();
        return response()->json('Setting deleted');
    }
}