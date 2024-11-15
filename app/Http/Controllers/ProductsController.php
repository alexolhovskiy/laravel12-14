<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Models\User;
use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; // Добавляем импорт фасада Auth

class ProductsController extends Controller
{
    public  function index(Request $request){
        $token = $request->header('Authorization');
        $token = str_replace('Bearer ', '', $token); // Убираем "Bearer " из заголовка

        $user = User::where('access_token', $token)->first();

        if ($user) {
        // if (Auth::check()) {
        // if (isset($_SESSION['aut']) && $_SESSION['aut'] === true){
            // Получаем все продукты из базы данных
            $products = Products::all();
            
            // Возвращаем данные в формате JSON
            return response()->json($products);
        }
    }
    
}
