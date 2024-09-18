import Link from 'next/link';

export default function NutritionPlan() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">Your Personalized Nutrition Plan</h1>
      <p className="text-xl mb-8 text-center text-foreground opacity-80">Custom meal plans based on your dietary preferences and fitness goals.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Meal Plans</h2>
          <p className="text-foreground opacity-70 mb-4">Access your personalized daily meal plans and recipes.</p>
          <Link href="#" className="text-primary hover:text-primary-dark transition-colors">View Today's Meals →</Link>
        </div>
        <div className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Nutrition Tracking</h2>
          <p className="text-foreground opacity-70 mb-4">Log your meals and track your nutritional intake.</p>
          <Link href="#" className="text-primary hover:text-primary-dark transition-colors">Log Meals →</Link>
        </div>
        <div className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Recipe Database</h2>
          <p className="text-foreground opacity-70 mb-4">Explore a variety of healthy recipes tailored to your preferences.</p>
          <Link href="#" className="text-primary hover:text-primary-dark transition-colors">Browse Recipes →</Link>
        </div>
        <div className="bg-secondary bg-opacity-20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4 text-primary">Nutritional Education</h2>
          <p className="text-foreground opacity-70 mb-4">Learn about nutrition basics and how to make healthier choices.</p>
          <Link href="#" className="text-primary hover:text-primary-dark transition-colors">Learn More →</Link>
        </div>
      </div>
    </div>
  )
}