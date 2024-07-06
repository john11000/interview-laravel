<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\TimesheetController;
use App\Http\Controllers\ClientController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('employees', EmployeeController::class);
    Route::apiResource('clients', ClientController::class);
    Route::get('/timesheets', [TimesheetController::class, 'list']);
    Route::post('/timesheets', [TimesheetController::class, 'store']);
    Route::get('/timesheets/{id}', [TimesheetController::class, 'show']);
    Route::put('/timesheets/{id}', [TimesheetController::class, 'update']);
    Route::delete('/timesheets/{id}', [TimesheetController::class, 'destroy']);
});
