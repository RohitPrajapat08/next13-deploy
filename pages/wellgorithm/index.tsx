import React, { useState } from "react";
import cx from "./index.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import { post2, shape4, shape9 } from "../../public/images";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: window.localStorage.getItem("UserToken"),
    },
  }).then((res) => res.json());

export default function Wellgorithm() {
  const router = useRouter();
  console.log(router.query, "router");
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/getwellgo`,
    fetcher
  );

  console.log(data, error, "Wellgorithm file fetcher");

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
          <Row className="align-items-center">
            <Col md={8} lg={6} className="m-auto">
              <div className={`${cx.contentBody}`}>
                <h2>Wellgorithms</h2>
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
          src={shape9}
          alt="shape9"
          className={`${cx.shapeBg2}`}
        />
      </div>

      <section className={`${cx.filterSection}`}>
        <Container>
          <Row>
            {data &&
              data?.result?.length > 0 &&
              data?.result?.map((wellgorithm: any, index: number) => {
                console.log(wellgorithm, "wellgorithm");
                return (
                  <Col key={index} md={6} lg={4}>
                    <div className={`position-relative ${cx.blogCard}`}>
                      <Link
                        href={`/wellgorithm/${wellgorithm?._id}`}
                        className={`${cx.link}`}
                      >
                        <div className={`${cx.blogCardImg}`}>
                          {/* /blog-details */}

                          <Image
                            style={{
                              objectFit: "contain",
                            }}
                            width={100}
                            height={100}
                            className={`${cx.postImg}`}
                            src={wellgorithm?.wellgoImage ?? post2}
                            alt="post"
                            placeholder="empty"
                          />
                        </div>
                      </Link>

                      <div className={`${cx.blogCardBody}`}>
                        <Link
                          href={`/journey/${wellgorithm?._id}`}
                          className={`${cx.link}`}
                        >
                          <h2>{wellgorithm?.name}</h2>
                        </Link>
                      </div>
                    </div>
                  </Col>
                );
              })}
          </Row>
        </Container>
      </section>
    </>
  );
}
