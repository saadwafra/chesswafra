"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Trophy, Medal, Award, Crown, TrendingUp, Calendar, Users, Target } from 'lucide-react';

export default function Leaderboards() {
  const [activeTab, setActiveTab] = useState('all-time');

  const leaderboardData = {
    'all-time': [
      { rank: 1, name: 'Magnus Carlsen', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', rating: 2847, streak: 45, solved: 15420, country: '🇳🇴', badge: 'Grandmaster' },
      { rank: 2, name: 'Hikaru Nakamura', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg', rating: 2798, streak: 32, solved: 12850, country: '🇺🇸', badge: 'Grandmaster' },
      { rank: 3, name: 'Wesley So', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg', rating: 2772, streak: 28, solved: 11230, country: '🇺🇸', badge: 'Grandmaster' },
      { rank: 4, name: 'Fabiano Caruana', avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg', rating: 2758, streak: 23, solved: 10890, country: '🇺🇸', badge: 'Grandmaster' },
      { rank: 5, name: 'Ian Nepomniachtchi', avatar: 'https://images.pexels.com/photos/1040881/pexels-photo-1040881.jpeg', rating: 2742, streak: 19, solved: 9845, country: '🇷🇺', badge: 'Grandmaster' },
      { rank: 6, name: 'Ding Liren', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg', rating: 2728, streak: 15, solved: 9120, country: '🇨🇳', badge: 'Grandmaster' },
      { rank: 7, name: 'Alexandra Botez', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', rating: 2695, streak: 42, solved: 8750, country: '🇨🇦', badge: 'WFM' },
      { rank: 8, name: 'Anna Cramling', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg', rating: 2680, streak: 38, solved: 8320, country: '🇸🇪', badge: 'WIM' },
      { rank: 9, name: 'Daniel Naroditsky', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', rating: 2675, streak: 21, solved: 7890, country: '🇺🇸', badge: 'GM' },
      { rank: 10, name: 'Gotham Chess', avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg', rating: 2650, streak: 17, solved: 7245, country: '🇺🇸', badge: 'IM' }
    ],
    'monthly': [
      { rank: 1, name: 'Alexandra Botez', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', rating: 2695, streak: 42, solved: 1240, country: '🇨🇦', badge: 'WFM' },
      { rank: 2, name: 'Anna Cramling', avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg', rating: 2680, streak: 38, solved: 1180, country: '🇸🇪', badge: 'WIM' },
      { rank: 3, name: 'Magnus Carlsen', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg', rating: 2847, streak: 45, solved: 1050, country: '🇳🇴', badge: 'Grandmaster' },
    ],
    'weekly': [
      { rank: 1, name: 'Hikaru Nakamura', avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg', rating: 2798, streak: 32, solved: 285, country: '🇺🇸', badge: 'Grandmaster' },
      { rank: 2, name: 'Alexandra Botez', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg', rating: 2695, streak: 42, solved: 270, country: '🇨🇦', badge: 'WFM' },
      { rank: 3, name: 'Daniel Naroditsky', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg', rating: 2675, streak: 21, solved: 245, country: '🇺🇸', badge: 'GM' },
    ]
  };

  const tabs = [
    { id: 'all-time', label: 'All Time', icon: Trophy },
    { id: 'monthly', label: 'Monthly', icon: Calendar },
    { id: 'weekly', label: 'Weekly', icon: TrendingUp }
  ];

  const currentData = leaderboardData[activeTab as keyof typeof leaderboardData];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />;
      default:
        return <span className="text-2xl font-bold text-white/60">#{rank}</span>;
    }
  };

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/50';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50';
      case 3:
        return 'bg-gradient-to-r from-amber-600/20 to-orange-600/20 border-amber-600/50';
      default:
        return 'bg-white/5 border-white/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              <Trophy className="inline-block h-16 w-16 text-amber-400 mr-4" />
              Leaderboards
            </h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              See how you rank against chess players worldwide. Compete, improve, and climb the leaderboards!
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">45,280</div>
                <p className="text-white/70">Active Players</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 text-green-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">2.8M</div>
                <p className="text-white/70">Problems Solved</p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/10">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                <div className="text-2xl font-bold text-white mb-2">1,247</div>
                <p className="text-white/70">Days Total Streak</p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-1">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <Button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-amber-500 text-black font-medium'
                        : 'bg-transparent text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <IconComponent className="h-4 w-4 mr-2" />
                    {tab.label}
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Leaderboard */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Trophy className="h-6 w-6 mr-2 text-amber-400" />
                {tabs.find(tab => tab.id === activeTab)?.label} Rankings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentData.map((player, index) => (
                  <div
                    key={player.rank}
                    className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 hover:scale-[1.02] ${getRankBg(player.rank)}`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12">
                        {getRankIcon(player.rank)}
                      </div>
                      
                      <Avatar className="h-12 w-12 border-2 border-white/20">
                        <AvatarImage src={player.avatar} />
                        <AvatarFallback>{player.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>

                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-white">{player.name}</h3>
                          <span className="text-lg">{player.country}</span>
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/50">
                            {player.badge}
                          </Badge>
                        </div>
                        <p className="text-white/60 text-sm">
                          {player.solved.toLocaleString()} problems solved
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-white mb-1">
                        {player.rating}
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-white/60">
                        <div className="flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {player.streak} day streak
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-8">
                <p className="text-white/60 mb-4">Want to see your name here?</p>
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-medium">
                  Start Training Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}