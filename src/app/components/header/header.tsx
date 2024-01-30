"use client";
import React, { Fragment, useEffect, useState } from "react";
import cx from "./header.module.scss";
import { Navbar, Nav, Container, Dropdown, Col } from "react-bootstrap";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import { HiUsers } from "react-icons/hi";
import Image from "next/image";
import { MdOutlineMoreHoriz } from "react-icons/md";
import { logo } from "../../../../public/images";
import { IoSearch } from "react-icons/io5";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { Category, SubCategory, headerMain } from "../../constant/interface";
import { useRouter } from "next/router";

const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const fetcher = (url: string) => fetch(url).then((res) => res.json());
const fetcher2 = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: window.localStorage.getItem("UserToken") || "",
    },
  }).then((res) => res.json());
export default function HeaderWebsite(
  props: headerMain,
  { category, _id }: Category
) {
  let { showHeaderClass } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  const { data: newData, error: categoryError } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/categoryget`,
    fetcher2
  );

  console.log("newData", newData);

  const initialId = newData?.result?.[0]?._id || null;
  const [id, setID] = useState(initialId);
  const [subCategoryId, setSubCategoryId] = useState<any>();
  // const { data: subCategoryId, error: err } = useSWR(
  //   id
  //     ? `${process.env.NEXT_PUBLIC_APP_BASEURL}/catsubcatget?categoryId=${id}`
  //     : null,
  //   fetcher
  // );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGJmNWY1MDc3NDkxMDQxYzM5MDg3MTciLCJlbWFpbCI6Im1hcnRpbkAxMjMiLCJpYXQiOjE3MDA2NTUyMDV9.6T1b_UTdPqnzcXXhH_CqLhaoAQBTEv3yf9m4_Gzpj88",
        };

        const requestOptions: any = {
          method: "GET",
          headers,
          redirect: "follow",
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BASEURL}/catsubcatget?categoryId=${id}`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setSubCategoryId(result);
      } catch (error: any) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (newData && newData.result && newData.result.length > 0) {
      setID(newData.result[0]._id);
    }
  }, [newData]);

  const options = {
    loop: false,
    autoWidth: true,
    dots: false,
    nav: true,
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
    <React.Fragment>
      <header
        className={`${cx.main_header}  ${
          scroll ? cx.affix : ""
        } ${showHeaderClass}`}
      >
        <Navbar className={`navbar navbar-expand-lg ${cx.ak_menu}`}>
          <div className={`${cx.mobile_topbar}`}></div>
          <Container>
            <Link href="/" className="navbar-brand">
              <Image src={logo} className={`${cx.logo}`} alt="Inner Nature" />
            </Link>

            <button
              className={`navbar-toggler ${cx.mobile_menu}`}
              onClick={handleShow}
            >
              <FiMenu />
            </button>
            <Navbar.Collapse
              id="basic-navbar-nav"
              className={` ${show && cx.slide_effect}`}
            >
              <div className={`${cx.menu_box}`}>
                <Nav className="navbar-nav">
                  <li className="nav-item">
                    <Dropdown className={`${cx.userDropdown}`}>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <HiUsers />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <ul>
                          <li>
                            <Link href="#">Flourishing</Link>
                          </li>
                          <li>
                            <Link href="#">Adversity</Link>
                          </li>
                          <li>
                            <Link href="#">Detox</Link>
                          </li>
                          <li>
                            <Link href="#">Principles</Link>
                          </li>
                          <li>
                            <Link href="#">Metamorphis</Link>
                          </li>
                          <li>
                            <Link href="#">Flourishing</Link>
                          </li>
                          <li>
                            <Link href="#">Adversity</Link>
                          </li>
                        </ul>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>

                  <li className="nav-item">
                    <div className={`${cx.groupMenu}`}>
                      {newData &&
                        newData?.result?.slice(0, 3).map((category: any) => (
                          <Link
                            key={category._id}
                            href={"#"}
                            // href={`/category/${category._id}`}
                            onClick={() => {
                              console.log("category._id", category._id);
                              let idd = newData?.result?.filter(
                                (dataId: any) => dataId?._id === category?._id
                              );
                              console.log("idd", idd);
                              setID(idd[0]._id);
                            }}
                          >
                            {category?.category}
                          </Link>
                        ))}
                    </div>
                  </li>
                  {newData && newData?.result && newData?.result?.slice(3) ? (
                    <li className="nav-item">
                      <Dropdown className={`${cx.moreDropdown}`}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          <MdOutlineMoreHoriz />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <ul>
                            {newData &&
                              newData?.result?.slice(3).map((category: any) => (
                                <li key={category._id}>
                                  <Link
                                    // href={`/category/${category._id}`}
                                    href={"#"}
                                    onClick={() => {
                                      console.log("category._id", category._id);
                                      setID(category?._id);
                                    }}
                                  >
                                    {category?.category}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </Dropdown.Menu>
                      </Dropdown>
                    </li>
                  ) : (
                    <></>
                  )}
                </Nav>

                <Nav className="navbar-nav">
                  <li className={`${cx.actionHeader}`}>
                    <Link href="#" className={`${cx.searchTop}`}>
                      <IoSearch />
                      search
                    </Link>
                    <Link href="/signin" className={`${cx.loginBtn}`}>
                      log(in)
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/signup" className={`${cx.joinBtn}`}>
                      join us
                    </Link>
                  </li>
                </Nav>
              </div>
              <div
                className={`${cx.hide_box} ${cx.mobile_close}`}
                onClick={handleClose}
              ></div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <section className={`${cx.DropdownOption}`}>
        <Container>
          {/* {data && data.result && data.result.length > 0 ? ( */}
          <OwlCarousel className="owl-theme" {...options}>
            {subCategoryId &&
              id &&
              Object.values(subCategoryId?.result ?? {})
                .flat()
                .map(({ topicName, index }: any) => {
                  const shortenedTopicName =
                    topicName && topicName.length > 11
                      ? `${topicName.slice(0, 11)}...`
                      : topicName;
                  return (
                    <div className="item" key={index}>
                      <Link
                        href={`/subcategory/${encodeURIComponent(
                          topicName
                        )}/${_id}`}
                        className={`btn ${cx.dropBtn}`}
                      >
                        {shortenedTopicName}
                      </Link>
                    </div>
                  );
                })}
          </OwlCarousel>

          <Col md={12}>
            <div className={`${cx.groupBtns}`}>
              <Link href="/journals" className={`btn ${cx.dropBtn}`}>
                Journals
              </Link>
              <Link href="/wellgorithms" className={`btn ${cx.dropBtn}`}>
                Wellgorithms
              </Link>
              <Link href="/paths" className={`btn ${cx.dropBtn}`}>
                Paths
              </Link>
            </div>
          </Col>
        </Container>
      </section>
    </React.Fragment>
  );
}
