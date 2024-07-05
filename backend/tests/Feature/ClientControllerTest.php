<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Client;

class ClientControllerTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function admin_can_create_client()
    {
        $response = $this->postJson('/api/clients', [
            'company_name' => 'Test Company',
            'email' => 'client@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('clients', ['email' => 'client@example.com']);
    }

    /** @test */
    public function admin_can_update_client()
    {
        $client = Client::factory()->create();

        $response = $this->putJson("/api/clients/{$client->id}", [
            'company_name' => 'Updated Company',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('clients', ['company_name' => 'Updated Company']);
    }

    /** @test */
    public function admin_can_delete_client()
    {
        $client = Client::factory()->create();

        $response = $this->deleteJson("/api/clients/{$client->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('clients', ['id' => $client->id]);
    }
}
