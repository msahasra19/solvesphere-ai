'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Search,
  Filter,
  TrendingUp,
  Clock,
  Star,
  Users,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  ChevronDown,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('trending');
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const categories = [
    'All',
    'AI/ML',
    'Web Development',
    'Mobile',
    'Blockchain',
    'IoT',
    'Cybersecurity',
    'DevOps',
    'Data Science',
  ];

  const problems = [
    {
      id: 1,
      title: 'AI-Powered Code Review Automation',
      description: 'Automate code review process using AI to detect bugs, security vulnerabilities, and suggest improvements in real-time.',
      category: 'AI/ML',
      difficulty: 'Medium',
      tags: ['AI', 'Code Review', 'Automation', 'DevOps'],
      opportunityScore: {
        overall: 92,
        startupPotential: 88,
        marketDemand: 95,
        technicalDifficulty: 75,
        monetizationChances: 90,
        innovationLevel: 85,
      },
      solutions: 15,
      upvotes: 234,
      views: 1520,
      isSolved: true,
      isHighPotential: true,
      submittedBy: 'Sarah Chen',
      timeAgo: '2 days ago',
    },
    {
      id: 2,
      title: 'Real-time Collaborative Whiteboard',
      description: 'Build a collaborative whiteboard with real-time synchronization, drawing tools, and video chat integration for remote teams.',
      category: 'Web Development',
      difficulty: 'Hard',
      tags: ['WebRTC', 'Real-time', 'Collaboration', 'Canvas'],
      opportunityScore: {
        overall: 88,
        startupPotential: 85,
        marketDemand: 92,
        technicalDifficulty: 80,
        monetizationChances: 88,
        innovationLevel: 82,
      },
      solutions: 8,
      upvotes: 189,
      views: 980,
      isSolved: true,
      isHighPotential: true,
      submittedBy: 'Marcus Rodriguez',
      timeAgo: '5 days ago',
    },
    {
      id: 3,
      title: 'Blockchain-based Supply Chain Tracking',
      description: 'Create a transparent supply chain tracking system using blockchain to verify product authenticity and track shipments.',
      category: 'Blockchain',
      difficulty: 'Expert',
      tags: ['Blockchain', 'Smart Contracts', 'Supply Chain', 'Ethereum'],
      opportunityScore: {
        overall: 95,
        startupPotential: 98,
        marketDemand: 90,
        technicalDifficulty: 95,
        monetizationChances: 95,
        innovationLevel: 92,
      },
      solutions: 5,
      upvotes: 312,
      views: 2100,
      isSolved: false,
      isHighPotential: true,
      submittedBy: 'Dr. Emily Watson',
      timeAgo: '1 week ago',
    },
    {
      id: 4,
      title: 'Smart Home Energy Optimization',
      description: 'Develop an IoT system that optimizes home energy consumption using ML to predict usage patterns and automate devices.',
      category: 'IoT',
      difficulty: 'Medium',
      tags: ['IoT', 'Machine Learning', 'Energy', 'Automation'],
      opportunityScore: {
        overall: 85,
        startupPotential: 82,
        marketDemand: 88,
        technicalDifficulty: 70,
        monetizationChances: 85,
        innovationLevel: 80,
      },
      solutions: 12,
      upvotes: 156,
      views: 750,
      isSolved: true,
      isHighPotential: false,
      submittedBy: 'Alex Kumar',
      timeAgo: '3 days ago',
    },
    {
      id: 5,
      title: 'Zero-Knowledge Authentication System',
      description: 'Implement a privacy-preserving authentication system using zero-knowledge proofs for secure user verification.',
      category: 'Cybersecurity',
      difficulty: 'Expert',
      tags: ['Cryptography', 'Security', 'Privacy', 'Authentication'],
      opportunityScore: {
        overall: 90,
        startupPotential: 87,
        marketDemand: 85,
        technicalDifficulty: 98,
        monetizationChances: 88,
        innovationLevel: 95,
      },
      solutions: 3,
      upvotes: 278,
      views: 1650,
      isSolved: false,
      isHighPotential: true,
      submittedBy: 'James Park',
      timeAgo: '4 days ago',
    },
    {
      id: 6,
      title: 'AI-Powered Mental Health Chatbot',
      description: 'Create an empathetic AI chatbot that provides mental health support, mood tracking, and connects users with professionals.',
      category: 'AI/ML',
      difficulty: 'Hard',
      tags: ['AI', 'Healthcare', 'NLP', 'Mental Health'],
      opportunityScore: {
        overall: 93,
        startupPotential: 95,
        marketDemand: 98,
        technicalDifficulty: 85,
        monetizationChances: 90,
        innovationLevel: 88,
      },
      solutions: 7,
      upvotes: 445,
      views: 3200,
      isSolved: true,
      isHighPotential: true,
      submittedBy: 'Dr. Lisa Chen',
      timeAgo: '1 day ago',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        return 'success';
      case 'medium':
        return 'warning';
      case 'hard':
        return 'danger';
      case 'expert':
        return 'secondary';
      default:
        return 'primary';
    }
  };

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
              <a href="/" className="text-dark-300 hover:text-primary-400 transition-colors">Home</a>
              <a href="/explore" className="text-primary-400 font-semibold">Explore</a>
              <a href="/marketplace" className="text-dark-300 hover:text-primary-400 transition-colors">Marketplace</a>
              <a href="/dashboard" className="text-dark-300 hover:text-primary-400 transition-colors">Dashboard</a>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">Sign In</Button>
              <Button variant="primary" size="sm">Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-12">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="heading-1 mb-4">
              Explore <span className="gradient-text">Problems</span>
            </h1>
            <p className="text-xl text-dark-300 max-w-2xl mx-auto">
              Discover real-world problems, find solutions, or convert them into your next project
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <input
                  type="text"
                  className="flex-1 bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-3 pl-12 text-dark-100 placeholder-dark-400 focus:outline-none focus:border-primary-500 transition-colors"
                  placeholder="Search for solutions or problems..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </div>
              <Button
                variant="primary"
                leftIcon={<Search className="w-4 h-4" />}
                onClick={handleSearch}
              >
                Search
              </Button>
              <Button variant="outline" leftIcon={<Filter className="w-4 h-4" />}>
                Filters
              </Button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category.toLowerCase())}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.toLowerCase()
                      ? 'bg-primary-500 text-white'
                      : 'bg-dark-800/50 text-dark-300 hover:bg-dark-700/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center justify-between">
              <div className="text-dark-400">
                Showing <span className="text-white font-semibold">{problems.length}</span> problems
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-dark-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-2 text-sm text-dark-100 focus:outline-none focus:border-primary-500"
                  aria-label="Sort problems by"
                >
                  <option value="trending">Trending</option>
                  <option value="recent">Most Recent</option>
                  <option value="popular">Most Popular</option>
                  <option value="opportunity">Highest Opportunity</option>
                  <option value="unsolved">Unsolved First</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Grid */}
      <section className="pb-20">
        <div className="container-custom">
          <div className="grid gap-6">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden">
                  {problem.isHighPotential && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="warning" size="sm">
                        <Zap className="w-3 h-3 mr-1" />
                        High Potential
                      </Badge>
                    </div>
                  )}

                  <div className="flex gap-6">
                    {/* Opportunity Score */}
                    <div className="flex-shrink-0 text-center">
                      <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary-500/20 to-secondary-500/20 border border-primary-500/30 flex items-center justify-center mb-2">
                        <div>
                          <div className="text-3xl font-bold gradient-text">
                            {problem.opportunityScore.overall}
                          </div>
                          <div className="text-xs text-dark-400">AI Score</div>
                        </div>
                      </div>
                      <div className="space-y-1 text-xs">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-dark-400">Startup:</span>
                          <span className="font-semibold text-primary-400">
                            {problem.opportunityScore.startupPotential}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-dark-400">Demand:</span>
                          <span className="font-semibold text-success-400">
                            {problem.opportunityScore.marketDemand}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-dark-400">Difficulty:</span>
                          <span className="font-semibold text-warning-400">
                            {problem.opportunityScore.technicalDifficulty}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 
                            className="text-xl font-bold mb-2 hover:text-primary-400 cursor-pointer transition-colors"
                            onClick={() => router.push(`/problems/${problem.id}`)}
                          >
                            {problem.title}
                          </h3>
                          <p className="text-dark-300 mb-3 line-clamp-2">
                            {problem.description}
                          </p>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="primary" size="sm">
                          {problem.category}
                        </Badge>
                        <Badge variant={getDifficultyColor(problem.difficulty) as any} size="sm">
                          {problem.difficulty}
                        </Badge>
                        {problem.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="info" size="sm">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-dark-400">
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            <span>{problem.solutions} Solutions</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            <span>{problem.upvotes} Upvotes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{problem.views} Views</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{problem.timeAgo}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {problem.isSolved ? (
                            <Badge variant="success" size="sm">
                              <Star className="w-3 h-3 mr-1" />
                              Solved
                            </Badge>
                          ) : (
                            <Badge variant="warning" size="sm">
                              Unsolved
                            </Badge>
                          )}
                          <Button
                            variant="primary"
                            size="sm"
                            rightIcon={<ArrowRight className="w-3 h-3" />}
                            onClick={() => router.push(`/problems/${problem.id}`)}
                          >
                            Explore
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" rightIcon={<ChevronDown className="w-4 h-4" />}>
              Load More Problems
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

// Made with Bob
