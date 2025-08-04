<?php

use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\User;

test('welcome page displays lms information', function () {
    $response = $this->get('/');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('welcome')
            ->has('stats')
        );
});

test('administrator can view dashboard', function () {
    $admin = User::factory()->administrator()->create();

    $response = $this->actingAs($admin)->get('/dashboard');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('lms/dashboard')
            ->has('user')
            ->has('data')
        );
});

test('instructor can create course', function () {
    $instructor = User::factory()->instructor()->create();

    $courseData = [
        'title' => 'Test Course',
        'description' => 'This is a test course description.',
        'status' => 'draft',
        'duration_hours' => 40,
    ];

    $response = $this->actingAs($instructor)
        ->post('/courses', $courseData);

    $response->assertRedirect();
    $this->assertDatabaseHas('courses', [
        'title' => 'Test Course',
        'instructor_id' => $instructor->id,
    ]);
});

test('student cannot create course', function () {
    $student = User::factory()->student()->create();

    $courseData = [
        'title' => 'Test Course',
        'description' => 'This is a test course description.',
        'status' => 'draft',
    ];

    $response = $this->actingAs($student)
        ->post('/courses', $courseData);

    $response->assertStatus(403);
});

test('student can enroll in published course', function () {
    $instructor = User::factory()->instructor()->create();
    $student = User::factory()->student()->create();
    
    $course = Course::factory()->published()->create([
        'instructor_id' => $instructor->id,
    ]);

    $response = $this->actingAs($student)
        ->post('/courses/enroll', ['course_id' => $course->id]);

    $response->assertRedirect();
    $this->assertDatabaseHas('course_enrollments', [
        'course_id' => $course->id,
        'student_id' => $student->id,
        'status' => 'enrolled',
    ]);
});

test('student cannot enroll in draft course', function () {
    $instructor = User::factory()->instructor()->create();
    $student = User::factory()->student()->create();
    
    $course = Course::factory()->draft()->create([
        'instructor_id' => $instructor->id,
    ]);

    $response = $this->actingAs($student)
        ->post('/courses/enroll', ['course_id' => $course->id]);

    $response->assertRedirect();
    $this->assertDatabaseMissing('course_enrollments', [
        'course_id' => $course->id,
        'student_id' => $student->id,
    ]);
});

test('instructor can view own courses', function () {
    $instructor = User::factory()->instructor()->create();
    $otherInstructor = User::factory()->instructor()->create();
    
    $myCourse = Course::factory()->create(['instructor_id' => $instructor->id]);
    $otherCourse = Course::factory()->create(['instructor_id' => $otherInstructor->id]);

    $response = $this->actingAs($instructor)->get('/courses');

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('courses/index')
            ->has('courses.data', 1)
            ->where('courses.data.0.id', $myCourse->id)
        );
});

test('course displays proper information', function () {
    $instructor = User::factory()->instructor()->create();
    $course = Course::factory()->published()->create([
        'instructor_id' => $instructor->id,
    ]);

    $response = $this->actingAs($instructor)->get("/courses/{$course->id}");

    $response->assertStatus(200)
        ->assertInertia(fn ($page) => $page
            ->component('courses/show')
            ->has('course')
            ->where('course.id', $course->id)
            ->where('course.title', $course->title)
        );
});