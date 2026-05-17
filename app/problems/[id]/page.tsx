'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Zap, ArrowRight, ShieldCheck, CheckCircle, Brain, Target, Box, CreditCard, Users, Loader2, Rocket, Cloud, Database, Lock, Server, Layers, Briefcase, ChevronRight, Activity, TrendingUp, Sparkles, DollarSign, Trophy
} from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function ProblemDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [problem, setProblem] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [projectBlueprint, setProjectBlueprint] = useState<any>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchProblem();
    }
  }, [id]);

  const fetchProblem = async () => {
    try {
      const url = `/api/problems/${id}`;
      console.log('Fetching:', url);
      const response = await fetch(url, { cache: 'no-store' });
      const status = response.status;
      const text = await response.text();
      
      console.log('Response Status:', status);
      console.log('Response Text:', text);
      
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        console.error('Failed to parse JSON:', e);
      }
      
      setDebugInfo({ url, status, text, data });
      
      if (data && data.success) {
        setProblem(data.data);
      } else {
        console.error('API returned success false:', data);
      }
    } catch (err: any) {
      console.error(err);
      setDebugInfo({ error: err.message });
    } finally {
      setIsLoading(false);
    }
  };

  const generateBlueprint = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/ai/project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          problemDescription: problem.description,
          userType: 'startup founder and lead developer' 
        }),
      });
      const data = await response.json();
      if (data.success && data.data) {
        setProjectBlueprint(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center bg-dark-950"><Loader2 className="animate-spin text-primary-500 w-12 h-12" /></div>;
  if (!problem) {
    return (
      <div className="text-white text-center mt-20 p-8">
        <h2 className="text-2xl text-danger-500 mb-4">Opportunity not found</h2>
        <div className="bg-dark-800 p-4 rounded text-left font-mono text-sm inline-block w-full max-w-3xl overflow-x-auto">
          <p><strong>Debug ID:</strong> {id}</p>
          <p><strong>URL Fetched:</strong> {debugInfo?.url}</p>
          <p><strong>HTTP Status:</strong> {debugInfo?.status}</p>
          <p><strong>Raw Text:</strong> {debugInfo?.text}</p>
          <p><strong>Parsed Data:</strong> {JSON.stringify(debugInfo?.data)}</p>
          <p><strong>Error:</strong> {debugInfo?.error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 pb-20">
      <nav className="fixed top-0 w-full z-50 bg-dark-950/80 backdrop-blur-lg border-b border-dark-800 p-4">
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center space-x-2">
             <SparklesIcon className="w-6 h-6 text-primary-400" />
             <span className="text-xl font-bold gradient-text">SolveSphere AI</span>
          </div>
          <a href="/marketplace"><Button variant="ghost" size="sm">Back to Exchange</Button></a>
        </div>
      </nav>

      <section className="pt-32 pb-10 container-custom">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 border-b border-dark-800 pb-10">
          <div className="flex flex-wrap gap-2 mb-4">
             <Badge variant="warning"><Rocket className="w-4 h-4 mr-1" /> Startup Opportunity</Badge>
             <Badge variant="success"><DollarSignIcon className="w-4 h-4 mr-1"/> {problem.revenuePotential || 'High Revenue'}</Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">{problem.title}</h1>
          <p className="text-xl text-dark-300 max-w-4xl leading-relaxed mb-6">{problem.description}</p>
          
          <div className="flex items-center gap-6 mt-8">
             <div className="flex items-center gap-2">
               <Users className="w-5 h-5 text-primary-400" />
               <span className="text-white font-bold">{problem.interestedDevelopers || 154}</span> <span className="text-dark-400">Interested</span>
             </div>
             <div className="flex items-center gap-2">
               <Box className="w-5 h-5 text-secondary-400" />
               <span className="text-white font-bold">{problem.teamsBuilding || 12}</span> <span className="text-dark-400">Teams Building</span>
             </div>
             <div className="flex items-center gap-2">
               <TrophyIcon className="w-5 h-5 text-warning-400" />
               <span className="text-white font-bold">{problem.bounty || 'Community'}</span> <span className="text-dark-400">Reward</span>
             </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* AI Score Card */}
          <Card variant="glass" className="p-8 lg:col-span-1 shadow-[0_0_40px_rgba(14,165,233,0.05)] border-t-4 border-t-primary-500">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Brain className="text-primary-400" /> AI Opportunity</h3>
            <div className="text-center mb-8">
               <div className="text-6xl font-black gradient-text mb-2">{problem.aiOpportunityScore?.overall || 0}</div>
               <div className="text-sm uppercase tracking-widest text-dark-400 font-bold">Overall Score</div>
            </div>
            <div className="space-y-5">
              {[
                { label: 'Startup Potential', value: problem.aiOpportunityScore?.startupPotential || 0, color: 'text-primary-400', bg: 'bg-primary-500' },
                { label: 'Market Demand', value: problem.aiOpportunityScore?.marketDemand || 0, color: 'text-success-400', bg: 'bg-success-500' },
                { label: 'Innovation Level', value: problem.aiOpportunityScore?.innovationLevel || 0, color: 'text-secondary-400', bg: 'bg-secondary-500' },
                { label: 'Tech Complexity', value: problem.aiOpportunityScore?.technicalComplexity || 0, color: 'text-warning-400', bg: 'bg-warning-500' },
              ].map(score => (
                <div key={score.label}>
                  <div className="flex justify-between mb-1"><span className="text-dark-300 font-medium">{score.label}</span><span className={`font-bold ${score.color}`}>{score.value}/100</span></div>
                  <div className="w-full bg-dark-800 rounded-full h-2.5">
                    <div className={`${score.bg} h-2.5 rounded-full`} style={{ width: `${score.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Why Existing Solutions Fail */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8 bg-dark-900 border-dark-800 h-full relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-danger-500/10 blur-3xl rounded-full"></div>
               
               <div className="flex items-center gap-3 mb-6">
                 <div className="w-12 h-12 rounded-xl bg-danger-500/10 flex items-center justify-center">
                    <Target className="w-6 h-6 text-danger-400" />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-white">Why Existing Solutions Fail</h3>
                    <p className="text-sm text-dark-400">Market gaps & user pain points</p>
                 </div>
               </div>

               {problem.whyExistingSolutionsFail ? (
                 <>
                   <div className="bg-dark-800/50 p-5 rounded-xl border border-dark-700/50 mb-6">
                     <p className="text-dark-200 text-lg italic leading-relaxed">"{problem.whyExistingSolutionsFail.analysis}"</p>
                   </div>
                   
                   <div className="grid md:grid-cols-2 gap-6">
                     <div>
                       <h4 className="font-semibold text-danger-400 mb-3 flex items-center gap-2"><Activity className="w-4 h-4"/> Critical Frustrations</h4>
                       <ul className="space-y-2">
                         {problem.whyExistingSolutionsFail.userFrustrations?.map((f: string, i: number) => (
                           <li key={i} className="flex items-start gap-2 text-dark-300 text-sm">
                              <span className="text-danger-500 mt-1">•</span> {f}
                           </li>
                         ))}
                       </ul>
                     </div>
                     <div>
                       <h4 className="font-semibold text-success-400 mb-3 flex items-center gap-2"><Zap className="w-4 h-4"/> Missing Features & Gaps</h4>
                       <ul className="space-y-2">
                         {problem.whyExistingSolutionsFail.marketGaps?.map((g: string, i: number) => (
                           <li key={i} className="flex items-start gap-2 text-dark-300 text-sm">
                              <span className="text-success-500 mt-1">•</span> {g}
                           </li>
                         ))}
                       </ul>
                     </div>
                   </div>
                 </>
               ) : (
                 <p className="text-dark-400 italic">No detailed analysis available for this opportunity.</p>
               )}
            </Card>
          </div>
        </div>

        {/* Generative Project Blueprint Section */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} className="mt-20">
          <div className="text-center mb-10">
            <Badge variant="primary" className="mb-4">AI Intelligence</Badge>
            <h2 className="heading-2 text-white">Startup Blueprint Generator</h2>
            <p className="text-dark-300 text-lg max-w-2xl mx-auto">Transform this problem into an actionable, enterprise-grade startup architecture with tech stack, MVP roadmap, and monetization strategy.</p>
          </div>
          
          {!projectBlueprint ? (
            <div className="flex justify-center py-10">
              <Button size="lg" variant="primary" onClick={generateBlueprint} disabled={isGenerating} leftIcon={isGenerating ? <Loader2 className="animate-spin w-5 h-5" /> : <Rocket className="w-5 h-5" />} className="px-10 py-5 text-lg shadow-glow">
                {isGenerating ? 'Analyzing Market & Architecting...' : 'Generate Startup Blueprint'}
              </Button>
            </div>
          ) : (
            <Card variant="glass" className="border border-primary-500/30 shadow-[0_0_50px_rgba(14,165,233,0.1)] relative overflow-hidden p-0">
              {/* Header */}
              <div className="bg-gradient-to-r from-dark-900 to-dark-800 p-8 md:p-10 border-b border-dark-700 relative">
                 <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <Layers className="w-40 h-40 text-primary-500" />
                 </div>
                 <Badge variant="success" className="mb-4">Blueprint Generated</Badge>
                 <h3 className="text-4xl font-extrabold text-white mb-4">{projectBlueprint.title}</h3>
                 <p className="text-dark-200 text-xl max-w-3xl leading-relaxed">{projectBlueprint.description}</p>
              </div>

              <div className="p-8 md:p-10">
                 <div className="grid lg:grid-cols-3 gap-10">
                    {/* Left Column: Stack & Infra */}
                    <div className="lg:col-span-1 space-y-8">
                       <div>
                         <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Server className="text-primary-400 w-5 h-5" /> Architecture</h4>
                         <div className="bg-dark-900 rounded-xl p-4 border border-dark-800 text-dark-200 text-sm leading-relaxed">
                            {projectBlueprint.recommendedArchitecture}
                         </div>
                       </div>
                       
                       <div>
                         <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Box className="text-secondary-400 w-5 h-5" /> Core Stack</h4>
                         <div className="flex flex-wrap gap-2">
                           {projectBlueprint.frontendBackendStack?.map((tech: string, i: number) => <Badge key={i} variant="primary" className="bg-primary-500/10 border-primary-500/20">{tech}</Badge>)}
                         </div>
                       </div>

                       <div>
                         <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Database className="text-info-400 w-5 h-5" /> Database & Auth</h4>
                         <div className="flex flex-wrap gap-2">
                           {projectBlueprint.databaseAndAuth?.map((tech: string, i: number) => <Badge key={i} variant="info" className="bg-info-500/10 border-info-500/20">{tech}</Badge>)}
                         </div>
                       </div>

                       <div>
                         <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Brain className="text-warning-400 w-5 h-5" /> AI & External APIs</h4>
                         <div className="flex flex-wrap gap-2">
                           {projectBlueprint.apisAndAI?.map((tech: string, i: number) => <Badge key={i} variant="warning" className="bg-warning-500/10 border-warning-500/20">{tech}</Badge>)}
                         </div>
                       </div>
                    </div>

                    {/* Right Column: Roadmap & Business */}
                    <div className="lg:col-span-2 space-y-8">
                       <div>
                         <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2"><CheckCircle className="text-success-400 w-6 h-6" /> MVP Execution Roadmap</h4>
                         <div className="space-y-4">
                           {projectBlueprint.mvpRoadmap?.map((step: string, i: number) => (
                             <div key={i} className="flex gap-4 items-start bg-dark-900/50 p-4 rounded-xl border border-dark-800/50">
                               <div className="w-8 h-8 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">{i+1}</div>
                               <p className="text-dark-200">{step}</p>
                             </div>
                           ))}
                         </div>
                       </div>

                       <div className="grid md:grid-cols-2 gap-6">
                          <Card className="bg-dark-900 border-dark-800 p-6">
                            <h4 className="font-bold text-white mb-3 flex items-center gap-2"><Briefcase className="text-success-400 w-5 h-5"/> Business Model</h4>
                            <p className="text-dark-300 text-sm leading-relaxed">{projectBlueprint.monetizationStrategy}</p>
                          </Card>
                          <Card className="bg-dark-900 border-dark-800 p-6">
                            <h4 className="font-bold text-white mb-3 flex items-center gap-2"><TrendingUp className="text-danger-400 w-5 h-5"/> Scale to 10k Users</h4>
                            <p className="text-dark-300 text-sm leading-relaxed">{projectBlueprint.scalabilityStrategy}</p>
                          </Card>
                       </div>

                       <div className="bg-gradient-to-r from-primary-900/40 to-secondary-900/40 rounded-2xl p-6 border border-primary-500/20 flex flex-col md:flex-row items-center justify-between gap-6">
                          <div>
                            <h4 className="text-white font-bold mb-1">Ready to build this?</h4>
                            <p className="text-dark-300 text-sm">Join the community building this solution and claim the bounty.</p>
                          </div>
                          <Button variant="primary" rightIcon={<ArrowRight className="w-4 h-4"/>}>Start Project Repository</Button>
                       </div>
                    </div>
                 </div>
              </div>
            </Card>
          )}
        </motion.div>
      </section>
    </div>
  );
}

function SparklesIcon(props: any) { return <Sparkles {...props} /> }
function DollarSignIcon(props: any) { return <DollarSign {...props} /> }
function TrophyIcon(props: any) { return <Trophy {...props} /> }
