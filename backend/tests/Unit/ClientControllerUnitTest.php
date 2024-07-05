<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\ClientController;
use Illuminate\Http\Request;
use App\Models\Client;
use Illuminate\Support\Facades\Hash;
use Mockery;

class ClientControllerUnitTest extends TestCase
{
    public function test_admin_can_create_client()
    {
        $request = Request::create('/api/clients', 'POST', [
            'company_name' => 'Test Company',
            'email' => 'client@example.com',
            'password' => 'password',
        ]);

        $client = Mockery::mock('alias:App\Models\Client');
        $client->shouldReceive('save')->once()->andReturn(true);

        $controller = new ClientController();
        $response = $controller->store($request);

        $this->assertEquals(201, $response->status());
    }

    public function test_admin_can_update_client()
    {
        $request = Request::create('/api/clients/1', 'PUT', [
            'company_name' => 'Updated Company',
        ]);

        $client = Mockery::mock('alias:App\Models\Client');
        $client->shouldReceive('findOrFail')->once()->andReturn($client);
        $client->shouldReceive('update')->once()->andReturn(true);

        $controller = new ClientController();
        $response = $controller->update($request, 1);

        $this->assertEquals(200, $response->status());
    }

    public function test_admin_can_delete_client()
    {
        $client = Mockery::mock('alias:App\Models\Client');
        $client->shouldReceive('findOrFail')->once()->andReturn($client);
        $client->shouldReceive('delete')->once()->andReturn(true);

        $controller = new ClientController();
        $response = $controller->destroy(1);

        $this->assertEquals(200, $response->status());
    }
}
