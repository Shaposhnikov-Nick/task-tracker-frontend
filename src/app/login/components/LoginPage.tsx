"use client";

import { useFormik } from "formik";
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useCallback, useState } from "react";
import * as Yup from "yup";
import { LoginRequest, LoginResponse } from "@/models/login.models";
import { handleErrorMessage } from "@/api/util";
import EyeToggleButton from "@/app/login/components/EyeToggleButton";
import CustomSnackBar from "@/components/CustomSnackBar";

interface TProps {}

interface LoginFormValues {
  username: string;
  password: string;
  bonusPagePassword: string;
  confirmBonusPagePassword: string;
}

const LoginPage: FC<TProps> = () => {
  // const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  // const { setToken, logout } = useAuthContext();
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const handleSnackBar = () => {
    setOpen((prevState) => !prevState);
  };

  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);

  const handleLogin = async (values: any) => {
    // doRequest<LoginResponse>(values)
    //   .then((response: LoginResponse) => setToken(response.accessToken))
    //   .then(() => navigate("/dashboard"))
    //   .catch((error) => {
    //     setResultMessage(error, true);
    //   });
  };

  const handleJoin = async (values: any) => {
    // doRequest<JoinResponse>(values)
    //   .then((response: JoinResponse) => {
    //     setIsRegister(false);
    //     setResultMessage(response.result);
    //   })
    //   .catch((error) => {
    //     setResultMessage(error, true);
    //   });
  };

  const doRequest = async <T extends unknown>(values: any): Promise<T> => {
    const loginData: LoginRequest = {
      login: values.username,
      password: values.password,
    };

    const path = isRegister
      ? "/auth/bonus-page/join"
      : "/auth/bonus-page/login";

    // const response = await fetch(`${import.meta.env.VITE_API_HOST}${path}`, {
    const response = await fetch(`url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (!response.ok)
      throw new Error(handleErrorMessage(data, "Ошибка аутентификации!"));

    return data as Promise<T>;
  };

  const setResultMessage = (message: string, isError: boolean = false) => {
    setMessage(message);
    setIsError(isError);
    handleSnackBar();
  };

  const validationSchema = () => {
    const login = {
      username: Yup.string().required("Обязательное поле"),
      password: Yup.string().required("Обязательное поле"),
      bonusPagePassword: Yup.string()
        .min(6, "Пароль должен иметь хотя бы 6 знаков")
        .required("Обязательное поле"),
    };
    const confirm = {
      confirmBonusPagePassword: Yup.string()
        .required("Обязательное поле")
        .oneOf([Yup.ref("bonusPagePassword")], "Пароли должны совпадать"),
    };

    return isRegister
      ? Yup.object({ ...login, ...confirm })
      : Yup.object({ ...login });
  };

  const initialValues: LoginFormValues = {
    username: "",
    password: "",
    bonusPagePassword: "",
    confirmBonusPagePassword: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema(),
    onSubmit: (values) => {
      isRegister ? handleJoin(values) : handleLogin(values);
      formik.resetForm();
    },
  });

  const handleRegister = () => {
    setIsRegister((prevState) => !prevState);
    formik.resetForm();
  };

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
        <Typography variant="h4" gutterBottom>
          {isRegister ? "Регистрация" : "Вход"}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Логин"
            fullWidth
            margin="normal"
            // onBlur={formik.handleBlur}
            {...formik.getFieldProps("username")}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            label="Пароль"
            type={passwordVisibility ? "text" : "password"}
            fullWidth
            margin="normal"
            // onBlur={formik.handleBlur}
            {...formik.getFieldProps("password")}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            slotProps={{
              input: {
                endAdornment: (
                  <EyeToggleButton
                    show={passwordVisibility}
                    click={togglePasswordVisibility}
                  />
                ),
              },
            }}
          />
          <TextField
            label="Доп. пароль"
            type={passwordVisibility ? "text" : "password"}
            fullWidth
            margin="normal"
            // onBlur={formik.handleBlur}
            {...formik.getFieldProps("bonusPagePassword")}
            error={
              formik.touched.bonusPagePassword &&
              Boolean(formik.errors.bonusPagePassword)
            }
            helperText={
              formik.touched.bonusPagePassword &&
              formik.errors.bonusPagePassword
            }
            slotProps={{
              input: {
                endAdornment: (
                  <EyeToggleButton
                    show={passwordVisibility}
                    click={togglePasswordVisibility}
                  />
                ),
              },
            }}
          />
          {isRegister && (
            <TextField
              label="Подтвердите доп. пароль"
              type={passwordVisibility ? "text" : "password"}
              fullWidth
              margin="normal"
              // onBlur={formik.handleBlur}
              {...formik.getFieldProps("confirmBonusPagePassword")}
              error={
                formik.touched.confirmBonusPagePassword &&
                Boolean(formik.errors.confirmBonusPagePassword)
              }
              helperText={
                formik.touched.confirmBonusPagePassword &&
                formik.errors.confirmBonusPagePassword
              }
              slotProps={{
                input: {
                  endAdornment: (
                    <EyeToggleButton
                      show={passwordVisibility}
                      click={togglePasswordVisibility}
                    />
                  ),
                },
              }}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{ mt: 2 }}
          >
            {isRegister ? "Зарегистрироваться" : "Войти"}
          </Button>
        </form>
        {!isRegister ? (
          <>
            <Divider
              textAlign="center"
              sx={{
                m: 1,
                "&::before, &::after": {
                  borderColor: "grey.300",
                },
              }}
            >
              или
            </Divider>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              onClick={handleRegister}
            >
              Зарегистрироваться
            </Button>
          </>
        ) : (
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            onClick={handleRegister}
          >
            Назад
          </Button>
        )}
      </Paper>
      <CustomSnackBar
        open={open}
        handleClose={handleSnackBar}
        isError={isError}
        message={message}
      />
    </Box>
  );
};

export default LoginPage;
