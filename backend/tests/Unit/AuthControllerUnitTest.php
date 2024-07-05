<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Mockery;

class AuthControllerUnitTest extends TestCase
{
    public function test_user_can_register()
    {
        $request = Request::create('/api/register', 'POST', [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $user = Mockery::mock('alias:App\Models\User');
        $user->shouldReceive('create')->once()->andReturn((object) ['id' => 1]);

        $controller = new AuthController();
        $response = $controller->register($request);

        $this->assertEquals(201, $response->status());
    }

    public function test_user_can_login()
    {
        $request = Request::create('/api/login', 'POST', [
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $user = Mockery::mock('alias:App\Models\User');
        $user->shouldReceive('where->first')->once()->andReturn((object) [
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
            'createToken' => (object) ['plainTextToken' => 'test_token']
        ]);

        $controller = new AuthController();

        $response = $controller->login($request);
        $data = $response->getData(true);

        $this->assertEquals('Bearer', $data['token_type']);
        $this->assertEquals(200, $response->status());
    }
}
