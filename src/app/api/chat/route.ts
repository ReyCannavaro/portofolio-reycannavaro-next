import { NextResponse } from "next/server";
import { getPortfolioContext } from "@/app/lib/portfolioContext";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type GroqResponseBody = {
  choices?: {
    message?: {
      content?: string;
    };
  }[];
  error?: {
    message?: string;
  };
};

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
const MAX_MESSAGES = 10;

function isChatMessage(message: unknown): message is ChatMessage {
  if (!message || typeof message !== "object") return false;

  const candidate = message as Record<string, unknown>;
  return (
    (candidate.role === "user" || candidate.role === "assistant") &&
    typeof candidate.content === "string" &&
    candidate.content.trim().length > 0
  );
}

function extractOutputText(data: GroqResponseBody) {
  return data.choices?.[0]?.message?.content?.trim();
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GROQ_API_KEY belum tersedia di environment server." },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as { messages?: unknown };
    const rawMessages = Array.isArray(body.messages) ? body.messages : [];
    const messages: ChatMessage[] = rawMessages.filter(isChatMessage).slice(-MAX_MESSAGES);

    if (!messages.length) {
      return NextResponse.json({ error: "Pesan chat masih kosong." }, { status: 400 });
    }

    const systemPrompt = [
      "Namamu Nava. Kamu adalah chatbot asisten personal untuk website portofolio Rey Cannavaro.",
      "Bicara seperti teman diskusi yang cerdas, hangat, santai, percaya diri, dan tetap profesional. Jangan terlalu kaku atau seperti brosur.",
      "Gunakan bahasa Indonesia natural. Utamakan kata aku, kamu, dan Rey agar terasa dekat. Hindari pembuka formal seperti 'Selamat datang' atau 'Saya senang membantu'.",
      "Jangan pernah membuka jawaban dengan 'Selamat datang', 'Tentu', 'Baik', atau kalimat layanan pelanggan. Langsung jawab inti pertanyaan dengan gaya ngobrol.",
      "Tugasmu membantu pengunjung memahami Rey: skill, project, pengalaman, pendidikan, prestasi, kontak, dan potensi kerja sama.",
      "Saat diajak diskusi, sambungkan jawaban dengan konteks pertanyaan sebelumnya dan data portofolio Rey yang tersedia.",
      "Kalau user bertanya opini atau rekomendasi, beri jawaban bernalar dari data Rey. Misalnya cocok untuk project apa, project mana yang relevan, atau teknologi yang paling kuat.",
      "Tetap jujur: gunakan data portofolio sebagai sumber fakta. Jika data tidak tersedia, bilang belum ada datanya dan tawarkan hal terdekat yang bisa dibahas.",
      "Jangan mengarang pengalaman, harga jasa, status ketersediaan pasti, link, identitas, atau klaim yang tidak ada di data.",
      "Jangan melemahkan profil Rey dengan asumsi negatif seperti butuh bimbingan, belum siap, atau kurang mampu kecuali data jelas menyebut itu. Jika perlu memberi batasan, sampaikan sebagai ruang lingkup yang sehat.",
      "Untuk pertanyaan sederhana, jawab ringkas. Untuk pertanyaan diskusi, boleh lebih elaboratif dan akhiri dengan pertanyaan lanjutan yang relevan bila membantu.",
      "Jika pengunjung terlihat ingin kerja sama, arahkan dengan halus ke email, LinkedIn, atau GitHub Rey.",
      `Data portofolio Rey:\n${getPortfolioContext()}`,
    ].join("\n\n");

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          ...messages.map((message) => ({
            role: message.role,
            content: message.content.slice(0, 2000),
          })),
        ],
        temperature: 0.7,
        max_completion_tokens: 700,
      }),
    });

    const data = (await response.json()) as GroqResponseBody;

    if (!response.ok) {
      const message = data.error?.message || "Gagal menghubungi model AI.";
      const isRateLimitError = response.status === 429;
      const isInvalidApiKeyError =
        response.status === 401 || /invalid api key|unauthorized|api key/i.test(message);

      return NextResponse.json(
        {
          error: isRateLimitError
            ? "Rate limit Groq sedang tercapai. Coba lagi sebentar lagi."
            : isInvalidApiKeyError
            ? "GROQ_API_KEY belum valid. Pakai API key dari console.groq.com."
            : message,
        },
        { status: response.status }
      );
    }

    const reply = extractOutputText(data);

    return NextResponse.json({
      reply: reply || "Maaf, saya belum bisa membuat jawaban untuk pertanyaan itu.",
    });
  } catch (error) {
    console.error("[/api/chat]", error);
    return NextResponse.json({ error: "Terjadi kesalahan saat memproses chat." }, { status: 500 });
  }
}
