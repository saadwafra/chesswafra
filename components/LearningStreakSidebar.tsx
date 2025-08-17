"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Flame, Target, Trophy, Clock, X, Calendar, ChevronRight } from 'lucide-react';

export function LearningStreakSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-4 top-24 z-50 bg-amber-500 hover:bg-amber-600 text-black p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      >
        <Flame className="h-5 w-5" />
      </button>

      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-black/20 backdrop-blur-md border-l border-white/10 transform transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Progress</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Current Streak */}
          <Card className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border-amber-500/50 mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <Flame className="h-5 w-5 mr-2 text-amber-400" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-amber-400 mb-2">
                  7 days
                </div>
                <p className="text-white/70 text-sm">
                  Keep it up! You're on fire 🔥
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Daily Goal */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-400" />
                  Daily Goal
                </span>
                <Badge variant="outline" className="text-blue-400 border-blue-400/50">
                  12/15
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* <Progress value={80} className="mb-2" /> */}
              <p className="text-white/70 text-sm">
                3 more problems to complete today's goal
              </p>
            </CardContent>
          </Card>

          {/* Weekly Stats */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-400" />
                This Week
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Problems Solved</span>
                  <span className="text-white font-medium">89</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Study Time</span>
                  <span className="text-white font-medium">4h 32m</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/70">Accuracy</span>
                  <span className="text-white font-medium">87%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 mb-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-400" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center mr-3">
                      <Flame className="h-4 w-4 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Week Warrior</p>
                      <p className="text-white/60 text-xs">7-day streak</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-yellow-400 border-yellow-400/50 text-xs">
                    New
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center mr-3">
                      <Target className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Tactical Master</p>
                      <p className="text-white/60 text-xs">100 tactics solved</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                      <Clock className="h-4 w-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">Speed Demon</p>
                      <p className="text-white/60 text-xs">5 rapid solves</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue Learning */}
          <Button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium">
            <ChevronRight className="h-4 w-4 mr-2" />
            Continue Learning
          </Button>
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}