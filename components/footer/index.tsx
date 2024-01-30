import React from "react";
import cx from "./index.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import {
  academy,
  ftLogo,
  ksm,
  shape6,
  shape7,
  shape8,
  sperrow2,
  youtube,
} from "../../public/images";
import { MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

export default function FooterWebsite() {
  return (
    <footer className={`${cx.footerMain}`}>
      <Image
        style={{
          objectFit: "contain",
        }}
        className={`${cx.footerShape}`}
        src={shape6}
        alt="shape6"
      />
      <div className={`${cx.centerBody}`}>
        <Container>
          <Row>
            <Col md={12} lg={6}>
              <div className={`${cx.footerCard}`}>
                <ul className={`${cx.list}`}>
                  <li>
                    <Link href="/journey">
                      <MdKeyboardArrowRight /> <span>(inner)</span> Journey
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <MdKeyboardArrowRight /> <span>(inner)</span> Reality
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <MdKeyboardArrowRight /> <span>(inner)</span> Garden
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <MdKeyboardArrowRight /> <span>(inner)</span> Health
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <MdKeyboardArrowRight /> <span>(inner)</span> Academy
                    </Link>
                  </li>
                  <li>
                    <Link href="#">
                      <MdKeyboardArrowRight /> <span>(inner)</span> Rehab
                    </Link>
                  </li>
                </ul>
                <div className={`${cx.rightBox}`}>
                  <Image
                    style={{
                      objectFit: "contain",
                    }}
                    src={sperrow2}
                    alt="sperrow 2"
                    className={`${cx.spe1}`}
                  />
                  <Link href="#" className={`btn ${cx.btn1}`}>
                    our story
                  </Link>
                  <p>
                    Support our mission to bring <br />
                    Bioflourishing to the world.
                  </p>
                  <Link href="#" className={`btn ${cx.btn2}`}>
                    our story
                  </Link>
                </div>
              </div>
            </Col>

            <Col md={12} lg={6}>
              <div className={`${cx.subscribeBox}`}>
                <h4>subscribe to (inner)Nature</h4>
                <p>
                  Tap into the world’s largest library of nature’s wisdom, with
                  exclusive posts, practices, previews, fireside chats, and
                  more.
                </p>
                <Row>
                  <Col md={6}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Full Name"
                    />
                  </Col>
                  <Col md={6}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                    />
                  </Col>
                  <Col md={12}>
                    <button className={`btn ${cx.submitBtn}`}>Subscribe</button>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Image
        style={{
          objectFit: "contain",
        }}
        className={`${cx.bottoMshape}`}
        src={shape7}
        alt="shape7"
      />
      <div className={`${cx.footerMainCenter}`}>
        <Container>
          <Row>
            <Col className="col-6" md={4} lg={4}>
              <Link href="#" className={`${cx.ftAction} justify-content-end`}>
                <Image
                  style={{
                    objectFit: "contain",
                  }}
                  className={`${cx.iconAction}`}
                  src={youtube}
                  alt="shape7"
                />
                (<span>inner</span>)TV
              </Link>
            </Col>
            <Col className={`${cx.mobileDiv}`} md={4}></Col>
            <Col className="col-6" md={4} lg={4}>
              <Link href="#" className={`${cx.ftAction}`}>
                <Image
                  style={{
                    objectFit: "contain",
                  }}
                  className={`${cx.iconAction}`}
                  src={academy}
                  alt="shape7"
                />
                (<span>inner</span>)Academy
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      <Image
        style={{
          objectFit: "contain",
        }}
        className={`${cx.bottoMshape2}`}
        src={shape8}
        alt="shape8"
      />
      <div className={`${cx.footerMenu}`}>
        <ul>
          <li>
            <Link href="#">Contact</Link>
          </li>
          <li>
            <div className={`${cx.ksmBox}`}>
              <Image
                style={{
                  objectFit: "contain",
                }}
                className={`${cx.ksm}`}
                src={ksm}
                alt="ftLogo"
              />
              <Image
                style={{
                  objectFit: "contain",
                }}
                className={`${cx.ftLogo}`}
                src={ftLogo}
                alt="ftLogo"
              />
            </div>
          </li>
          <li>
            <Link href="#">Policies</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
