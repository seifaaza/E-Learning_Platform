import { create } from "zustand";

interface LessonStore {
  isVideoEnded: boolean;
  setIsVideoEnded: (ended: boolean) => void;
}

export const lessonStore = create<LessonStore>((set) => ({
  isVideoEnded: false,
  setIsVideoEnded: (ended) => set({ isVideoEnded: ended }),
}));
