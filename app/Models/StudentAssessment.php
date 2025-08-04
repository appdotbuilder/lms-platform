<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\StudentAssessment
 *
 * @property int $id
 * @property int $assessment_id
 * @property int $student_id
 * @property array $answers
 * @property int $score
 * @property int $total_points
 * @property float $percentage
 * @property bool $passed
 * @property \Illuminate\Support\Carbon $started_at
 * @property \Illuminate\Support\Carbon $completed_at
 * @property int $time_taken
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Assessment $assessment
 * @property-read \App\Models\User $student
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment query()
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment whereAnswers($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment whereAssessmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment wherePassed($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment wherePercentage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment whereScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment whereStudentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment whereTimeTaken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment whereTotalPoints($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|StudentAssessment passed()

 * 
 * @mixin \Eloquent
 */
class StudentAssessment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'assessment_id',
        'student_id',
        'answers',
        'score',
        'total_points',
        'percentage',
        'passed',
        'started_at',
        'completed_at',
        'time_taken',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'answers' => 'array',
        'passed' => 'boolean',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'score' => 'integer',
        'total_points' => 'integer',
        'time_taken' => 'integer',
        'percentage' => 'decimal:2',
    ];

    /**
     * Scope a query to only include passed assessments.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePassed($query)
    {
        return $query->where('passed', true);
    }

    /**
     * Get the assessment for this result.
     */
    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class);
    }

    /**
     * Get the student for this result.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(User::class, 'student_id');
    }
}