import React from "react";
import cx from "./index.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import {
  as1,
  as2,
  as3,
  cat1,
  post1,
  post2,
  profile,
  sdf,
  shape4,
  shape5,
} from "../../public/images";
import Head from "next/head";
import Link from "next/link";

export default function UserBlogs() {
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
            <Col md={4}>
              <div className={`${cx.profileCard}`}>
                <Image
                  style={{
                    objectFit: "contain",
                  }}
                  src={profile}
                  alt="profile"
                  className={`${cx.profileImg}`}
                />
                <h5>Salman R.</h5>
                <Link className={`${cx.mailLink}`} href="#">
                  salman@gmail.com
                </Link>
                <p>
                  Sir Ahmed Salman Rushdie is an Indian-born Brit-ish-American
                  novelist. His work often combines magic realism with
                  historical fiction and primarily deals with connections,
                  disruptions, and migrations between
                </p>
                <Link className={`${cx.readMore}`} href="#">
                  reda more
                </Link>
              </div>
            </Col>
            <Col md={6}>
              <div className={`${cx.contentBody}`}>
                <ul className={`${cx.filterOption}`}>
                  <li>
                    <Link href="#" className={`btn ${cx.linkBtn}`}>
                      Love
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`btn ${cx.linkBtn}`}>
                      generosity
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`btn ${cx.linkBtn}`}>
                      gratitude
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`btn ${cx.linkBtn}`}>
                      peace
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`btn ${cx.linkBtn}`}>
                      anxiety
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`btn ${cx.linkBtn}`}>
                      kindness
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`btn ${cx.linkBtn}`}>
                      joy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`btn ${cx.linkBtn}`}>
                      laughter
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={`btn ${cx.linkBtn}`}>
                      view all tags
                    </Link>
                  </li>
                </ul>
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
      <section className={`${cx.detailsSection}`}>
        <Container>
          <Row className={`${cx.imageSection}`}>
            <Col md={8}>
              <div className={`${cx.detailsContent}`}>
                <Image
                  style={{
                    objectFit: "contain",
                  }}
                  src={post1}
                  alt="blog-post"
                  className={`${cx.postImg}`}
                />
              </div>
            </Col>
            <Col md={4}>
              <ul className={`${cx.assetsList}`}>
                <li>
                  <Image
                    style={{
                      objectFit: "contain",
                    }}
                    src={as1}
                    alt="img 1"
                  />
                </li>
                <li>
                  <Image
                    style={{
                      objectFit: "contain",
                    }}
                    src={as2}
                    alt="img 2"
                  />
                </li>
                <li>
                  <Image
                    style={{
                      objectFit: "contain",
                    }}
                    src={as3}
                    alt="img 3"
                  />
                </li>
              </ul>
            </Col>
          </Row>
          <Row className={`${cx.contentSection}`}>
            <Col md={8}>
              <div className={`${cx.detailsContent}`}>
                <p>
                  While the processes of snake shedding its skin and a lobster
                  molting share some commonalities, they also prosses distinct
                  differences. Both of these processes, known as ecdysis, are
                  forms of growth and regeneration, but they occur for different
                  reasons and in different ways.
                </p>
                <p>
                  A snake sheds its skin to allow for growth and to remove
                  parasites that may have attached to their old skin. This
                  process in gradual and involves the snake rubbing against
                  rough surfaces to peel the old skin away. In contrast, a
                  lobster molts because its hard exoskeleton cannot expand.
                  Molting is a process in which the lobster forms an entirely
                  new exoskeleton underneath the old one, then sheds or molts
                  the old shell to reveal the new one. This process in more
                  sudden and dramatic than a snakes shedding.
                </p>
                <p>
                  While the processes of snake shedding its skin and a lobster
                  molting share some commonalities, they also prosses distinct
                  differences. Both of these processes, known as ecdysis, are
                  forms of growth and regeneration, but they occur for different
                  reasons and in different ways.
                </p>
                <p>
                  A snake sheds its skin to allow for growth and to remove
                  parasites that may have attached to their old skin. This
                  process in gradual and involves the snake rubbing against
                  rough surfaces to peel the old skin away. In contrast, a
                  lobster molts because its hard exoskeleton cannot expand.
                  Molting is a process in which the lobster forms an entirely
                  new exoskeleton underneath the old one, then sheds or molts
                  the old shell to reveal the new one. This process in more
                  sudden and dramatic than a snakes shedding.
                </p>

                <Row>
                  <Col md={6}>
                    <Image
                      style={{
                        objectFit: "contain",
                      }}
                      className={`${cx.similarImg}`}
                      src={post2}
                      alt="post2"
                    />
                  </Col>
                  <Col md={6}>
                    <Image
                      style={{
                        objectFit: "contain",
                      }}
                      className={`${cx.similarImg}`}
                      src={post2}
                      alt="post2"
                    />
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={4}>
              <div className={`${cx.blogBox}`}>
                <Image
                  style={{
                    objectFit: "contain",
                  }}
                  className={`${cx.similarImg}`}
                  src={post2}
                  alt="post2"
                />
                <h3>7 lessons from the sea otters</h3>
                <p>
                  Sea otters playful behavior can teach us a lot about the
                  imporance of play. Play is not just a waste of time: it is
                  actually essential for our physical and medtal health.
                </p>
                <div className={`${cx.blogBoxBottom}`}>
                  <span>6 min . read</span>
                  <div className={`${cx.blogBoxBottomBody}`}>
                    <button>kindness</button>
                    <button>humility</button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
