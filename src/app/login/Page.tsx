"use client";
import React, { ChangeEvent, useState } from "react";
import { FaCoffee } from "react-icons/fa";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./page.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import {
  banner1,
  banner3,
  banner4,
  icon1,
  icon2,
  icon3,
  //   img1,
  profile,
} from "../../../public/images";
import { BlogCard } from "../components";

import Head from "next/head";
import { useRouter } from "next/router";
import {
  astrorapidApi,
  captureFields,
  registrationFields,
} from "../redux/reducers/registrationReducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function Login() {
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
    if (result.payload.status) {
      console.log(result.payload.message);
      localStorage.setItem(
        "UserData",
        JSON.stringify(result?.payload?.result) || "{}"
      );
      localStorage.setItem("UserToken", result.payload.token);
      setTimeout(() => {
        router.push("/gardener-profile/profile");
      }, 4000);
    } else {
      console.log(result.payload.message);
    }
  };

  const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";

  const checkFields = (fields: any) => {
    const fieldErr: any = {};
    Object.keys(fields).forEach((e: any) => {
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

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
      <section className={`${cx.journalSection}`}>
        <Container>
          <Col md={6} className="m-auto">
            <h4>welcome to (inner)Garden</h4>

            <div className={`${cx.formBox2}`}>
              <Row>
                <Col md={12}>
                  <label>Your email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Your Email"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      fillFields("email", e.target.value);
                    }}
                  />
                  {fieldError?.email}
                </Col>
                <Col md={12}>
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter the password"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      fillFields("password", e.target.value);
                    }}
                  />
                  {fieldError?.password}
                </Col>
              </Row>
            </div>
            <Col md={12}>
              <button className={`btn ${cx.requestBtn}`}>log(in)</button>
            </Col>

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

export default Login;
