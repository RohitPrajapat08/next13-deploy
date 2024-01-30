import React, { Fragment } from "react";
import cx from "./index.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import { shape4, shape9 } from "../../public/images";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: window.localStorage.getItem("UserToken"),
    },
  }).then((res) => res.json());

export default function Category() {
  const router = useRouter();
  console.log(router.query, "router");
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/catsubcatget?categoryId=${
      router?.query?.category?.[1] ?? ""
    }`,
    fetcher
  );

  console.log(data, error, "subcategory based on category search fetcher");
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
                <h2>{router?.query?.category?.[0] ?? ""}</h2>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className={`${cx.backgroundShape}`}>
        {/*
        <Image style={{
          objectFit: 'contain',
        }} 
        src={shape10} 
        alt="sdf" 
        className={`${cx.sdf}`} />
         */}
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

      {/* <div className={`${cx.searchShape}`}>
        <Image style={{
          objectFit: 'contain',
        }} className={`${cx.searchShapeImg}`} src={shape11} alt="shape11" />
      </div> */}

      <section className={`${cx.filterSection}`}>
        <Container>
          {/* <div className={`${cx.filterOnOff}`}>
          <span className={`${cx.labelText}`}>Mental Health</span>
          <label className={`${cx.onoff}`}>
            <input type="checkbox" />
            <span className={`${cx.slider}`}><Image style={{
          objectFit: 'contain',
        }} src={sng} className={`${cx.iconBox}`} alt="img"/> </span>
          </label>
          <span className={`${cx.labelText}`}>Gardening</span>
        </div> */}

          {data && (
            <div className={`${cx.filterTags}`}>
              {Object?.entries((data && data.result) ?? {})?.map(
                ([subKey, value]: [subKey: string, value: any[]], index) => {
                  return (
                    <Fragment key={index}>
                      <span className={`${cx.selectedValue}`}>{subKey}</span>
                      <ul className={`${cx.viewList}`}>
                        {value?.map(({ topicName, articleCount, _id }: any) => {
                          return (
                            <li key={_id}>
                              <Link href={`/subcategory/${topicName}/${_id}`}>
                                {topicName}({articleCount})
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </Fragment>
                  );
                }
              )}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
