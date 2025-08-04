<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Course;
use App\Models\CourseEnrollment;
use Illuminate\Database\Seeder;

class LMSSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        $admin = User::factory()->administrator()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
        ]);

        // Create instructor users
        $instructors = User::factory()->instructor()->count(5)->create();

        // Create student users
        $students = User::factory()->student()->count(50)->create();

        // Create courses
        $courses = Course::factory()->count(15)->create([
            'instructor_id' => function () use ($instructors) {
                return $instructors->random()->id;
            },
        ]);

        // Make sure some courses are published
        $courses->take(10)->each(function ($course) {
            $course->update(['status' => 'published']);
        });

        // Create enrollments for published courses
        $publishedCourses = $courses->where('status', 'published');
        
        foreach ($publishedCourses as $course) {
            // Random number of enrollments per course
            $enrollmentCount = random_int(5, 20);
            $randomStudents = $students->random($enrollmentCount);
            
            foreach ($randomStudents as $student) {
                CourseEnrollment::factory()->create([
                    'course_id' => $course->id,
                    'student_id' => $student->id,
                ]);
            }
        }

        $this->command->info('LMS sample data created successfully!');
        $this->command->info('Admin login: admin@example.com / password');
        $this->command->info("Created: {$instructors->count()} instructors, {$students->count()} students, {$courses->count()} courses");
    }
}