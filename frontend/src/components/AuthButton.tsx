import Button from "@mui/material/Button";
import XIcon from "@mui/icons-material/X";
import Stack from "@mui/material/Stack";
import { useAuth } from "../auth/AuthProvider";

export default function AuthButton() {
  const auth = useAuth();

  const handleLogin = async () => {
    const twitterClientID = import.meta.env.VITE_TWITTER_CLIENT_ID;
    const url =
      `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${twitterClientID}&redirect_uri=http%3A%2F%2F127.0.0.1%3A3000%2Fapi%2Fauth%2Fx-login-callback&scope=tweet.read+users.read+follows.read+offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`;

    window.open(url, "_blank");
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={handleLogin} variant="contained" startIcon={<XIcon />}>
        Login via X
      </Button>
    </Stack>
  );
}

