<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\TimesheetController;
use Illuminate\Http\Request;
use App\Models\Timesheet;
use Illuminate\Support\Facades\Auth;
use Mockery;

class TimesheetControllerUnitTest extends TestCase
{
    public function test_user_can_create_timesheet()
    {
        $request = Request::create('/api/timesheets', 'POST', [
            'check_date' => '2024-01-01',
        ]);

        $user = (object) ['id' => 1];
        Auth::shouldReceive('id')->andReturn($user->id);

        $timesheet = Mockery::mock('alias:App\Models\Timesheet');
        $timesheet->shouldReceive('save')->once()->andReturn(true);

        $controller = new TimesheetController();
        $response = $controller->store($request);

        $this->assertEquals(201, $response->status());
    }

    public function test_user_can_update_timesheet()
    {
        $request = Request::create('/api/timesheets/1', 'PUT', [
            'status' => 'approved',
        ]);

        $user = (object) ['id' => 1];
        Auth::shouldReceive('id')->andReturn($user->id);

        $timesheet = Mockery::mock('alias:App\Models\Timesheet');
        $timesheet->shouldReceive('where->where->firstOrFail')->once()->andReturn($timesheet);
        $timesheet->shouldReceive('update')->once()->andReturn(true);

        $controller = new TimesheetController();
        $response = $controller->update($request, 1);

        $this->assertEquals(200, $response->status());
    }

    public function test_user_can_delete_timesheet()
    {
        $user = (object) ['id' => 1];
        Auth::shouldReceive('id')->andReturn($user->id);

        $timesheet = Mockery::mock('alias:App\Models\Timesheet');
        $timesheet->shouldReceive('where->where->firstOrFail')->once()->andReturn($timesheet);
        $timesheet->shouldReceive('delete')->once()->andReturn(true);

        $controller = new TimesheetController();
        $response = $controller->destroy(1);

        $this->assertEquals(200, $response->status());
    }
}
