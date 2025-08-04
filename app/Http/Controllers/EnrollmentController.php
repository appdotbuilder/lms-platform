<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseEnrollment;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    /**
     * Enroll student in course.
     */
    public function store(Request $request)
    {
        $courseId = $request->input('course_id');
        $course = Course::findOrFail($courseId);
        
        if (!auth()->user()->isStudent()) {
            return back()->with('error', 'Only students can enroll in courses.');
        }
        
        if ($course->status !== 'published') {
            return back()->with('error', 'This course is not available for enrollment.');
        }
        
        $enrollment = CourseEnrollment::firstOrCreate([
            'course_id' => $courseId,
            'student_id' => auth()->id(),
        ], [
            'status' => 'enrolled',
            'enrolled_at' => now(),
        ]);
        
        return back()->with('success', 'Successfully enrolled in the course!');
    }
}