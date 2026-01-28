import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { zustandJSONStorage } from '@/lib/storage/unified-storage';

export type SmallProfileSummary = {
  id: string | null;
  username?: string | null;
  full_name?: string | null;
  avatar_url?: string | null;
  completed: boolean | null;
};

type AuthSlice = {
  userId: string | null;
  email: string | null;
  isAuthenticated: boolean;
  setAuth: (p: { userId: string | null; email: string | null }) => void;
  resetAuth: () => void;
  // small profile summary for fast UI/gating (NOT authoritative)
  profileSummary: SmallProfileSummary;
  setProfileSummary: (s: Partial<SmallProfileSummary>) => void;
  clearProfileSummary: () => void;
};

type ThemeSlice = {
  theme: 'system' | 'light' | 'dark';
  setTheme: (t: 'system' | 'light' | 'dark') => void;
};

type ProfileLocalSlice = {
  // draft changes user is editing in UI (not sent until save)
  editDraft: Partial<Record<string, unknown>> | null;
  setEditDraft: (draft: Partial<Record<string, unknown>> | null) => void;
  clearDraft: () => void;
  // optional: small optimistic flag for pending save
  isSavingProfileDraft: boolean;
  setIsSavingProfileDraft: (v: boolean) => void;
};

type PrefLocalSlice = {
  toggles: Record<string, boolean>;
  setToggle: (key: string, value: boolean) => void;
  resetToggles: () => void;
};

type HydrationSlice = {
  _hasHydrated: boolean;
  _setHasHydrated: (v: boolean) => void;
};

export type AppState = AuthSlice & ThemeSlice & ProfileLocalSlice & PrefLocalSlice & HydrationSlice;

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // AUTH (derived, NOT persisted)
        userId: null,
        email: null,
        isAuthenticated: false,
        profileSummary: {
          id: null,
          username: null,
          full_name: null,
          avatar_url: null,
          completed: null,
        },
        setAuth: ({ userId, email }) =>
          set({
            userId,
            email,
            isAuthenticated: !!userId,
            profileSummary: { ...(get().profileSummary || {}), id: userId || null },
          }),
        resetAuth: () =>
          set({
            userId: null,
            email: null,
            isAuthenticated: false,
            profileSummary: {
              id: null,
              username: null,
              full_name: null,
              avatar_url: null,
              completed: null,
            },
          }),
        setProfileSummary: (s) =>
          set((st) => ({ profileSummary: { ...(st.profileSummary || {}), ...s } })),
        clearProfileSummary: () =>
          set({
            profileSummary: {
              id: null,
              username: null,
              full_name: null,
              avatar_url: null,
              completed: null,
            },
          }),

        // THEME (persisted)
        theme: 'system',
        setTheme: (t) => set({ theme: t }),

        // PROFILE LOCAL DRAFT (not persisted)
        editDraft: null,
        setEditDraft: (draft) => set({ editDraft: draft }),
        clearDraft: () => set({ editDraft: null }),
        isSavingProfileDraft: false,
        setIsSavingProfileDraft: (v) => set({ isSavingProfileDraft: v }),

        // PREFS (persisted)
        toggles: {},
        setToggle: (key, value) => set((s) => ({ toggles: { ...s.toggles, [key]: value } })),
        resetToggles: () => set({ toggles: {} }),

        // hydration
        _hasHydrated: false,
        _setHasHydrated: (v) => set({ _hasHydrated: v }),
      }),
      {
        name: 'ktu-app-store-v1',
        storage: createJSONStorage(() => zustandJSONStorage),
        partialize: (s) => ({
          // Persist only safe UX bits
          theme: s.theme,
          toggles: s.toggles,
        }),
        onRehydrateStorage: () => (state) => {
          state?._setHasHydrated?.(true);
        },
      }
    )
  )
);
