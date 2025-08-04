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
        Schema::create('assessment_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assessment_id')->constrained()->cascadeOnDelete();
            $table->text('question');
            $table->string('image_path')->nullable()->comment('Optional question image');
            $table->json('options')->comment('Multiple choice options as JSON array');
            $table->integer('correct_answer')->comment('Index of correct answer (0-based)');
            $table->integer('points')->default(1)->comment('Points for correct answer');
            $table->integer('order')->default(0)->comment('Question order');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index('assessment_id');
            $table->index(['assessment_id', 'order']);
            $table->index('is_active');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assessment_questions');
    }
};