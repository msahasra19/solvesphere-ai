'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Sparkles, 
  TrendingUp, 
  Users, 
  Zap, 
  Target,
  ArrowRight,
  CheckCircle,
  Star,
  Rocket,
  Brain,
  Code,
  BarChart3
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { label: 'Problems Solved', value: '10K+', icon: CheckCircle },
    { label: 'Active Users', value: '50K+', icon: Users },
    { label: 'Solutions Verified', value: '25K+', icon: Star },
    { label: 'Success Rate', value: '94%', icon: TrendingUp },
  ];

  const trendingProblems = [
    {
      title: 'AI-Powered Code Review Automation',
      category: 'AI/ML',
      difficulty: 'Medium',
      opportunityScore: 92,
      solutions: 15,
    },
    {
      title: 'Real-time Collaborative Whiteboard',
      category: 'Web Development',
      difficulty: 'Hard',
      opportunityScore: 88,
      solutions: 8,
    },
    {
      title: 'Blockchain-based Supply Chain Tracking',
      category: 'Blockchain',
      difficulty: 'Expert',
      opportunityScore: 95,
      solutions: 5,
    },
    {
      title: 'Smart Home Energy Optimization',
      category: 'IoT',
      difficulty: 'Medium',
      opportunityScore: 85,
      solutions: 12,
    },
  ];

  const topSolutions = [
    {
      title: 'GitHub Copilot',
      type: 'AI Tool',
      rating: 4.8,
      workedForMe: 92,
      pricing: 'Paid',
    },
    {
      title: 'Vercel',
      type: 'Platform',
      rating: 4.9,
      workedForMe: 96,
      pricing: 'Freemium',
    },
    {
      title: 'Supabase',
      type: 'Backend',
      rating: 4.7,
      workedForMe: 89,
      pricing: 'Freemium',
    },
  ];

  const features = [
    {
      icon: Brain,
      title: 'AI Problem Analysis',
      description: 'Deep AI analysis of problems with opportunity scoring and market insights',
    },
    {
      icon: Search,
      title: 'Smart Search Engine',
      description: 'Find solutions, tools, and workflows tailored to your specific needs',
    },
    {
      icon: Target,
      title: 'Verified Solutions',
      description: 'Community-verified solutions with real implementation proof and success rates',
    },
    {
      icon: Rocket,
      title: 'Project Generator',
      description: 'Convert problems into startup ideas, projects, and research opportunities',
    },
    {
      icon: Code,
      title: 'Developer Tools',
      description: 'Compare frameworks, APIs, and tools with AI-powered recommendations',
    },
    {
      icon: BarChart3,
      title: 'Market Analytics',
      description: 'Real-time trends, demand analysis, and business potential scoring',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Startup Founder',
      avatar: '👩‍💼',
      text: 'SolveSphere helped me validate my startup idea and find the perfect tech stack. The AI opportunity score was spot on!',
    },
    {
      name: 'Marcus Rodriguez',
      role: 'Full Stack Developer',
      avatar: '👨‍💻',
      text: 'Best platform for discovering solutions. Saved me weeks of research and helped me build my portfolio project.',
    },
    {
      name: 'Dr. Emily Watson',
      role: 'AI Researcher',
      avatar: '👩‍🔬',
      text: 'The problem marketplace is brilliant. Found several research opportunities that turned into published papers.',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-950/80 backdrop-blur-lg border-b border-dark-800">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-primary-400" />
              <span className="text-2xl font-bold gradient-text">SolveSphere AI</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-primary-400 transition-colors">Features</a>
              <a href="/explore" className="text-gray-300 hover:text-primary-400 transition-colors">Explore</a>
              <a href="#solutions" className="text-gray-300 hover:text-primary-400 transition-colors">Solutions</a>
              <a href="/dashboard" className="text-gray-300 hover:text-primary-400 transition-colors">Dashboard</a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/login">
                <Button variant="ghost" size="sm">Sign In</Button>
              </a>
              <a href="/signup">
                <Button variant="primary" size="sm">Get Started</Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/10 via-transparent to-transparent"></div>
        
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="primary" className="mb-6">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Problem Solving Platform
            </Badge>
            
            <h1 className="heading-1 mb-6 text-white text-5xl md:text-7xl font-extrabold tracking-tight">
              Find Real Problems. <br />
              Discover Real Solutions. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-500 animate-pulse">
                Build What Actually Matters.
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
              Explore verified solutions, discover unsolved opportunities, and transform real-world problems into projects, startups, and innovation.
            </p>

            {/* Animated Search Bar */}
            <div className="max-w-3xl mx-auto mb-8 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-dark-900 ring-1 ring-dark-700/50 rounded-2xl">
                <Input
                  variant="glass"
                  placeholder="Search any problem... (e.g., 'automate code reviews with AI')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="w-5 h-5 text-primary-400" />}
                  className="text-lg py-5 pr-32 bg-transparent border-none focus:ring-0 rounded-2xl text-white"
                />
                <Button
                  variant="primary"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-primary-500 to-secondary-500 border-none shadow-[0_0_15px_rgba(var(--primary-500),0.5)]"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => {
                    if (searchQuery.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                    } else {
                      window.location.href = '/explore';
                    }
                  }}
                >
                  Search Intelligence
                </Button>
              </div>
              <p className="text-sm text-gray-400 mt-4 font-medium flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-warning-400" />
                Try: "AI chatbot for customer support" or "blockchain voting system"
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                variant="outline"
                leftIcon={<Brain className="w-4 h-4" />}
                onClick={() => {
                  const chatButton = document.querySelector('[aria-label="Open AI chat assistant"]') as HTMLButtonElement;
                  if (chatButton) chatButton.click();
                }}
              >
                AI Assistant
              </Button>
              <a href="/marketplace">
                <Button variant="outline" leftIcon={<Target className="w-4 h-4" />}>
                  Problem Marketplace
                </Button>
              </a>
              <a href="/explore">
                <Button variant="outline" leftIcon={<Code className="w-4 h-4" />}>
                  Compare Tools
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-dark-900/50">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <Badge variant="primary" className="mb-4">Features</Badge>
            <h2 className="heading-2 mb-4 text-white">Everything You Need to Solve Problems</h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              AI-powered tools and insights to help you discover, analyze, and implement solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" className="h-full">
                  <feature.icon className="w-12 h-12 text-primary-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Problems Section */}
      <section id="problems" className="section bg-dark-900/30">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <div>
              <Badge variant="warning" className="mb-4">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending Now
              </Badge>
              <h2 className="heading-2 text-white">High-Potential Problems</h2>
            </div>
            <a href="/explore">
              <Button variant="outline" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All
              </Button>
            </a>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {trendingProblems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-2 text-white">{problem.title}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="primary" size="sm">{problem.category}</Badge>
                        <Badge variant="warning" size="sm">{problem.difficulty}</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold gradient-text">{problem.opportunityScore}</div>
                      <div className="text-xs text-gray-400">AI Score</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{problem.solutions} Solutions</span>
                    <a href="/explore">
                      <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3 h-3" />}>
                        Explore
                      </Button>
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Solutions Section */}
      <section id="solutions" className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="success" className="mb-4">
              <Star className="w-3 h-3 mr-1" />
              Top Rated
            </Badge>
            <h2 className="heading-2 text-white">Verified Solutions</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {topSolutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="gradient">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">{solution.title}</h3>
                    <Badge variant="info" size="sm">{solution.pricing}</Badge>
                  </div>
                  <p className="text-gray-300 mb-4">{solution.type}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning-400 fill-warning-400" />
                      <span className="font-semibold">{solution.rating}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-success-400 font-semibold">{solution.workedForMe}%</span>
                      <span className="text-gray-400"> success rate</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section bg-dark-900/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Testimonials</Badge>
            <h2 className="heading-2 text-white">Loved by Developers & Founders</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{testimonial.avatar}</div>
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-300">{testimonial.text}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section">
        <div className="container-custom">
          <Card variant="gradient" className="text-center p-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Rocket className="w-16 h-16 text-primary-400 mx-auto mb-6" />
              <h2 className="heading-2 mb-4 text-white">Ready to Solve Problems?</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of developers, founders, and researchers using SolveSphere AI 
                to discover solutions and build the future.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/signup">
                  <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                    Get Started Free
                  </Button>
                </a>
                <a href="/explore">
                  <Button variant="outline" size="lg">
                    Explore Solutions
                  </Button>
                </a>
              </div>
            </motion.div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900/50 border-t border-dark-800 py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Sparkles className="w-6 h-6 text-primary-400" />
                <span className="text-xl font-bold gradient-text">SolveSphere AI</span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered platform for discovering solutions and building the future.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">API</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-primary-400 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-primary-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary-400 transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-dark-800 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 SolveSphere AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Made with Bob
