import { create } from "zustand";
import axios from "axios";

interface User {
  _id: string;
}

interface UserStore {
  user: User | null;
  username: string;
  email: string;
  password: string;
  isLoading: boolean;
  errors: {
    username?: string;
    email?: string;
    password?: string;
    server?: string;
  };
  setUser: (user: User) => void;
  setUsername: (username: string) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setErrors: (errors: Partial<UserStore["errors"]>) => void;
  resetForm: () => void;
  signUp: (username: string, email: string, password: string) => Promise<void>;
}

export const userStore = create<UserStore>((set) => ({
  user: null,
  username: "",
  email: "",
  password: "",
  isLoading: false,
  errors: {},
  setUser: (user) => set({ user }),
  setUsername: (username) => set({ username }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setErrors: (errors) =>
    set((state) => ({ errors: { ...state.errors, ...errors } })),
  resetForm: () => set({ username: "", email: "", password: "", errors: {} }),
  signUp: async (username, email, password) => {
    set({ isLoading: true });
    try {
      const response = await axios.post("/api/auth", {
        username,
        email,
        password,
      });
      set({
        user: response.data,
        isLoading: false,
        errors: {},
      });
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          set({
            errors: {
              server: "Email or username already exists",
            },
          });
        } else if (error.response?.status === 500) {
          set({
            errors: {
              server: "An error occurred. Please try again later.",
            },
          });
        } else {
          set({
            errors: {
              server: "An unexpected error occurred.",
            },
          });
        }
      } else {
        console.error("Failed to sign up:", error);
      }
      set({ isLoading: false });
    }
  },
}));
