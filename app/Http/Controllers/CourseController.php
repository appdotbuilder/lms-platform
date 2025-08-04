<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Course;
use App\Models\CourseEnrollment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = auth()->user();
        
        if ($user->isAdministrator()) {
            $courses = Course::with(['instructor'])
                ->withCount('enrollments')
                ->latest()
                ->paginate(10);
        } elseif ($user->isInstructor()) {
            $courses = Course::where('instructor_id', $user->id)
                ->withCount('enrollments')
                ->latest()
                ->paginate(10);
        } else {
            // Students see published courses only
            $courses = Course::published()
                ->with('instructor')
                ->withCount('enrollments')
                ->latest()
                ->paginate(10);
        }
        
        return Inertia::render('courses/index', [
            'courses' => $courses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = auth()->user();
        
        if (!$user || (!$user->isAdministrator() && !$user->isInstructor())) {
            abort(403, 'Only administrators and instructors can create courses.');
        }
        
        return Inertia::render('courses/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCourseRequest $request)
    {
        $user = auth()->user();
        
        if (!$user || (!$user->isAdministrator() && !$user->isInstructor())) {
            abort(403, 'Only administrators and instructors can create courses.');
        }
        
        $course = Course::create([
            ...$request->validated(),
            'instructor_id' => auth()->id(),
        ]);

        return redirect()->route('courses.show', $course)
            ->with('success', 'Course created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        $user = auth()->user();
        
        $course->load([
            'instructor',
            'materials' => function ($query) {
                $query->active()->orderBy('order');
            },
            'assessments' => function ($query) {
                $query->active();
            }
        ]);
        
        $enrollment = null;
        if ($user && $user->isStudent()) {
            $enrollment = CourseEnrollment::where('course_id', $course->id)
                ->where('student_id', $user->id)
                ->first();
        }
        
        return Inertia::render('courses/show', [
            'course' => $course,
            'enrollment' => $enrollment,
            'canEnroll' => $user && $user->isStudent() && !$enrollment && $course->status === 'published',
            'canEdit' => $user && ($user->isAdministrator() || ($user->isInstructor() && $course->instructor_id === $user->id)),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        $user = auth()->user();
        
        if (!$user || (!$user->isAdministrator() && !($user->isInstructor() && $course->instructor_id === $user->id))) {
            abort(403, 'You can only edit your own courses.');
        }
        
        return Inertia::render('courses/edit', [
            'course' => $course
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCourseRequest $request, Course $course)
    {
        $user = auth()->user();
        
        if (!$user || (!$user->isAdministrator() && !($user->isInstructor() && $course->instructor_id === $user->id))) {
            abort(403, 'You can only update your own courses.');
        }
        
        $course->update($request->validated());

        return redirect()->route('courses.show', $course)
            ->with('success', 'Course updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $user = auth()->user();
        
        if (!$user || (!$user->isAdministrator() && !($user->isInstructor() && $course->instructor_id === $user->id))) {
            abort(403, 'You can only delete your own courses.');
        }
        
        $course->delete();

        return redirect()->route('courses.index')
            ->with('success', 'Course deleted successfully.');
    }


}