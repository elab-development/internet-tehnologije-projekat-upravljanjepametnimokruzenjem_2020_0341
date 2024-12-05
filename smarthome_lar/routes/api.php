<?php
use App\Http\Controllers\LoginController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ResidentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/homes', [HomeController::class, 'index']);
Route::get('/homes/{id}', [HomeController::class, 'show']);

Route::get('/residents', [ResidentController::class, 'index']);
Route::get('/residents/{id}', [ResidentController::class, 'show']);

Route::get('/rooms', [RoomController::class, 'index']);
Route::get('/rooms/{id}', [RoomController::class, 'show']);

Route::get('/settings', [SettingController::class, 'index']);
Route::get('/settings/{id}', [SettingController::class, 'show']);

Route::post('/register', [LoginController::class, 'register']);
Route::post('/login', [LoginController::class, 'login']);
oute::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/profile', function (Request $request) {
        return auth()->user();
    });

    Route::resource('/homes', HomeController::class)
        ->only(['store', 'update', 'destroy']);

    Route::resource('/residents', ResidentController::class)
        ->only(['store', 'update', 'destroy']);

    Route::resource('/rooms', RoomController::class)
        ->only(['store', 'update', 'destroy']);

    Route::resource('/settings', SettingController::class)
        ->only(['store', 'update', 'destroy']);

    Route::post('/logout', [LoginController::class, 'logout']);
});