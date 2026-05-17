'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Search,
  Sparkles,
  Star,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  ExternalLink,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  
  const [isLoading, setIsLoading] = useState(true);
  const [searchResult, setSearchResult] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery }),
      });

      const data = await response.json();

      if (data.success) {
        setSearchResult(data);
      } else {
        setError(data.error || 'Search failed');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
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
              <a href="/dashboard">
                <Button variant="primary" size="sm">Dashboard</Button>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="pt-32 pb-20">
        <div className="container-custom">
          {/* Search Query Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="heading-2 mb-4">
              Search Results for: <span className="gradient-text">"{query}"</span>
            </h1>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-12 h-12 text-primary-400 animate-spin mb-4" />
              <p className="text-dark-300 text-lg">Searching for solutions...</p>
              <p className="text-dark-400 text-sm mt-2">Analyzing with AI if no solutions found</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <Card variant="glass" className="p-8 text-center">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Search Error</h3>
              <p className="text-dark-300">{error}</p>
            </Card>
          )}

          {/* Results */}
          {!isLoading && searchResult && (
            <>
              {/* Solutions Found */}
              {searchResult.type === 'solutions_found' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card variant="glass" className="p-6 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-success-400" />
                      <div>
                        <h2 className="text-xl font-bold text-white">Solutions Found!</h2>
                        <p className="text-dark-300">{searchResult.data.message}</p>
                      </div>
                    </div>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    {searchResult.data.solutions.map((solution: any, index: number) => (
                      <motion.div
                        key={solution._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card variant="gradient" className="h-full">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-white mb-2">{solution.title}</h3>
                              <p className="text-dark-200 mb-3">{solution.description}</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="primary" size="sm">{solution.category}</Badge>
                                <Badge variant="info" size="sm">{solution.pricing}</Badge>
                                {solution.isBeginnerFriendly && (
                                  <Badge variant="success" size="sm">Beginner Friendly</Badge>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-warning-400 fill-warning-400" />
                                <span className="font-semibold">{solution.rating || 'N/A'}</span>
                              </div>
                              <div className="text-sm">
                                <span className="text-success-400 font-semibold">
                                  {solution.workedForMe || 0}%
                                </span>
                                <span className="text-dark-400"> success</span>
                              </div>
                            </div>
                          </div>

                          {solution.url && (
                            <a href={solution.url} target="_blank" rel="noopener noreferrer">
                              <Button 
                                variant="primary" 
                                size="sm" 
                                className="w-full"
                                rightIcon={<ExternalLink className="w-4 h-4" />}
                              >
                                Visit Website
                              </Button>
                            </a>
                          )}
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Real Solutions Found (from AI search) */}
              {searchResult.type === 'real_solutions_found' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card variant="glass" className="p-6 mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-success-400" />
                      <div>
                        <h2 className="text-xl font-bold text-white">Real-World Solutions Found!</h2>
                        <p className="text-dark-300">{searchResult.data.message}</p>
                        <p className="text-dark-400 text-sm mt-1">{searchResult.data.note}</p>
                      </div>
                    </div>
                  </Card>

                  <div className="grid md:grid-cols-2 gap-6">
                    {searchResult.data.solutions.map((solution: any, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card variant="gradient" className="h-full">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold text-white mb-2">{solution.title}</h3>
                              <p className="text-dark-200 mb-3">{solution.description}</p>
                              <div className="flex flex-wrap gap-2 mb-3">
                                <Badge variant="primary" size="sm">{solution.type}</Badge>
                                <Badge variant="info" size="sm">{solution.pricing}</Badge>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-warning-400 fill-warning-400" />
                                <span className="font-semibold">{solution.rating}/5</span>
                              </div>
                            </div>
                          </div>

                          {solution.url && (
                            <a href={solution.url} target="_blank" rel="noopener noreferrer">
                              <Button
                                variant="primary"
                                size="sm"
                                className="w-full"
                                rightIcon={<ExternalLink className="w-4 h-4" />}
                              >
                                Visit Website
                              </Button>
                            </a>
                          )}
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Problem Exists */}
              {searchResult.type === 'problem_exists' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card variant="glass" className="p-8 text-center mb-8">
                    <AlertCircle className="w-12 h-12 text-warning-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Problem Already Exists</h2>
                    <p className="text-dark-300 mb-6">{searchResult.data.message}</p>
                    <a href={`/marketplace`}>
                      <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                        View in Marketplace
                      </Button>
                    </a>
                  </Card>
                </motion.div>
              )}

              {/* Problem Created */}
              {searchResult.type === 'problem_created' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Card variant="gradient" className="p-8 mb-8">
                    <div className="text-center mb-6">
                      <TrendingUp className="w-16 h-16 text-primary-400 mx-auto mb-4" />
                      <h2 className="text-3xl font-bold text-white mb-2">Great Opportunity!</h2>
                      <p className="text-xl text-dark-200 mb-4">{searchResult.data.message}</p>
                      <p className="text-lg text-primary-300">{searchResult.data.suggestion}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <Card variant="glass">
                        <h3 className="font-bold text-white mb-3">AI Opportunity Scores</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-dark-300">Seriousness</span>
                            <span className="font-bold text-danger-400">
                              {searchResult.data.analysis.aiOpportunityScore?.seriousness || 0}/100
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dark-300">Uniqueness</span>
                            <span className="font-bold text-secondary-400">
                              {searchResult.data.analysis.aiOpportunityScore?.uniqueness || 0}/100
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dark-300">Startup Potential</span>
                            <span className="font-bold text-primary-400">
                              {searchResult.data.analysis.aiOpportunityScore?.startupPotential || 0}/100
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dark-300">Market Demand</span>
                            <span className="font-bold text-success-400">
                              {searchResult.data.analysis.aiOpportunityScore?.marketDemand || 0}/100
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dark-300">Technical Complexity</span>
                            <span className="font-bold text-warning-400">
                              {searchResult.data.analysis.aiOpportunityScore?.technicalComplexity || 0}/100
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dark-300">Implementation Feasibility</span>
                            <span className="font-bold text-info-400">
                              {searchResult.data.analysis.aiOpportunityScore?.implementationFeasibility || 0}/100
                            </span>
                          </div>
                        </div>
                      </Card>

                      <Card variant="glass">
                        <h3 className="font-bold text-white mb-3">Problem Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-dark-300">Category</span>
                            <Badge variant="primary" size="sm">{searchResult.data.analysis.category}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dark-300">Difficulty</span>
                            <Badge variant="warning" size="sm">{searchResult.data.analysis.difficulty}</Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-dark-300">Status</span>
                            <Badge variant="danger" size="sm">Unsolved</Badge>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {searchResult.data.analysis.whyExistingSolutionsFail && (
                      <Card variant="glass" className="p-6 mb-6">
                        <h3 className="text-xl font-bold text-white mb-4">Why Existing Solutions Fail</h3>
                        <p className="text-dark-200 mb-4">{searchResult.data.analysis.whyExistingSolutionsFail.analysis}</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          {searchResult.data.analysis.whyExistingSolutionsFail.userFrustrations?.length > 0 && (
                            <div>
                              <h4 className="font-bold text-danger-400 mb-2">User Frustrations</h4>
                              <ul className="list-disc list-inside text-dark-300">
                                {searchResult.data.analysis.whyExistingSolutionsFail.userFrustrations.map((item: string, idx: number) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {searchResult.data.analysis.whyExistingSolutionsFail.marketGaps?.length > 0 && (
                            <div>
                              <h4 className="font-bold text-warning-400 mb-2">Market Gaps</h4>
                              <ul className="list-disc list-inside text-dark-300">
                                {searchResult.data.analysis.whyExistingSolutionsFail.marketGaps.map((item: string, idx: number) => (
                                  <li key={idx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      </Card>
                    )}

                    <div className="flex flex-wrap justify-center gap-4">
                      <a href="/marketplace">
                        <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                          View in Marketplace
                        </Button>
                      </a>
                      <a href="/dashboard">
                        <Button variant="outline" size="lg">
                          Start Building
                        </Button>
                      </a>
                    </div>
                  </Card>

                  {searchResult.data.analysis.suggestedSolutions && (
                    <Card variant="glass" className="p-6">
                      <h3 className="text-xl font-bold text-white mb-4">AI Suggested Approaches</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {searchResult.data.analysis.suggestedSolutions.map((suggestion: string, index: number) => (
                          <div key={index} className="p-4 bg-dark-800 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-primary-400 mb-2" />
                            <p className="text-dark-200">{suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  )}
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark-950 flex items-center justify-center"><Loader2 className="w-12 h-12 text-primary-400 animate-spin" /></div>}>
      <SearchContent />
    </Suspense>
  );
}

// Made with Bob
