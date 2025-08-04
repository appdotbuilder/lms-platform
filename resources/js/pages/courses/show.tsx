import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'administrator' | 'instructor' | 'student';
}

interface CourseMaterial {
    id: number;
    title: string;
    description: string | null;
    type: string;
    file_name: string;
    formatted_file_size: string;
    order: number;
}

interface Assessment {
    id: number;
    title: string;
    description: string | null;
    type: string;
    time_limit: number | null;
    passing_score: number;
}

interface Course {
    id: number;
    title: string;
    description: string;
    status: string;
    duration_hours: number | null;
    start_date: string | null;
    end_date: string | null;
    instructor: User;
    materials: CourseMaterial[];
    assessments: Assessment[];
    created_at: string;
}

interface Enrollment {
    id: number;
    status: string;
    progress_percentage: number;
    enrolled_at: string;
}

interface Props {
    course: Course;
    enrollment: Enrollment | null;
    canEnroll: boolean;
    canEdit: boolean;
    [key: string]: unknown;
}

export default function ShowCourse({ course, enrollment, canEnroll, canEdit }: Props) {
    const handleEnroll = () => {
        router.post('/courses/enroll', { course_id: course.id }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const getStatusBadge = (status: string) => {
        const badges = {
            draft: 'bg-yellow-100 text-yellow-800',
            published: 'bg-green-100 text-green-800',
            archived: 'bg-gray-100 text-gray-800'
        };
        return badges[status as keyof typeof badges] || badges.draft;
    };

    const getFileIcon = (type: string) => {
        const icons = {
            video: '🎥',
            pdf: '📄',
            ppt: '📊',
            document: '📝'
        };
        return icons[type as keyof typeof icons] || '📄';
    };

    return (
        <AppShell>
            <Head title={course.title} />
            
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
                    <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                    {course.title}
                                </h1>
                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusBadge(course.status)}`}>
                                    {course.status}
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">
                                {course.description}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="flex items-center text-gray-600 dark:text-gray-400">
                            <span className="mr-2">👩‍🏫</span>
                            <span>Instructor: {course.instructor.name}</span>
                        </div>
                        {course.duration_hours && (
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <span className="mr-2">⏰</span>
                                <span>{course.duration_hours} hours</span>
                            </div>
                        )}
                        {course.start_date && (
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <span className="mr-2">📅</span>
                                <span>Starts: {new Date(course.start_date).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>

                    {/* Progress for enrolled students */}
                    {enrollment && (
                        <div className="mb-4">
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-600 dark:text-gray-400">Your Progress</span>
                                <span className="text-gray-900 dark:text-gray-100 font-medium">
                                    {enrollment.progress_percentage}%
                                </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div 
                                    className="bg-indigo-600 h-3 rounded-full transition-all duration-300" 
                                    style={{ width: `${enrollment.progress_percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                        {canEnroll && (
                            <button
                                onClick={handleEnroll}
                                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                            >
                                🎓 Enroll in Course
                            </button>
                        )}
                        
                        {canEdit && (
                            <>
                                <Link
                                    href={route('courses.edit', course.id)}
                                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                                >
                                    ✏️ Edit Course
                                </Link>
                                <Link
                                    href="#"
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    📚 Add Materials
                                </Link>
                                <Link
                                    href="#"
                                    className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium"
                                >
                                    📝 Create Assessment
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Course Materials */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            📚 Course Materials
                        </h2>
                        
                        {course.materials.length > 0 ? (
                            <div className="space-y-3">
                                {course.materials.map((material) => (
                                    <div key={material.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-2xl">{getFileIcon(material.type)}</span>
                                            <div>
                                                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                                    {material.title}
                                                </h4>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {material.file_name} • {material.formatted_file_size}
                                                </p>
                                                {material.description && (
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                                        {material.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        {enrollment && (
                                            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors">
                                                View
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-3">📄</div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    No materials uploaded yet
                                </p>
                                {canEdit && (
                                    <button className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium">
                                        Upload first material
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Assessments */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                            📝 Assessments
                        </h2>
                        
                        {course.assessments.length > 0 ? (
                            <div className="space-y-3">
                                {course.assessments.map((assessment) => (
                                    <div key={assessment.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                                {assessment.title}
                                            </h4>
                                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                                                assessment.type === 'pre_test' 
                                                    ? 'bg-blue-100 text-blue-800' 
                                                    : 'bg-green-100 text-green-800'
                                            }`}>
                                                {assessment.type.replace('_', ' ')}
                                            </span>
                                        </div>
                                        {assessment.description && (
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                                {assessment.description}
                                            </p>
                                        )}
                                        <div className="flex justify-between items-center">
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {assessment.time_limit && (
                                                    <span className="mr-4">⏰ {assessment.time_limit} min</span>
                                                )}
                                                <span>🎯 Pass: {assessment.passing_score}%</span>
                                            </div>
                                            {enrollment && (
                                                <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors">
                                                    Take Test
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="text-4xl mb-3">📝</div>
                                <p className="text-gray-600 dark:text-gray-400">
                                    No assessments created yet
                                </p>
                                {canEdit && (
                                    <button className="mt-3 text-indigo-600 hover:text-indigo-800 font-medium">
                                        Create first assessment
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}