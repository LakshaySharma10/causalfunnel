import React from 'react';
import { Clock } from 'lucide-react';
import { Question, formatTime } from '../../lib/quiz-types';

interface QuizScreenProps {
  questions: Question[];
  currentQuestion: number;
  selectedAnswers: (number | null)[];
  timeElapsed: number;
  onAnswerSelect: (answerIndex: number) => void;
  onNextQuestion: () => void;
  onPreviousQuestion: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  questions,
  currentQuestion,
  selectedAnswers,
  timeElapsed,
  onAnswerSelect,
  onNextQuestion,
  onPreviousQuestion,
}) => {
  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading question...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">

        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-6 border border-white/20">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <span className="text-white/80 font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <div className="flex items-center text-white/80">
                <Clock className="w-4 h-4 mr-1" />
                {formatTime(timeElapsed)}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-white/60 mb-1">{question.category}</div>
              <div className="text-xs text-white/50 capitalize">{question.difficulty}</div>
            </div>
          </div>
          

          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>


        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-8 leading-relaxed">
            {question.question}
          </h2>

          <div className="space-y-4 mb-8">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswerSelect(index)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 transform hover:scale-[1.02] ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-500/20 text-white shadow-lg'
                    : 'border-white/20 bg-white/5 text-white/90 hover:border-white/40 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-blue-400 bg-blue-500'
                      : 'border-white/40'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={onPreviousQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-white/10 text-white font-medium rounded-xl hover:bg-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-white/20"
            >
              Previous
            </button>

            <span className="text-white/60 text-sm">
              {selectedAnswers.filter(a => a !== null).length} of {questions.length} answered
            </span>

            <button
              onClick={onNextQuestion}
              disabled={selectedAnswers[currentQuestion] === null}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};