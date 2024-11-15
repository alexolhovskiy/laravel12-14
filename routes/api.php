<?php

use App\Http\Controllers\MainController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Route::post('/products', function () {
//     return response()->json([
//         'status' => 'success',
//         'data' => [['id'=>123,'name'=>'TV','price'=>200],
//         ['id'=>12345,'name'=>'NTV','price'=>20000000],
//         ['id'=>23456,'name'=>'Radio','price'=>100],
//         ['id'=>3421,'name'=>'PC','price'=>300],
//         ['id'=>453223,'name'=>'Car','price'=>2000]]
//     ]);
// });

Route::post('/products', [ProductsController::class, 'index']);
Route::post('/reg', [UserController::class, 'reg']);
// Route::post('/aut', [UserController::class, 'aut']);
Route::post('/aut', [UserController::class, 'aut']);
Route::post('/logout', [UserController::class, 'logout']);
Route::post('/access_token', [UserController::class, 'check_access_token']);
// Route::get('/list', [MainController::class, 'index']);