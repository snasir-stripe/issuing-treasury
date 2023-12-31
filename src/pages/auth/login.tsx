import {
  Alert,
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { GetServerSidePropsContext } from "next";
import NextLink from "next/link";
import router from "next/router";
import { signIn } from "next-auth/react";
import { ReactNode } from "react";
import * as Yup from "yup";

import AuthLayout from "src/layouts/auth/layout";
import { getSessionForLoginOrRegisterServerSideProps } from "src/utils/session-helpers";

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSessionForLoginOrRegisterServerSideProps(context);

  if (session != null) {
    return { redirect: { destination: "/", permanent: false } };
  }

  return { props: {} };
};

const validationSchema = Yup.object({
  username: Yup.string().max(255).required("Username is required"),
  password: Yup.string().max(255).required("Password is required"),
});

const Page = () => {
  const { callbackUrl } = router.query;

  const initialValues = {
    username: "",
    password: "",
    submit: null,
  };

  const handleSubmit = async (
    values: typeof initialValues,
    {
      setStatus,
      setErrors,
      setSubmitting,
    }: FormikHelpers<typeof initialValues>,
  ) => {
    try {
      const response = await signIn("credentials", {
        username: values.username,
        password: values.password,
        callbackUrl: (callbackUrl || "/") as string,
      });
      if (response?.error === "CredentialsSignin") {
        throw new Error("Invalid credentials");
      } else if (response?.error) {
        throw new Error("Something went wrong");
      }
    } catch (err) {
      setStatus({ success: false });
      setErrors({ submit: (err as Error).message });
      setSubmitting(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.paper",
          flex: "1 1 auto",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: "100px",
            width: "100%",
          }}
        >
          <div>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="h4">Login</Typography>
              <Typography color="text.secondary" variant="body2">
                Don&apos;t have an account? &nbsp;
                <Link
                  component={NextLink}
                  href="/auth/register"
                  underline="hover"
                  variant="subtitle2"
                >
                  Register
                </Link>
              </Typography>
            </Stack>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <Stack spacing={3}>
                    <Field
                      as={TextField}
                      error={!!(touched.username && errors.username)}
                      fullWidth
                      helperText={touched.username && errors.username}
                      label="Username"
                      name="username"
                    />
                    <Field
                      as={TextField}
                      error={!!(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      label="Password"
                      name="password"
                      type="password"
                    />
                  </Stack>
                  {errors.submit && (
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mt={3}
                    >
                      <Alert severity="error">{errors.submit}</Alert>
                    </Box>
                  )}
                  <Button
                    fullWidth
                    size="large"
                    sx={{ mt: 3 }}
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Continue"}
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;

export default Page;
