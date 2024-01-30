import React, { Fragment, useEffect } from "react";
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
import VerticalProgress from "../../components/Progress/Progress";
import {
  blogPageDataCapture,
  localDataFields,
} from "../../redux/reducers/dataReducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BlogDetails() {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { blogId = "" } = useAppSelector(localDataFields);
  const dispatch = useAppDispatch();
  // Logs "search"
  console.log(router.query, "router");
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/bloggetbyId?articleId=${blogId}&page=landing`,
    fetcher
  );

  useEffect(() => {
    if (blogId === "") {
      dispatch(blogPageDataCapture({ blogId: blogId, search: "" }));
    }
  }, []);

  console.log(data, error, "bloggetbyId");

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
                  width={100}
                  height={100}
                  src={
                    data?.result?.type === "GARDENER"
                      ? data?.result?.userName?.file?.includes("blob")
                        ? profile
                        : data?.result?.userName?.file
                      : data?.result?.authorName?.authorImage?.includes("blob")
                      ? profile
                      : data?.result?.authorName?.authorImage
                  }
                  alt="profile"
                  className={`${cx.profileImg}`}
                />
                <h5>
                  {data?.result?.type === "GARDENER"
                    ? data?.result?.userName?.userName
                    : data?.result?.authorName?.authorName}
                </h5>
              </div>
            </Col>
            <Col md={6}>
              <div className={`${cx.contentBody}`}>
                <h2>{data?.result?.articleTitle}</h2>
                <p>{data?.result?.articleSubTitle}</p>
                <ul>
                  {data?.result?.tags?.map((tag, index) => {
                    return (
                      <li key={index}>
                        (<span> {tag.tags} </span>)
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className={`${cx.backgroundShape}`}>
        <Image src={shape4} alt="shape4" className={`${cx.shapeBg1}`} />
        <Image src={shape5} alt="shape5" className={`${cx.shapeBg2}`} />
      </div>
      <div className={`${cx.postBannerImg}`}>
        <Image
          width={100}
          height={100}
          src={
            data?.result?.articleImage?.includes("blob")
              ? post1
              : data?.result?.articleImage
          }
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
                    src={
                      data?.result?.weatherTag?.icon?.includes("blob")
                        ? cat1
                        : data?.result?.weatherTag?.icon
                    }
                    alt="category"
                    width={100}
                    height={100}
                  />
                </span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: data?.result?.articleDescription,
                  }}
                ></div>

                <div className={`${cx.boxNewCard}`}>
                  <Image
                    width={100}
                    height={100}
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
                    src={
                      data?.result?.wellgoImage?.includes("blob")
                        ? tiger
                        : data?.result?.wellgoImage
                    }
                    alt="image"
                    className={`${cx.tImg}`}
                    width={100}
                    height={100}
                  />
                  <h5 className={`${cx.top} ${cx.well}`}>WellGorithms</h5>
                  {/* <h5 className={`${cx.top}`}>(Tenacity) Tiger</h5> */}

                  <h5 className={`${cx.topCard}`}>
                    {data?.result?.wellgoHeadline}
                  </h5>
                  <h5 className={`${cx.tenacity}`}>
                    {data?.result?.wellgoTitle?.name}
                  </h5>
                  <p className={`${cx.desc}`}>{data?.result?.wellgoContent}</p>
                  <h5 className={`${cx.enter}`}>enter</h5>
                </div>
              </div>
            </Col>
            <Col md={4}>
              {/* <div className={`${cx.dtlCard}`}>
                <h6>insights</h6>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div> */}
              <div className={`${cx.dtlCard}`}>
                <h6>({data?.result?.innerId?.inner})Words</h6>

                {data?.result?.headContent?.map((header_Content, index) => {
                  return (
                    <Fragment key={`header_Content${index}`}>
                      <h5>
                        (<span>{header_Content?.heading}</span>) Roaring
                      </h5>
                      <p>{header_Content?.content}</p>
                    </Fragment>
                  );
                })}
              </div>
              <div className={`${cx.dtlCard}`}>
                <h6>(Science)</h6>
                <p>{data?.result?.science}</p>
              </div>

              <div>
                <h6>(Ai Meter)</h6>
                <div
                  className={`${cx.aiprogressBar}`}
                  style={{
                    // "-webkit-transform": "rotate(90deg)",
                    // "-moz-transform": "rotate(90deg)",
                    // "-o-transform": "rotate(90deg)",
                    // "-ms-transform": "rotate(90deg)",
                    transform: "rotate(-90deg)",
                  }}
                >
                  <VerticalProgress Percentage={data?.result?.aiMeter ?? 0} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
