import { create } from "zustand";
import axios from "axios";

interface Lesson {
  _id: string;
  title: string;
  img: string;
  src: string;
  description: string;
  source: string;
  pausedTime: number;
  tags: string[];
  created_at: string;
  language: string;
}

interface LessonStore {
  lesson: Lesson | null; // To store a single lesson
  loading: boolean; // Add loading state
  fetchLessonById: (id: string) => Promise<void>; // Method to fetch a single lesson
}

export const lessonStore = create<LessonStore>((set) => ({
  lesson: null,
  loading: false, // Initialize loading state
  fetchLessonById: async (id: string) => {
    set({ loading: true }); // Set loading to true
    try {
      const response = await axios.get(`/api/lessons/${id}`);
      const data: Lesson = response.data;
      set({ lesson: data });
    } catch (error) {
      console.error("Error fetching lesson:", error);
    } finally {
      set({ loading: false }); // Set loading to false
    }
  },
}));
