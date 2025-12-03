export type QuizQuestion = {
  id: string;
  prompt: string;
  options: { id: string; text: string; score: number }[];
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    prompt: "What kind of connection feels best to you right now?",
    options: [
      { id: "a", text: "Playful + exciting", score: 3 },
      { id: "b", text: "Steady + aligned", score: 2 },
      { id: "c", text: "Deep + safe", score: 1 },
    ],
  },
  {
    id: "q2",
    prompt: "How fast do you like emotional intimacy to build?",
    options: [
      { id: "a", text: "Pretty quickly if the vibe is right", score: 3 },
      { id: "b", text: "Naturally over time", score: 2 },
      { id: "c", text: "Slow and earned", score: 1 },
    ],
  },
  {
    id: "q3",
    prompt: "What matters most early on?",
    options: [
      { id: "a", text: "Chemistry", score: 3 },
      { id: "b", text: "Consistency", score: 2 },
      { id: "c", text: "Emotional safety", score: 1 },
    ],
  },
  {
    id: "q4",
    prompt: "Your ideal first date energy is…",
    options: [
      { id: "a", text: "Fun, flirty, high energy", score: 3 },
      { id: "b", text: "Comfortable, easy, intentional", score: 2 },
      { id: "c", text: "Quiet, deep, meaningful", score: 1 },
    ],
  },
];