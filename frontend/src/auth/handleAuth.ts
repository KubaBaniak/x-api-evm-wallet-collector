import sendAuthCodeToBackend from "./exchangeAuthCode";
import sendOneTimeTokenToBackend from "./exchangeOneTimeToken";

export default async function handleAuthCode(
  authCode: string,
): Promise<string | null> {
  try {
    const oneTimeToken = await sendAuthCodeToBackend(authCode);

    if (!oneTimeToken) return null;

    const longTimeToken = await sendOneTimeTokenToBackend(oneTimeToken);

    if (!longTimeToken) return null;

    return longTimeToken;
  } catch {
    return null;
  }
}
