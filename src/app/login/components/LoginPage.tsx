"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
import { Box, Button, Card, Paper, TextField, Typography } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import FlexBox from "@/components/main/FlexBox";

interface LoginFormValues {
  login: string;
  password: string;
}

const initialValues: LoginFormValues = {
  login: "",
  password: "",
};

const validationSchema = Yup.object({
  login: Yup.string().required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
});

type TProps = {};

const LoginPage: FC<TProps> = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleSubmit = () => {}; // TODO: implement login

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: 320,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Вход
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, isValid }) => (
            <Form>
              <FlexBox flexDirection={"column"} gap={2}>
                <Field
                  as={TextField}
                  label={"Логин"}
                  name="login"
                  autoComplete="on"
                  type={passwordVisibility ? "text" : "password"}
                  fullWidth
                  error={touched.login && Boolean(errors.login)}
                  helperText={<ErrorMessage name="login" />}
                  // InputProps={{
                  //   endAdornment: (
                  //     <EyeToggleButton
                  //       show={passwordVisibility}
                  //       click={togglePasswordVisibility}
                  //     />
                  //   ),
                  // }}
                />
                <Field
                  as={TextField}
                  label="Пароль"
                  name="password"
                  autoComplete="on"
                  type={passwordVisibility ? "text" : "password"}
                  fullWidth
                  error={touched.password && Boolean(errors.password)}
                  helperText={<ErrorMessage name="password" />}
                  // InputProps={{
                  //   endAdornment: (
                  //     <EyeToggleButton
                  //       show={passwordVisibility}
                  //       click={togglePasswordVisibility}
                  //     />
                  //   ),
                  // }}
                />
                <Button
                  sx={{ mt: 2 }}
                  disabled={!touched.password || !isValid}
                  type="submit"
                  variant="contained"
                  color="primary"
                >
                  {"Подтвердить"}
                </Button>
              </FlexBox>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default LoginPage;
