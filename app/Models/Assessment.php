<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Assessment
 *
 * @property int $id
 * @property int $course_id
 * @property string $title
 * @property string|null $description
 * @property string $type
 * @property int|null $time_limit
 * @property int $passing_score
 * @property bool $show_results
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Course $course
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AssessmentQuestion> $questions
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\StudentAssessment> $studentAssessments
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Assessment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Assessment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Assessment query()
 * @method static \Illuminate\Database\Eloquent\Builder|Assessment whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assessment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assessment whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assessment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assessment whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assessment wherePassingScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assessment whereShowResults($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assessment whereTimeLimit($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assessment whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assessment whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assessment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Assessment active()

 * 
 * @mixin \Eloquent
 */
class Assessment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'course_id',
        'title',
        'description',
        'type',
        'time_limit',
        'passing_score',
        'show_results',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'show_results' => 'boolean',
        'time_limit' => 'integer',
        'passing_score' => 'integer',
    ];

    /**
     * Scope a query to only include active assessments.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the course that owns the assessment.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the assessment questions.
     */
    public function questions(): HasMany
    {
        return $this->hasMany(AssessmentQuestion::class)->orderBy('order');
    }

    /**
     * Get the student assessment results.
     */
    public function studentAssessments(): HasMany
    {
        return $this->hasMany(StudentAssessment::class);
    }

    /**
     * Get total points for this assessment.
     *
     * @return int
     */
    public function getTotalPointsAttribute(): int
    {
        return $this->questions()->sum('points');
    }
}