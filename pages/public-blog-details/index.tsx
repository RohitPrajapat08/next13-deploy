import React from "react";
import cx from "./index.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";

import {
  cat1,
  post1,
  profile,
  shape4,
  shape5,
  tiger,
  bodyBuilder,
} from "../../public/images";
import Head from "next/head";
import { useAppSelector } from "../../redux/hooks";
import { blogDetails } from "../../redux/reducers/GetBlogsdataReducer";

export default function BlogDetails() {
  const blog = useAppSelector(blogDetails);
  console.log(blog, "blog");

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
                <h5>Kathlenn Velasco</h5>
              </div>
            </Col>
            <Col md={6}>
              <div className={`${cx.contentBody}`}>
                <h2>Mind Racing Like A Tiger? Try the Rest and Roar Model</h2>
                <p>World domination starts with a good night's sleep.</p>
                <ul>
                  <li>
                    (<span> peace </span>)
                  </li>
                  <li>
                    (<span> peace </span>)
                  </li>
                  <li>
                    (<span> peace </span>)
                  </li>
                  <li>
                    (<span> peace </span>)
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
      <div className={`${cx.postBannerImg}`}>
        <Image
          style={{
            objectFit: "contain",
          }}
          src={post1}
          alt="blog-post"
          className={`${cx.postImg}`}
        />
      </div>
      <section className={`${cx.detailsSection}`}>
        <Container>
          <Row className={`${cx.contentSection}`}>
            <Col md={8}>
              <div className={`${cx.detailsContent}`}>
                <span className={`${cx.cateIcon}`}>
                  <Image
                    style={{
                      objectFit: "contain",
                    }}
                    src={cat1}
                    alt="category"
                  />
                </span>
                <h2>Titt tje Singularity Toward Love</h2>
                <h5>
                  A Growing Chorus of Voices Are Ushering in a New Era of
                  Bioflourishing
                </h5>
                <p>
                  While the processes of snake shedding its skin and a lobster
                  molting share some commonalities, they also prosses distinct
                  differences. Both of these processes, known as ecdysis, are
                  forms of growth and regeneration, but they occur for different
                  reasons and in different ways.
                </p>

                <div className={`${cx.boxNewCard}`}>
                  <Image
                    style={{
                      objectFit: "contain",
                    }}
                    src={bodyBuilder}
                    alt="image"
                    className={`${cx.bImg}`}
                  />
                  <Image
                    style={{
                      objectFit: "contain",
                    }}
                    src={tiger}
                    alt="image"
                    className={`${cx.tImg}`}
                  />
                  <h5 className={`${cx.top} ${cx.well}`}>WellGorithms</h5>
                  {/* <h5 className={`${cx.top}`}>(Tenacity) Tiger</h5> */}

                  <h5 className={`${cx.topCard}`}>
                    Experience the tiger's courage in VR
                  </h5>
                  <h5 className={`${cx.tenacity}`}>(tenacity) Tiger</h5>
                  <p className={`${cx.desc}`}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nesciunt or sit amet consectetur adipisicing elit. Nesciunt
                    perspiciatis
                  </p>
                  <h5 className={`${cx.enter}`}>enter</h5>
                </div>
              </div>
            </Col>
            <Col md={4}>
              <div className={`${cx.dtlCard}`}>
                <h6>insights</h6>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
              <div className={`${cx.dtlCard}`}>
                <h6>insights</h6>
                <h5>
                  (<span>inner</span>) Roaring
                </h5>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <h5>
                  (<span>inner</span>) Roaring
                </h5>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
              <div className={`${cx.dtlCard}`}>
                <h6>insights</h6>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
