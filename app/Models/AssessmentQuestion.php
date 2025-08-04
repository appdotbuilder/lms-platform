<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\AssessmentQuestion
 *
 * @property int $id
 * @property int $assessment_id
 * @property string $question
 * @property string|null $image_path
 * @property array $options
 * @property int $correct_answer
 * @property int $points
 * @property int $order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Assessment $assessment
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|AssessmentQuestion newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AssessmentQuestion newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AssessmentQuestion query()
 * @method static \Illuminate\Database\Eloquent\Builder|AssessmentQuestion whereAssessmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssessmentQuestion whereCorrectAnswer($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssessmentQuestion whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssessmentQuestion whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssessmentQuestion whereImagePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssessmentQuestion whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssessmentQuestion whereOptions($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssessmentQuestion whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssessmentQuestion wherePoints($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssessmentQuestion whereQuestion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssessmentQuestion whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AssessmentQuestion active()

 * 
 * @mixin \Eloquent
 */
class AssessmentQuestion extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'assessment_id',
        'question',
        'image_path',
        'options',
        'correct_answer',
        'points',
        'order',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'options' => 'array',
        'is_active' => 'boolean',
        'correct_answer' => 'integer',
        'points' => 'integer',
        'order' => 'integer',
    ];

    /**
     * Scope a query to only include active questions.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the assessment that owns the question.
     */
    public function assessment(): BelongsTo
    {
        return $this->belongsTo(Assessment::class);
    }
}