"use client";

import {
  EditorContent,
  FloatingMenu,
  mergeAttributes,
  Node,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import Bold from "@tiptap/extension-bold";
import { BoldIcon, LoaderCircle } from "lucide-react";
import { Button } from "./ui/button";

export default () => {
  const editor = useEditor({
    extensions: [StarterKit, Bold],
    content: `
        <p>This isn't bold.</p>
        <p><strong>This is bold.</strong></p>
        <p><b>And this.</b></p>
        <p style="font-weight: bold">This as well.</p>
        <p style="font-weight: bolder">Oh, and this!</p>
        <p style="font-weight: 500">Cool, isn't it!?</p>
        <p style="font-weight: 999">Up to font weight 999!!!</p>
    `,
  });

  const [isEditable, setIsEditable] = React.useState(true);

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditable);
    }
  }, [isEditable, editor]);

  if (!editor) {
    return <LoaderCircle className="animate-spin" />;
  }

  return (
    <>
      <div className="control-group">
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          variant={editor.isActive("bold") ? "default" : "outline"}
        >
          <BoldIcon className="w-4 h-4" />
        </Button>
      </div>

      <EditorContent editor={editor} />
    </>
  );
};
