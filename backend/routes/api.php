<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\TimesheetController;
use App\Http\Controllers\ClientController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('employees', EmployeeController::class);
    Route::apiResource('timesheets', TimesheetController::class);
    Route::apiResource('clients', ClientController::class);

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
