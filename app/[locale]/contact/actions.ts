"use server";

export async function submitContact(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const accessKey = process.env.WEB3FORMS_KEY;
  if (!accessKey) {
    return { success: false, error: "Configuration error. Please try again later." };
  }

  const payload = {
    access_key: accessKey,
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    subject: formData.get("subject") ?? "",
    message: formData.get("message") ?? "",
    locale: formData.get("locale") ?? "",
  };

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (json.success) return { success: true };
    return { success: false, error: json.message ?? "Unknown error" };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : String(err) };
  }
}
