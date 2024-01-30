import React from "react";
import cx from "./blogCard2.module.scss";
import { banner2 } from "../../../../public/images";
import Image from "next/image";
import Link from "next/link";

export default function BlogCard2(props: any) {
  console.log("props.ArticlesSeries", props.ArticlesSeries);
  return (
    <>
      {props &&
        props?.ArticlesSeries &&
        props?.ArticlesSeries?.map((articlesSeriesData: any, index: any) => (
          <div className={`${cx.blogCard}`}>
            <div className={`${cx.blogCardImg}`}>
              <Image
                src={articlesSeriesData.articleImage}
                alt="banner"
                className={`${cx.bannerImg}`}
                width={100}
                height={100}
              />
              <Link href="/pathsdetails" className={`${cx.tag} btn`}>
                {articlesSeriesData.articleTitle}
              </Link>
            </div>
            <div className={`${cx.blogCardBody}`}>
              <h3> {articlesSeriesData.articleSubTitle}</h3>
            </div>
          </div>
        ))}
    </>
  );
}
