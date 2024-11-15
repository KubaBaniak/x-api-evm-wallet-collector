import { Box } from "@mui/material";
import AuthButton from "./components/AuthButton";
import { useAuth } from "./auth/AuthProvider";
import handleAuthCode from "./auth/handleAuth";
import { useEffect } from "react";

function App() {
  const auth = useAuth();
  const isAuthenticated = auth.token !== "";
  const urlParams = new URLSearchParams(window.location.search);
  const authCode = urlParams.get('code');

  useEffect(() => {
    const authenticate = async () => {
      if (authCode) {
        const token = await handleAuthCode(authCode);
        if (token) {
          auth.login(token);
          window.history.replaceState({}, document.title, "/");
          console.log('Logged in')
        }
      }
    };

    authenticate();
  }, [authCode, auth]);

  return (
    <>
      {isAuthenticated ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <p>Logged in</p>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <AuthButton />
        </Box>
      )}
    </>
  );
}

export default App;
