import { Content } from "@tiptap/react";
import { create } from "zustand";

interface EditorState {
  value: Content;
  setValue: (value: Content) => void;
}

export const useEditorState = create<EditorState>((set) => ({
  value: null,
  setValue: (value: Content) => set({ value }),
}));
