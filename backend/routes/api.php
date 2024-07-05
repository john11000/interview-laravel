<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\TimesheetController;
use App\Http\Controllers\ClientController;

// Public routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/timesheets', [TimesheetController::class, 'list']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Recursos protegidos
    Route::apiResource('employees', EmployeeController::class);
    // Route::apiResource('timesheets', TimesheetController::class);
    Route::apiResource('clients', ClientController::class);
});
