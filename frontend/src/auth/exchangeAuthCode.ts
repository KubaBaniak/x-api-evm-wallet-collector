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
      console.log("One-Time Token received:", data.token);
      return data.token;
    } else {
      console.error("Failed to get one-time token from backend");
      return null;
    }
  } catch (error) {
    console.error("Error sending auth code to backend:", error);
    return null;
  }
}
