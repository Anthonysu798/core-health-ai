import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from 'next/link';

// You'll need to create these components
import ProgressChart from '../components/ProgressChart';
import ActivityFeed from '../components/ActivityFeed';
import UpcomingWorkouts from '../components/UpcomingWorkouts';
import NutritionSummary from '../components/NutritionSummary';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      fetchUserStats();
    }
  }, [status, router]);

  const fetchUserStats = async () => {
    // This is where you'd fetch the user's stats from your API
    // For now, we'll use dummy data
    setUserStats({
      currentStreak: 5,
      totalWorkouts: 23,
      caloriesBurned: 4500,
      weightLost: 2.5
    });
    setLoading(false);
  };

  if (status === "loading" || loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome back, {session.user.name}!</h1>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {Object.entries(userStats).map(([key, value]) => (
              <div key={key} className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {key.split(/(?=[A-Z])/).join(" ")}
                  </dt>
                  <dd className="mt-1 text-3xl font-semibold text-gray-900">
                    {value}
                  </dd>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            {/* Progress Chart */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Your Progress</h2>
                <ProgressChart />
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
                <ActivityFeed />
              </div>
            </div>

            {/* Upcoming Workouts */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Upcoming Workouts</h2>
                <UpcomingWorkouts />
              </div>
            </div>

            {/* Nutrition Summary */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Nutrition Summary</h2>
                <NutritionSummary />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <Link href="/start-workout" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-center transition duration-300">
                Start Workout
              </Link>
              <Link href="/log-meal" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center transition duration-300">
                Log Meal
              </Link>
              <Link href="/set-goal" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center transition duration-300">
                Set New Goal
              </Link>
              <Link href="/connect-device" className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded text-center transition duration-300">
                Connect Device
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session }
  };
}