'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Settings,
  Star,
  Activity,
  LogOut,
  Mail,
  Briefcase,
  MapPin,
  Calendar,
  Sparkles
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // In a real app, you would fetch the user from an API endpoint
    // For now, we mock the logged-in user experience based on local storage if available
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        // use default mock
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-dark-950/80 backdrop-blur-lg border-b border-dark-800">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-primary-400" />
              <span className="text-2xl font-bold gradient-text">SolveSphere AI</span>
            </a>
            <div className="flex items-center space-x-4">
              <a href="/explore">
                <Button variant="ghost" size="sm">Explore</Button>
              </a>
              <a href="/marketplace">
                <Button variant="ghost" size="sm">Marketplace</Button>
              </a>
              <a href="/dashboard">
                <Button variant="primary" size="sm">Dashboard</Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="pt-32 pb-20">
        <div className="container-custom max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Left Column: User Card */}
            <div className="md:col-span-1 space-y-6">
              <Card variant="gradient" className="p-8 text-center">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-tr from-primary-500 to-secondary-500 p-1 mb-4">
                  <div className="w-full h-full rounded-full bg-dark-800 flex items-center justify-center border-4 border-dark-950 overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-dark-300" />
                    )}
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-white mb-1">{user?.name || 'Alex Innovator'}</h2>
                <p className="text-primary-400 mb-4">{user?.role || 'Full-Stack Developer'}</p>
                
                <div className="flex justify-center gap-2 mb-6">
                  <Badge variant="primary">Next.js</Badge>
                  <Badge variant="secondary">AI/ML</Badge>
                  <Badge variant="info">Founding</Badge>
                </div>

                <div className="space-y-3 text-left mb-8">
                  <div className="flex items-center gap-3 text-dark-300">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user?.email || 'alex@solvesphere.ai'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-dark-300">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm">Available for Hackathons</span>
                  </div>
                  <div className="flex items-center gap-3 text-dark-300">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-3 text-dark-300">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Joined May 2024</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full" rightIcon={<Settings className="w-4 h-4" />}>
                    Edit Profile
                  </Button>
                  <Button variant="ghost" className="w-full text-danger-400 hover:text-danger-300 hover:bg-danger-400/10" onClick={handleLogout} rightIcon={<LogOut className="w-4 h-4" />}>
                    Log Out
                  </Button>
                </div>
              </Card>

              <Card variant="glass" className="p-6">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-secondary-400" />
                  Impact Stats
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-dark-300">Problems Solved</span>
                    <span className="font-bold text-white">4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-dark-300">Opportunities Found</span>
                    <span className="font-bold text-white">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-dark-300">Total Upvotes</span>
                    <span className="font-bold text-primary-400">342</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Activity */}
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
              
              <Card variant="glass" className="p-6 border-l-4 border-l-primary-500">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Saved Opportunity: Legacy Code Migration Tool</h3>
                    <p className="text-dark-300 text-sm mb-3">You generated a Startup Blueprint for this opportunity 2 days ago.</p>
                    <div className="flex gap-2">
                      <Badge variant="warning" size="sm">Expert Level</Badge>
                      <Badge variant="success" size="sm">High Revenue</Badge>
                    </div>
                  </div>
                  <a href="/problems/mock-1">
                    <Button variant="outline" size="sm">View</Button>
                  </a>
                </div>
              </Card>

              <Card variant="glass" className="p-6 border-l-4 border-l-secondary-500">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Submitted: Supply Chain Predictor</h3>
                    <p className="text-dark-300 text-sm mb-3">Your submitted problem has received 450 upvotes and 8 teams are building it.</p>
                    <div className="flex gap-2">
                      <Badge variant="info" size="sm">Trending</Badge>
                    </div>
                  </div>
                  <a href="/problems/mock-2">
                    <Button variant="outline" size="sm">View</Button>
                  </a>
                </div>
              </Card>

              <Card variant="glass" className="p-6 border-l-4 border-l-dark-700">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">Starred: Automated Regulatory Compliance</h3>
                    <p className="text-dark-300 text-sm mb-3">Added to your watchlist.</p>
                  </div>
                  <a href="/problems/mock-3">
                    <Button variant="outline" size="sm">View</Button>
                  </a>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
