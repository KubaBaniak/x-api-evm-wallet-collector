import { Alert, Box, Button, Collapse, FormControl, Link, TextField, Typography } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { isValidAddress } from "../utils/isValidAddress";
import { useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { URL_X_ACCOUNT } from "./constants";

type Inputs = {
  walletAddress: string;
};

export default function WalletAddressForm() {
  const auth = useAuth();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | React.JSX.Element>("");

  const [openSuccessBar, setOpenSuccessBar] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Inputs>({ mode: "onSubmit" });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/wallets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ address: data.walletAddress }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add wallet address");
      }

      setSuccessMessage('Wallet Address saved successfully');
      setOpenSuccessBar(true);
      reset();
    } catch (error: unknown) {
      if (error instanceof Error) {
        if (error.message.includes("Failed to fetch") || error.message.includes("ERR_CONNECTION_REFUSED")) {
          setAlertMessage("Unable to connect to the server. Please check your internet connection or try again later.");
        } else if (error.message.includes("Request failed with status code 429")) {
          setAlertMessage("The server has reached the limit of the X API calls, therefore it cannot check whether you meet the requirements to add address - there is no way im paying for basic tier");
        } else if (error.message.includes("User does not follow")) {
          setAlertMessage(
            () => (
              <>
                You do not follow required account. Please follow{" "}
                <Link href={URL_X_ACCOUNT} target="_blank" rel="noopener noreferrer" color="inherit">
                  this user
                </Link>.
              </>
            )
          );
        }
        else {
          setAlertMessage(error.message);
        }
      } else {
        setAlertMessage("An unknown error occurred. Please try again or contact support.");
      }
      setOpenAlert(true);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "50vh",
        minWidth: "50vw",
        backgroundColor: "#EDEADE",
        borderRadius: "16px",
        color: "#3B3C36",
        position: "relative",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl sx={{ gap: "15px", alignItems: "center" }}>
          <Typography variant="h3" gutterBottom>
            Add your wallet address
          </Typography>
          <TextField
            {...register("walletAddress", { validate: isValidAddress })}
            error={!!errors.walletAddress}
            id="outlined-error"
            label={
              errors.walletAddress?.type === "validate"
                ? "Incorrect EVM Wallet Address"
                : "EVM Wallet Address"
            }
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#3B3C36", maxWidth: "150px" }}
          >
            Add
          </Button>
        </FormControl>
      </form>
      <Collapse in={openAlert} sx={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)" }}>
        <Alert
          variant="filled"
          severity="error"
          onClose={() => setOpenAlert(false)}
        >
          {alertMessage}
        </Alert>
      </Collapse>
      <Collapse in={openSuccessBar} sx={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)" }}>
        <Alert
          variant="filled"
          severity="success"
          onClose={() => setOpenSuccessBar(false)}
        >
          {successMessage}
        </Alert>
      </Collapse>
    </Box>
  );
}

