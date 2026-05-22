import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, AlertCircle, Play, HelpCircle } from 'lucide-react';
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

  return (
    <div className="mx-auto max-w-5xl">
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="font-display text-2xl font-bold tracking-tight text-brand-charcoal">
          Quiz Generator
        </h2>
        <p className="text-sm text-brand-charcoal/70 mt-1">
          Create practice quizzes from your uploaded files or any study topic to test your knowledge.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Column: Form Controls */}
        <div>
          <div className="rounded-2xl border border-brand-beige bg-white p-6 shadow-sm">
            <h3 className="font-display text-base font-bold text-brand-charcoal mb-4 flex items-center gap-2">
              <Sparkles className="h-4.5 w-4.5 text-brand-brown" />
              Configure Quiz
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label htmlFor="topic" className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/75 mb-1.5">
                  Study Topic / Subject
                </label>
                <input
                  id="topic"
                  type="text"
                  required
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g. Photosynthesis, World War II"
                  className="w-full h-10 rounded-xl border border-brand-beige bg-white px-3.5 text-sm text-brand-charcoal placeholder-brand-charcoal/35 transition-colors focus:border-brand-brown focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="difficulty" className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/75 mb-1.5">
                  Difficulty Level
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full h-10 rounded-xl border border-brand-beige bg-white px-3.5 text-sm text-brand-charcoal focus:border-brand-brown focus:outline-none"
                >
                  <option value="easy">Easy (Conceptual review)</option>
                  <option value="medium">Medium (Analytical review)</option>
                  <option value="hard">Hard (Deep evaluation)</option>
                </select>
              </div>

              <div>
                <label htmlFor="questionsCount" className="block text-xs font-bold uppercase tracking-wider text-brand-charcoal/75 mb-1.5">
                  Number of Questions
                </label>
                <select
                  id="questionsCount"
                  value={questionsCount}
                  onChange={(e) => setQuestionsCount(e.target.value)}
                  className="w-full h-10 rounded-xl border border-brand-beige bg-white px-3.5 text-sm text-brand-charcoal focus:border-brand-brown focus:outline-none"
                >
                  <option value="5">5 Questions</option>
                  <option value="10">10 Questions</option>
                  <option value="15">15 Questions</option>
                  <option value="20">20 Questions</option>
                </select>
              </div>

              <button
                id="generate-quiz-btn"
                type="submit"
                disabled={generating}
                className="group flex w-full items-center justify-center gap-1.5 h-10 rounded-xl bg-brand-brown text-sm font-semibold text-white shadow-md shadow-brand-brown/10 transition-all hover:bg-brand-brown/95 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none mt-6"
              >
                {generating ? (
                  <span className="flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                    Generating...
                  </span>
                ) : (
                  <>
                    <BookOpen className="h-4 w-4" />
                    Generate Quiz
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center rounded-2xl border border-brand-beige bg-white/40 p-12 text-center glassmorphic h-64 shadow-sm"
              >
                <span className="relative flex h-10 w-10">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-brown opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-10 w-10 bg-brand-brown/10 border border-brand-brown/30 items-center justify-center">
                    <Sparkles className="h-5 w-5 text-brand-brown animate-pulse" />
                  </span>
                </span>
                <h3 className="font-display text-base font-bold text-brand-charcoal mt-4 mb-1">
                  Creating Your Practice Quiz
                </h3>
                <p className="text-xs text-brand-charcoal/60 max-w-xs">
                  Reading notes, finding key ideas, and making practice questions...
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
                  onAction={() => document.getElementById('topic').focus()}
                />
              </motion.div>
            )}

            {!generating && activeQuiz && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-2xl border border-brand-beige bg-white p-6 shadow-sm text-left"
              >
                <div className="flex items-center justify-between border-b border-brand-beige/50 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-brown bg-brand-cream border border-brand-beige px-2 py-0.5 rounded-full">
                      {activeQuiz.difficulty} Difficulty
                    </span>
                    <h3 className="font-display text-lg font-bold text-brand-charcoal mt-1">
                      Quiz Topic: {activeQuiz.topic}
                    </h3>
                  </div>
                  <button
                    onClick={handleReset}
                    className="text-xs font-semibold text-brand-charcoal/65 hover:text-brand-charcoal px-3 py-1.5 rounded-lg border border-brand-beige hover:bg-brand-cream transition-colors"
                  >
                    Reset Quiz
                  </button>
                </div>

                <div className="space-y-6">
                  {activeQuiz.questions.map((q, idx) => (
                    <div key={idx} className="space-y-4">
                      <p className="text-sm font-bold text-brand-charcoal flex gap-2.5 items-start">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-brand-cream border border-brand-beige text-xs text-brand-brown font-semibold mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{q.question}</span>
                      </p>

                      <div className="grid gap-3 pl-7">
                        {q.options.map((opt, oIdx) => (
                          <button
                            key={oIdx}
                            onClick={() => alert(oIdx === q.answerIdx ? "Correct! Great job." : "Nice try! Review the topic again to find the correct answer.")}
                            className="w-full text-left rounded-xl border border-brand-beige hover:border-brand-brown hover:bg-brand-cream/40 p-4 text-xs font-medium text-brand-charcoal transition-all hover:translate-x-0.5"
                          >
                            {opt}
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
