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
  icon6,
  icon7,
  img1,
  img2,
  img3,
  profile,
  upload,
} from "../../../public/images";
import { BlogCard, BlogCard2, BlogCard3 } from "../components";
import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { MdDeleteOutline, MdModeEdit } from "react-icons/md";

import dynamic from "next/dynamic";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

function Journals() {
  const options = {
    loop: false,
    autoWidth: false,
    dots: false,
    nav: true,
    items: 4,
    navText: [
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>`,
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>`,
    ],
    autoplay: false,
    responsive: {
      0: {},
      480: {},
      768: {},
      992: {},
    },
  };

  return (
    <>
      <section className={`${cx.journalSection}`}>
        <Col md={12} className="m-auto">
          <Tabs defaultActiveKey="journals" id="uncontrolled-tab-example">
            <Tab eventKey="journals" title="Journals">
              <div className={`${cx.buttons}`}>
                <button className="btn">
                  <FiPlusCircle /> create a journal
                </button>
              </div>

              <Row className={`${cx.cardBoxN}`}>
                <Col md={4}>
                  <Image src={banner3} alt="banner" className={`${cx.img3}`} />
                </Col>
                <Col md={8}>
                  <div className={`${cx.cardBoxNBody}`}>
                    <h5>Peace is middle of stroms</h5>
                    <p>
                      The 'Big Bloom' takes the aspirational spirit of
                      exploration that propelled humanity to the moon and turns
                      it inward...
                    </p>
                    <ul className={`${cx.tagsList}`}>
                      <li>Tag Name 1</li>
                      <li>Tag Name 2</li>
                      <li>Tag Name 3</li>
                    </ul>
                    <ul className={`${cx.actionBtn}`}>
                      <li>
                        <button className="btn">
                          <MdModeEdit /> Edit
                        </button>
                      </li>
                      <li>
                        <button className="btn">
                          <MdDeleteOutline /> Delete
                        </button>
                      </li>
                      <li>
                        <button className="btn btnN">
                          <Image
                            src={icon7}
                            alt="icon"
                            className={`${cx.icon}`}
                          />{" "}
                          20 pts
                        </button>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>

              <Row className={`${cx.cardBoxN}`}>
                <Col md={4}>
                  <Image src={banner3} alt="banner" className={`${cx.img3}`} />
                </Col>
                <Col md={8}>
                  <div className={`${cx.cardBoxNBody}`}>
                    <h5>Peace is middle of stroms</h5>
                    <p>
                      The 'Big Bloom' takes the aspirational spirit of
                      exploration that propelled humanity to the moon and turns
                      it inward...
                    </p>
                    <ul className={`${cx.tagsList}`}>
                      <li>Tag Name 1</li>
                      <li>Tag Name 2</li>
                      <li>Tag Name 3</li>
                    </ul>
                    <ul className={`${cx.actionBtn}`}>
                      <li>
                        <button className="btn">
                          <MdModeEdit /> Edit
                        </button>
                      </li>
                      <li>
                        <button className="btn">
                          <MdDeleteOutline /> Delete
                        </button>
                      </li>
                      <li>
                        <button className="btn btnN">
                          <Image
                            src={icon7}
                            alt="icon"
                            className={`${cx.icon}`}
                          />{" "}
                          20 pts
                        </button>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>

              <Row className={`${cx.cardBoxN}`}>
                <Col md={4}>
                  <Image src={banner3} alt="banner" className={`${cx.img3}`} />
                </Col>
                <Col md={8}>
                  <div className={`${cx.cardBoxNBody}`}>
                    <h5>Peace is middle of stroms</h5>
                    <p>
                      The 'Big Bloom' takes the aspirational spirit of
                      exploration that propelled humanity to the moon and turns
                      it inward...
                    </p>
                    <ul className={`${cx.tagsList}`}>
                      <li>Tag Name 1</li>
                      <li>Tag Name 2</li>
                      <li>Tag Name 3</li>
                    </ul>
                    <ul className={`${cx.actionBtn}`}>
                      <li>
                        <button className="btn">
                          <MdModeEdit /> Edit
                        </button>
                      </li>
                      <li>
                        <button className="btn">
                          <MdDeleteOutline /> Delete
                        </button>
                      </li>
                      <li>
                        <button className="btn btnN">
                          <Image
                            src={icon7}
                            alt="icon"
                            className={`${cx.icon}`}
                          />{" "}
                          20 pts
                        </button>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>

              <Row className={`${cx.cardBoxN}`}>
                <Col md={4}>
                  <Image src={banner3} alt="banner" className={`${cx.img3}`} />
                </Col>
                <Col md={8}>
                  <div className={`${cx.cardBoxNBody}`}>
                    <h5>Peace is middle of stroms</h5>
                    <p>
                      The 'Big Bloom' takes the aspirational spirit of
                      exploration that propelled humanity to the moon and turns
                      it inward...
                    </p>
                    <ul className={`${cx.tagsList}`}>
                      <li>Tag Name 1</li>
                      <li>Tag Name 2</li>
                      <li>Tag Name 3</li>
                    </ul>
                    <ul className={`${cx.actionBtn}`}>
                      <li>
                        <button className="btn">
                          <MdModeEdit /> Edit
                        </button>
                      </li>
                      <li>
                        <button className="btn">
                          <MdDeleteOutline /> Delete
                        </button>
                      </li>
                      <li>
                        <button className="btn btnN">
                          <Image
                            src={icon7}
                            alt="icon"
                            className={`${cx.icon}`}
                          />{" "}
                          20 pts
                        </button>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>

              <Row className={`${cx.cardBoxN}`}>
                <Col md={4}>
                  <Image src={banner3} alt="banner" className={`${cx.img3}`} />
                </Col>
                <Col md={8}>
                  <div className={`${cx.cardBoxNBody}`}>
                    <h5>Peace is middle of stroms</h5>
                    <p>
                      The 'Big Bloom' takes the aspirational spirit of
                      exploration that propelled humanity to the moon and turns
                      it inward...
                    </p>
                    <ul className={`${cx.tagsList}`}>
                      <li>Tag Name 1</li>
                      <li>Tag Name 2</li>
                      <li>Tag Name 3</li>
                    </ul>
                    <ul className={`${cx.actionBtn}`}>
                      <li>
                        <button className="btn">
                          <MdModeEdit /> Edit
                        </button>
                      </li>
                      <li>
                        <button className="btn">
                          <MdDeleteOutline /> Delete
                        </button>
                      </li>
                      <li>
                        <button className="btn btnN">
                          <Image
                            src={icon7}
                            alt="icon"
                            className={`${cx.icon}`}
                          />{" "}
                          20 pts
                        </button>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>

              <Row className={`${cx.cardBoxN}`}>
                <Col md={4}>
                  <Image src={banner3} alt="banner" className={`${cx.img3}`} />
                </Col>
                <Col md={8}>
                  <div className={`${cx.cardBoxNBody}`}>
                    <h5>Peace is middle of stroms</h5>
                    <p>
                      The 'Big Bloom' takes the aspirational spirit of
                      exploration that propelled humanity to the moon and turns
                      it inward...
                    </p>
                    <ul className={`${cx.tagsList}`}>
                      <li>Tag Name 1</li>
                      <li>Tag Name 2</li>
                      <li>Tag Name 3</li>
                    </ul>
                    <ul className={`${cx.actionBtn}`}>
                      <li>
                        <button className="btn">
                          <MdModeEdit /> Edit
                        </button>
                      </li>
                      <li>
                        <button className="btn">
                          <MdDeleteOutline /> Delete
                        </button>
                      </li>
                      <li>
                        <button className="btn btnN">
                          <Image
                            src={icon7}
                            alt="icon"
                            className={`${cx.icon}`}
                          />{" "}
                          20 pts
                        </button>
                      </li>
                    </ul>
                  </div>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey="trails" title="Trails">
              <div className={`${cx.buttons}`}>
                <button className="btn">
                  <FiPlusCircle /> create a trail
                </button>
              </div>

              <section className={`${cx.cardSection}`}>
                <Container>
                  <div className={`${cx.cardBox}`}>
                    <OwlCarousel className="owl-theme" {...options}>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                    </OwlCarousel>
                  </div>
                </Container>
              </section>

              <section className={`${cx.cardSection}`}>
                <Container>
                  <div className={`${cx.cardBox}`}>
                    <OwlCarousel className="owl-theme" {...options}>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                    </OwlCarousel>
                  </div>
                </Container>
              </section>

              <section className={`${cx.cardSection}`}>
                <Container>
                  <div className={`${cx.cardBox}`}>
                    <OwlCarousel className="owl-theme" {...options}>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                    </OwlCarousel>
                  </div>
                </Container>
              </section>

              <section className={`${cx.cardSection}`}>
                <Container>
                  <div className={`${cx.cardBox}`}>
                    <OwlCarousel className="owl-theme" {...options}>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                      <div className="item">
                        <BlogCard3 />
                      </div>
                    </OwlCarousel>
                  </div>
                </Container>
              </section>
            </Tab>
          </Tabs>
        </Col>
      </section>
    </>
  );
}

export default Journals;
