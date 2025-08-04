<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $course = $this->route('course');
        $user = auth()->user();
        
        return $user && (
            $user->isAdministrator() || 
            ($user->isInstructor() && $course->instructor_id === $user->id)
        );
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => 'required|in:draft,published,archived',
            'duration_hours' => 'nullable|integer|min:1|max:1000',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Course title is required.',
            'description.required' => 'Course description is required.',
            'status.required' => 'Course status is required.',
            'status.in' => 'Course status must be draft, published, or archived.',
            'duration_hours.integer' => 'Duration must be a number.',
            'duration_hours.min' => 'Duration must be at least 1 hour.',
            'end_date.after_or_equal' => 'End date must be after start date.',
        ];
    }
}