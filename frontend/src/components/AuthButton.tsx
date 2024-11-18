import Button from "@mui/material/Button";
import XIcon from "@mui/icons-material/X";
import Stack from "@mui/material/Stack";

export default function AuthButton() {

  const handleLogin = async () => {
    const twitterClientID = import.meta.env.VITE_TWITTER_CLIENT_ID;
    const url =
      `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${twitterClientID}&redirect_uri=http://127.0.0.1:5173&scope=tweet.read+users.read+follows.read+offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`;

    window.open(url, "_self");
  };

  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={handleLogin} variant="contained" startIcon={<XIcon />}>
        Login via X
      </Button>
    </Stack>
  );
}

