<?php

use App\Http\Controllers\LMSController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EnrollmentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page shows LMS welcome or dashboard based on auth status
Route::get('/', [LMSController::class, 'index'])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard redirects to LMS dashboard
    Route::get('dashboard', [LMSController::class, 'index'])->name('dashboard');
    
    // Course management routes
    Route::resource('courses', CourseController::class);
    
    // Course enrollment
    Route::post('/courses/enroll', [EnrollmentController::class, 'store'])->name('courses.enroll');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';