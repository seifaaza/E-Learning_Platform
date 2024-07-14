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
  lessons: Lesson[];
  lesson: Lesson | null; // To store a single lesson
  loading: boolean; // Add loading state
  fetchLessons: () => Promise<void>;
  fetchLessonById: (id: string) => Promise<void>; // New method to fetch a single lesson
}

export const lessonStore = create<LessonStore>((set) => ({
  lessons: [],
  lesson: null,
  loading: false, // Initialize loading state
  fetchLessons: async () => {
    set({ loading: true }); // Set loading to true
    try {
      const response = await axios.get("http://localhost:3000/api/lessons");
      const data: Lesson[] = response.data;
      set({ lessons: data });
    } catch (error) {
      console.error("Error fetching lessons:", error);
    } finally {
      set({ loading: false }); // Set loading to false
    }
  },
  fetchLessonById: async (id: string) => {
    set({ loading: true }); // Set loading to true
    try {
      const response = await axios.get(
        `http://localhost:3000/api/lessons/${id}`
      );
      const data: Lesson = response.data;
      set({ lesson: data });
    } catch (error) {
      console.error("Error fetching lesson:", error);
    } finally {
      set({ loading: false }); // Set loading to false
    }
  },
}));

// Immediately fetch lessons when the store is created
lessonStore.getState().fetchLessons();
