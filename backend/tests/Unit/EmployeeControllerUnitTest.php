<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Http\Controllers\EmployeeController;
use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Support\Facades\Auth;
use Mockery;

class EmployeeControllerUnitTest extends TestCase
{
    public function test_user_can_create_employee()
    {
        $request = Request::create('/api/employees', 'POST', [
            'name' => 'John Doe',
            'payment_type' => 'hourly',
            'payment_amount' => 15.00,
        ]);

        $user = (object) ['id' => 1];
        Auth::shouldReceive('id')->andReturn($user->id);

        $employee = Mockery::mock('alias:App\Models\Employee');
        $employee->shouldReceive('save')->once()->andReturn(true);

        $controller = new EmployeeController();
        $response = $controller->store($request);

        $this->assertEquals(201, $response->status());
    }

    public function test_user_can_update_employee()
    {
        $request = Request::create('/api/employees/1', 'PUT', [
            'name' => 'Jane Doe',
        ]);

        $user = (object) ['id' => 1];
        Auth::shouldReceive('id')->andReturn($user->id);

        $employee = Mockery::mock('alias:App\Models\Employee');
        $employee->shouldReceive('where->where->firstOrFail')->once()->andReturn($employee);
        $employee->shouldReceive('update')->once()->andReturn(true);

        $controller = new EmployeeController();
        $response = $controller->update($request, 1);

        $this->assertEquals(200, $response->status());
    }

    public function test_user_can_delete_employee()
    {
        $user = (object) ['id' => 1];
        Auth::shouldReceive('id')->andReturn($user->id);

        $employee = Mockery::mock('alias:App\Models\Employee');
        $employee->shouldReceive('where->where->firstOrFail')->once()->andReturn($employee);
        $employee->shouldReceive('delete')->once()->andReturn(true);

        $controller = new EmployeeController();
        $response = $controller->destroy(1);

        $this->assertEquals(200, $response->status());
    }
}
