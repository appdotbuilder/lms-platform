import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
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
    instructor?: User;
    enrollments_count?: number;
    created_at: string;
}

interface Enrollment {
    id: number;
    status: string;
    progress_percentage: number;
    enrolled_at: string;
    course: Course;
    student?: User;
}

interface Props {
    user: User;
    data: {
        // Administrator data
        totalUsers?: number;
        totalCourses?: number;
        totalInstructors?: number;
        totalStudents?: number;
        recentCourses?: Course[];
        recentEnrollments?: Enrollment[];
        
        // Instructor data
        myCourses?: Course[];
        
        // Student data
        enrolledCourses?: Enrollment[];
        availableCourses?: Course[];
    };
    [key: string]: unknown;
}

export default function Dashboard({ user, data }: Props) {
    const handleEnrollCourse = (courseId: number) => {
        router.post('/courses/enroll', { course_id: courseId }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    const renderAdministratorDashboard = () => (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="text-2xl">👥</div>
                        <div className="ml-4">
                            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                {data.totalUsers}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">Total Users</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="text-2xl">📚</div>
                        <div className="ml-4">
                            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                {data.totalCourses}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">Total Courses</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="text-2xl">👩‍🏫</div>
                        <div className="ml-4">
                            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                {data.totalInstructors}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">Instructors</p>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <div className="flex items-center">
                        <div className="text-2xl">👨‍🎓</div>
                        <div className="ml-4">
                            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                {data.totalStudents}
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">Students</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        Recent Courses
                    </h3>
                    <div className="space-y-3">
                        {data.recentCourses?.map((course) => (
                            <div key={course.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-gray-100">{course.title}</p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        by {course.instructor?.name}
                                    </p>
                                </div>
                                <span className={`px-2 py-1 text-xs rounded ${
                                    course.status === 'published' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {course.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                        Recent Enrollments
                    </h3>
                    <div className="space-y-3">
                        {data.recentEnrollments?.map((enrollment) => (
                            <div key={enrollment.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded">
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-gray-100">
                                        {enrollment.student?.name}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {enrollment.course.title}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {enrollment.progress_percentage}%
                                    </p>
                                    <p className="text-xs text-gray-600 dark:text-gray-400">
                                        {enrollment.status}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderInstructorDashboard = () => (
        <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Quick Actions</h3>
                </div>
                <div className="flex space-x-4">
                    <Link
                        href={route('courses.create')}
                        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                        ➕ Create Course
                    </Link>
                    <Link
                        href={route('courses.index')}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        📚 View All Courses
                    </Link>
                </div>
            </div>

            {/* My Courses */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">My Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.myCourses?.map((course) => (
                        <div key={course.id} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                {course.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {course.description.substring(0, 100)}...
                            </p>
                            <div className="flex justify-between items-center">
                                <span className={`px-2 py-1 text-xs rounded ${
                                    course.status === 'published' 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {course.status}
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {course.enrollments_count} students
                                </span>
                            </div>
                            <Link
                                href={route('courses.show', course.id)}
                                className="mt-3 block w-full text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
                            >
                                View Course
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStudentDashboard = () => (
        <div className="space-y-6">
            {/* Enrolled Courses */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">My Enrolled Courses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.enrolledCourses?.map((enrollment) => (
                        <div key={enrollment.id} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                {enrollment.course.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                Instructor: {enrollment.course.instructor?.name}
                            </p>
                            <div className="mb-3">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                                    <span className="text-gray-900 dark:text-gray-100">
                                        {enrollment.progress_percentage}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-indigo-600 h-2 rounded-full" 
                                        style={{ width: `${enrollment.progress_percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                            <Link
                                href={route('courses.show', enrollment.course.id)}
                                className="block w-full text-center bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
                            >
                                Continue Learning
                            </Link>
                        </div>
                    ))}
                </div>
                {data.enrolledCourses?.length === 0 && (
                    <p className="text-gray-600 dark:text-gray-400 text-center py-8">
                        You haven't enrolled in any courses yet. Browse available courses below!
                    </p>
                )}
            </div>

            {/* Available Courses */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
                    Available Courses
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.availableCourses?.map((course) => (
                        <div key={course.id} className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                {course.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                Instructor: {course.instructor?.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                                {course.enrollments_count} students enrolled
                            </p>
                            <button
                                onClick={() => handleEnrollCourse(course.id)}
                                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                            >
                                🎓 Enroll Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <AppShell>
            <Head title="LMS Dashboard" />
            
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Welcome back, {user.name}! 👋
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {user.role === 'administrator' && 'Manage your learning management system'}
                        {user.role === 'instructor' && 'Create and manage your courses'}
                        {user.role === 'student' && 'Continue your learning journey'}
                    </p>
                </div>

                {user.role === 'administrator' && renderAdministratorDashboard()}
                {user.role === 'instructor' && renderInstructorDashboard()}
                {user.role === 'student' && renderStudentDashboard()}
            </div>
        </AppShell>
    );
}