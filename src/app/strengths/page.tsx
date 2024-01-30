"use client";
import React from "react";
import { FaCoffee } from "react-icons/fa";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./page.module.scss";
import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import Image from "next/image";
import {
  banner1,
  banner3,
  banner4,
  icon1,
  icon2,
  icon3,
  img1,
  img2,
  profile,
  upload,
} from "../../../public/images";
import { BlogCard } from "../components";
import Link from "next/link";

import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function Strengths() {
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
            <div className={`${cx.formBox2}`}>
              <div className={`${cx.titleBox}`}>
                <h3>Welcome</h3>
                <p>setup your (inner)Garden</p>
              </div>
              <ul className={`${cx.meList}`}>
                <li className={`${cx.active}`}>
                  <span></span> About
                </li>
                <li className={`${cx.active}`}>
                  <span></span> Community
                </li>
                <li>
                  <span></span> Strengths
                </li>
              </ul>
              <div className={`${cx.prograssBar}`}>
                <label>Complete your Profile:</label>
                <ProgressBar variant="success" now={70} />
                <label>70%</label>
              </div>

              <div className={`${cx.formBox2}`}>
                <Row>
                  <Col md={12}>
                    <label className="d-block">
                      Would you like to join a journal group?
                    </label>
                    <small className="d-block mb-2">
                      (You can always join later) - Select up to 5
                    </small>
                    <textarea
                      className="form-control"
                      placeholder="Example: To be in a beautiful state no matter what’s happening around me."
                    ></textarea>
                  </Col>
                  <Col md={12}>
                    <label className="d-block">What are your strengths?</label>
                    <small>Select up to 5</small>
                    <ul className={`${cx.buttonsList}`}>
                      <li>
                        <button className="btn">Courage</button>
                      </li>
                      <li>
                        <button className="btn">love</button>
                      </li>
                      <li>
                        <button className="btn">love</button>
                      </li>
                      <li>
                        <button className="btn">love</button>
                      </li>
                      <li>
                        <button className="btn">love</button>
                      </li>
                      <li>
                        <button className="btn">love</button>
                      </li>
                    </ul>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Other"
                    />
                  </Col>
                  <Col md={12}>
                    <label className="d-block">What are your drivers?</label>
                    <ul className={`${cx.buttonsList}`}>
                      <li>
                        <label className="checkboxN">
                          <input type="checkbox" /> I am journaling for a
                          greater cause.
                        </label>
                      </li>
                      <li>
                        <label className="checkboxN">
                          <input type="checkbox" /> I am showing others if I can
                          do it, they can do it.
                        </label>
                      </li>
                      <li>
                        <label className="checkboxN">
                          <input type="checkbox" /> I am a powerful force for
                          change.
                        </label>
                      </li>
                      <li>
                        <label className="checkboxN">
                          <input type="checkbox" /> I rise from the ashes,
                          stronger than before.
                        </label>
                      </li>
                      <li>
                        <label className="checkboxN">
                          <input type="checkbox" /> I am a sculptor of dreams,
                          shaping a beautiful tomorrow.
                        </label>
                      </li>
                    </ul>
                    <input
                      type="text"
                      className="form-control mt-2"
                      placeholder="Other"
                    />
                  </Col>
                  <Col md={12}>
                    <button className={`btn ${cx.requestBtn}`}>done</button>
                  </Col>
                </Row>
              </div>
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

export default Strengths;
