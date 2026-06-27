export interface LessonExample {
  title: string;
  code: string;
  explanation: string[];
}

export interface LessonChallenge {
  title: string;
  description: string;
  startingCode: string;
  solutionHint: string;
}

export interface Lesson {
  id: number;
  title: string;
  shortDescription: string;
  learningObjectives: string[];
  analogyTitle?: string;
  analogyText?: string;
  conceptText: string;
  examples: LessonExample[];
  playgroundPrompt: string;
  challenge: LessonChallenge;
  commonMistakes: string[];
}

export interface UserProgress {
  completedLessons: number[]; // Array of completed lesson IDs
  playgroundCode: { [lessonId: number]: string }; // Custom playground state for each lesson
  isSidebarOpen: boolean;
  currentLessonId: number;
}
