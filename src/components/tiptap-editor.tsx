"use client";

import { cn } from "@/lib/utils";
import { MinimalTiptapEditor } from "./minimal-tiptap";
import { z } from "zod";
import { useEditorState } from "@/store/editor-state";

const formSchema = z.object({
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description is required"),
});

export default function TipTapEditor() {
  const { value, setValue } = useEditorState();

  return (
    <section className="max-w-[1000px] flex flex-col h-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="group flex min-w-0 items-center gap-2">
          <h1
            className="truncate text-2xl font-semibold text-foreground/90 tracking-tight"
            data-document-id="48be489b-2fa0-4bc9-b535-1b8bc49dece6"
          >
            Getting Started
          </h1>
        </div>
      </div>
      {/* <RichTextEditor /> */}
      <div className="w-full space-y-6 flex-1 h-full">
        <MinimalTiptapEditor
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
          throttleDelay={0}
          className={cn(
            "w-full h-full"
            // "border-destructive focus-within:border-destructive h-full"
          )}
          editorContentClassName="some-class"
          output="html"
          placeholder="Type your description here..."
          autofocus
          immediatelyRender
          editable
          injectCSS
          editorClassName="focus:outline-none p-5"
        />
      </div>
    </section>
  );
}
