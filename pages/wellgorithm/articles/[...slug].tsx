import React, { Fragment } from "react";
import cx from "./index.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/router";
import { post2, shape4, shape9 } from "../../../public/images";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import { FaUserCircle } from "react-icons/fa";
import slugify from "../../../utils/slugURL";
import { useAppDispatch } from "../../../redux/hooks";
import { blogPageDataCapture } from "../../../redux/reducers/dataReducer";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: window.localStorage.getItem("UserToken"),
    },
  }).then((res) => res.json());

export default function WellgorithmArticles() {
  const router = useRouter();
  console.log(router.query, "router");
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/wellgorithmarticle/${router?.query?.slug?.[1]}`,
    fetcher
  );

  const dispatch = useAppDispatch();
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
                <h2>{router?.query?.slug?.[0]}</h2>
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

      <section className={`${cx.blogSection}`}>
        <Container>
          {data && data?.status ? (
            <Row>
              {data &&
                data?.result?.map((article: any, index: number) => {
                  const newdate = article?.createdAt?.toLocaleString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  });
                  let splitDate = newdate?.split("T");
                  return (
                    <Col key={index} md={6} lg={4}>
                      <div
                        className={`${cx.blogCard}`}
                        onClick={() => {
                          localStorage.setItem("blogId", article?._id);
                          localStorage.setItem("search", "");
                          dispatch(
                            blogPageDataCapture({
                              blogId: article?._id,
                              search: "",
                            })
                          );
                        }}
                      >
                        <div className={`${cx.blogCardImg}`}>
                          <Link
                            href={`/blog/${slugify(article?.articleTitle)}`}
                          >
                            <Image
                              width={100}
                              height={100}
                              className={`${cx.postImg}`}
                              src={
                                article?.articleImage.includes("blob")
                                  ? post2
                                  : article?.articleImage
                              }
                              alt="post"
                            />
                          </Link>
                          <button className={`btn ${cx.btnTop}`}>
                            {article?.tags.length > 0
                              ? article?.tags[0].tags
                              : "Tag"}
                          </button>
                        </div>
                        <div className={`${cx.blogCardBody}`}>
                          <Link
                            href={`/blog/${slugify(article?.articleTitle)}`}
                            className={`${cx.link}`}
                          >
                            <h2>{article?.articleTitle}</h2>
                          </Link>
                          <div className={`${cx.author}`}>
                            <FaUserCircle />
                            <h6>
                              {article?.type === "GARDENER"
                                ? article?.userName?.userName
                                : article?.authorName?.authorName}
                              <span>-</span>
                              {splitDate[0]}{" "}
                            </h6>
                          </div>
                        </div>
                      </div>
                    </Col>
                  );
                })}
            </Row>
          ) : (
            <p>{data?.message}</p>
          )}
        </Container>
      </section>
    </>
  );
}
