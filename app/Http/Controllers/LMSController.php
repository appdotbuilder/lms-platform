<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\User;
use App\Models\CourseEnrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LMSController extends Controller
{
    /**
     * Display the main LMS dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        
        if (!$user) {
            // Show welcome page for guests
            $totalCourses = Course::published()->count();
            $totalInstructors = User::instructors()->count();
            $totalStudents = User::students()->count();
            
            return Inertia::render('welcome', [
                'stats' => [
                    'courses' => $totalCourses,
                    'instructors' => $totalInstructors,
                    'students' => $totalStudents,
                ]
            ]);
        }
        
        $data = [];
        
        if ($user->isAdministrator()) {
            $data = [
                'totalUsers' => User::count(),
                'totalCourses' => Course::count(),
                'totalInstructors' => User::instructors()->count(),
                'totalStudents' => User::students()->count(),
                'recentCourses' => Course::with('instructor')
                    ->latest()
                    ->take(5)
                    ->get(),
                'recentEnrollments' => CourseEnrollment::with(['course', 'student'])
                    ->latest()
                    ->take(5)
                    ->get(),
            ];
        } elseif ($user->isInstructor()) {
            $data = [
                'myCourses' => Course::where('instructor_id', $user->id)
                    ->withCount('enrollments')
                    ->latest()
                    ->get(),
                'totalStudents' => CourseEnrollment::whereHas('course', function ($query) use ($user) {
                    $query->where('instructor_id', $user->id);
                })->distinct('student_id')->count('student_id'),
                'recentEnrollments' => CourseEnrollment::with(['course', 'student'])
                    ->whereHas('course', function ($query) use ($user) {
                        $query->where('instructor_id', $user->id);
                    })
                    ->latest()
                    ->take(5)
                    ->get(),
            ];
        } else {
            // Student
            $data = [
                'enrolledCourses' => CourseEnrollment::with(['course.instructor'])
                    ->where('student_id', $user->id)
                    ->latest()
                    ->get(),
                'availableCourses' => Course::published()
                    ->whereNotIn('id', function ($query) use ($user) {
                        $query->select('course_id')
                            ->from('course_enrollments')
                            ->where('student_id', $user->id);
                    })
                    ->with('instructor')
                    ->withCount('enrollments')
                    ->latest()
                    ->take(6)
                    ->get(),
            ];
        }
        
        return Inertia::render('lms/dashboard', [
            'user' => $user,
            'data' => $data,
        ]);
    }
}