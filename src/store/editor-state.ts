import { Content } from "@tiptap/react";
import { create } from "zustand";

interface EditorState {
  value: Content;
  setValue: (value: Content) => void;
}

export const useEditorState = create<EditorState>((set) => ({
  value: `<p class="text-node">Hope you liked my efforts and the product I built please provide me feedback here.</p><p class="text-node"><span><strong>Thank you</strong></span> for taking the time to share your thoughts!</p><p class="text-node"><em>Looking forward to hearing from you soon.</em></p><p class="text-node">`,
  setValue: (value: Content) => set({ value }),
}));
