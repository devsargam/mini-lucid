"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { ChatSection } from "@/components/chat-section";
import { ResizableHandle } from "@/components/ui/resizable";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import { ResizablePanel } from "@/components/ui/resizable";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const TipTapEditor = dynamic(() => import("@/components/tiptap-editor"), {
  ssr: false,
});

export default function HomePage() {
  return (
    <main className="flex h-screen w-screen">
      <AppSidebar />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={66} className="px-8 py-6">
          <Suspense fallback={<div>Loading...</div>}>
            <TipTapEditor />
          </Suspense>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={33} className="p-4">
          <ChatSection />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
