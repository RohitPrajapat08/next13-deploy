import React from "react";
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
import { BlogCard } from "../../components";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

export default function SubCategory() {
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
                <h2>Category Name</h2>
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

          <div className={`${cx.filterTags}`}>
            <span className={`${cx.selectedValue}`}>A</span>

            <ul className={`${cx.viewList}`}>
              <li>
                <Link href="#">Applied Science(20)</Link>
              </li>
              <li>
                <Link href="#">Addiction(20)</Link>
              </li>
              <li>
                <Link href="#">Autism(20)</Link>
              </li>
              <li>
                <Link href="#">Autism(20)</Link>
              </li>
              <li>
                <Link href="#">Applied Science(20)</Link>
              </li>
              <li>
                <Link href="#">Addiction(20)</Link>
              </li>
              <li>
                <Link href="#">Autism(20)</Link>
              </li>
              <li>
                <Link href="#">Autism(20)</Link>
              </li>
            </ul>

            <span className={`${cx.selectedValue}`}>B</span>

            <ul className={`${cx.viewList}`}>
              <li>
                <Link href="#">Applied Science(20)</Link>
              </li>
              <li>
                <Link href="#">Addiction(20)</Link>
              </li>
              <li>
                <Link href="#">Autism(20)</Link>
              </li>
              <li>
                <Link href="#">Autism(20)</Link>
              </li>
              <li>
                <Link href="#">Applied Science(20)</Link>
              </li>
              <li>
                <Link href="#">Addiction(20)</Link>
              </li>
              <li>
                <Link href="#">Autism(20)</Link>
              </li>
              <li>
                <Link href="#">Autism(20)</Link>
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
}
