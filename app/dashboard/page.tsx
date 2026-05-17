'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  TrendingUp,
  Star,
  Bookmark,
  Code,
  Award,
  Target,
  Zap,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData, setUserData] = useState<any>(null);
  const [projectIdeas, setProjectIdeas] = useState<any[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  // Load user data from localStorage and fetch projects
  React.useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setUserData(JSON.parse(user));
    }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/problems?limit=4&sortBy=opportunity');
      const data = await res.json();
      if (data.success) {
        setProjectIdeas(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const userStats = {
    reputation: userData?.reputation || 0,
    rank: userData?.role === 'student' ? 'Student' : userData?.role === 'developer' ? 'Developer' : 'User',
    problemsSolved: 0,
    solutionsSubmitted: 0,
    upvotesReceived: 0,
    badges: ['New Member'],
  };

  const savedSolutions = [
    {
      id: 1,
      title: 'GitHub Copilot',
      type: 'AI Tool',
      rating: 4.8,
      category: 'Development',
      savedDate: '2 days ago',
    },
    {
      id: 2,
      title: 'Vercel',
      type: 'Platform',
      rating: 4.9,
      category: 'Deployment',
      savedDate: '5 days ago',
    },
    {
      id: 3,
      title: 'Supabase',
      type: 'Backend',
      rating: 4.7,
      category: 'Database',
      savedDate: '1 week ago',
    },
  ];

  // Removed hardcoded projectIdeas

  const recentActivity = [
    {
      type: 'solution',
      action: 'submitted a solution to',
      problem: 'AI-Powered Code Review',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-success-400',
    },
    {
      type: 'upvote',
      action: 'received 15 upvotes on',
      problem: 'Blockchain Supply Chain',
      time: '5 hours ago',
      icon: TrendingUp,
      color: 'text-primary-400',
    },
    {
      type: 'badge',
      action: 'earned the badge',
      problem: 'Top Contributor',
      time: '1 day ago',
      icon: Award,
      color: 'text-warning-400',
    },
    {
      type: 'save',
      action: 'saved',
      problem: 'GitHub Copilot',
      time: '2 days ago',
      icon: Bookmark,
      color: 'text-secondary-400',
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'saved', label: 'Saved Solutions', icon: Bookmark },
    { id: 'projects', label: 'Project Ideas', icon: Code },
    { id: 'activity', label: 'Activity', icon: Clock },
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
              <a href="/" className="text-dark-300 hover:text-primary-400 transition-colors">Home</a>
              <a href="/explore" className="text-dark-300 hover:text-primary-400 transition-colors">Explore</a>
              <a href="/marketplace" className="text-dark-300 hover:text-primary-400 transition-colors">Marketplace</a>
              <a href="/dashboard" className="text-primary-400 font-semibold">Dashboard</a>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/profile">
                <Button variant="ghost" size="sm">Profile</Button>
              </a>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('user');
                  window.location.href = '/';
                }}
              >
                Logout
              </Button>
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
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="heading-1 mb-2">
                Welcome back, <span className="gradient-text">{userData?.name || 'User'}</span>
              </h1>
              <p className="text-dark-300 text-lg">
                Track your progress, manage solutions, and discover new opportunities
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold gradient-text mb-1">{userStats.reputation}</div>
              <div className="text-sm text-dark-400">Reputation Points</div>
              <Badge variant="warning" className="mt-2">
                <Award className="w-3 h-3 mr-1" />
                {userStats.rank}
              </Badge>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <Card variant="glass">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-success-500/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{userStats.problemsSolved}</div>
                  <div className="text-sm text-dark-400">Problems Solved</div>
                </div>
              </div>
            </Card>

            <Card variant="glass">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{userStats.solutionsSubmitted}</div>
                  <div className="text-sm text-dark-400">Solutions Submitted</div>
                </div>
              </div>
            </Card>

            <Card variant="glass">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-warning-500/20 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-warning-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{userStats.upvotesReceived}</div>
                  <div className="text-sm text-dark-400">Upvotes Received</div>
                </div>
              </div>
            </Card>

            <Card variant="glass">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary-500/20 flex items-center justify-center">
                  <Award className="w-6 h-6 text-secondary-400" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{userStats.badges.length}</div>
                  <div className="text-sm text-dark-400">Badges Earned</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-800/50 text-dark-300 hover:bg-dark-700/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'overview' && (
              <div className="grid md:grid-cols-2 gap-6">
                {/* Badges */}
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">Your Badges</h3>
                    <Award className="w-5 h-5 text-warning-400" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {userStats.badges.map((badge, index) => (
                      <Badge key={index} variant="warning" size="md">
                        <Star className="w-3 h-3 mr-1" />
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <a href="/explore" className="block w-full">
                      <Button variant="primary" className="w-full" leftIcon={<Target className="w-4 h-4" />}>
                        Explore New Problems
                      </Button>
                    </a>
                    <a href="/marketplace" className="block w-full">
                      <Button variant="outline" className="w-full" leftIcon={<Code className="w-4 h-4" />}>
                        Find Projects to Build
                      </Button>
                    </a>
                    <a href="/marketplace" className="block w-full">
                      <Button variant="outline" className="w-full" leftIcon={<Zap className="w-4 h-4" />}>
                        Browse Marketplace
                      </Button>
                    </a>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="grid md:grid-cols-3 gap-6">
                {savedSolutions.map((solution) => (
                  <Card key={solution.id}>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="primary" size="sm">{solution.type}</Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-warning-400 fill-warning-400" />
                        <span className="text-sm font-semibold">{solution.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{solution.title}</h3>
                    <p className="text-sm text-dark-400 mb-3">{solution.category}</p>
                    <div className="text-xs text-dark-500">Saved {solution.savedDate}</div>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="grid md:grid-cols-2 gap-6">
                {isLoadingProjects ? (
                  <div className="col-span-2 text-center text-dark-400 py-12">Loading project ideas...</div>
                ) : projectIdeas.length === 0 ? (
                  <div className="col-span-2 text-center text-dark-400 py-12">No project ideas found yet.</div>
                ) : projectIdeas.map((project) => (
                  <Card key={project._id}>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="warning" size="sm">{project.difficulty}</Badge>
                      <span className="text-sm text-dark-400">{project.category}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 truncate" title={project.title}>{project.title}</h3>
                    <p className="text-dark-300 mb-4 line-clamp-2" title={project.description}>{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags?.slice(0, 3).map((tech: string) => (
                        <Badge key={tech} variant="info" size="sm">{tech}</Badge>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-sm text-dark-400 mb-1">Complexity</div>
                        <div className="text-2xl font-bold text-success-400">{project.aiOpportunityScore?.technicalComplexity || 0}</div>
                      </div>
                      <div>
                        <div className="text-sm text-dark-400 mb-1">Business Potential</div>
                        <div className="text-2xl font-bold text-primary-400">{project.aiOpportunityScore?.startupPotential || 0}</div>
                      </div>
                    </div>
                    <a href={`/problems/${project._id}`} className="block w-full">
                      <Button variant="primary" className="w-full">Start Building</Button>
                    </a>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === 'activity' && (
              <Card>
                <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-4 pb-4 border-b border-dark-800 last:border-0">
                      <div className={`w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center ${activity.color}`}>
                        <activity.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-dark-200">
                          You <span className="text-dark-400">{activity.action}</span>{' '}
                          <span className="font-semibold text-white">{activity.problem}</span>
                        </p>
                        <p className="text-sm text-dark-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// Made with Bob
