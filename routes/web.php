<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('dashboard');
});

Route::get('/orders', function () {
    return view('dashboard');
});
Route::get('/orders/view/{id}', function () {
    return view('dashboard');
});
Route::get('/orders/view/{id}/invoice', function () {
    return view('dashboard');
});
Route::get('/orders/create', function () {
    return view('dashboard');
});
Route::get('/products', function () {
    return view('dashboard');
});
Route::get('/products/view/{id}', function () {
    return view('dashboard');
});
Route::get('/products/add-product', function () {
    return view('dashboard');
});
