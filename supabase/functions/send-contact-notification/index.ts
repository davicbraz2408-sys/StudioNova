import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactPayload {
  nome: string;
  email: string;
  mensagem: string;
}

function validatePayload(body: unknown): { valid: boolean; data?: ContactPayload; error?: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Corpo da requisição inválido." };
  }

  const { nome, email, mensagem } = body as Record<string, unknown>;

  if (typeof nome !== "string" || nome.trim().length < 2) {
    return { valid: false, error: "Nome deve ter no mínimo 2 caracteres." };
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return { valid: false, error: "E-mail inválido." };
  }

  if (typeof mensagem !== "string" || mensagem.trim().length < 10) {
    return { valid: false, error: "Mensagem deve ter no mínimo 10 caracteres." };
  }

  return {
    valid: true,
    data: { nome: nome.trim(), email: email.trim(), mensagem: mensagem.trim() },
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Método não permitido." }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    const { valid, data, error } = validatePayload(body);

    if (!valid || !data) {
      return new Response(
        JSON.stringify({ error: error ?? "Dados inválidos." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: inserted, error: insertError } = await supabase
      .from("contatos")
      .insert({
        nome: data.nome,
        email: data.email,
        mensagem: data.mensagem,
      })
      .select("id, created_at")
      .single();

    if (insertError || !inserted) {
      return new Response(
        JSON.stringify({ error: "Erro ao salvar contato no banco de dados." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const notificationEmail = Deno.env.get("NOTIFICATION_EMAIL");
    const submittedAt = new Date(inserted.created_at).toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      dateStyle: "full",
      timeStyle: "short",
    });

    if (notificationEmail) {
      try {
        await sendNotificationEmail(notificationEmail, data, submittedAt);
      } catch (emailError) {
        console.error("Falha ao enviar e-mail de notificação:", emailError);
      }
    } else {
      console.warn("NOTIFICATION_EMAIL não configurado — contato salvo sem notificação.");
    }

    return new Response(
      JSON.stringify({ success: true, id: inserted.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Erro inesperado:", err);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function sendNotificationEmail(to: string, data: ContactPayload, submittedAt: string): Promise<void> {
  const subject = `Novo contato: ${data.nome}`;
  const textBody = [
    "Você recebeu um novo contato pelo site Studio Nova.",
    "",
    `Nome: ${data.nome}`,
    `E-mail: ${data.email}`,
    `Data/Hora: ${submittedAt}`,
    "",
    "Mensagem:",
    data.mensagem,
  ].join("\n");

  const htmlBody = [
    '<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">',
    '<h2 style="color: #1a1a1a;">Novo contato recebido</h2>',
    '<p style="color: #555;">Você recebeu um novo contato pelo site Studio Nova Arquitetura.</p>',
    '<table style="width: 100%; border-collapse: collapse; margin: 16px 0;">',
    `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Nome</td><td style="padding: 8px 0; color: #1a1a1a; font-weight: 600;">${data.nome}</td></tr>`,
    `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">E-mail</td><td style="padding: 8px 0; color: #1a1a1a;">${data.email}</td></tr>`,
    `<tr><td style="padding: 8px 0; color: #888; font-size: 13px;">Data/Hora</td><td style="padding: 8px 0; color: #1a1a1a;">${submittedAt}</td></tr>`,
    "</table>",
    '<div style="background: #f5f5f5; border-radius: 12px; padding: 20px; margin-top: 16px;">',
    '<p style="color: #888; font-size: 13px; margin: 0 0 8px;">Mensagem</p>',
    `<p style="color: #1a1a1a; line-height: 1.6; margin: 0;">${data.mensagem.replace(/</g, "&lt;")}</p>`,
    "</div>",
    "</div>",
  ].join("");

  const resendApiKey = Deno.env.get("RESEND_API_KEY");

  if (resendApiKey) {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Studio Nova <onboarding@resend.dev>",
        to: [to],
        subject,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Resend API error ${response.status}: ${errText}`);
    }
  } else {
    console.warn("RESEND_API_KEY não configurado — pulando envio de e-mail. Corpo do e-mail:");
    console.log(textBody);
  }
}
