<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Employee;
use Illuminate\Support\Facades\Auth;

class EmployeeController extends Controller
{
    public function index()
    {
        return Employee::where('user_id', Auth::id())->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'payment_type' => 'required|string|in:hourly,salary',
            'payment_amount' => 'required|numeric|min:0',
        ]);

        if ($request->payment_type == 'hourly' && $request->payment_amount < 12.00) {
            return response()->json(['error' => 'Hourly rate must be at least 12.00'], 422);
        }

        if ($request->payment_type == 'salary' && $request->payment_amount < 480.00) {
            return response()->json(['error' => 'Salary must be at least 480.00 per paycheck'], 422);
        }

        $employee = new Employee([
            'name' => $request->name,
            'payment_type' => $request->payment_type,
            'payment_amount' => $request->payment_amount,
            'user_id' => Auth::id(),
        ]);
        $employee->save();

        return response()->json($employee, 201);
    }

    public function show($id)
    {
        $employee = Employee::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        return response()->json($employee);
    }

    public function update(Request $request, $id)
    {
        $employee = Employee::where('id', $id)->where('user_id', Auth::id())->firstOrFail();

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'payment_type' => 'sometimes|required|string|in:hourly,salary',
            'payment_amount' => 'sometimes|required|numeric|min:0',
        ]);

        if ($request->has('payment_type')) {
            if ($request->payment_type == 'hourly' && $request->payment_amount < 12.00) {
                return response()->json(['error' => 'Hourly rate must be at least 12.00'], 422);
            }

            if ($request->payment_type == 'salary' && $request->payment_amount < 480.00) {
                return response()->json(['error' => 'Salary must be at least 480.00 per paycheck'], 422);
            }
        }

        $employee->update($request->all());
        return response()->json($employee);
    }

    public function destroy($id)
    {
        $employee = Employee::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        $employee->delete();
        return response()->json(['message' => 'Employee deleted successfully']);
    }
}
