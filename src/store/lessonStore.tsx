import { create } from "zustand";

interface LessonState {
  completedLessons: Set<string>;
  markLessonComplete: (lessonId: string) => void;
}

export const lessonStore = create<LessonState>((set) => ({
  completedLessons: new Set(),
  markLessonComplete: (lessonId) =>
    set((state) => {
      const newCompletedLessons = new Set(state.completedLessons);
      newCompletedLessons.add(lessonId);
      return { completedLessons: newCompletedLessons };
    }),
}));
