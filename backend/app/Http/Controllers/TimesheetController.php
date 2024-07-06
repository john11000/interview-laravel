<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Timesheet;
use Illuminate\Support\Facades\Auth;

class TimesheetController extends Controller
{
    public function index()
    {
        return Timesheet::where('user_id', Auth::id())->get();
    }

    public function list()
    {
        return Timesheet::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'payRate' => 'required|numeric',
            'payType' => 'required|string|in:hourly,salary',
        ]);

        $timesheet = new Timesheet([
            'name' => $request->name,
            'pay_rate' => $request->payRate,
            'pay_type' => $request->payType,
            'user_id' => 1,
            'check_date' => now(),
        ]);

        $timesheet->save();

        return response()->json($timesheet, 201);
    }

    public function show($id)
    {
        $timesheet = Timesheet::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        return response()->json($timesheet);
    }

    public function update(Request $request, $id)
    {
        $timesheet = Timesheet::where('id', $id)->where('user_id', Auth::id())->firstOrFail();

        $request->validate([
            'name' => 'sometimes|required|string',
            'payRate' => 'sometimes|required|numeric',
            'payType' => 'sometimes|required|string|in:hourly,salary',
            'check_date' => 'sometimes|required|date',
            'status' => 'sometimes|required|string|in:pending,approved,rejected',
            'note' => 'sometimes|nullable|string',
        ]);

        $timesheet->update($request->all());

        return response()->json($timesheet);
    }

    public function destroy($id)
    {
        $timesheet = Timesheet::where('id', $id)->where('user_id', Auth::id())->firstOrFail();
        $timesheet->delete();

        return response()->json(['message' => 'Timesheet deleted successfully']);
    }
}
