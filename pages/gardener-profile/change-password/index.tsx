import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import cx from "./index.module.scss";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import st from "../../../styles/website/style.module.scss";
import { UserMenu } from "../../../components";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@nextui-org/react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

type Inputs = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function Changepassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();
  const [show, setShow] = useState(true);
  const [show2, setShow2] = useState(true);
  const [show3, setShow3] = useState(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let profileData: any =
    typeof window !== "undefined"
      ? JSON.parse(window.localStorage.getItem("UserData")!)
      : {};

  const onSubmit: SubmitHandler<Inputs> = async ({
    currentPassword,
    newPassword,
    confirmPassword,
  }) => {
    setIsLoading(true);
    // setError(null); // Clear previous errors when a new request starts
    try {
      const jsonData = JSON.stringify({
        currentPassword,
        newPassword,
        confirmPassword,
      });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BASEURL}/resetPassword/${profileData?._id}`,
        {
          method: "POST",
          body: jsonData,
          headers: {
            Authorization: localStorage.getItem("UserToken")!,
            "Content-Type": "application/json",
          },
        }
      );

      // Handle response if necessary
      const data = await response.json();

      if (data.status) {
        toast.success(data.message);
        setTimeout(() => {
          router.push("/gardener-profile/profile");
        }, 4000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // Capture the error message to display to the user
      // setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className={`${cx.complete_profile}`}>
        <ToastContainer />
        <Container>
          <form
            className={`${cx.login_form}`}
            onSubmit={handleSubmit(onSubmit)}
          >
            <Col md={12} className={`${cx.title}`}>
              <h2>Dashboard</h2>
            </Col>

            <Row>
              <Col md={3}>
                <UserMenu />
              </Col>

              <Col md={9}>
                <div className={`${cx.contentBody}`}>
                  <Col md={12} className={`${cx.profileTitle}`}>
                    <h5>Change Password</h5>
                  </Col>

                  <div className={`${cx.contentInside}`}>
                    <Row>
                      <Col md={12} className={`${st.form_box}`}>
                        <label className="form-label">
                          Old Password<span className="text-danger">*</span> :
                        </label>
                        <div className="position-relative">
                          <input
                            type={show ? "password" : "text"}
                            {...register("currentPassword", { required: true })}
                            className={`form-control ${st.password_show}`}
                            id="pwd"
                            placeholder="Old password"
                            name="currentPassword"
                          />
                          <span className={`${st.psssword_icon}`}>
                            {show ? (
                              <AiFillEye
                                onClick={() => {
                                  setShow(false);
                                }}
                              />
                            ) : (
                              <AiFillEyeInvisible
                                onClick={() => {
                                  setShow(true);
                                }}
                              />
                            )}
                          </span>
                          {errors.currentPassword && (
                            <p style={{ color: "red" }}>
                              This field is required
                            </p>
                          )}
                        </div>
                      </Col>

                      <Col md={12} className={`${st.form_box}`}>
                        <label className="form-label">
                          New Password<span className="text-danger">*</span> :
                        </label>
                        <div className="position-relative">
                          <input
                            type={show2 ? "password" : "text"}
                            {...register("newPassword", { required: true })}
                            className={`form-control ${st.password_show}`}
                            id="pwd2"
                            placeholder="New password"
                            name="newPassword"
                          />
                          <span className={`${st.psssword_icon}`}>
                            {show2 ? (
                              <AiFillEye
                                onClick={() => {
                                  setShow2(false);
                                }}
                              />
                            ) : (
                              <AiFillEyeInvisible
                                onClick={() => {
                                  setShow2(true);
                                }}
                              />
                            )}
                          </span>
                          {errors.newPassword && (
                            <p style={{ color: "red" }}>
                              This field is required
                            </p>
                          )}
                        </div>
                      </Col>

                      <Col md={12} className={`${st.form_box}`}>
                        <label className="form-label">
                          Confirm Password<span className="text-danger">*</span>{" "}
                          :
                        </label>
                        <div className="position-relative">
                          <input
                            type={show3 ? "password" : "text"}
                            {...register("confirmPassword", { required: true })}
                            className={`form-control ${st.password_show}`}
                            id="pwd2"
                            placeholder="Confirm password"
                            name="confirmPassword"
                          />
                          <span className={`${st.psssword_icon}`}>
                            {show3 ? (
                              <AiFillEye
                                onClick={() => {
                                  setShow3(false);
                                }}
                              />
                            ) : (
                              <AiFillEyeInvisible
                                onClick={() => {
                                  setShow3(true);
                                }}
                              />
                            )}
                          </span>
                          {errors.confirmPassword && (
                            <p style={{ color: "red" }}>
                              This field is required
                            </p>
                          )}
                        </div>
                      </Col>

                      <Col md={12} className={`${st.form_box}`}>
                        <Button
                          className="btn btn-primary"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? "Loading..." : "Submit"}
                        </Button>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </form>
        </Container>
      </section>
    </>
  );
}
