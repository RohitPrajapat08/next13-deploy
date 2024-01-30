import React, { useEffect, useState } from "react";
import Link from "next/link";
import cx from "./index.module.scss";
import { Col, Container, Form, Row } from "react-bootstrap";
import Head from "next/head";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegistration({ email }) {
    setIsLoading(true);
    // setError(null); // Clear previous errors when a new request starts
    try {
      const jsonData = JSON.stringify({
        email,
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BASEURL}/forgotpassword`,
        {
          method: "POST",
          body: jsonData,
          headers: {
            Authorization: localStorage.getItem("UserToken")!,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to submit the data. Please Fill the required fields."
        );
      }

      // Handle response if necessary
      const data = await response.json();
      console.log(data, "signup data");
      // ...

      if (data.status) {
        toast.success(
          "Temporary Password has been sent on your respected email id"
        );
        setTimeout(() => {
          router.push("/login");
        }, 4000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // Capture the error message to display to the user
      // setError(error.message);
      toast.error(error.message);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Head>
        <title>Forgot Password</title>
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
                  <h4>Forgot Password</h4>
                  {/* <h5>FILL IN YOUR DETAILS</h5> */}
                </Col>
                <form onSubmit={handleSubmit(handleRegistration)}>
                  <Col md={12} className={`${cx.formBox}`}>
                    <Form.Label>Email :</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Email*"
                      {...register("email", {
                        required: true,
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      })}
                    />
                    {errors?.email?.type === "required" && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                    {errors?.email?.type === "pattern" && (
                      <p style={{ color: "red" }}>Invalid email address</p>
                    )}
                  </Col>
                  <Col md={12} className={`${cx.formBox} mb-0`}>
                    <button
                      className={`btn ${cx.submitBtn}`}
                      type="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Continue"}
                    </button>
                  </Col>
                </form>
              </Row>
            </div>
          </Col>
        </Container>
      </section>
    </>
  );
};

export default ForgotPassword;
