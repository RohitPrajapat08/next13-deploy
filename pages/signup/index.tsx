import React, { useState } from "react";
import Link from "next/link";
import cx from "./index.module.scss";
import { Col, Container, Form, Row } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

const Signup = () => {
  const [show, setShow] = useState(true);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    watch,
    getFieldState,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRegistration({
    email,
    password,
    description,
    url,
    facebook,
    insta,
    linkedin,
    twitter,
    threads,
    userName,
    file,
  }) {
    setIsLoading(true);
    // setError(null); // Clear previous errors when a new request starts
    try {
      const formData = new FormData();

      formData.append("email", email);
      formData.append("description", description);
      formData.append("url", url);
      formData.append("facebook", facebook);
      formData.append("insta", insta);
      formData.append("linkedin", linkedin);
      formData.append("twitter", twitter);
      formData.append("threads", threads);
      formData.append("userName", userName);
      formData.append("file", file[0]);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BASEURL}/usersignup`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to submit the data. Please Fill the required fields."
        );
      }

      // Handle response if necessary
      const data = await response.json();
      // ...

      if (data.status) {
        toast.success(data.message);
        toast.success("Wait for Admin Approval");
        localStorage.setItem("UserData", JSON.stringify(data?.result) || "{}");
        localStorage.setItem("UserToken", data.token);
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

  const validateFileSize = (file: any) => {
    console.log("file file", file);
    if (file && file[0]) {
      const fileSize = file[0].size / 1024;
      console.log("filesidedededededededede", fileSize);
      return fileSize <= 500;
    }
    return false;
  };

  return (
    <>
      <Head>
        <title>Martin-Signup</title>
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
                  <h4>Sign-up</h4>
                  <h5>FILL IN YOUR DETAILS</h5>
                </Col>
                {/* {error && <div style={{ color: "red" }}>{error}</div>} */}
                <form onSubmit={handleSubmit(handleRegistration)}>
                  <Col md={12} className={`${cx.formBox}`}>
                    <Form.Label>Name :</Form.Label>
                    <Form.Control
                      type="text"
                      // onChange={(e: any) => {
                      //   fillFields("userName", e.target.value);
                      // }}
                      {...register("userName", {
                        required: true,
                        pattern: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g,
                      })}
                      name="userName"
                      placeholder="Name*"
                    />
                    {errors?.userName?.type === "required" && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                    {errors?.userName?.type === "pattern" && (
                      <span style={{ color: "red" }}>Invalid input</span>
                    )}
                  </Col>
                  <Col md={12} className={`${cx.formBox}`}>
                    <Form.Label>Email :</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
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

                  <Col md={12} className={`${cx.formBox}`}>
                    <Form.Label>Image :</Form.Label>
                    <Form.Control
                      type="file"
                      className="px-4"
                      name="file"
                      placeholder="image"
                      {...register("file", {
                        required: true,
                        validate: validateFileSize,
                      })}
                    />
                    {errors?.file?.type === "required" && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}

                    {errors?.file?.type === "validate" && (
                      <span style={{ color: "red" }}>
                        File size should be 500KB or less
                      </span>
                    )}
                  </Col>
                  <Col md={12} className={`${cx.formBox}`}>
                    <Form.Label>Description :</Form.Label>
                    <Form.Control
                      type="text"
                      as={"textarea"}
                      rows={2}
                      name="description"
                      placeholder="description"
                      // onChange={(e: any) => {
                      //   fillFields("description", e.target.value);
                      // }}
                      {...register("description", { required: true })}
                    />
                    {errors?.description?.type === "required" && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                  </Col>
                  <Col md={12} className={`${cx.formBox}`}>
                    <Form.Label>Url :</Form.Label>
                    <Form.Control
                      type="url"
                      // onChange={(e: any) => {
                      //   fillFields("url", e.target.value);
                      // }}
                      name="url"
                      placeholder="url"
                      {...register("url", {
                        required: false,
                        pattern:
                          /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
                        // validate: (value) =>
                        //   value === watch("url") ||
                        //   watch("insta") ||
                        //   watch("linkedin") ||
                        //   watch("twitter") ||
                        //   watch("facebook") ||
                        //   watch("threads") ||
                        //   "wrong",
                      })}
                    />
                    {errors?.url?.type === "required" && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                    {errors?.url?.type === "pattern" && (
                      <p style={{ color: "red" }}>Invalid url</p>
                    )}
                  </Col>
                  <Col md={12} className={`${cx.formBox}`}>
                    <Form.Label>Facebook :</Form.Label>
                    <Form.Control
                      type="url"
                      // onChange={(e: any) => {
                      //   fillFields("facebook", e.target.value);
                      // }}
                      {...register("facebook", {
                        required: false,
                        pattern:
                          /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
                      })}
                      name="facebook"
                      placeholder="facebook"
                    />
                    {errors?.facebook?.type === "required" && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                    {errors?.facebook?.type === "pattern" && (
                      <p style={{ color: "red" }}>Invalid url</p>
                    )}
                  </Col>
                  <Col md={12} className={`${cx.formBox}`}>
                    <Form.Label>Instagram :</Form.Label>
                    <Form.Control
                      type="url"
                      {...register("insta", {
                        required: false,
                        pattern:
                          /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
                      })}
                      name="insta"
                      placeholder="Instagram"
                    />
                    {errors?.insta?.type === "required" && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                    {errors?.insta?.type === "pattern" && (
                      <p style={{ color: "red" }}>Invalid url</p>
                    )}
                  </Col>
                  <Col md={12} className={`${cx.formBox}`}>
                    <Form.Label>Linkedin :</Form.Label>
                    <Form.Control
                      type="url"
                      {...register("linkedin", {
                        required: false,
                        pattern:
                          /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
                      })}
                      name="linkedin"
                      placeholder="linkedin"
                    />
                    {errors?.linkedin?.type === "required" && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                    {errors?.linkedin?.type === "pattern" && (
                      <p style={{ color: "red" }}>Invalid url</p>
                    )}
                  </Col>
                  <Col md={12} className={`${cx.formBox}`}>
                    <Form.Label>Twitter :</Form.Label>
                    <Form.Control
                      type="url"
                      {...register("twitter", {
                        required: false,
                        pattern:
                          /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
                      })}
                      name="twitter"
                      placeholder="twitter"
                    />
                    {errors?.twitter?.type === "required" && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                    {errors?.twitter?.type === "pattern" && (
                      <p style={{ color: "red" }}>Invalid url</p>
                    )}
                  </Col>
                  <Col md={12} className={`${cx.formBox}`}>
                    <Form.Label>Threads :</Form.Label>
                    <Form.Control
                      type="url"
                      {...register("threads", {
                        required: false,
                        pattern:
                          /^(https?|ftp):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i,
                      })}
                      name="threads"
                      placeholder="threads"
                    />
                    {errors?.threads?.type === "required" && (
                      <span style={{ color: "red" }}>
                        This field is required
                      </span>
                    )}
                    {errors?.threads?.type === "pattern" && (
                      <p style={{ color: "red" }}>Invalid url</p>
                    )}
                  </Col>
                  <Col md={12} className={`${cx.formBox} mb-0`}>
                    {/* <Button
                    className={`btn ${cx.submitBtn}`}
                    onClick={() => {
                      checkFields(fields);
                    }}
                    // disabled={Object.keys(fieldError).length === 0}
                  >
                   
                  </Button> */}

                    <button
                      className={`btn ${cx.submitBtn}`}
                      type="submit"
                      disabled={isLoading && isValid}
                    >
                      {isLoading ? "Loading..." : "Sign Up"}
                    </button>

                    <p className={`${cx.dontAccount}`}>
                      Already have an account? <Link href="/login">Login</Link>
                    </p>
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

export default Signup;
