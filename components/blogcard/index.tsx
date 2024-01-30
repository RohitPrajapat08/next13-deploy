import React, { useEffect } from "react";
import cx from "./index.module.scss";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { post2 } from "../../public/images";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apigetBlogData,
  articleSeriesList,
  specificBlog,
} from "../../redux/reducers/GetBlogsdataReducer";
import { Col } from "react-bootstrap";

export default function BlogCard() {
  const dispatch = useAppDispatch();
  const BlogsData = useAppSelector(apigetBlogData);
  // console.log(BlogsData, "BlogsDataBlogsData");

  async function getblogs() {
    await dispatch(articleSeriesList());
  }
  useEffect(() => {
    getblogs();
  }, []);

  return (
    <>
      {BlogsData?.length > 0 &&
        BlogsData?.map((item: any) => {
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
              <Col md={6} lg={4}>
                <div
                  className={`${cx.blogCard}`}
                  onClick={() => {
                    dispatch(specificBlog({ specificBlog: item }));
                  }}
                >
                  <div className={`${cx.blogCardImg}`}>
                    <Link href="/blog">
                      <Image
                        style={{
                          objectFit: "contain",
                        }}
                        width={100}
                        height={100}
                        className={`${cx.postImg}`}
                        src={item?.articleImage}
                        alt="post"
                      />
                    </Link>
                    <button className={`btn ${cx.btnTop}`}>
                      {item?.topicId?.topicName}
                    </button>
                  </div>
                  <div className={`${cx.blogCardBody}`}>
                    <Link href="/blog" className={`${cx.link}`}>
                      <h2>{item?.articleTitle}</h2>
                    </Link>
                    <div className={`${cx.author}`}>
                      <FaUserCircle />
                      <span>
                        {item?.type === "GARDENER"
                          ? item?.userName?.userName
                          : item?.authorName?.authorName}{" "}
                        <span>-</span>
                        {splitDate[0]}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            </>
          );
        })}
    </>
  );
}
