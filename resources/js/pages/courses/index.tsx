import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'administrator' | 'instructor' | 'student';
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
    enrollments_count: number;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

interface Props {
    courses: {
        data: Course[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    [key: string]: unknown;
}

export default function CoursesIndex({ courses }: Props) {
    const getStatusBadge = (status: string) => {
        const badges = {
            draft: 'bg-yellow-100 text-yellow-800',
            published: 'bg-green-100 text-green-800',
            archived: 'bg-gray-100 text-gray-800'
        };
        return badges[status as keyof typeof badges] || badges.draft;
    };

    return (
        <AppShell>
            <Head title="Courses" />
            
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                            📚 Courses
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Browse and manage courses
                        </p>
                    </div>
                    <Link
                        href={route('courses.create')}
                        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                        ➕ Create Course
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.data.map((course) => (
                        <div key={course.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                                        {course.title}
                                    </h3>
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(course.status)}`}>
                                        {course.status}
                                    </span>
                                </div>
                                
                                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                                    {course.description}
                                </p>
                                
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <span className="mr-2">👩‍🏫</span>
                                        <span>Instructor: {course.instructor.name}</span>
                                    </div>
                                    
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                        <span className="mr-2">👥</span>
                                        <span>{course.enrollments_count} students enrolled</span>
                                    </div>
                                    
                                    {course.duration_hours && (
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <span className="mr-2">⏰</span>
                                            <span>{course.duration_hours} hours</span>
                                        </div>
                                    )}
                                    
                                    {course.start_date && (
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <span className="mr-2">📅</span>
                                            <span>Starts: {new Date(course.start_date).toLocaleDateString()}</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex space-x-2">
                                    <Link
                                        href={route('courses.show', course.id)}
                                        className="flex-1 bg-indigo-600 text-white text-center py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
                                    >
                                        View Course
                                    </Link>
                                    <Link
                                        href={route('courses.edit', course.id)}
                                        className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        ✏️
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {courses.data.length === 0 && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            No courses found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Get started by creating your first course
                        </p>
                        <Link
                            href={route('courses.create')}
                            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
                        >
                            Create Your First Course
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {courses.meta.total > courses.meta.per_page && (
                    <div className="mt-8 flex justify-center">
                        <div className="flex space-x-2">
                            {courses.links.map((link, index) => 
                                link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        className={`px-4 py-2 rounded ${
                                            link.active
                                                ? 'bg-indigo-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-50 border'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={index}
                                        className="px-4 py-2 rounded opacity-50 cursor-not-allowed bg-white text-gray-700 border"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}