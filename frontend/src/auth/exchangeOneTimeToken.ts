export default async function sendOneTimeTokenToBackend(
  oneTimeToken: string,
): Promise<string | null> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_ADDRESS}/auth/validate/ott`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${oneTimeToken}`,
        },
      },
    );

    const data = await response.json();
    if (data.token) {
      console.log("Long-Lived Token received:", data.token);
      return data.token;
    } else {
      console.error("Failed to get long-lived token from backend");
      return null;
    }
  } catch (error) {
    console.error("Error sending one-time token to backend:", error);
    return null;
  }
}
