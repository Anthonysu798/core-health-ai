import Link from 'next/link';

export default function Progress() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Your Progress</h1>
      <p className="text-xl mb-8 text-center text-foreground opacity-80">Track your fitness journey and see how far you've come.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Fitness Metrics</h2>
          <p className="text-foreground opacity-70 mb-4">View your key fitness metrics and progress over time.</p>
          <Link href="#" className="text-primary hover:text-primary-dark transition-colors">See Metrics →</Link>
        </div>
        <div className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Body Composition</h2>
          <p className="text-foreground opacity-70 mb-4">Track changes in your body composition and measurements.</p>
          <Link href="#" className="text-primary hover:text-primary-dark transition-colors">Update Measurements →</Link>
        </div>
        <div className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Goal Achievement</h2>
          <p className="text-foreground opacity-70 mb-4">Monitor your progress towards your fitness and nutrition goals.</p>
          <Link href="#" className="text-primary hover:text-primary-dark transition-colors">Check Goals →</Link>
        </div>
        <div className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Progress Reports</h2>
          <p className="text-foreground opacity-70 mb-4">Generate detailed reports on your overall progress and achievements.</p>
          <Link href="#" className="text-primary hover:text-primary-dark transition-colors">Generate Report →</Link>
        </div>
      </div>
    </div>
  )
}