<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserController extends Controller
{
    public function reg(Request $request)
    {
        // Определяем правила валидации
        $rules = [
            'email' => 'required|email|unique:users,email',
            'pass' => 'required|string|regex:/^[^<>&\s]{6,}$/',
            'login' => 'required|string|max:255',
            'rpass' => 'required|string|same:pass',
        ];

        // Выполняем валидацию
        $validator = Validator::make($request->all(), $rules);

        // Проверка на ошибки валидации
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Создание нового пользователя
        $user = new User();
        $user->email = $request->input('email');
        $user->password = Hash::make($request->input('pass'));
        $user->name = $request->input('login');
        $user->email_verified_at = now();
        $user->remember_token = '';
        $user->access_token='';
        $user->refresh_token='';
        // Сохраняем пользователя в БД
        $user->save();

        // Аутентификация пользователя после регистрации
        return $this->aut($request);
    }


    public function aut(Request $request)
    {
        $user = User::where('name', $request->input('login'))->first();

        // Проверяем, что пользователь найден и пароль корректен
        if ($user && Hash::check($request->input('pass'), $user->password)) {
            // Auth::login($user);

            // Если чекбокс "Запомнить меня" выбран
            if($request->input('checkBox')) {
                $token = $this->getToken(20);
                setcookie('remember_token', $token, time() + 864000, '/');
                
                // Сохраняем токен в базе данных
                $user->remember_token = $token;
            }

            $a_token = $this->getToken(20);
            $r_token = $this->getToken(20);
            $user->access_token = $a_token;
            $user->refresh_token = $r_token;
            $user->save();

            setcookie('refresh_token', $r_token, time() + 864000, '/');

            return response()->json([
                'message' => 'Вход выполнен успешно.', 
                'login' => $request->input('login'),
                'token' => $a_token,
            ], 200);
        }

        // Ответ в случае неудачной аутентификации
        return response()->json(['message' => 'Вход не выполнен.', 'login' => '','token'=>''], 401);
    }

    public function check_access_token(Request $request){

        $a_token = $request->header('Authorization');
        $a_token = $a_token!=='Bearer' ? str_replace('Bearer ', '', $a_token) : null;
        Log::info('access_token '.$a_token);
        if (!$a_token) {
            if ($request->hasCookie('remember_token')) {
                $rem_token = $request->cookie('remember_token');
    
                // Найти пользователя по токену (например, из базы данных)
                $user = User::where('remember_token', $rem_token)->first();
    
                if ($user) {
                    // Авторизуем пользователя, если токен действителен
                    $a_token = $this->getToken(20);
                    $r_token = $this->getToken(20);
                    $rem_token=$this->getToken(20);
                    $name=$user->name;
                    $user->access_token = $a_token;
                    $user->refresh_token = $r_token;
                    $user->remember_token = $rem_token;
                    $user->save();
    
                    setcookie('remember_token',$rem_token,time()+864000,'/');
                    setcookie('refresh_token', $r_token, time() + 864000, '/');
    
                    return response()->json([
                        'message' => 'Вход выполнен успешно.', 
                        'login' => $name,
                        'token' => $a_token,
                    ], 200);
                }
            }

            return response()->json(['message' => 'No remember token'], 401);
        }else{
            $r_token = $request->cookie('refresh_token');

            $user = User::where('access_token', $a_token)->first();

            if ($user && $user->refresh_token === $r_token) {
                return $this->get_access_token($user);
            }
        }

        return response()->json(['message' => 'No nothing'], 401);
    }


    public function get_access_token($user){
        $name=$user->name;
        $a_token = $this->getToken(20);
        $user->access_token = $a_token;
        $user->save();

        return response()->json([
            'message' => 'Вход выполнен успешно.', 
            'login' => $name,
            'token' => $a_token,
        ], 200);
    }

    public function logout(Request $request){
        $a_token = $request->header('Authorization');
        $a_token = $a_token!=='Bearer' ? str_replace('Bearer ', '', $a_token) : null;
        if ($a_token) {
            $user = User::where('access_token', $a_token)->first();

            // if ($user && $user->name === $request->body['login']) {
                
                $user->access_token = '';
                $user->refresh_token = '';
                $user->remember_token = '';
                $user->save();

                setcookie('remember_token','',time()-1,'/');
                setcookie('refresh_token', '', time()-1, '/');

                return response()->json([
                    'message' => 'Выход выполнен успешно.', 
                    'login' => '',
                    'token' => '',
                ], 200);
            // }
        }
    }

    // Генерация случайного токена
    public function getToken($length = 32)
    {
        return bin2hex(random_bytes($length));
    }
}
