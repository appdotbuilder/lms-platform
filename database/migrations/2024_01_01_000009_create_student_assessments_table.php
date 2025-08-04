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
        Schema::create('student_assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('student_id')->constrained('users')->cascadeOnDelete();
            $table->json('answers')->comment('Student answers as JSON array');
            $table->integer('score')->comment('Total score achieved');
            $table->integer('total_points')->comment('Maximum possible points');
            $table->decimal('percentage', 5, 2)->comment('Score as percentage');
            $table->boolean('passed')->comment('Whether student passed the assessment');
            $table->timestamp('started_at');
            $table->timestamp('completed_at');
            $table->integer('time_taken')->comment('Time taken in minutes');
            $table->timestamps();
            
            $table->index('assessment_id');
            $table->index('student_id');
            $table->index(['student_id', 'assessment_id']);
            $table->index('passed');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_assessments');
    }
};