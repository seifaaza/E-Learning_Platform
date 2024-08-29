import { create } from "zustand";

interface CourseState {
  rating: number;
  setRating: (newRating: number) => void;
}

export const courseStore = create<CourseState>((set) => ({
  rating: 0, // Default rating value
  setRating: (newRating) => set({ rating: newRating }),
}));
