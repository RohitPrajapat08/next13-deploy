"use client";
import React, { useEffect, useState } from "react";
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
const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

interface headerMain {
  showHeaderClass?: string;
}

export default function HeaderWebsite(props: headerMain) {
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

  const options = {
    loop: false,
    autoWidth:true,
    dots: false,
    nav: true,
    navText: [
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z"></path></svg>`,
      `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z"></path></svg>`,
    ],
    autoplay: false,
    responsive: {
      0: {
      },
      480: {
      },
      768: {
      },
      992: {
      },
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
                      <Link href="/">Gardens</Link>
                      <Link href="#">Adversities</Link>
                      <Link href="#">Activities</Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <Dropdown className={`${cx.moreDropdown}`}>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        <MdOutlineMoreHoriz />
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
                        </ul>
                      </Dropdown.Menu>
                    </Dropdown>
                  </li>
                </Nav>

                <Nav className="navbar-nav">
                  <li className={`${cx.actionHeader}`}>
                    <Link href="/search" className={`${cx.searchTop}`}>
                      <IoSearch />
                      search
                    </Link>
                    <Link href="#" className={`${cx.loginBtn}`}>
                      log(in)
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="#" className={`${cx.joinBtn}`}>
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
          <OwlCarousel className="owl-theme" {...options}>
            <div className="item"><Link href="/sub-category" className={`btn ${cx.dropBtn}`}>Peace</Link></div>
            <div className="item"><button className={`btn ${cx.dropBtn}`}>love</button></div>
            <div className="item"><button className={`btn ${cx.dropBtn}`}>kindness</button></div>
            <div className="item"><button className={`btn ${cx.dropBtn}`}>joy</button></div>
            <div className="item"><button className={`btn ${cx.dropBtn}`}>Hope</button></div>
            <div className="item"><button className={`btn ${cx.dropBtn}`}>Confidence</button></div>
            <div className="item"><button className={`btn ${cx.dropBtn}`}>Awe</button></div>
            <div className="item"><button className={`btn ${cx.dropBtn}`}>Wonder</button></div>
            <div className="item"><button className={`btn ${cx.dropBtn}`}>Humility</button></div>
          </OwlCarousel>

          <Col md={12}>
            <div className={`${cx.groupBtns}`}>
              <Link href="/sub-category"  className={`btn ${cx.dropBtn}`}>Journals</Link>
              <Link href="/wellgorithms" className={`btn ${cx.dropBtn}`}>Wellgorithms</Link>
              <Link href="/paths" className={`btn ${cx.dropBtn}`}>Paths</Link>
            </div>
          </Col>
        </Container>
      </section>
    </React.Fragment>
  );
}
