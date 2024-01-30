import React, { useEffect, useState } from "react";
import cx from "./index.module.scss";
import Image from "next/image";
import {
  FaHeart,
  FaLightbulb,
  FaRegHeart,
  FaSmile,
  FaUserCircle,
} from "react-icons/fa";
import Link from "next/link";
import { post2, placeholderImg } from "../../public/images";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Col, Tab, Tabs } from "react-bootstrap";
import {
  apigetuserblogData,
  userblogget,
} from "../../redux/reducers/GetUserBlogsdataReducer";
import slugify from "../../utils/slugURL";
import { MdModeEdit } from "react-icons/md";
import axios from "axios";

export default function Nestblogcard() {
  const dispatch = useAppDispatch();
  const UserBlogsData = useAppSelector(apigetuserblogData);
  const [userId, setUserId] = useState("");
  const [key, setKey] = useState("caterpillar");

  useEffect(() => {
    let profileData: any = JSON.parse(localStorage.getItem("UserData")!);
    setUserId(profileData?._id);
  }, []);

  useEffect(() => {
    if (userId !== "") getuserblogs();
  }, [userId]);

  async function getuserblogs() {
    await dispatch(userblogget(userId));
  }

  function bookmarkforarticle(articleId, bookmarkType) {
    let config = {
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_APP_BASEURL}/bookmarkforarticle/${articleId}?bookmarkType=${bookmarkType}`,
      headers: {
        Authorization: localStorage.getItem("UserToken"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response, "bookmarkforarticle");
        getuserblogs();
      })
      .catch(function (error) {
        console.error(error?.message);
      });
  }

  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="caterpillar" title="Caterpillar">
          {UserBlogsData?.length > 0 &&
            UserBlogsData?.map((item: any, index: number) => {
              console.log(item, "UserBlogsData");
              const newdate = item?.createdAt?.toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
              let splitDate = newdate?.split("T");
              return (
                <>
                  {Object.keys(item).includes("bookmarkStatus") &&
                    Object.keys(item).includes("bookmarkType") &&
                    item.bookmarkType === "caterpillar" &&
                    item.bookmarkStatus && (
                      <Col md={6} lg={4} key={index}>
                        <div
                          className={`position-relative ${cx.blogCard}`}
                          // onClick={() => {
                          //   dispatch(specificBlog({ specificBlog: item }));
                          // }}
                        >
                          <Link
                            href={`/blog/${slugify(item?.articleTitle)}`}
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
                                src={item?.articleImage ?? post2}
                                alt="post"
                                placeholder="empty"
                              />

                              <button className={`btn ${cx.btnTop}`}>
                                {item?.tags?.length > 0
                                  ? item.tags[0].tags
                                  : "Tag"}
                              </button>
                            </div>
                          </Link>
                          <div className={`${cx.blogCardBody}`}>
                            <Link
                              href={`/blog/${slugify(item?.articleTitle)}`}
                              className={`${cx.link}`}
                            >
                              <h2>{item?.articleTitle}</h2>
                              <div className={`${cx.author} mb-2`}>
                                <h6>Blog Status - {item?.statusMessage}</h6>
                              </div>
                              <div className={`${cx.author}`}>
                                <FaUserCircle />
                                <span>
                                  {item?.type === "GARDENER"
                                    ? item?.userName?.userName
                                    : item?.authorName?.authorName}{" "}
                                  {} <span>-</span>
                                  {new Date(splitDate).toDateString().slice(4)}
                                </span>
                              </div>
                            </Link>
                          </div>
                          <Link
                            href={`/gardener-profile/AddBlogs/${item?._id}`}
                            className={`${cx.link}`}
                          >
                            <div className={`${cx.editIcon}`}>
                              <MdModeEdit />
                            </div>
                          </Link>
                          <div className={`${cx.heartIcon}`}>
                            <FaHeart
                              onClick={() => {
                                bookmarkforarticle(item?._id, "caterpillar");
                              }}
                            />
                          </div>
                        </div>
                      </Col>
                    )}
                </>
              );
            })}
        </Tab>
        <Tab eventKey="butterfly" title="Butterfly">
          {UserBlogsData?.length > 0 &&
            UserBlogsData?.map((item: any, index: number) => {
              console.log(item, "UserBlogsData");
              const newdate = item?.createdAt?.toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
              let splitDate = newdate?.split("T");
              return (
                <>
                  {Object.keys(item).includes("bookmarkStatus") &&
                    Object.keys(item).includes("bookmarkType") &&
                    item.bookmarkType === "butterfly" &&
                    item.bookmarkStatus && (
                      <Col md={6} lg={4} key={index}>
                        <div
                          className={`position-relative ${cx.blogCard}`}
                          // onClick={() => {
                          //   dispatch(specificBlog({ specificBlog: item }));
                          // }}
                        >
                          <Link
                            href={`/blog/${slugify(item?.articleTitle)}`}
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
                                src={item?.articleImage ?? post2}
                                alt="post"
                                placeholder="empty"
                              />

                              <button className={`btn ${cx.btnTop}`}>
                                {item?.tags?.length > 0
                                  ? item.tags[0].tags
                                  : "Tag"}
                              </button>
                            </div>
                          </Link>
                          <div className={`${cx.blogCardBody}`}>
                            <Link
                              href={`/blog/${slugify(item?.articleTitle)}`}
                              className={`${cx.link}`}
                            >
                              <h2>{item?.articleTitle}</h2>
                              <div className={`${cx.author} mb-2`}>
                                <h6>Blog Status - {item?.statusMessage}</h6>
                              </div>
                              <div className={`${cx.author}`}>
                                <FaUserCircle />
                                <span>
                                  {item?.type === "GARDENER"
                                    ? item?.userName?.userName
                                    : item?.authorName?.authorName}{" "}
                                  {} <span>-</span>
                                  {new Date(splitDate).toDateString().slice(4)}
                                </span>
                              </div>
                            </Link>
                          </div>
                          <Link
                            href={`/gardener-profile/AddBlogs/${item?._id}`}
                            className={`${cx.link}`}
                          >
                            <div className={`${cx.editIcon}`}>
                              <MdModeEdit />
                            </div>
                          </Link>
                          <div className={`${cx.heartIconBu}`}>
                            <FaLightbulb
                              onClick={() => {
                                bookmarkforarticle(item?._id, "butterfly");
                              }}
                            />
                          </div>
                        </div>
                      </Col>
                    )}
                </>
              );
            })}
        </Tab>
        <Tab eventKey="cocoon" title="Cocoon">
          {UserBlogsData?.length > 0 &&
            UserBlogsData?.map((item: any, index: number) => {
              console.log(item, "UserBlogsData");
              const newdate = item?.createdAt?.toLocaleString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              });
              let splitDate = newdate?.split("T");
              return (
                <>
                  {Object.keys(item).includes("bookmarkStatus") &&
                    Object.keys(item).includes("bookmarkType") &&
                    item.bookmarkType === "cocoon" &&
                    item.bookmarkStatus && (
                      <Col md={6} lg={4} key={index}>
                        <div
                          className={`position-relative ${cx.blogCard}`}
                          // onClick={() => {
                          //   dispatch(specificBlog({ specificBlog: item }));
                          // }}
                        >
                          <Link
                            href={`/blog/${slugify(item?.articleTitle)}`}
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
                                src={item?.articleImage ?? post2}
                                alt="post"
                                placeholder="empty"
                              />

                              <button className={`btn ${cx.btnTop}`}>
                                {item?.tags?.length > 0
                                  ? item.tags[0].tags
                                  : "Tag"}
                              </button>
                            </div>
                          </Link>
                          <div className={`${cx.blogCardBody}`}>
                            <Link
                              href={`/blog/${slugify(item?.articleTitle)}`}
                              className={`${cx.link}`}
                            >
                              <h2>{item?.articleTitle}</h2>
                              <div className={`${cx.author} mb-2`}>
                                <h6>Blog Status - {item?.statusMessage}</h6>
                              </div>
                              <div className={`${cx.author}`}>
                                <FaUserCircle />
                                <span>
                                  {item?.type === "GARDENER"
                                    ? item?.userName?.userName
                                    : item?.authorName?.authorName}{" "}
                                  {} <span>-</span>
                                  {new Date(splitDate).toDateString().slice(4)}
                                </span>
                              </div>
                            </Link>
                          </div>
                          <Link
                            href={`/gardener-profile/AddBlogs/${item?._id}`}
                            className={`${cx.link}`}
                          >
                            <div className={`${cx.editIcon}`}>
                              <MdModeEdit />
                            </div>
                          </Link>
                          <div className={`${cx.heartIconCo}`}>
                            <FaSmile
                              onClick={() => {
                                bookmarkforarticle(item?._id, "cocoon");
                              }}
                            />
                          </div>
                        </div>
                      </Col>
                    )}
                </>
              );
            })}
        </Tab>
      </Tabs>
    </>
  );
}
