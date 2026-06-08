import React from 'react';
import { BookOpen, CheckCircle, Clock, Zap, Star } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-6 text-indigo-600">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);

const PricingCard = ({ plan, price, features, recommended, onSelect }) => (
  <div className={`p-8 rounded-3xl border ${recommended ? 'border-indigo-600 shadow-xl' : 'border-gray-200 shadow-sm'} bg-white relative`}>
    {recommended && (
      <span className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-4 py-1 rounded-bl-xl rounded-tr-3xl uppercase tracking-wider">
        Most Popular
      </span>
    )}
    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan}</h3>
    <div className="mb-6">
      <span className="text-4xl font-extrabold text-gray-900">{price}</span>
      <span className="text-gray-500 ml-2">/semester</span>
    </div>
    <ul className="space-y-4 mb-8">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-center text-gray-600">
          <CheckCircle className="text-emerald-500 mr-3 shrink-0" size={20} />
          <span>{feature}</span>
        </li>
      ))}
    </ul>
    <button 
      onClick={onSelect}
      className={`w-full py-4 rounded-xl font-bold transition ${recommended ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}
    >
      Choose {plan}
    </button>
  </div>
);

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="w-full">
      {/* Navbar */}
      <nav className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-indigo-600 p-2 rounded-lg">
            <BookOpen className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-gray-900 tracking-tight">Study Buddy AI</span>
        </div>
        <div className="hidden md:flex items-center space-x-8 text-gray-600 font-medium">
          <a href="#features" className="hover:text-indigo-600 transition">Features</a>
          <a href="#pricing" className="hover:text-indigo-600 transition">Pricing</a>
          <button 
            onClick={onGetStarted}
            className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-8 tracking-tight">
          Master Your Courses with <span className="text-indigo-600">Study Buddy AI</span>
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Upload your lecture notes, slides, or textbooks. Get personalized study guides, practice quizzes, and schedules in seconds.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
          <button 
            onClick={onGetStarted}
            className="w-full md:w-auto bg-indigo-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
          >
            Start Studying for Free
          </button>
          <button className="w-full md:w-auto bg-white text-gray-900 border border-gray-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition">
            View Sample Guide
          </button>
        </div>
        <div className="mt-20 flex items-center justify-center space-x-1 text-emerald-500 font-medium">
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
          <Star size={20} fill="currentColor" />
          <span className="text-gray-600 ml-3">Trusted by 10,000+ students</span>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything you need to ace your finals</h2>
            <p className="text-gray-600 text-lg">Powerful AI features designed specifically for academic success.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Zap}
              title="Instant Study Guides"
              description="Turn messy lecture notes and long textbooks into structured, easy-to-read study guides automatically."
            />
            <FeatureCard 
              icon={CheckCircle}
              title="AI Practice Quizzes"
              description="Test your knowledge with custom quizzes generated from your own materials. Get instant feedback."
            />
            <FeatureCard 
              icon={Clock}
              title="Smart Scheduling"
              description="Our AI plans your study sessions based on your exam dates and content complexity."
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, transparent pricing</h2>
          <p className="text-gray-600 text-lg">Invest in your academic future today.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <PricingCard 
            plan="Basic"
            price="Free"
            features={[
              "3 file uploads per month",
              "Standard AI study guides",
              "10 practice quiz questions",
              "Community support"
            ]}
            onSelect={onGetStarted}
          />
          <PricingCard 
            recommended
            plan="Premium"
            price="$49"
            features={[
              "Unlimited file uploads",
              "Advanced concept explanations",
              "Unlimited practice quizzes",
              "Personalized study scheduling",
              "Priority AI processing"
            ]}
            onSelect={onGetStarted}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <BookOpen className="text-indigo-600" size={20} />
            <span className="text-xl font-bold text-gray-900 tracking-tight">Study Buddy AI</span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2026 Study Buddy AI. Helping students learn faster, not harder.
          </p>
        </div>
      </footer>
    </div>
  );
}
