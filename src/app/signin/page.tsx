"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Col, Container } from "react-bootstrap";
import dynamic from "next/dynamic";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./page.module.scss";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function LoginPage() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    try {
      const response: any = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BASEURL}/userlogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      let result = await response.json();
      if (response.ok) {
        localStorage.setItem("UserToken", result.token);
        toast.success("Login successful!");
        setTimeout(() => {
          router.push("/");
        }, 2000);
        reset();
      } else {
        reset();
        toast.error(result.message);
      }
    } catch (error: any) {
      console.error("Error during login:", error);
    }
  };

  const options = {
    loop: false,
    dots: true,
    nav: false,
    items: 1,
    navText: [
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>`,
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>`,
    ],
    autoplay: false,
    responsive: {
      0: {},
      480: {},
      768: {},
      992: {
        items: 1,
      },
    },
  };

  return (
    <>
      <ToastContainer />
      <section className={`${cx.journalSection}`}>
        <Container>
          <Col md={6} className="m-auto">
            <h4>welcome to (inner)Garden</h4>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={`${cx.formBox2}`}>
                <Col md={12}>
                  <label>Your email</label>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: "Email is required." }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        placeholder="Enter "
                      />
                    )}
                  />
                  {errors.email && (
                    <span className={`${cx.invalidfeedback}`}>
                      Email is required.
                    </span>
                  )}
                </Col>
                <Col md={12}>
                  <label>Password</label>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: "Password is required." }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="password"
                        className={`form-control ${
                          errors.password ? "is-invalid" : ""
                        }`}
                        placeholder="Enter the password"
                      />
                    )}
                  />
                  {errors.password && (
                    <span className={`${cx.invalidfeedback}`}>
                      Password is required.
                    </span>
                  )}
                </Col>
              </div>
              <Col md={12}>
                <button className={`btn ${cx.requestBtn}`} type="submit">
                  Log in
                </button>
              </Col>
            </form>

            <div className={`${cx.sliderCard}`}>
              <OwlCarousel className="owl-theme" {...options}>
                <div className="item">
                  <div className={`${cx.sliderItem}`}>
                    <p>
                      “I can shake off everything as I write; my sorrows
                      disappear, my courage is reborn.”
                    </p>
                    <h6>- Anne Frank</h6>
                  </div>
                </div>
                <div className="item">
                  <div className={`${cx.sliderItem}`}>
                    <p>
                      “I can shake off everything as I write; my sorrows
                      disappear, my courage is reborn.”
                    </p>
                    <h6>- Anne Frank</h6>
                  </div>
                </div>
              </OwlCarousel>
            </div>

            <p className={`${cx.copyright}`}>
              2023 © (Inner), All rights reserved.
            </p>
          </Col>
        </Container>
      </section>
    </>
  );
}

export default LoginPage;
