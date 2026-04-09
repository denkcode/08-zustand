import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { NewNotePayload } from "@/types/note";

type NoteDraftStore = {
  draft: NewNotePayload;
  setDraft: (note: NewNotePayload) => void;
  clearDraft: () => void;
};

const INITIAL_DRAFT: NewNotePayload = {
  title: "",
  content: "",
  tag: 'Todo'
};

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: INITIAL_DRAFT,
      setDraft: (note) => set({ draft: note }),
      clearDraft: () => set({ draft: INITIAL_DRAFT }),
    }),
    {
      name: "note-draft",
    },
  ),
);