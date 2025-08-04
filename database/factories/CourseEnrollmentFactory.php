<?php

namespace Database\Factories;

use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CourseEnrollment>
 */
class CourseEnrollmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $enrolledAt = fake()->dateTimeBetween('-3 months', 'now');
        $startedAt = fake()->boolean(70) ? fake()->dateTimeBetween($enrolledAt, 'now') : null;
        $progress = $startedAt ? fake()->numberBetween(0, 100) : 0;
        $status = $this->getStatusBasedOnProgress($progress, $startedAt);
        $completedAt = $status === 'completed' ? fake()->dateTimeBetween($startedAt ?: $enrolledAt, 'now') : null;

        return [
            'course_id' => Course::factory(),
            'student_id' => User::factory()->student(),
            'status' => $status,
            'enrolled_at' => $enrolledAt,
            'started_at' => $startedAt,
            'completed_at' => $completedAt,
            'progress_percentage' => $progress,
        ];
    }

    /**
     * Get status based on progress.
     */
    protected function getStatusBasedOnProgress(int $progress, $startedAt): string
    {
        if ($progress >= 100) {
            return 'completed';
        } elseif ($progress > 0 && $startedAt) {
            return 'in_progress';
        } elseif (fake()->boolean(5)) {
            return 'dropped';
        }
        
        return 'enrolled';
    }
}