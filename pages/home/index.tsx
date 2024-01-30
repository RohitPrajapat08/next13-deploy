import React, { useState, useEffect } from "react";
import cx from "./index.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import { sdf, shape4, shape5 } from "../../public/images";
import Head from "next/head";
import { BlogCard } from "../../components";

export default function Home() {
  return (
    <>
      <Head>
        <title>Inner - Nature</title>
        <meta name="description" content="Admin" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/favicon.svg" />
      </Head>
      <section className={`${cx.profileSection}`}>
        <Container fluid>
          <Row>
            <Col md={10} lg={7} className="m-auto">
              <div className={`${cx.contentBody}`}>
                <h2>From Fungi to Feelings:</h2>
                <h3>A Deep Dive Into the Forces of Nature</h3>
                <p>
                  Join us as we uncover the secrets of plants, fungi, and
                  animals, and exbark on an extraordinary quest to
                  revolutionalize the conventional narratives of mental health.
                  You will discover the untapped potentails of the natural world
                  to provide insights and quidance for your emotional wellbeing.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className={`${cx.backgroundShape}`}>
        <Image
          style={{
            objectFit: "contain",
          }}
          src={sdf}
          alt="sdf"
          className={`${cx.sdf}`}
        />
        <Image
          style={{
            objectFit: "contain",
          }}
          src={shape4}
          alt="shape4"
          className={`${cx.shapeBg1}`}
        />
        <Image
          style={{
            objectFit: "contain",
          }}
          src={shape5}
          alt="shape5"
          className={`${cx.shapeBg2}`}
        />
      </div>

      <section className={`${cx.blogSection}`}>
        <Container>
          <Row>
            <BlogCard />
          </Row>
        </Container>
      </section>
    </>
  );
}
