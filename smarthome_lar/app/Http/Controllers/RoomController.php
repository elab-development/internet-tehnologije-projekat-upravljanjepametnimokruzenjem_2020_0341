<?php

namespace App\Http\Controllers;

use App\Http\Resources\Room\RoomCollection;
use App\Http\Resources\Room\RoomResource;
use App\Models\Home;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $rooms = Room::all();
        if (is_null($rooms) || count($rooms) === 0) {
            return response()->json('No rooms found!', 404);
        }
        return response()->json([
            'rooms' => new RoomCollection($rooms)
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
            'size' =>  'required|integer',
            'home_id' =>  'required|integer|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $home = Home::find($request->home_id);
        if (is_null($home)) {
            return response()->json('Home not found', 404);
        }

        $room = Room::create([
            'name' => $request->name,
            'size' => $request->size,
            'home_id' => $request->home_id,
        ]);

        return response()->json([
            'Room created' => new RoomResource($room)
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function show($room_id)
    {
        $room = Room::find($room_id);
        if (is_null($room)) {
            return response()->json('Room not found', 404);
        }
        return response()->json(new RoomResource($room));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function edit(Room $room)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Room $room)
    {
        $validator = Validator::make($request->all(), [
            'name' =>  'required|string|max:255',
            'size' =>  'required|integer',
            'home_id' =>  'required|integer|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $home = Home::find($request->home_id);
        if (is_null($home)) {
            return response()->json('Home not found', 404);
        }

        $room->name = $request->name;
        $room->size = $request->size;
        $room->home_id = $request->home_id;

        $room->save();

        return response()->json([
            'Room updated' => new RoomResource($room)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Room  $room
     * @return \Illuminate\Http\Response
     */
    public function destroy(Room $room)
    {
        $room->delete();
        return response()->json('Room deleted');
    }
}
