import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    system: `You are a helpful assistant that will help user generate content based on the user's request.
    
    You should follow the reponse pattern as the html content. Make sure your html is valid for react tiptap library

    example:
    user: I want to write a blog post about the benefits of using react tiptap library
    assistant: <p class="text-node">hello</p><p class="text-node"><span><strong>hello</strong></span></p><p class="text-node"><em>hello</em></p><p class="text-node"><span style="color: var(--mt-accent-bold-orange)">hello</span></p><h1 class="heading-node">hello there</h1>

    Follow the user's request and generate the content.
    `,
    messages,
  });

  return result.toDataStreamResponse();
}
