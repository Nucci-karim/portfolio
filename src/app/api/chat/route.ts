import Anthropic from "@anthropic-ai/sdk";
import { experience, languages, profile, projects, skills } from "@/lib/data";

export const runtime = "nodejs";
export const maxDuration = 30;

const MODEL = "claude-haiku-4-5";
const MAX_TOKENS = 512;
const HISTORY_LIMIT = 12;

const SYSTEM_PROMPT = buildSystemPrompt();

function buildSystemPrompt(): string {
  const projectLines = projects
    .map((p) => {
      const metrics = p.metrics
        ? ` | Metrics: ${p.metrics.map((m) => `${m.label}: ${m.value}`).join(", ")}`
        : "";
      return `- ${p.title} (${p.year}, ${p.category}): ${p.summary} | Stack: ${p.stack.join(", ")}${metrics}`;
    })
    .join("\n");

  const experienceLines = experience
    .map((e) => `- ${e.role} at ${e.company} (${e.period}): ${e.bullets.join("; ")}`)
    .join("\n");

  const skillLines = skills
    .map((g) => `- ${g.category}: ${g.items.map((i) => i.name).join(", ")}`)
    .join("\n");

  const languageLine = languages.map((l) => `${l.name} (${l.level})`).join(", ");

  return `You are an assistant on ${profile.name}'s personal portfolio site.
Your job: answer recruiter and visitor questions about Karim's experience, skills, projects, and career goals — concisely and warmly.

You only speak as the portfolio assistant, never pretending to be Karim. If asked something you don't know, say so and point the visitor to email ${profile.email} or LinkedIn ${profile.socials.linkedin}.

Tone: professional but human, short answers (3-5 sentences default), no fluff, no emoji unless the user uses them first.

Profile:
- Name: ${profile.name}
- Title: ${profile.title}
- Location: ${profile.location}
- Email: ${profile.email}
- LinkedIn: ${profile.socials.linkedin}
- GitHub: ${profile.socials.github}

Bio:
${profile.longBio.join("\n")}

Experience:
${experienceLines}

Languages: ${languageLine}

Skills by category:
${skillLines}

Selected projects:
${projectLines}

If asked about availability: Karim is currently at Accenture Rome but actively interviewing for mid-level Frontend roles in Dubai, target start Q3 2026. Open to Employment Visa sponsorship. Notice period 30 days.

If asked about salary expectations: redirect politely — "Salary expectations are best discussed directly with Karim once role specifics are clear."

If asked about contacting: encourage direct email to ${profile.email} or LinkedIn message.`;
}

type ClientMessage = { role: "user" | "assistant"; content: string };

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function friendlyError(err: unknown): string {
  if (err instanceof Anthropic.RateLimitError) {
    return `Too many questions right now. Please try again in a minute, or email ${profile.email} directly.`;
  }
  if (err instanceof Anthropic.AuthenticationError) {
    return `AI chat key is misconfigured. Please email ${profile.email} directly.`;
  }
  if (err instanceof Anthropic.APIError) {
    return `The AI service returned an error (${err.status}). Please email ${profile.email} directly.`;
  }
  return `Something went wrong reaching the AI service. Please email ${profile.email} directly.`;
}

export async function POST(req: Request) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return jsonError(
      "AI chat is not configured. Add ANTHROPIC_API_KEY to your environment variables and redeploy.",
      503,
    );
  }

  let body: { messages?: ClientMessage[] };
  try {
    body = await req.json();
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const messages =
    body.messages?.filter((m) => m?.content?.trim()).slice(-HISTORY_LIMIT) ?? [];
  if (messages.length === 0) return jsonError("No messages provided", 400);

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        const response = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: [
            {
              type: "text",
              text: SYSTEM_PROMPT,
              cache_control: { type: "ephemeral" },
            },
          ],
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
        });

        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        controller.enqueue(encoder.encode(`\n\n${friendlyError(err)}`));
        console.error("Anthropic stream error:", err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
