<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Employee;

class EmployeeControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function authenticate()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');
        return $user;
    }

    /** @test */
    public function user_can_create_employee()
    {
        $this->authenticate();

        $response = $this->postJson('/api/employees', [
            'name' => 'John Doe',
            'payment_type' => 'hourly',
            'payment_amount' => 15.00,
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('employees', ['name' => 'John Doe']);
    }

    /** @test */
    public function user_can_update_employee()
    {
        $user = $this->authenticate();
        $employee = Employee::factory()->create(['user_id' => $user->id]);

        $response = $this->putJson("/api/employees/{$employee->id}", [
            'name' => 'Jane Doe',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('employees', ['name' => 'Jane Doe']);
    }

    /** @test */
    public function user_can_delete_employee()
    {
        $user = $this->authenticate();
        $employee = Employee::factory()->create(['user_id' => $user->id]);

        $response = $this->deleteJson("/api/employees/{$employee->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('employees', ['id' => $employee->id]);
    }
}
