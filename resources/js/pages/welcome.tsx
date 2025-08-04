import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

interface Props {
    stats?: {
        courses: number;
        instructors: number;
        students: number;
    };
    [key: string]: unknown;
}

export default function Welcome({ stats }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="LMS - Learning Management System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-6 text-gray-900 lg:justify-center lg:p-8 dark:from-gray-900 dark:to-gray-800 dark:text-gray-100">
                <header className="mb-8 w-full max-w-6xl">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">📚</span>
                            </div>
                            <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">LMS</span>
                        </div>
                        <div className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-4 py-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200 dark:text-indigo-400 dark:hover:text-indigo-300"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                <div className="w-full max-w-6xl">
                    <main className="text-center">
                        {/* Hero Section */}
                        <div className="mb-16">
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                📚 Learning Management System
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                                Empower education with our comprehensive LMS platform. Create courses, manage students, and track progress all in one place.
                            </p>
                            {!auth.user && (
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Link
                                        href={route('register')}
                                        className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white font-semibold text-lg rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                                    >
                                        🚀 Start Learning Today
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="inline-flex items-center px-8 py-4 border-2 border-indigo-600 text-indigo-600 font-semibold text-lg rounded-lg hover:bg-indigo-50 transition-colors duration-200 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-gray-800"
                                    >
                                        👋 Welcome Back
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                <div className="text-4xl mb-4">👨‍💼</div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">For Administrators</h3>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                                    <li>✅ Manage all users and roles</li>
                                    <li>✅ Oversee all courses</li>
                                    <li>✅ Monitor system-wide progress</li>
                                    <li>✅ Generate comprehensive reports</li>
                                </ul>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                <div className="text-4xl mb-4">👩‍🏫</div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">For Instructors</h3>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                                    <li>✅ Create engaging courses</li>
                                    <li>✅ Upload videos, PDFs, presentations</li>
                                    <li>✅ Build assessments with images</li>
                                    <li>✅ Track student performance</li>
                                </ul>
                            </div>

                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                <div className="text-4xl mb-4">👨‍🎓</div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">For Students</h3>
                                <ul className="text-gray-600 dark:text-gray-300 space-y-2">
                                    <li>✅ Enroll in courses</li>
                                    <li>✅ Access learning materials</li>
                                    <li>✅ Take pre & post assessments</li>
                                    <li>✅ View progress and grades</li>
                                </ul>
                            </div>
                        </div>

                        {/* Stats Section */}
                        {stats && (
                            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-16">
                                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Platform Statistics</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                            {stats.courses}
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-300">Active Courses</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                            {stats.instructors}
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-300">Expert Instructors</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                            {stats.students}
                                        </div>
                                        <div className="text-gray-600 dark:text-gray-300">Enrolled Students</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Key Features */}
                        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white">
                            <h2 className="text-3xl font-bold mb-6">🎯 Key Features</h2>
                            <div className="grid md:grid-cols-2 gap-6 text-left">
                                <div>
                                    <h4 className="font-semibold mb-2">📹 Rich Content Support</h4>
                                    <p className="text-indigo-100">Upload videos, PDFs, PowerPoint presentations, and documents</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">📝 Advanced Assessments</h4>
                                    <p className="text-indigo-100">Create multiple-choice questions with image support</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">📊 Progress Tracking</h4>
                                    <p className="text-indigo-100">Real-time progress monitoring and detailed analytics</p>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">🗓️ Schedule Management</h4>
                                    <p className="text-indigo-100">Set training schedules and manage course timelines</p>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>

                <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
                    <p>Built with ❤️ by <a href="https://app.build" target="_blank" className="text-indigo-600 hover:underline dark:text-indigo-400">app.build</a></p>
                </footer>
            </div>
        </>
    );
}