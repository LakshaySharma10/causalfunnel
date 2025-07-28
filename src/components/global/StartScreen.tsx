import React from 'react';
import { ChevronRight, Clock, Trophy, Star, Loader2 } from 'lucide-react';

interface StartScreenProps {
  onStartQuiz: () => void;
  isLoading: boolean;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStartQuiz, isLoading }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Welcome to the Quiz Challenge
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Test your knowledge with questions from Open Trivia Database
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-3">
                <Clock className="w-6 h-6 text-blue-400 mr-3" />
                <h3 className="text-lg font-semibold text-white">Timed Quiz</h3>
              </div>
              <p className="text-white/70">Track your progress with our built-in timer</p>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-center mb-3">
                <Star className="w-6 h-6 text-yellow-400 mr-3" />
                <h3 className="text-lg font-semibold text-white">Score Tracking</h3>
              </div>
              <p className="text-white/70">Get detailed results and performance metrics</p>
            </div>
          </div>

          <div className="text-center">
            <div className="mb-6">
              <p className="text-white/80 mb-2">Quiz Details:</p>
              <div className="flex justify-center space-x-8 text-sm text-white/60">
                <span>15 Questions</span>
                <span>Multiple Choice</span>
                <span>Mixed Categories</span>
              </div>
            </div>
            
            <button
              onClick={onStartQuiz}
              disabled={isLoading}
              className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Loading Questions...
                </>
              ) : (
                <>
                  Start Quiz
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};