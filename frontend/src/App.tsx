import { Box } from "@mui/material";
import AuthButton from "./components/AuthButton";
import { useAuth } from "./auth/AuthProvider";

function App() {
  const auth = useAuth();
  const isAuthenticated = auth.token !== "";

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

