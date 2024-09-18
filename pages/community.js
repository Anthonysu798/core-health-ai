import Link from 'next/link';

export default function Community() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Fitness Community</h1>
      <p className="text-xl mb-8 text-center text-foreground opacity-80">Connect with friends, join challenges, and stay motivated together.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Friend Connections</h2>
          <p className="text-foreground opacity-70 mb-4">Find and connect with friends who share your fitness goals.</p>
          <Link href="#" className="text-primary hover:text-primary-dark transition-colors">Find Friends →</Link>
        </div>
        <div className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Group Challenges</h2>
          <p className="text-foreground opacity-70 mb-4">Join or create group challenges to push your limits together.</p>
          <Link href="#" className="text-primary hover:text-primary-dark transition-colors">Explore Challenges →</Link>
        </div>
        <div className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Community Forums</h2>
          <p className="text-foreground opacity-70 mb-4">Discuss fitness topics, share tips, and get advice from the community.</p>
          <Link href="#" className="text-primary hover:text-primary-dark transition-colors">Join Discussions →</Link>
        </div>
        <div className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Virtual Events</h2>
          <p className="text-foreground opacity-70 mb-4">Participate in live virtual workouts and wellness sessions.</p>
          <Link href="#" className="text-primary hover:text-primary-dark transition-colors">View Upcoming Events →</Link>
        </div>
      </div>
    </div>
  )
}