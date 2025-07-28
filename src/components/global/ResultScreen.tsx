import React from 'react';
import { Trophy, CheckCircle, XCircle, Clock, RotateCcw, Home } from 'lucide-react';
import { Question, QuizResult, formatTime } from '../../lib/quiz-types';

interface ResultsScreenProps {
  questions: Question[];
  result: QuizResult;
  onRestartQuiz: () => void;
  onBackToStart: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  questions,
  result,
  onRestartQuiz,
  onBackToStart,
}) => {
  const percentage = Math.round((result.score / result.totalQuestions) * 100);
  
  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "Outstanding! 🎉", color: "text-emerald-400" };
    if (percentage >= 70) return { message: "Great job! 👏", color: "text-blue-400" };
    if (percentage >= 50) return { message: "Good effort! 👍", color: "text-yellow-400" };
    return { message: "Keep practicing! 💪", color: "text-orange-400" };
  };

  const performance = getPerformanceMessage();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full mb-6">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Quiz Complete!</h1>
          <p className={`text-2xl font-semibold ${performance.color} mb-4`}>
            {performance.message}
          </p>
        </div>


        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-6 border border-white/20 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-6xl font-bold text-white mb-2">
              {result.score}/{result.totalQuestions}
            </div>
            <div className="text-2xl text-white/80 mb-4">
              {percentage}% Correct
            </div>
            <div className="text-white/60">
              Time taken: {formatTime(result.timeSpent)}
            </div>
          </div>


          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{result.score}</div>
              <div className="text-white/60">Correct</div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
              <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{result.totalQuestions - result.score}</div>
              <div className="text-white/60">Incorrect</div>
            </div>
            
            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 text-center">
              <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{Math.round(result.timeSpent / result.totalQuestions)}s</div>
              <div className="text-white/60">Avg per Q</div>
            </div>
          </div>


          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Question Review</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {questions.map((question, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex-1">
                    <div className="text-white/80 font-medium">Question {index + 1}</div>
                    <div className="text-white/60 text-sm truncate">{question.question}</div>
                    <div className="text-white/50 text-xs mt-1">{question.category} • {question.difficulty}</div>
                  </div>
                  <div className="flex items-center ml-4">
                    {result.answers[index] === question.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onRestartQuiz}
              className="flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Take Quiz Again
            </button>
            
            <button
              onClick={onBackToStart}
              className="flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl hover:bg-white/20 transition-all duration-200 border border-white/20"
            >
              <Home className="w-5 h-5 mr-2" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};