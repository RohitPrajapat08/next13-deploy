"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./page.module.scss";
import { Container } from "react-bootstrap";
import dynamic from "next/dynamic";
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { BlogCard2 } from "../components";
import {
  apigetartseriesData,
  artseriesget,
} from "../../app/redux/reducers/GetArtseriesdataReducer";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

function PathsPage() {
  const dispatch = useAppDispatch();
  const ArticlesSeries = useAppSelector(apigetartseriesData);
  async function getarticles() {
    await dispatch(artseriesget());
  }
  useEffect(() => {
    getarticles();
  }, []);

  console.log("ArticlesSeries <>??<> ArticlesSeries", ArticlesSeries);

  const options = {
    loop: false,
    autoWidth: false,
    dots: false,
    nav: true,
    items: 4,
    navText: [
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>`,
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>`,
    ],
    autoplay: false,
    responsive: {
      0: {},
      480: {},
      768: {},
      992: {},
    },
  };

  return (
    <>
      {/* <section className={`${cx.cardSection}`}>
        <Container>
          <div className={`${cx.cardBox}`}>
            <h3 className={`${cx.titleN}`}>Journey to the (peace)Garden</h3>
            <OwlCarousel className="owl-theme" {...options}>
              <div className="item">
                <BlogCard2 />
              </div>
              <div className="item">
                <BlogCard2 />
              </div>
              <div className="item">
                <BlogCard2 />
              </div>
              <div className="item">
                <BlogCard2 />
              </div>
              <div className="item">
                <BlogCard2 />
              </div>
            </OwlCarousel>
          </div>
        </Container>
      </section> */}
      {Array.isArray(ArticlesSeries) &&
        ArticlesSeries.map((articlesSeriesData: any, index: any) => (
          <section className={`${cx.cardSection}`} key={index}>
            {Array.isArray(articlesSeriesData.titleId) &&
              articlesSeriesData.titleId.length > 0 && (
                <Container>
                  <div className={`${cx.cardBox}`}>
                    <h3 className={`${cx.titleN}`}>
                      {articlesSeriesData.title}
                    </h3>
                    <OwlCarousel className="owl-theme" {...options}>
                      <div className="item">
                        <BlogCard2
                          ArticlesSeries={articlesSeriesData.titleId}
                        />
                      </div>
                    </OwlCarousel>
                  </div>
                </Container>
              )}
          </section>
        ))}

      {/* <section className={`${cx.cardSection}`}>
        <Container>
          <div className={`${cx.cardBox}`}>
            <h3 className={`${cx.titleN}`}>Journey to the (peace)Garden</h3>
            <OwlCarousel className="owl-theme" {...options}>
              <div className="item">
                <BlogCard2 />
              </div>
              <div className="item">
                <BlogCard2 />
              </div>
              <div className="item">
                <BlogCard2 />
              </div>
              <div className="item">
                <BlogCard2 />
              </div>
              <div className="item">
                <BlogCard2 />
              </div>
            </OwlCarousel>
          </div>
        </Container>
      </section>
      <section className={`${cx.cardSection}`}>
        <Container>
          <div className={`${cx.cardBox}`}>
            <h3 className={`${cx.titleN}`}>Journey to the (peace)Garden</h3>
            <OwlCarousel className="owl-theme" {...options}>
              <div className="item">
                <BlogCard2 />
              </div>
              <div className="item">
                <BlogCard2 />
              </div>
              <div className="item">
                <BlogCard2 />
              </div>
              <div className="item">
                <BlogCard2 />
              </div>
              <div className="item">
                <BlogCard2 />
              </div>
            </OwlCarousel>
          </div>
        </Container>
      </section>
      <section className={`${cx.cardSection}`}>
        <Container>
          <div className={`${cx.cardBox}`}>
            <h3 className={`${cx.titleN}`}>Journey to the (peace)Garden</h3>
            <OwlCarousel className="owl-theme" {...options}>
              <div className="item">
                <BlogCard2 />
              </div>
              <div className="item">
                <BlogCard2 />
              </div>
              <div className="item">
                <BlogCard2 />
              </div>
              <div className="item">
                <BlogCard2 />
              </div>
              <div className="item">
                <BlogCard2 />
              </div>
            </OwlCarousel>
          </div>
        </Container>
      </section> */}
    </>
  );
}

export default PathsPage;
