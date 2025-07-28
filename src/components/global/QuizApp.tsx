
'use client';
import React, { useState, useEffect } from 'react';
import { StartScreen } from './StartScreen';
import { QuizScreen } from './QuizScreen';
import { ResultsScreen } from './ResultScreen';
import { 
  Question, 
  QuizResult, 
  OpenTDBResponse, 
  transformOpenTDBQuestion 
} from '../../lib/quiz-types';

export default function QuizApp() {
  const [currentScreen, setCurrentScreen] = useState<'start' | 'quiz' | 'results'>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [quizStartTime, setQuizStartTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentScreen === 'quiz' && quizStartTime) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - quizStartTime) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentScreen, quizStartTime]);

  const fetchQuestions = async (): Promise<Question[]> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('https://opentdb.com/api.php?amount=15');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: OpenTDBResponse = await response.json();
      
      if (data.response_code !== 0) {
        throw new Error('Failed to fetch questions from API');
      }
      
      const transformedQuestions = data.results.map((q, index) => 
        transformOpenTDBQuestion(q, index)
      );
      
      return transformedQuestions;
    } catch (err) {
      console.error('Error fetching questions:', err);
      throw new Error('Failed to load questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const startQuiz = async () => {
    try {
      const fetchedQuestions = await fetchQuestions();
      setQuestions(fetchedQuestions);
      setSelectedAnswers(new Array(fetchedQuestions.length).fill(null));
      setCurrentScreen('quiz');
      setQuizStartTime(Date.now());
      setCurrentQuestion(0);
      setTimeElapsed(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      finishQuiz();
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const finishQuiz = () => {
    setCurrentScreen('results');
  };

  const calculateScore = (): QuizResult => {
    let score = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        score++;
      }
    });
    return {
      score,
      totalQuestions: questions.length,
      answers: selectedAnswers,
      timeSpent: timeElapsed
    };
  };

  const restartQuiz = () => {
    setCurrentScreen('start');
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setTimeElapsed(0);
    setQuizStartTime(null);
    setQuestions([]);
    setError(null);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-red-500/20 shadow-2xl text-center">
            <div className="text-red-400 text-xl font-semibold mb-4">Error</div>
            <p className="text-white/80 mb-6">{error}</p>
            <button
              onClick={restartQuiz}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }


  switch (currentScreen) {
    case 'start':
      return <StartScreen onStartQuiz={startQuiz} isLoading={isLoading} />;
    case 'quiz':
      return (
        <QuizScreen
          questions={questions}
          currentQuestion={currentQuestion}
          selectedAnswers={selectedAnswers}
          timeElapsed={timeElapsed}
          onAnswerSelect={handleAnswerSelect}
          onNextQuestion={goToNextQuestion}
          onPreviousQuestion={goToPreviousQuestion}
        />
      );
    case 'results':
      return (
        <ResultsScreen
          questions={questions}
          result={calculateScore()}
          onRestartQuiz={restartQuiz}
          onBackToStart={() => setCurrentScreen('start')}
        />
      );
    default:
      return <StartScreen onStartQuiz={startQuiz} isLoading={isLoading} />;
  }
}