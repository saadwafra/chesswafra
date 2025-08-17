"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, Crown, Star, Zap, Target, Trophy, BookOpen, Users } from 'lucide-react';
import Link from 'next/link';

export default function Plans() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Free',
      price: { monthly: 0, yearly: 0 },
      description: 'Perfect for beginners getting started',
      features: [
        '5 puzzles per day',
        'Basic opening repertoire',
        'Limited game analysis',
        'Community access',
        'Mobile app access'
      ],
      limitations: [
        'No spaced repetition',
        'Limited progress tracking',
        'No advanced features'
      ],
      popular: false,
      cta: 'Start Free',
      icon: Target
    },
    {
      name: 'Premium',
      price: { monthly: 9.99, yearly: 99.99 },
      description: 'For serious players looking to improve',
      features: [
        'Unlimited puzzles',
        'Complete opening database',
        'Advanced game analysis',
        'Spaced repetition system',
        'Detailed progress tracking',
        'Personalized study plans',
        'Priority support',
        'Advanced statistics'
      ],
      limitations: [],
      popular: true,
      cta: 'Start Premium',
      icon: Star
    },
    {
      name: 'Master',
      price: { monthly: 19.99, yearly: 199.99 },
      description: 'Professional-grade tools for masters',
      features: [
        'Everything in Premium',
        'Master-level content',
        'Personal coach insights',
        'Tournament preparation',
        'Opening preparation tools',
        'Endgame masterclass',
        'Advanced analytics',
        'Custom training programs',
        'Master game database',
        '1-on-1 coaching session'
      ],
      limitations: [],
      popular: false,
      cta: 'Go Master',
      icon: Crown
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Choose Your
              <span className="text-amber-400 block">Training Plan</span>
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
              Unlock your chess potential with our comprehensive training system. 
              Master openings, tactics, and endgames with personalized learning paths.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              <span className={`text-lg ${!isYearly ? 'text-white font-medium' : 'text-white/60'}`}>
                Monthly
              </span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isYearly ? 'bg-amber-500' : 'bg-white/20'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isYearly ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-lg ${isYearly ? 'text-white font-medium' : 'text-white/60'}`}>
                Yearly
              </span>
              {isYearly && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/50 ml-2">
                  Save 17%
                </Badge>
              )}
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => {
              const IconComponent = plan.icon;
              const price = isYearly ? plan.price.yearly : plan.price.monthly;
              const period = isYearly ? 'year' : 'month';

              return (
                <Card
                  key={plan.name}
                  className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${
                    plan.popular
                      ? 'bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/50 ring-2 ring-amber-500/50'
                      : 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0">
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-black text-center py-2 text-sm font-medium">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <CardHeader className={`${plan.popular ? 'pt-12' : 'pt-6'}`}>
                    <div className="flex items-center justify-center mb-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        plan.popular ? 'bg-amber-500/30' : 'bg-white/10'
                      }`}>
                        <IconComponent className={`h-8 w-8 ${
                          plan.popular ? 'text-amber-400' : 'text-white'
                        }`} />
                      </div>
                    </div>
                    
                    <CardTitle className="text-2xl font-bold text-white text-center">
                      {plan.name}
                    </CardTitle>
                    
                    <div className="text-center">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-white">
                          ${price}
                        </span>
                        {price > 0 && (
                          <span className="text-white/60 ml-1">/{period}</span>
                        )}
                      </div>
                      {isYearly && price > 0 && (
                        <div className="text-sm text-white/60 mt-1">
                          ${(price / 12).toFixed(2)}/month
                        </div>
                      )}
                    </div>
                    
                    <p className="text-white/70 text-center mt-2">
                      {plan.description}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-white/80">{feature}</span>
                        </div>
                      ))}
                      
                      {plan.limitations.map((limitation, limitIndex) => (
                        <div key={limitIndex} className="flex items-start space-x-3 opacity-60">
                          <div className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <span className="text-white/60 line-through">{limitation}</span>
                        </div>
                      ))}
                    </div>

                    <Link href={price === 0 ? "/signup" : `/signup?plan=${plan.name.toLowerCase()}`}>
                      <Button 
                        className={`w-full py-3 text-lg font-medium transition-all duration-300 ${
                          plan.popular
                            ? 'bg-amber-500 hover:bg-amber-600 text-black'
                            : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                        }`}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Features Comparison */}
          <div className="bg-white/5 backdrop-blur-sm border-white/10 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white text-center mb-8">
              Why Choose ChessReps?
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Comprehensive Database
                </h3>
                <p className="text-white/70 text-sm">
                  Access thousands of chess openings, tactics, and endgames
                </p>
              </div>
              
              <div className="text-center">
                <Zap className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Spaced Repetition
                </h3>
                <p className="text-white/70 text-sm">
                  Learn efficiently with scientifically-proven methods
                </p>
              </div>
              
              <div className="text-center">
                <Trophy className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Progress Tracking
                </h3>
                <p className="text-white/70 text-sm">
                  Monitor your improvement with detailed analytics
                </p>
              </div>
              
              <div className="text-center">
                <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Community
                </h3>
                <p className="text-white/70 text-sm">
                  Join thousands of chess players improving together
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}