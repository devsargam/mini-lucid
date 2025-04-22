import { AppSidebar } from "@/components/app-sidebar";
import { ChatSection } from "@/components/chat-section";
import { TipTapEditor } from "@/components/tiptap-editor";
import { ResizableHandle } from "@/components/ui/resizable";
import { ResizablePanelGroup } from "@/components/ui/resizable";
import { ResizablePanel } from "@/components/ui/resizable";

export default function EditorPage() {
  return (
    <main className="flex h-screen w-screen">
      <AppSidebar />
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel className="p-4">
          <TipTapEditor />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} className="p-4">
          <ChatSection />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
