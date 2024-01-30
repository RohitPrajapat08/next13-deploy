import React from "react";
import { FaCoffee } from "react-icons/fa";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./page.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import { banner1 } from "../../../public/images";
import { BlogCard } from "../components";

function HomePage() {
  return (
    <>
      <section className={`${cx.heroSection}`}>
        <Container>
          <Image src={banner1} alt="banner" className={`${cx.bannerImg}`} />
          <Col md={10} lg={6} className={`${cx.cardBoxCol}`}>
            <div className={`${cx.cardBox}`}>
              <h4 className={`${cx.cardBoxTitle}`}>Gardens</h4>
              <div className={`${cx.cardBoxBody}`}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </Col>
        </Container>
      </section>

      <section className={`${cx.blogSection}`}>
        <Container>
          <Row>
            <Col md={6}>
              <BlogCard />
            </Col>
            <Col md={6}>
              <BlogCard />
            </Col>
            <Col md={6}>
              <BlogCard />
            </Col>
            <Col md={6}>
              <BlogCard />
            </Col>
            <Col md={6}>
              <BlogCard />
            </Col>
            <Col md={6}>
              <BlogCard />
            </Col>
            <Col md={6}>
              <BlogCard />
            </Col>
            <Col md={6}>
              <BlogCard />
            </Col>
            <Col md={6}>
              <BlogCard />
            </Col>
            <Col md={6}>
              <BlogCard />
            </Col>
            <Col md={6}>
              <BlogCard />
            </Col>
            <Col md={6}>
              <BlogCard />
            </Col>
            <Col md={6}>
              <BlogCard />
            </Col>
            <Col md={6}>
              <BlogCard />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default HomePage;
