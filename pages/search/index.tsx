import React, { useState } from "react";
import cx from "./index.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import {
  as1,
  as2,
  as3,
  cat1,
  cat2,
  cat3,
  cat4,
  cat5,
  post1,
  post2,
  profile,
  sdf,
  search,
  shape10,
  shape11,
  shape4,
  shape5,
  shape9,
  sng,
  sperrow,
  sperrow2,
  tagBg,
} from "../../public/images";
import Head from "next/head";
import { FaSearch } from "react-icons/fa";
import FilterSearch from "../../components/FilterSearch";
import Example from "../../components/CheckBoxDropDown";

export default function Search() {
  const [searchText, setSearchText] = useState("");
  const [data, setData] = useState<any>({});
  const [category, setCategory] = useState([]);

  function searchCategory(category: any) {
    setCategory(category);
  }

  async function search() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BASEURL}/searchinall?search=${searchText}&type=${category[0]}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit the data. Please try again.");
      }

      // Handle response if necessary
      const data = await response.json();
      console.log(data, "NEXT_PUBLIC_APP_BASEURL");

      setData(data);
      // ...
    } catch (error) {
      // Capture the error message to display to the user
      console.error(error);
    }
  }
  console.log(data, "datadatadatadata");
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
            <Col md={8} lg={6} className={`m-auto`}>
              <div className={`${cx.contentBody}`}>
                <div className={`${cx.searchBox}`}>
                  <input
                    value={searchText}
                    onChange={(e) => {
                      setSearchText(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    placeholder="Search Tags"
                  />
                  <Example searchCategory={searchCategory} />
                  {/* <Select options={searchOptions} /> */}
                  <button className={`${cx.searchBtn}`}>
                    <FaSearch
                      onClick={() => {
                        search();
                      }}
                    />
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div className={`${cx.backgroundShape}`}>
        {/* <Image style={{
          objectFit: 'contain',
        }} src={shape10} alt="sdf" className={`${cx.sdf}`} /> */}
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

      <section className={`${cx.filterSection}`}>
        <Container>
          {data &&
            data?.result &&
            Object.keys(data?.result).includes("article") &&
            data?.result.article?.length > 0 && (
              <FilterSearch
                headerName={"Articles"}
                displayData={data?.result.article.map((item) => ({
                  _id: item?._id,
                  image:
                    item?.articleImage == undefined
                      ? post2
                      : item?.articleImage,

                  title: item?.articleTitle,
                }))}
              />
            )}

          {data &&
            data?.result &&
            Object.keys(data?.result).includes("articleSeries") &&
            data?.result.articleSeries?.length > 0 && (
              <FilterSearch
                headerName={"Article Series"}
                displayData={data?.result.articleSeries.map((item) => ({
                  _id: item?._id,
                  image:
                    item?.seriesImage == undefined ? post2 : item?.seriesImage,
                  title: item?.title,
                }))}
              />
            )}
          {data &&
            data?.result &&
            Object.keys(data?.result).includes("category") &&
            data?.result.category?.length > 0 && (
              <FilterSearch
                headerName={"Category"}
                displayData={data?.result.category.map((item) => ({
                  _id: item?._id,
                  image:
                    item?.categoryImage == undefined
                      ? post2
                      : item?.categoryImage,

                  title: item?.category,
                }))}
              />
            )}

          {data &&
            data?.result &&
            Object.keys(data?.result).includes("inner") &&
            data?.result.inner?.length > 0 && (
              <FilterSearch
                headerName={"Inner"}
                displayData={data?.result.inner.map((item) => ({
                  _id: item?._id,
                  image: post2,
                  title: item?.inner,
                }))}
              />
            )}

          {data &&
            data?.result &&
            Object.keys(data?.result).includes("tag") &&
            data?.result.tag?.length > 0 && (
              <FilterSearch
                headerName={"Tags"}
                displayData={data?.result.tag.map((item) => ({
                  _id: item?._id,
                  image: post2,
                  title: item?.tags,
                }))}
              />
            )}
          {data &&
            data?.result &&
            Object.keys(data?.result).includes("taggroup") &&
            data?.result.taggroup?.length > 0 && (
              <FilterSearch
                headerName={"Tag Groups"}
                displayData={data?.result.taggroup.map((item) => ({
                  _id: item?._id,
                  image: post2,
                  title: item?.groupName,
                }))}
              />
            )}
          {data &&
            data?.result &&
            Object.keys(data?.result).includes("topic") &&
            data?.result.topic?.length > 0 && (
              <FilterSearch
                headerName={"Subcategory"}
                displayData={data?.result.topic.map((item) => ({
                  _id: item?._id,
                  image: item?.topicImage ?? post2,
                  title: item?.topicName,
                }))}
              />
            )}
          {data &&
            data?.result &&
            Object.keys(data?.result).includes("weather") &&
            data?.result.weather?.length > 0 && (
              <FilterSearch
                headerName={"Weather"}
                displayData={data?.result.weather.map((item) => ({
                  _id: item?._id,
                  image: item?.icon ?? post2,
                  title: item?.weatherTagName,
                }))}
              />
            )}
          {data &&
            data?.result &&
            Object.keys(data?.result).includes("wellgorithms") &&
            data?.result.wellgorithms?.length > 0 && (
              <FilterSearch
                headerName={"Wellgorithms"}
                displayData={data?.result.wellgorithms.map((item) => ({
                  _id: item?._id,
                  image: post2,
                  title: item?.name,
                }))}
              />
            )}
        </Container>
      </section>
    </>
  );
}
