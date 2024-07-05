<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Models\Timesheet;

class TimesheetControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function authenticate()
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');
        return $user;
    }

    /** @test */
    public function user_can_create_timesheet()
    {
        $this->authenticate();

        $response = $this->postJson('/api/timesheets', [
            'check_date' => '2024-01-01',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('timesheets', ['check_date' => '2024-01-01']);
    }

    /** @test */
    public function user_can_update_timesheet()
    {
        $user = $this->authenticate();
        $timesheet = Timesheet::factory()->create(['user_id' => $user->id]);

        $response = $this->putJson("/api/timesheets/{$timesheet->id}", [
            'status' => 'approved',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('timesheets', ['status' => 'approved']);
    }

    /** @test */
    public function user_can_delete_timesheet()
    {
        $user = $this->authenticate();
        $timesheet = Timesheet::factory()->create(['user_id' => $user->id]);

        $response = $this->deleteJson("/api/timesheets/{$timesheet->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('timesheets', ['id' => $timesheet->id]);
    }
}
