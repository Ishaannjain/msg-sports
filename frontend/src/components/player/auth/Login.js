import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
  Alert,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../constants/constant.js";
import axios from "axios";
import { checkPlayerAuth, validateEmail, validatePassword } from "../../../common/common.js";

const Login = () => {
  const initialValues = { email: "", password: "" };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState(initialValues);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [backendError, setBackendError] = useState("");

  useEffect(() => {
    if (checkPlayerAuth()) {
      navigate("/player/dashboard");
    }
  }, []);

  const handleChange = (e) => {
    setBackendError("");
    setFormErrors(initialValues);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBackendError("");

    const emailError = validateEmail(formValues.email);
    if (emailError) {
      setFormErrors({ email: emailError });
      return;
    }

    const passError = validatePassword(formValues.password);
    if (passError) {
      setFormErrors({ password: passError });
      return;
    }

    setFormSubmitting(true);
    axios({
      url: API_BASE_URL + "auth/player/login",
      data: formValues,
      method: 'POST',
    }).then((res) => {
      setFormSubmitting(false);
      let data = res.data;
      if (data.status == 1) {
        sessionStorage.setItem("player_auth", data.auth);
        navigate("/player/dashboard");
      } else {
        setBackendError(data.message);
      }
    }).catch((err) => {
      setFormSubmitting(false);
      console.log(err);
    })
  };

  return (
    <div className="h-screen flex items-center justify-center px-10 py-10">
      <Card className="w-96">
        <CardBody className="flex flex-col gap-6">
          <div className="flex justify-center mb-5">
            <Typography variant="h3" className="flex text-gray-600">
              <span className="font-serif text-rose-900 font-bold">.</span>
              msg-
              <span className="text-rose-900"> Sports</span>
            </Typography>
          </div>
          <Alert className={`bg-rose-800 py-2 text-sm ${backendError || "hidden"}`}> {backendError}</Alert>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <Input
                type="name"
                name="email"
                label="Email"
                size="lg"
                error={!!formErrors.email}
                value={formValues.email}
                onChange={handleChange}
              />
              <p className="text-sm ml-1 text-red-400">{formErrors.email}</p>
            </div>
            <div className="flex flex-col">
              <Input
                type="password"
                name="password"
                label="Password"
                size="lg"
                error={!!formErrors.password}
                value={formValues.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <p className="text-sm ml-1 text-red-400">{formErrors.password}</p>
            </div>
            <Button className="bg-rose-800 w-full" disabled={formSubmitting} onClick={handleSubmit}>
              {formSubmitting ? <i className="fa-solid fa-spinner animate-spin"></i> : `Sign In`}
            </Button>
          </form>
          <div variant="small" className="mt-3 flex flex-col items-end justify-end">
            <Link to="/forgot-password" className="ml-1 mb-1 font-sans text-sm text-rose-800 underline">
              Forgot Password?
            </Link>
            <Link to="/player/new-login" className="ml-1 mb-1 font-sans text-sm text-rose-800 underline">
              New user?
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
