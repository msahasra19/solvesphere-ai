'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  TrendingUp,
  Zap,
  DollarSign,
  Users,
  Target,
  ArrowRight,
  Plus,
  Filter,
  Search,
  Rocket,
  Brain,
  Clock,
  Briefcase,
  Trophy,
  ShieldCheck,
  Code,
  Activity,
  ChevronDown
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Badge from '@/components/ui/Badge';

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [problemTitle, setProblemTitle] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [githubRepo, setGithubRepo] = useState('');
  const [deploymentLink, setDeploymentLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);

  const [unsolvedProblems, setUnsolvedProblems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in
  React.useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const res = await fetch('/api/problems', { cache: 'no-store' });
      const data = await res.json();
      if (data.success) {
        setUnsolvedProblems(data.data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const handleSubmitProblem = async () => {
    if (!problemTitle.trim() || !problemDescription.trim()) {
      alert('Please fill in title and description');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/problems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: problemTitle,
          description: problemDescription,
          githubRepo: githubRepo.trim(),
          deploymentLink: deploymentLink.trim(),
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Problem submitted successfully!');
        setProblemTitle('');
        setProblemDescription('');
        setGithubRepo('');
        setDeploymentLink('');
        setShowSubmitModal(false);
        fetchProblems(); // Refresh the list
      } else {
        alert(data.error || 'Failed to submit problem');
      }
    } catch (error) {
      alert('An error occurred while submitting');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { name: 'All', count: 156, icon: <Activity className="w-4 h-4 mr-1" /> },
    { name: 'AI/ML', count: 45, icon: <Brain className="w-4 h-4 mr-1" /> },
    { name: 'SaaS', count: 23, icon: <Briefcase className="w-4 h-4 mr-1" /> },
    { name: 'Developer Tools', count: 34, icon: <Code className="w-4 h-4 mr-1" /> },
    { name: 'FinTech', count: 18, icon: <DollarSign className="w-4 h-4 mr-1" /> },
    { name: 'Healthcare', count: 29, icon: <ShieldCheck className="w-4 h-4 mr-1" /> },
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
              <a href="/marketplace" className="text-primary-400 font-semibold">Marketplace</a>
              <a href="/dashboard" className="text-dark-300 hover:text-primary-400 transition-colors">Dashboard</a>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-dark-300">Welcome, {user.name}!</span>
                  <Button variant="ghost" size="sm" onClick={handleLogout}>Logout</Button>
                  <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setShowSubmitModal(true)}>
                    Submit Opportunity
                  </Button>
                </>
              ) : (
                <>
                  <a href="/login"><Button variant="ghost" size="sm">Sign In</Button></a>
                  <a href="/signup"><Button variant="primary" size="sm">Sign Up</Button></a>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20"></div>
        <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-primary-500/10 to-transparent blur-3xl mix-blend-overlay"></div>
        
        <div className="container-custom relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <Badge variant="warning" className="mb-4 text-sm font-semibold tracking-wide uppercase px-4 py-1.5 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Rocket className="w-4 h-4 mr-2" />
              Discover High-Potential Opportunities
            </Badge>
            <h1 className="heading-1 mb-6 text-5xl md:text-6xl font-extrabold tracking-tight">
              Innovation Opportunity <span className="gradient-text">Ecosystem</span>
            </h1>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              Explore startup-worthy problems, validate market demand with AI intelligence, 
              and transform industry pain points into real-world, high-revenue solutions.
            </p>

            {/* Premium Ecosystem Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto p-6 rounded-2xl bg-dark-800/30 border border-dark-700/50 backdrop-blur-md">
              <div className="text-center p-4">
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-accent-400 mb-2">156</div>
                <div className="text-sm font-medium text-dark-400 uppercase tracking-wider">Startup Opportunities</div>
              </div>
              <div className="text-center p-4 border-l border-dark-700/50">
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-success-400 to-emerald-400 mb-2">$2.5M</div>
                <div className="text-sm font-medium text-dark-400 uppercase tracking-wider">Active Reward Pools</div>
              </div>
              <div className="text-center p-4 border-l border-dark-700/50">
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-warning-400 to-yellow-400 mb-2">3.2K</div>
                <div className="text-sm font-medium text-dark-400 uppercase tracking-wider">Developers Building</div>
              </div>
              <div className="text-center p-4 border-l border-dark-700/50">
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-secondary-400 to-purple-400 mb-2">89</div>
                <div className="text-sm font-medium text-dark-400 uppercase tracking-wider">Funded Startups</div>
              </div>
            </div>
          </motion.div>

          {/* Search and Advanced Filters */}
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative group">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-dark-400 group-focus-within:text-primary-400 transition-colors" />
                <input
                  type="text"
                  className="w-full bg-dark-900 border border-dark-700 rounded-xl px-4 py-4 pl-12 text-white placeholder-dark-400 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all shadow-inner"
                  placeholder="Search for high-demand problems, industries, or specific tech..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
              </div>
              <Button variant="primary" size="lg" leftIcon={<Search className="w-4 h-4" />} onClick={handleSearch} className="px-8 shadow-glow">
                Analyze Market
              </Button>
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-3 items-center justify-center">
              <span className="text-sm text-dark-400 font-medium mr-2">Filter by Industry:</span>
              {categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setSelectedFilter(category.name.toLowerCase())}
                  className={`flex items-center px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    selectedFilter === category.name.toLowerCase()
                      ? 'bg-primary-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.4)]'
                      : 'bg-dark-800 text-dark-300 hover:bg-dark-700 hover:text-white border border-dark-700'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Business Model Section (Moved Up) */}
      <section className="py-16 border-b border-dark-800 bg-gradient-to-b from-dark-950 to-dark-900 relative z-10">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="success" className="mb-4">Sustainable Ecosystem</Badge>
            <h2 className="heading-2 mb-4">Empowering the <span className="gradient-text">Next Generation</span> of Startups</h2>
            <p className="text-dark-300 text-lg">
              SolveSphere AI bridges the gap between market intelligence and developer execution. 
              Our business model ensures long-term sustainability while keeping core features free for builders.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 border-t-4 border-t-primary-500 bg-dark-800/50">
              <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mb-6">
                <Code className="w-6 h-6 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">For Developers (Free)</h3>
              <ul className="space-y-3 text-dark-300">
                <li className="flex items-start"><Target className="w-4 h-4 text-primary-400 mt-1 mr-2 flex-shrink-0" /> Browse high-potential problems</li>
                <li className="flex items-start"><Target className="w-4 h-4 text-primary-400 mt-1 mr-2 flex-shrink-0" /> Basic AI architecture generation</li>
                <li className="flex items-start"><Target className="w-4 h-4 text-primary-400 mt-1 mr-2 flex-shrink-0" /> Open source collaboration</li>
              </ul>
            </Card>
            
            <Card className="p-8 border-t-4 border-t-secondary-500 bg-dark-800/50 shadow-[0_0_30px_rgba(217,70,239,0.1)] scale-105 z-10 relative">
              <Badge variant="warning" className="absolute -top-3 right-6">Most Popular</Badge>
              <div className="w-12 h-12 rounded-xl bg-secondary-500/20 flex items-center justify-center mb-6">
                <Rocket className="w-6 h-6 text-secondary-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Founders Pro ($29/mo)</h3>
              <ul className="space-y-3 text-dark-300">
                <li className="flex items-start"><Target className="w-4 h-4 text-secondary-400 mt-1 mr-2 flex-shrink-0" /> Advanced AI competitor analysis</li>
                <li className="flex items-start"><Target className="w-4 h-4 text-secondary-400 mt-1 mr-2 flex-shrink-0" /> Detailed MVP roadmap & monetization</li>
                <li className="flex items-start"><Target className="w-4 h-4 text-secondary-400 mt-1 mr-2 flex-shrink-0" /> Direct access to interested developers</li>
              </ul>
            </Card>

            <Card className="p-8 border-t-4 border-t-success-500 bg-dark-800/50">
              <div className="w-12 h-12 rounded-xl bg-success-500/20 flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6 text-success-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Enterprise & Sponsors</h3>
              <ul className="space-y-3 text-dark-300">
                <li className="flex items-start"><Target className="w-4 h-4 text-success-400 mt-1 mr-2 flex-shrink-0" /> Host sponsored hackathon challenges</li>
                <li className="flex items-start"><Target className="w-4 h-4 text-success-400 mt-1 mr-2 flex-shrink-0" /> Post bounty rewards for specific APIs</li>
                <li className="flex items-start"><Target className="w-4 h-4 text-success-400 mt-1 mr-2 flex-shrink-0" /> Talent recruitment and visibility</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Opportunity Ecosystem Grid */}
      <section className="py-20 relative">
        <div className="container-custom">
          
          <div className="flex justify-between items-center mb-8 border-b border-dark-800 pb-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-primary-400" /> Live Opportunities
            </h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-dark-400">Sort by:</span>
              <select className="bg-dark-900 border border-dark-700 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-primary-500">
                <option>Highest Opportunity Score</option>
                <option>Most Trending</option>
                <option>Highest Revenue Potential</option>
                <option>Easiest MVP</option>
              </select>
            </div>
          </div>

          <div className="grid gap-8">
            {unsolvedProblems.map((problem, index) => (
              <motion.div
                key={problem._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="relative overflow-hidden group hover:border-primary-500/50 transition-all duration-300 bg-dark-900 border-dark-800">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="p-6 md:p-8">
                    {/* Header Row: Title & Tags */}
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {problem.aiOpportunityScore?.overall >= 90 && (
                            <Badge variant="warning" size="sm" className="bg-warning-500/10 text-warning-400 border-warning-500/20">
                              <Rocket className="w-3 h-3 mr-1" /> Startup Potential
                            </Badge>
                          )}
                          {problem.views > 1000 && (
                            <Badge variant="danger" size="sm" className="bg-danger-500/10 text-danger-400 border-danger-500/20">
                              <TrendingUp className="w-3 h-3 mr-1" /> Trending
                            </Badge>
                          )}
                          <Badge variant="success" size="sm" className="bg-success-500/10 text-success-400 border-success-500/20">
                            <DollarSign className="w-3 h-3 mr-1" /> {problem.revenuePotential || 'High Revenue'}
                          </Badge>
                        </div>
                        <h3 className="text-3xl font-extrabold text-white mb-2 group-hover:text-primary-400 transition-colors cursor-pointer">
                          {problem.title}
                        </h3>
                        <p className="text-lg text-dark-300 leading-relaxed">
                          {problem.description}
                        </p>
                      </div>

                      {/* Right Panel: AI Score Box */}
                      <div className="flex-shrink-0 bg-dark-800 rounded-2xl p-5 border border-dark-700 shadow-inner min-w-[200px] text-center">
                        <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-400 to-secondary-500 mb-1">
                          {problem.aiOpportunityScore?.overall || 0}
                        </div>
                        <div className="text-xs font-bold text-dark-400 uppercase tracking-widest mb-4">AI Opportunity</div>
                        <div className="space-y-2 text-sm text-left">
                          <div className="flex justify-between items-center">
                            <span className="text-dark-400">Demand:</span>
                            <span className="font-bold text-success-400">{problem.aiOpportunityScore?.marketDemand || 0}/100</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-dark-400">Difficulty:</span>
                            <span className="font-bold text-warning-400">{problem.aiOpportunityScore?.technicalComplexity || 0}/100</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Why This Matters / Real World Impact */}
                    <div className="bg-dark-800/50 rounded-xl p-5 mb-6 border border-dark-700/50">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center">
                        <Target className="w-4 h-4 text-primary-400 mr-2" /> Why This Matters
                      </h4>
                      <p className="text-dark-200 italic">
                        "{problem.realWorldImpact || problem.whyExistingSolutionsFail?.analysis || 'This represents a critical gap in the current market affecting thousands of users.'}"
                      </p>
                    </div>

                    {/* Startup Intelligence Data Row */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      <div className="bg-dark-950 rounded-lg p-3 border border-dark-800">
                        <div className="text-xs text-dark-400 mb-1 flex items-center"><Clock className="w-3 h-3 mr-1"/> MVP Time</div>
                        <div className="font-semibold text-white">{problem.estimatedMVPTime || '3-4 weeks'}</div>
                      </div>
                      <div className="bg-dark-950 rounded-lg p-3 border border-dark-800">
                        <div className="text-xs text-dark-400 mb-1 flex items-center"><Users className="w-3 h-3 mr-1"/> Ideal Team</div>
                        <div className="font-semibold text-white">{problem.suggestedTeamSize || '2-3 devs'}</div>
                      </div>
                      <div className="bg-dark-950 rounded-lg p-3 border border-dark-800">
                        <div className="text-xs text-dark-400 mb-1 flex items-center"><Briefcase className="w-3 h-3 mr-1"/> Industry</div>
                        <div className="font-semibold text-white">{problem.industry || problem.category}</div>
                      </div>
                      <div className="bg-dark-950 rounded-lg p-3 border border-dark-800">
                        <div className="text-xs text-dark-400 mb-1 flex items-center"><Trophy className="w-3 h-3 mr-1"/> Bounty / Reward</div>
                        <div className="font-semibold text-success-400">{problem.bounty || 'Open Source Fame'}</div>
                      </div>
                    </div>

                    {/* Footer Row: Ecosystem Metrics & Actions */}
                    <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-dark-800">
                      <div className="flex items-center gap-6 mb-4 md:mb-0">
                        <div className="flex -space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary-500/20 border border-primary-500 flex items-center justify-center text-xs font-bold text-primary-400 z-30">UI</div>
                          <div className="w-8 h-8 rounded-full bg-secondary-500/20 border border-secondary-500 flex items-center justify-center text-xs font-bold text-secondary-400 z-20">DB</div>
                          <div className="w-8 h-8 rounded-full bg-success-500/20 border border-success-500 flex items-center justify-center text-xs font-bold text-success-400 z-10">AI</div>
                        </div>
                        <div className="text-sm">
                          <span className="text-white font-bold">{problem.interestedDevelopers || Math.floor(Math.random() * 200 + 50)}</span> <span className="text-dark-400">devs interested</span>
                          <span className="mx-2 text-dark-600">•</span>
                          <span className="text-white font-bold">{problem.teamsBuilding || Math.floor(Math.random() * 20 + 2)}</span> <span className="text-dark-400">teams building</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full md:w-auto">
                        <Button variant="outline" size="md" className="flex-1 md:flex-none">
                          Bookmark
                        </Button>
                        <a href={`/problems/${problem._id}`} className="flex-1 md:flex-none">
                          <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4" />} className="w-full shadow-glow">
                            Analyze & Build
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 border-t border-dark-800 bg-dark-950">
        <div className="container-custom text-center">
            <h2 className="heading-2 mb-6 text-white">Ready to build the future?</h2>
            <Button variant="primary" size="lg" className="px-10 shadow-glow">Start Building Today</Button>
        </div>
      </section>

      {/* Submit Problem Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-2xl">
            <Card variant="glass" className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Zap className="text-warning-400" /> Submit an Opportunity</h2>
                <button onClick={() => setShowSubmitModal(false)} className="text-dark-400 hover:text-white transition-colors">✕</button>
              </div>
              <p className="text-dark-300 mb-6">Share an unsolved industry problem. Our AI will automatically score its startup potential, generate a tech stack, and share it with thousands of developers.</p>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Opportunity Title *</label>
                  <input type="text" value={problemTitle} onChange={(e) => setProblemTitle(e.target.value)} placeholder="e.g., AI-powered legacy code migration tool for enterprise" className="w-full bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-500 focus:border-primary-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark-300 mb-2">Detailed Description & Pain Points *</label>
                  <textarea value={problemDescription} onChange={(e) => setProblemDescription(e.target.value)} placeholder="Describe the market gap, why current tools fail, and the target audience..." rows={5} className="w-full bg-dark-800/50 border border-dark-700 rounded-lg px-4 py-3 text-white placeholder-dark-500 focus:border-primary-500 transition-colors resize-none" />
                </div>
                <div className="flex gap-4 pt-4 border-t border-dark-800">
                  <Button variant="outline" onClick={() => setShowSubmitModal(false)} className="flex-1">Cancel</Button>
                  <Button variant="primary" onClick={handleSubmitProblem} disabled={isSubmitting} className="flex-1 shadow-glow">{isSubmitting ? 'AI is Analyzing...' : 'Submit to Exchange'}</Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
