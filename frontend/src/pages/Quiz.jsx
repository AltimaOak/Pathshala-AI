import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, AlertCircle, Play, HelpCircle, RotateCcw, CheckCircle2 } from 'lucide-react';
import { EmptyState } from '../components';

export default function Quiz() {
  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('medium');
  const [questionsCount, setQuestionsCount] = useState('5');
  const [generating, setGenerating] = useState(false);
  const [activeQuiz, setActiveQuiz] = useState(null); // Strictly empty initially

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setGenerating(true);
    // Simulate generation loading transition
    setTimeout(() => {
      setGenerating(false);
      // Create a single sample quiz dynamically *only* upon explicit user request
      setActiveQuiz({
        topic: topic,
        difficulty: difficulty,
        questions: [
          {
            question: `Which of the following best describes the core concept behind "${topic}"?`,
            options: [
              'A system that relies strictly on memorization without conceptual understanding.',
              'An adaptive mechanism that shapes explanations based on structural and contextual feedback.',
              'A standard pre-programmed database retrieval script.',
              'A localized storage component with no learning capabilities.'
            ],
            answerIdx: 1
          }
        ]
      });
    }, 2500);
  };

  const handleReset = () => {
    setActiveQuiz(null);
    setTopic('');
  };

  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

  return (
    <div className="mx-auto max-w-5xl space-y-7 pb-10 text-left">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-brown/10 border border-brand-brown/20 px-3 py-1 text-xs font-semibold text-brand-brown mb-2.5">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Interactive Knowledge Check</span>
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-brand-charcoal">
          Quiz Generator
        </h2>
        <p className="text-sm text-brand-charcoal/70 mt-1 max-w-2xl leading-relaxed">
          Create customized practice tests from any topic or concept to evaluate your comprehension and prepare for exams.
        </p>
      </div>

      <div className="grid gap-7 md:grid-cols-3 items-start">
        {/* Left Column: Form Controls */}
        <div>
          <div className="rounded-2xl border border-brand-beige/80 bg-white p-6 shadow-xs">
            <div className="flex items-center gap-2 pb-4 border-b border-brand-beige/50 mb-5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-brown/10 text-brand-brown">
                <Sparkles className="h-4 w-4" />
              </div>
              <h3 className="font-display text-sm font-bold text-brand-charcoal">
                Configure Test
              </h3>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4.5">
              <div>
                <label htmlFor="topic" className="block text-xs font-bold text-brand-charcoal/80 mb-1.5">
                  Study Topic or Concept
                </label>
                <input
                  id="topic"
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Photosynthesis, Thermodynamics..."
                  className="w-full h-10.5 rounded-xl border border-brand-beige/80 bg-white px-3.5 text-xs font-medium text-brand-charcoal placeholder-brand-charcoal/35 transition-all focus:border-brand-brown/70 focus:ring-2 focus:ring-brand-brown/10 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="difficulty" className="block text-xs font-bold text-brand-charcoal/80 mb-1.5">
                  Difficulty Level
                </label>
                <div className="relative">
                  <select
                    id="difficulty"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full h-10.5 rounded-xl border border-brand-beige/80 bg-white px-3.5 text-xs font-medium text-brand-charcoal transition-all focus:border-brand-brown/70 focus:ring-2 focus:ring-brand-brown/10 focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="easy">Easy (Conceptual Fundamentals)</option>
                    <option value="medium">Medium (Analytical Application)</option>
                    <option value="hard">Hard (Deep Evaluation & Synthesis)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-brand-charcoal/40 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="questionsCount" className="block text-xs font-bold text-brand-charcoal/80 mb-1.5">
                  Number of Questions
                </label>
                <div className="relative">
                  <select
                    id="questionsCount"
                    value={questionsCount}
                    onChange={(e) => setQuestionsCount(e.target.value)}
                    className="w-full h-10.5 rounded-xl border border-brand-beige/80 bg-white px-3.5 text-xs font-medium text-brand-charcoal transition-all focus:border-brand-brown/70 focus:ring-2 focus:ring-brand-brown/10 focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="5">5 Questions (Quick Review)</option>
                    <option value="10">10 Questions (Standard Test)</option>
                    <option value="15">15 Questions (Deep Practice)</option>
                    <option value="20">20 Questions (Full Mock Exam)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-brand-charcoal/40 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              <button
                id="generate-quiz-btn"
                type="submit"
                disabled={generating}
                className="group flex w-full items-center justify-center gap-2 h-11 rounded-xl bg-brand-brown text-xs font-bold text-white shadow-sm transition-all hover:bg-brand-brown/90 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none mt-6 cursor-pointer"
              >
                {generating ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    <span>Building Quiz Questions...</span>
                  </span>
                ) : (
                  <>
                    <BookOpen className="h-4 w-4" />
                    <span>Generate Practice Quiz</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Quiz Playground Frame */}
        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            {generating && (
              <motion.div
                key="loader"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-brand-beige/80 bg-white p-12 text-center shadow-xs min-h-[340px]"
              >
                <div className="relative mb-5 flex h-14 w-14 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-brown/20 opacity-75"></span>
                  <div className="relative inline-flex rounded-2xl h-12 w-12 bg-brand-cream border border-brand-beige items-center justify-center text-brand-brown">
                    <Sparkles className="h-6 w-6 animate-pulse" />
                  </div>
                </div>
                <h3 className="font-display text-base font-bold text-brand-charcoal mb-1">
                  Synthesizing Questions for "{topic}"
                </h3>
                <p className="text-xs text-brand-charcoal/60 max-w-sm leading-relaxed">
                  Analyzing core concepts, structuring distractor options, and preparing your practice set...
                </p>
              </motion.div>
            )}

            {!generating && !activeQuiz && (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EmptyState
                  illustrationType="quiz"
                  title="No quizzes generated yet"
                  description="Choose the topic and question settings on the left to create your first practice quiz."
                  actionLabel="Start Quiz Config"
                  onAction={() => document.getElementById('topic')?.focus()}
                />
              </motion.div>
            )}

            {!generating && activeQuiz && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-brand-beige/80 bg-white p-6 md:p-7 shadow-xs text-left space-y-6"
              >
                {/* Active Quiz Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-brand-beige/50 pb-5">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-brown bg-brand-brown/10 border border-brand-brown/20 px-2.5 py-0.5 rounded-full">
                        {activeQuiz.difficulty}
                      </span>
                      <span className="text-xs font-semibold text-brand-charcoal/50">
                        {activeQuiz.questions.length} Question{activeQuiz.questions.length > 1 ? 's' : ''}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-bold text-brand-charcoal">
                      {activeQuiz.topic}
                    </h3>
                  </div>

                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-charcoal/70 hover:text-brand-charcoal px-3.5 py-1.5 rounded-xl border border-brand-beige/80 hover:bg-brand-cream/60 transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Reset Quiz</span>
                  </button>
                </div>

                {/* Questions Stream */}
                <div className="space-y-7">
                  {activeQuiz.questions.map((q, idx) => (
                    <div key={idx} className="space-y-4">
                      <div className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-brown/10 border border-brand-brown/20 text-xs font-bold text-brand-brown mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-sm font-semibold text-brand-charcoal leading-snug">
                          {q.question}
                        </p>
                      </div>

                      {/* Options Grid */}
                      <div className="grid gap-2.5 sm:pl-9">
                        {q.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => alert(oIdx === q.answerIdx ? "Correct! Great job." : "Nice try! Review the topic again to find the correct answer.")}
                            className="group flex items-start gap-3 w-full text-left rounded-xl border border-brand-beige/80 bg-white hover:border-brand-brown/60 hover:bg-brand-cream/30 p-3.5 text-xs font-medium text-brand-charcoal transition-all hover:shadow-2xs cursor-pointer active:scale-[0.99]"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-brand-beige bg-brand-cream/60 text-[10px] font-bold text-brand-charcoal/60 group-hover:border-brand-brown/40 group-hover:text-brand-brown transition-colors">
                              {optionLetters[oIdx] || oIdx + 1}
                            </span>
                            <span className="leading-relaxed pt-0.5">{opt}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
