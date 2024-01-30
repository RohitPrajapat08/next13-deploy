import React from "react";
import { FaCoffee, FaSearch } from "react-icons/fa";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./page.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import {
  banner1,
  banner3,
  banner4,
  banner7,
  icon1,
  icon2,
  icon3,
  profile,
} from "../../../public/images";
import { BlogCard } from "../components";
import Link from "next/link";

function SearchPage() {
  return (
    <>
      <section className={`${cx.heroSection}`}>
        <Container>
          <Image src={banner7} alt="banner" className={`${cx.bannerImg}`} />
          <div className={`${cx.searchBox}`}>
            <FaSearch />
            <input type="text" className="form-control" />
            <button className={`${cx.searchBtn}`}>search</button>
          </div>
          <Col md={10} lg={7} className={`${cx.cardBoxCol}`}>
            <div className={`${cx.cardBox}`}>
              <h4 className={`${cx.cardBoxTitle}`}>(serenitty)Sunflowers</h4>
              <Image src={banner4} alt="banner4" className={`${cx.imgBox}`} />
              <div className={`${cx.cardBoxBody}`}>
                <h5>
                  <Link href="/detailspage">Peace is middle of stroms</Link>
                </h5>
                <p>
                  The 'Big Bloom' takes the aspirational spirit of exploration
                  that propelled humanity to the moon and turns it inward,
                  setting us on a course to explore our (inner)Cosmos. It's an
                  invitation to become not just astronauts but "intronauts,"
                  embarking on a journey through the vast Cosmos within each of
                  us. This (inner) Cosmos is far from a vacuous void; it's a
                  vibrant expanse teeming with life, waiting to be nurtured,
                  explored, and expanded. Read more
                </p>
                <div className={`${cx.actionsList}`}>
                  <div className={`${cx.author}`}>
                    <Image
                      src={profile}
                      alt="profile"
                      className={`${cx.img}`}
                    />{" "}
                    <h6>Kathleen Velasco</h6>
                  </div>
                  <ul className={`${cx.iconList}`}>
                    <li>
                      <Image src={icon1} alt="icon1" className={`${cx.img}`} />
                    </li>
                    <li>
                      <Image src={icon2} alt="icon2" className={`${cx.img}`} />
                    </li>
                    <li>
                      <Image src={icon3} alt="icon3" className={`${cx.img}`} />
                    </li>
                  </ul>
                  <div className={`${cx.tagsBox}`}>
                    <span className={`${cx.tagName}`}>Tag Name 2</span>
                    <button className={`${cx.pts}`}>
                      <b>20</b>pts
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${cx.cardBox}`}>
              <h4 className={`${cx.cardBoxTitle}`}>(serenitty)Sunflowers</h4>
              <Image src={banner4} alt="banner4" className={`${cx.imgBox}`} />
              <div className={`${cx.cardBoxBody}`}>
                <h5>
                  <Link href="/detailspage">Peace is middle of stroms</Link>
                </h5>
                <p>
                  The 'Big Bloom' takes the aspirational spirit of exploration
                  that propelled humanity to the moon and turns it inward,
                  setting us on a course to explore our (inner)Cosmos. It's an
                  invitation to become not just astronauts but "intronauts,"
                  embarking on a journey through the vast Cosmos within each of
                  us. This (inner) Cosmos is far from a vacuous void; it's a
                  vibrant expanse teeming with life, waiting to be nurtured,
                  explored, and expanded. Read more
                </p>
                <div className={`${cx.actionsList}`}>
                  <div className={`${cx.author}`}>
                    <Image
                      src={profile}
                      alt="profile"
                      className={`${cx.img}`}
                    />{" "}
                    <h6>Kathleen Velasco</h6>
                  </div>
                  <ul className={`${cx.iconList}`}>
                    <li>
                      <Image src={icon1} alt="icon1" className={`${cx.img}`} />
                    </li>
                    <li>
                      <Image src={icon2} alt="icon2" className={`${cx.img}`} />
                    </li>
                    <li>
                      <Image src={icon3} alt="icon3" className={`${cx.img}`} />
                    </li>
                  </ul>
                  <div className={`${cx.tagsBox}`}>
                    <span className={`${cx.tagName}`}>Tag Name 2</span>
                    <button className={`${cx.pts}`}>
                      <b>20</b>pts
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${cx.cardBox}`}>
              <h4 className={`${cx.cardBoxTitle}`}>(serenitty)Sunflowers</h4>
              <Image src={banner4} alt="banner4" className={`${cx.imgBox}`} />
              <div className={`${cx.cardBoxBody}`}>
                <h5>
                  <Link href="/detailspage">Peace is middle of stroms</Link>
                </h5>
                <p>
                  The 'Big Bloom' takes the aspirational spirit of exploration
                  that propelled humanity to the moon and turns it inward,
                  setting us on a course to explore our (inner)Cosmos. It's an
                  invitation to become not just astronauts but "intronauts,"
                  embarking on a journey through the vast Cosmos within each of
                  us. This (inner) Cosmos is far from a vacuous void; it's a
                  vibrant expanse teeming with life, waiting to be nurtured,
                  explored, and expanded. Read more
                </p>
                <div className={`${cx.actionsList}`}>
                  <div className={`${cx.author}`}>
                    <Image
                      src={profile}
                      alt="profile"
                      className={`${cx.img}`}
                    />{" "}
                    <h6>Kathleen Velasco</h6>
                  </div>
                  <ul className={`${cx.iconList}`}>
                    <li>
                      <Image src={icon1} alt="icon1" className={`${cx.img}`} />
                    </li>
                    <li>
                      <Image src={icon2} alt="icon2" className={`${cx.img}`} />
                    </li>
                    <li>
                      <Image src={icon3} alt="icon3" className={`${cx.img}`} />
                    </li>
                  </ul>
                  <div className={`${cx.tagsBox}`}>
                    <span className={`${cx.tagName}`}>Tag Name 2</span>
                    <button className={`${cx.pts}`}>
                      <b>20</b>pts
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={`${cx.sectionTitle}`}>
              <h3>Promotion Banner</h3>
            </div>

            <div className={`${cx.cardBox}`}>
              <h4 className={`${cx.cardBoxTitle}`}>(serenitty)Sunflowers</h4>
              <Image src={banner4} alt="banner4" className={`${cx.imgBox}`} />
              <div className={`${cx.cardBoxBody}`}>
                <h5>
                  <Link href="/detailspage">Peace is middle of stroms</Link>
                </h5>
                <p>
                  The 'Big Bloom' takes the aspirational spirit of exploration
                  that propelled humanity to the moon and turns it inward,
                  setting us on a course to explore our (inner)Cosmos. It's an
                  invitation to become not just astronauts but "intronauts,"
                  embarking on a journey through the vast Cosmos within each of
                  us. This (inner) Cosmos is far from a vacuous void; it's a
                  vibrant expanse teeming with life, waiting to be nurtured,
                  explored, and expanded. Read more
                </p>
                <div className={`${cx.actionsList}`}>
                  <div className={`${cx.author}`}>
                    <Image
                      src={profile}
                      alt="profile"
                      className={`${cx.img}`}
                    />{" "}
                    <h6>Kathleen Velasco</h6>
                  </div>
                  <ul className={`${cx.iconList}`}>
                    <li>
                      <Image src={icon1} alt="icon1" className={`${cx.img}`} />
                    </li>
                    <li>
                      <Image src={icon2} alt="icon2" className={`${cx.img}`} />
                    </li>
                    <li>
                      <Image src={icon3} alt="icon3" className={`${cx.img}`} />
                    </li>
                  </ul>
                  <div className={`${cx.tagsBox}`}>
                    <span className={`${cx.tagName}`}>Tag Name 2</span>
                    <button className={`${cx.pts}`}>
                      <b>20</b>pts
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${cx.cardBox}`}>
              <h4 className={`${cx.cardBoxTitle}`}>(serenitty)Sunflowers</h4>
              <Image src={banner4} alt="banner4" className={`${cx.imgBox}`} />
              <div className={`${cx.cardBoxBody}`}>
                <h5>
                  <Link href="/detailspage">Peace is middle of stroms</Link>
                </h5>
                <p>
                  The 'Big Bloom' takes the aspirational spirit of exploration
                  that propelled humanity to the moon and turns it inward,
                  setting us on a course to explore our (inner)Cosmos. It's an
                  invitation to become not just astronauts but "intronauts,"
                  embarking on a journey through the vast Cosmos within each of
                  us. This (inner) Cosmos is far from a vacuous void; it's a
                  vibrant expanse teeming with life, waiting to be nurtured,
                  explored, and expanded. Read more
                </p>
                <div className={`${cx.actionsList}`}>
                  <div className={`${cx.author}`}>
                    <Image
                      src={profile}
                      alt="profile"
                      className={`${cx.img}`}
                    />{" "}
                    <h6>Kathleen Velasco</h6>
                  </div>
                  <ul className={`${cx.iconList}`}>
                    <li>
                      <Image src={icon1} alt="icon1" className={`${cx.img}`} />
                    </li>
                    <li>
                      <Image src={icon2} alt="icon2" className={`${cx.img}`} />
                    </li>
                    <li>
                      <Image src={icon3} alt="icon3" className={`${cx.img}`} />
                    </li>
                  </ul>
                  <div className={`${cx.tagsBox}`}>
                    <span className={`${cx.tagName}`}>Tag Name 2</span>
                    <button className={`${cx.pts}`}>
                      <b>20</b>pts
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Container>
      </section>
    </>
  );
}

export default SearchPage;
