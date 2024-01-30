import React from "react";
import cx from "./index.module.scss";
import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { post3 } from "../../public/images";
import slugify from "../../utils/slugURL";
import { useAppDispatch } from "../../redux/hooks";
import { blogPageDataCapture } from "../../redux/reducers/dataReducer";

export default function BlogCard2({ blogDetails }: any) {
  let {
    articleImage,
    articleTitle,
    tags,
    type,
    userName,
    authorName,
    createdAt,
    _id,
  } = blogDetails;

  const newdate = createdAt?.toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  let splitDate = newdate?.split("T");
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${cx.blogCard}`}
      onClick={() => {
        localStorage.setItem("blogId", _id);
        localStorage.setItem("search", "landing");
        dispatch(blogPageDataCapture({ blogId: _id, search: "landing" }));
      }}
    >
      <div className={`${cx.blogCardImg}`}>
        <Link
          href={{
            pathname: `/public-blog-details/${slugify(articleTitle)}`,
          }}
        >
          <Image
            className={`${cx.postImg}`}
            src={articleImage?.includes("blob") ? post3 : articleImage}
            alt="post"
            width={100}
            height={100}
          />
        </Link>
        <button className={`btn ${cx.btnTop}`}>
          {tags && tags.length > 0 ? tags[0]?.tags : "Tag"}
        </button>
      </div>
      <div className={`${cx.blogCardBody}`}>
        <Link
          href={{
            pathname: `/public-blog-details/${slugify(articleTitle)}`,
          }}
          className={`${cx.link}`}
        >
          <h2>{articleTitle}</h2>
        </Link>
        <div className={`${cx.author}`}>
          <FaUserCircle />
          <h6>
            {type === "GARDENER" ? userName?.userName : authorName?.authorName}{" "}
            <span>-</span> {splitDate[0]}{" "}
          </h6>
        </div>
      </div>
    </div>
  );
}
