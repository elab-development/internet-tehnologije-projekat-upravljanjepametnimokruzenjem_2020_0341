<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SettingController;

Route::get('/', function () {
    return view('welcome');
});
Route::get('ph', [SettingController::class, 'exportCSV']);
