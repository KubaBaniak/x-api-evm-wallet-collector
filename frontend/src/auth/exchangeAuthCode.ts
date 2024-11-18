export default async function sendAuthCodeToBackend(
  authCode: string,
): Promise<string | null> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/auth/oauth/callback`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ authCode }),
      },
    );

    const data = await response.json();
    if (data.token) {
      return data.token;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}
