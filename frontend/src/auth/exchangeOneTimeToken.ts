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
      return data.token;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}
