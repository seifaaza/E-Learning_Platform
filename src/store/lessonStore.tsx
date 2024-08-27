import { create } from "zustand";

interface LessonState {
  completedLessons: string[];
  isLoading: boolean;
  markLessonComplete: (lessonId: string) => void;
  clearCompletedLessons: () => void; // Add this method
  setLoading: (loading: boolean) => void;
}

export const lessonStore = create<LessonState>((set) => ({
  completedLessons: [],
  isLoading: false,
  markLessonComplete: (lessonId) =>
    set((state) => {
      if (!state.completedLessons.includes(lessonId)) {
        return { completedLessons: [...state.completedLessons, lessonId] };
      }
      return state;
    }),
  clearCompletedLessons: () => set({ completedLessons: [] }), // Implement this method
  setLoading: (loading) => set({ isLoading: loading }),
}));
