"use client";

import { cn } from "@/lib/utils";
import { MinimalTiptapEditor } from "./minimal-tiptap";
import { Form, useForm } from "react-hook-form";
import { FormField } from "./ui/form";
import { useCallback, useRef } from "react";
import { Editor } from "@tiptap/react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description is required"),
});

export default function TipTapEditor() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
    },
  });
  const editorRef = useRef<Editor | null>(null);

  const handleCreate = useCallback(
    ({ editor }: { editor: Editor }) => {
      if (form.getValues("description") && editor.isEmpty) {
        editor.commands.setContent(form.getValues("description"));
      }
      editorRef.current = editor;
    },
    [form]
  );

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
      <Form
        {...form}
        onSubmit={(e) => form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex-1 h-full"
      >
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <MinimalTiptapEditor
              {...field}
              throttleDelay={0}
              className={cn("w-full", {
                "border-destructive focus-within:border-destructive h-full":
                  form.formState.errors.description,
              })}
              editorContentClassName="some-class"
              output="html"
              placeholder="Type your description here..."
              onCreate={handleCreate}
              autofocus={true}
              immediatelyRender={true}
              editable={true}
              injectCSS={true}
              editorClassName="focus:outline-none p-5"
            />
          )}
        ></FormField>
      </Form>
    </section>
  );
}
