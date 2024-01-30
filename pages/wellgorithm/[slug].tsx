import React, { useEffect } from "react";
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
import { useRouter } from "next/router";
import useSWR from "swr";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  blogPageDataCapture,
  localDataFields,
} from "../../redux/reducers/dataReducer";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: window.localStorage.getItem("UserToken"),
    },
  }).then((res) => res.json());

export default function Wellgorithms() {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  console.log(router.query, "router");
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/getwellgo?wellgoId=${router?.query?.slug}`,
    fetcher
  );

  console.log(data, error, "Wellgorithm Details file fetcher");

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
                  src={data?.result?.wellgoImage ?? profile}
                  alt="profile"
                  className={`${cx.profileImg}`}
                  width={15}
                  height={15}
                />
                <h5>{data?.result?.name}</h5>
                <h5>Points: {data?.result?.wellgorithmsPoints}</h5>
              </div>
            </Col>
            <Col md={6}>
              <div className={`${cx.contentBody}`}>
                <h2>{data?.result?.content}</h2>
                <div>
                  <ul>
                    Tags:{" "}
                    {data?.result?.tag?.map((item, index) => (
                      <li key={index}>
                        (<span> {item.tags} </span>)
                      </li>
                    ))}
                  </ul>

                  <ul>
                    {" "}
                    Tag Group:{" "}
                    {data?.result?.tagGroup?.map((item, index) => (
                      <li key={index}>
                        (<span> {item.groupName} </span>)
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
