<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('course_enrollments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
            $table->enum('status', ['enrolled', 'in_progress', 'completed', 'dropped'])->default('enrolled');
            $table->timestamp('enrolled_at')->useCurrent();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->integer('progress_percentage')->default(0)->comment('Course completion percentage');
            $table->timestamps();
            
            $table->unique(['course_id', 'student_id']);
            $table->index('student_id');
            $table->index('status');
            $table->index(['student_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_enrollments');
    }
};