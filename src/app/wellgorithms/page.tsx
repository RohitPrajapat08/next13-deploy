"use client";
import React, { useState } from "react";
import { FaCoffee } from "react-icons/fa";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./page.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import {
  banner1,
  banner3,
  banner4,
  banner5,
  banner6,
  explore,
  icon1,
  icon2,
  icon3,
  icon5,
  profile,
} from "../../../public/images";
import { BlogCard } from "../components";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      // Authorization: window.localStorage.getItem("UserToken"),
    },
  }).then((res) => res.json());

function Wellgorithms() {
  //   const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/getwellgo`,
    fetcher
  );

  interface Wellgo {
    tag: {
      tags: string;
      status: boolean;
    }[];
  }
  const tags = data?.result?.flatMap((wellgo: Wellgo) => wellgo.tag);

  return (
    <React.Fragment>
      <section className={`${cx.heroSection}`}>
        <Container className="position-relative">
          <Image src={banner5} alt="banner" className={`${cx.bannerImg}`} />
          <div className={`${cx.cardBoxCol}`}>
            <Image src={icon5} alt="icon5" className={`${cx.iconImg}`} />
            <ul className={`${cx.menuList}`}>
              {tags?.map((tag: any, tagIndex: number) => (
                <li key={tagIndex}>
                  <button className="btn">{tag.tags}</button>
                </li>
              ))}
            </ul>
          </div>
          <IoMdHelpCircleOutline className={`${cx.helpIcon}`} />
        </Container>
      </section>

      <section className={`${cx.wellgorithmSection}`}>
        <Container>
          <Col md={10} lg={7} className={`${cx.cardBoxCol}`}>
            {data &&
              data?.result?.map((data: any, index: number) => {
                return (
                  <div className={`${cx.cardBox}`}>
                    <Image
                      src={data.wellgoImage}
                      alt="banner1"
                      className={`${cx.imgBox}`}
                      width={100}
                      height={100}
                    />
                    <div className={`${cx.cardBoxBody}`}>
                      <span className={`${cx.tag}`}>{data.name}</span>
                      <h5>Reflect on today's masterpiece moments</h5>
                      <p>{data.content}</p>
                    </div>
                    <div className={`${cx.cardBoxBottom}`}>
                      <Image
                        src={banner6}
                        alt="banner1"
                        className={`${cx.imgBox}`}
                      />
                      <div className={`${cx.cardBoxBottomBody}`}>
                        <h5>
                          <b>{data?.wellgorithmsPoints}</b>(entirety)Points
                        </h5>
                        <button className={`${cx.explore}`}>
                          <Image
                            src={explore}
                            alt="explore"
                            className={`${cx.icon}`}
                          />
                          {data?.wellgoRank}
                        </button>
                      </div>
                      <Image
                        src={icon5}
                        alt="icon5"
                        className={`${cx.iconImg}`}
                      />
                    </div>
                  </div>
                );
              })}
          </Col>
        </Container>
      </section>
    </React.Fragment>
  );
}

export default Wellgorithms;
