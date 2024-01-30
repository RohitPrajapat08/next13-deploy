import React, { Fragment, useEffect, useState } from "react";
import cx from "./index.module.scss";
import { Navbar, Nav, Container, Dropdown, Col, Row } from "react-bootstrap";
import { FiMenu } from "react-icons/fi";
import Link from "next/link";
import {
  headerTop1,
  headerTop2,
  logo,
  shape1,
  shape3,
  sperrow,
} from "../../public/images";
import Image from "next/image";
import { MdOutlineMoreVert } from "react-icons/md";
import Select from "react-select";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Category, SubCategory, headerMain } from "../../constant/interfaces";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: window.localStorage.getItem("UserToken"),
    },
  }).then((res) => res.json());

function SubcategoryOnHover({ category, _id }: Category) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/catsubcatget?categoryId=${
      _id ?? ""
    }`,
    fetcher
  );

  return (
    <Fragment>
      <ul>
        {data &&
          Object?.values((data && data.result) ?? {})
            ?.flat()
            ?.map(({ topicName, _id }: SubCategory) => {
              return (
                <li key={_id}>
                  <Link href={`/subcategory/${topicName}/${_id}`}>
                    {topicName}
                  </Link>
                </li>
              );
            })}
      </ul>
    </Fragment>
  );
}

export default function HeaderWebsite(props: headerMain) {
  const router = useRouter();
  let { showHeaderClass, categories } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  // const token = window.localStorage.getItem("UserToken");
  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("UserToken")
      : null;

  console.log("token token============>", token);

  return (
    <div className={`${cx.headerTop}`}>
      <div className={`${cx.topbarMenu}`}>
        <Container fluid>
          <ul>
            <li>
              <Link href="#">(inner) Nature A-Z</Link>
            </li>
            <li>
              <Link href={`/wellgorithm`}>Wellgorithms A-Z</Link>
            </li>
          </ul>
        </Container>
      </div>
      <header
        className={`${cx.main_header}  ${
          scroll ? cx.affix : ""
        } ${showHeaderClass}`}
      >
        <Image
          style={{
            objectFit: "contain",
          }}
          src={headerTop1}
          alt="shape image"
          className={`${cx.headerTop1}`}
        />
        <Image
          style={{
            objectFit: "contain",
          }}
          src={headerTop2}
          alt="shape image"
          className={`${cx.headerTop2}`}
        />
        <Container className="position-relative">
          <Image
            style={{
              objectFit: "contain",
            }}
            className={`${cx.shape3}`}
            src={shape3}
            alt="shape image"
          />
        </Container>
        <Navbar className={`navbar navbar-expand-lg ${cx.ak_menu}`}>
          <div className={`${cx.mobile_topbar}`}></div>
          <Container fluid>
            <Link href="/" className="navbar-brand">
              <Image
                style={{
                  objectFit: "contain",
                }}
                src={logo}
                className={`${cx.logo}`}
                alt="Inner Nature"
              />
              <Image
                style={{
                  objectFit: "contain",
                }}
                src={sperrow}
                className={`${cx.sperrowIcon}`}
                alt="sperrow"
              />
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
                  {categories.slice(0, 5).map(({ category, _id }: Category) => {
                    return (
                      <li key={_id} className={`nav-item ${cx.megaDropdown}`}>
                        <div className={`dropdown ${cx.dropdownList}`}>
                          <button
                            type="button"
                            className="btn btn-primary dropdown-toggle"
                            data-bs-toggle="dropdown"
                            onClick={() => {
                              router.push(`/category/${category}/${_id}`);
                            }}
                          >
                            {category}
                          </button>

                          <div className="dropdown-menu">
                            <Container>
                              <SubcategoryOnHover
                                category={category}
                                _id={_id}
                              />
                            </Container>
                          </div>
                        </div>
                      </li>
                    );
                  })}

                  <li className="nav-item">
                    <Dropdown className={`${cx.moreDropdown}`}>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        More <MdOutlineMoreVert />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Select
                          options={categories.slice(0, 5)?.map((item: any) => ({
                            label: item?.category,
                            value: item?._id,
                          }))}
                          name="articleSeriesTitle"
                          menuIsOpen={true}
                          onChange={({ value, label }) => {
                            router.push(`/category/${label}/${value}`);
                          }}
                        />
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                  {!token && (
                    <li className="nav-item">
                      <Link href="/login">Login</Link>
                    </li>
                  )}
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
      <Container fluid className="p-0">
        <Image
          style={{
            objectFit: "contain",
          }}
          src={shape1}
          alt="shape"
          className={`${cx.shapeBottom}`}
        />
      </Container>
    </div>
  );
}
