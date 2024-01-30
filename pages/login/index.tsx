import React, { useEffect, useState } from "react";
import Link from "next/link";
import cx from "./index.module.scss";
import { Col, Container, Form, Row } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  astrorapidApi,
  captureFields,
  registrationFields,
} from "../../redux/reducers/registrationReducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [show, setShow] = useState(true);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const fields = useAppSelector(registrationFields);
  const [fieldError, setFieldError] = useState<any>({});

  const fillFields = (key: any, value: String) => {
    dispatch(captureFields({ [key]: value }));
    if (fieldError !== undefined && fieldError[key]) {
      fieldError[key] = "";
    }
  };

  const callApi = async (fields: any) => {
    let { email, password } = fields;
    const result: any = await dispatch(
      astrorapidApi({
        email,
        password,
      })
    );
    console.log(result, "astrorapidApiastrorapidApi");
    if (result.payload.status) {
      toast.success(result.payload.message);
      localStorage.setItem(
        "UserData",
        JSON.stringify(result?.payload?.result) || "{}"
      );
      localStorage.setItem("UserToken", result.payload.token);
      setTimeout(() => {
        router.push("/gardener-profile/profile");
      }, 4000);
    } else {
      toast.error(result.payload.message);
    }
  };

  const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";

  const checkFields = (fields: any) => {
    const fieldErr: any = {};
    Object.keys(fields).forEach((e: any) => {
      console.log(fields[e], fields, "checkFields");
      if (fields[e] === "" && e === "email" && e === "password") {
        fieldErr[e] = (
          <p style={{ color: "red", textAlign: "center" }}>
            This field is required.
          </p>
        );
      }
    });

    if (Object.keys(fieldErr).length === 0) {
      if (fields.email.match(regex)) {
        callApi(fields);
      } else {
        fieldErr.email = (
          <p style={{ color: "red", textAlign: "center" }}> Invalid Email </p>
        );
        setFieldError(fieldErr);
      }
    } else {
      setFieldError(fieldErr);
    }
  };

  return (
    <>
      <Head>
        <title>Martin Web</title>
        <meta name="description" content="Martin" />
        <link rel="icon" href="/images/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ToastContainer />

      <section className={`${cx.birthChartSection}`}>
        <Container>
          <Col md={6} className={`m-auto ${cx.formMain}`}>
            <div className={`${cx.createBox}`}>
              <Row>
                <Col md={12} className={`${cx.innerTitle}`}>
                  <h4>Login</h4>
                  <h5>FILL IN YOUR DETAILS</h5>
                </Col>
                <Col md={12} className={`${cx.formBox}`}>
                  <Form.Label>Email :</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={(e: any) => {
                      fillFields("email", e.target.value);
                    }}
                    placeholder="Email*"
                  />
                  {fieldError?.email}
                </Col>

                <Col md={12} className={`${cx.formBox}`}>
                  <Form.Label>Password :</Form.Label>
                  <Form.Control
                    className="form-control"
                    type={show ? "password" : "text"}
                    onChange={(e: any) => {
                      fillFields("password", e.target.value);
                    }}
                    placeholder="Password*"
                  />
                  {fieldError?.password}
                  {/* <p style={{ color: "#FFFFFF", textAlign: "center" }}>
                    {msgName}
                  </p> */}
                  <p className={`${cx.forgotPassword}`}>
                    <Link href="/forgotPassword">Forgot Password ?</Link>
                  </p>
                </Col>

                <Col md={12} className={`${cx.formBox} mb-0`}>
                  <div
                    className={`btn ${cx.submitBtn}`}
                    onClick={() => {
                      checkFields(fields);
                    }}
                  >
                    Login
                  </div>
                  <p className={`${cx.dontAccount}`}>
                    Don't have an account? <Link href="/signup">Sign Up</Link>
                  </p>
                </Col>
              </Row>
            </div>
          </Col>
        </Container>
      </section>
    </>
  );
};

export default Login;
