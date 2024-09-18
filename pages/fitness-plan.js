import Link from 'next/link';

export default function FitnessPlan() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Your Personalized Fitness Plan</h1>
      <p className="text-xl mb-8 text-center text-foreground opacity-80">AI-generated workout routines tailored to your goals and progress.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Workout Routines</h2>
          <p className="text-foreground opacity-70 mb-4">Access your personalized daily workout routines.</p>
          <Link href="#" className="text-primary hover:text-primary-dark transition-colors">View Today's Workout →</Link>
        </div>
        <div className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Exercise Library</h2>
          <p className="text-foreground opacity-70 mb-4">Explore our comprehensive library of exercises with video tutorials.</p>
          <Link href="#" className="text-primary hover:text-primary-dark transition-colors">Browse Exercises →</Link>
        </div>
        <div className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Goal Setting</h2>
          <p className="text-foreground opacity-70 mb-4">Set and track your fitness goals to stay motivated.</p>
          <Link href="#" className="text-primary hover:text-primary-dark transition-colors">Update Goals →</Link>
        </div>
        <div className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">AI Recommendations</h2>
          <p className="text-foreground opacity-70 mb-4">Get AI-powered suggestions to optimize your fitness routine.</p>
          <Link href="#" className="text-primary hover:text-primary-dark transition-colors">View Recommendations →</Link>
        </div>
      </div>
    </div>
  )
}