# CausalFunnel Quiz Application

A modern quiz application built with Next.js and TypeScript that fetches trivia questions from the Open Trivia Database API. Features real-time scoring, timer functionality, and comprehensive results tracking.

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/LakshaySharma10/causalfunnel.git
cd causalfunnel
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

## Project Structure

```
causalfunnel/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── global/
│   │   ├── StartScreen.tsx
│   │   ├── QuizScreen.tsx
│   │   ├── ResultsScreen.tsx
│   │   └── QuizApp.tsx
│   └── ui/
│       └── spotlight.tsx
├── package.json
```

## Component Architecture

### Core Components
- **QuizApp.tsx** - Main application logic, state management, and API integration
- **StartScreen.tsx** - Welcome screen with quiz introduction and start functionality
- **QuizScreen.tsx** - Question display, answer selection, and navigation
- **ResultsScreen.tsx** - Score display, performance metrics, and quiz review

### Utility Files
- **quiz-types.ts** - TypeScript interfaces, API response types, and utility functions
- **spotlight.tsx** - Background visual effect component

## API Integration
The application integrates with the Open Trivia Database API:
- Endpoint: `https://opentdb.com/api.php?amount=15`
