import React, { Fragment, useEffect, useState } from "react";
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
  post2,
} from "../../public/images";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import VerticalProgress from "../../components/Progress/Progress";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  blogPageDataCapture,
  localDataFields,
} from "../../redux/reducers/dataReducer";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import slugify from "../../utils/slugURL";

async function sendRequest(
  url,
  { arg }: { arg: { userUniqueId: string; articleId: string; comment: string } }
) {
  return fetch(url, {
    method: "POST",
    headers: {
      Authorization: localStorage.getItem("UserToken"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

const fetcher = (...args: any[]) =>
  fetch(...(args as [RequestInfo, RequestInit?])).then((res) => res.json());

export default function BlogDetails() {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  const [comment, setComment] = useState("");

  const {
    blogId = "",
    UserData = {},
    UserToken = "",
  } = useAppSelector(localDataFields);
  const dispatch = useAppDispatch();
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/bloggetbyId?articleId=${blogId}&page=editBlog`, // landing
    fetcher
  );

  const { data: wellgorithmData, error: wellgorithmError } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/getwellgowithtags/${blogId}`,
    fetcher
  );

  useEffect(() => {
    if (blogId === "") {
      dispatch(blogPageDataCapture({ blogId: blogId, search: "landing" }));
    }
    dispatch(
      blogPageDataCapture({
        UserData: JSON.parse(localStorage.getItem("UserData")!),
        UserToken: localStorage.getItem("UserToken")!,
      })
    );
  }, []);

  const { trigger, isMutating } = useSWRMutation(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/usercomment`,
    sendRequest /* options */
  );

  const { mutate } = useSWRConfig();

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
                <h5>{data?.result?.authorName?.authorName}</h5>
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
                        (
                        <span>
                          {" "}
                          <Link href={`/tags/${tag.tags}/${tag?._id}`}>
                            {tag.tags}
                          </Link>{" "}
                        </span>
                        )
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
                    alt="weather tag"
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
                    style={{
                      objectFit: "contain",
                    }}
                    src={bodyBuilder}
                    alt="image"
                    className={`${cx.bImg}`}
                  />
                  <Image
                    width={100}
                    height={100}
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

      <section className={`${cx.spaceBox}`}>
        {data && data?.result && "commentBox" in data?.result && (
          <Container>
            {data?.result?.commentBox.length > 0 && (
              <div>
                <h3 className="mb-3">Comments:</h3>
                <ul className={`${cx.commentList}`}>
                  {data?.result?.commentBox.map((item) => (
                    <li>
                      <Image
                        style={{
                          objectFit: "contain",
                        }}
                        key={"kwy234"}
                        width={100}
                        height={100}
                        src={item?.image ?? post2}
                        alt="profile"
                      />
                      <div className={`${cx.commentBody}`}>
                        <h5>{item?.name}</h5>
                        <p>{item.comment}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="col-md-4 mb-4">
              <div className={`${cx.searchBox}`}>
                <input
                  placeholder="Comment.."
                  className="form-control"
                  type="text"
                  value={comment}
                  disabled={!UserToken}
                  onChange={(e) => {
                    setComment(e.target.value.trim());
                  }}
                />
                <button
                  className="btn"
                  disabled={isMutating}
                  onClick={async () => {
                    if (UserToken) {
                      try {
                        const result = await trigger({
                          userUniqueId: UserData?.uniqueId,
                          articleId: blogId,
                          comment: comment,
                        });
                        if (result.status) {
                          mutate(
                            `${process.env.NEXT_PUBLIC_APP_BASEURL}/bloggetbyId?articleId=${blogId}&page=landing`
                          );
                          setComment("");
                        }
                        console.log(result, "result in blogs page");
                      } catch (e) {
                        console.log(e, "error in swr");
                      }
                    }
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </Container>
        )}

        {wellgorithmData && wellgorithmData?.result && (
          <>
            <div>
              <h3 className="mb-3">Article Wellgorithm Recommendation:</h3>
              <ul className={`${cx.commentList}`}>
                {wellgorithmData?.result?.map((item, index) => (
                  <Link
                    href={`/wellgorithm/articles/${slugify(item?.name)}/${
                      item?._id
                    }`}
                  >
                    <li key={index}>
                      <Image
                        style={{
                          objectFit: "contain",
                        }}
                        key={"kwy234"}
                        width={100}
                        height={100}
                        src={item?.wellgoImage ?? post2}
                        alt="profile"
                      />
                      <div className={`${cx.commentBody}`}>
                        <h5>{item?.name}</h5>
                        <p>{item.content}</p>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </>
        )}
      </section>
    </>
  );
}
