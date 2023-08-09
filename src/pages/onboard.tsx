import { Box, Stack, Typography, Button, Alert, List } from "@mui/material";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import React, { ReactNode, useState } from "react";

import AuthLayout from "src/layouts/auth/layout";
import { fetchApi } from "src/utils/api-helpers";

const Page = () => {
  const [isContinuingOnboarding, setIsContinuingOnboarding] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleContinueOnboarding = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    setIsContinuingOnboarding(true);
    const response = await fetchApi("/api/onboard");
    if (response.ok) {
      const data = await response.json();
      router.push(data.onboardingUrl);
    } else {
      setIsContinuingOnboarding(false);
      throw new Error("Something went wrong");
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await signOut();
    setIsLoggingOut(true);
  };

  return (
    <>
      <Box
        sx={{
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box sx={{ maxWidth: 550, px: 3, py: "100px", width: "100%" }}>
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4">Finish onboarding</Typography>
          </Stack>
          <Stack spacing={3}>
            <Typography color="text.secondary" variant="body2">
              To have access to all features, please complete onboarding.
            </Typography>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              variant="contained"
              onClick={handleContinueOnboarding}
              disabled={isContinuingOnboarding}
            >
              {isContinuingOnboarding
                ? "Continuing onboarding..."
                : "Continue onboarding"}
            </Button>
            <Alert severity="info" color="primary">
              <Stack spacing={2}>
                <Typography variant="body2">
                  Welcome to our interactive onboarding simulation! To complete
                  the process, simply follow these steps:
                </Typography>
                <ol>
                  <li>
                    Click "Continue onboarding" to initiate the simulation.
                    You'll be guided through the verification steps.
                  </li>
                  <li>
                    When prompted, use the following test details:
                    <ul>
                      <li>Test Phone Number: 000 000 0000</li>
                      <li>Test Email: (enter any fake email)</li>
                      <li>
                        Corresponding Test SMS Verification Code: Click "Use
                        test code"
                      </li>
                    </ul>
                  </li>
                  <li>
                    Finally click "Skip this step" to skip the "Verifying your
                    identity" step.
                  </li>
                </ol>
                <Typography variant="body2">
                  It's important to know that all the required fields have been
                  automatically generated for this simulation. Any attempt to
                  use genuine personal information will result in a mismatch,
                  preventing successful onboarding. We're thrilled to offer you
                  a seamless onboarding experience through this interactive
                  simulation!
                </Typography>
              </Stack>
            </Alert>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              variant="contained"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              Log out
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;

export default Page;
