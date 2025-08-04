<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\CourseMaterial
 *
 * @property int $id
 * @property int $course_id
 * @property string $title
 * @property string|null $description
 * @property string $type
 * @property string $file_path
 * @property string $file_name
 * @property int $file_size
 * @property int $order
 * @property bool $is_active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Course $course
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|CourseMaterial newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CourseMaterial newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CourseMaterial query()
 * @method static \Illuminate\Database\Eloquent\Builder|CourseMaterial whereCourseId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseMaterial whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseMaterial whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseMaterial whereFileName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseMaterial whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseMaterial whereFileSize($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseMaterial whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseMaterial whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseMaterial whereOrder($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseMaterial whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseMaterial whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseMaterial whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CourseMaterial active()

 * 
 * @mixin \Eloquent
 */
class CourseMaterial extends Model
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
        'file_path',
        'file_name',
        'file_size',
        'order',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'file_size' => 'integer',
        'order' => 'integer',
    ];

    /**
     * Scope a query to only include active materials.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Get the course that owns the material.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get formatted file size.
     *
     * @return string
     */
    public function getFormattedFileSizeAttribute(): string
    {
        $bytes = $this->file_size;
        $units = ['B', 'KB', 'MB', 'GB'];
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, 2) . ' ' . $units[$i];
    }
}