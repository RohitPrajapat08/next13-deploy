import React from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaCheckCircle,
  FaCoffee,
} from "react-icons/fa";
import Button from "@mui/material/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import cx from "./page.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import {
  banner1,
  banner2,
  banner3,
  banner4,
  banner5,
  banner6,
  explore,
  icon1,
  icon2,
  icon3,
  icon5,
  icon6,
  plus,
  profile,
  profile2,
} from "../../../public/images";
import { IoMdSend } from "react-icons/io";
import Link from "next/link";

function Detailspage() {
  return (
    <>
      <section className={`${cx.heroSection}`}>
        <Container>
          <Image src={banner3} alt="banner" className={`${cx.bannerImg}`} />
          <Row>
            <Col lg={3}>
              <div className={`${cx.leftHero}`}>
                <div className={`${cx.leftHeroTop}`}>
                  <Image src={icon6} alt="icon6" className={`${cx.icon}`} />
                  <h5>Wellgorithms</h5>
                </div>
                <ul>
                  <li>
                    <FaCheckCircle className={`${cx.icon}`} />
                    <div className={`${cx.listBody}`}>
                      <h6>Envision</h6>
                      <p>future blossoms</p>
                    </div>
                  </li>
                  <li>
                    <FaCheckCircle className={`${cx.icon}`} />
                    <div className={`${cx.listBody}`}>
                      <h6>Envision</h6>
                      <p>future blossoms</p>
                    </div>
                  </li>
                  <li>
                    <FaCheckCircle className={`${cx.icon}`} />
                    <div className={`${cx.listBody}`}>
                      <h6>Envision</h6>
                      <p>future blossoms</p>
                    </div>
                  </li>

                  <li>
                    <FaCheckCircle className={`${cx.icon}`} />
                    <div className={`${cx.listBody}`}>
                      <h6>Envision</h6>
                      <p>future blossoms</p>
                    </div>
                  </li>
                </ul>
              </div>
            </Col>
            <Col md={12} lg={6} className={`${cx.cardBoxCol}`}>
              <div className={`${cx.cardBox}`}>
                <h4 className={`${cx.cardBoxTitle}`}>(serenitty)Sunflowers</h4>
                <div className={`${cx.cardBoxBody}`}>
                  <h5>
                    People are recognizing that they already possess untold
                    riches in the form of (inner) peace, joy, and wonder for the
                    world.
                  </h5>

                  <p>
                    People are recognizing that they already possess untold
                    riches in the form of (inner) peace, joy, and wonder for the
                    world. Amid a planet teeming with life and an era bursting
                    with discoveries, there’s never been a more auspicious time
                    to be alive and cultivate our (inner)Garden.
                  </p>

                  <p>
                    Our movement isn't merely about individual well-being or
                    societal betterment. It’s about a civilizational shift
                    toward recognizing and cultivating our emotions as a
                    boundless sanctuary. Within each of us exists a universe of
                    potential waiting to be discovered and nourished. The 'Big
                    Bloom' is our collective initiation into this universe
                    within, offering not just new landscapes of mind and heart,
                    but also new frontiers of human potential that we are just
                    beginning to explore.
                  </p>

                  <p>
                    The 'Big Bloom' takes the aspirational spirit of exploration
                    that propelled humanity to the moon and turns it inward,
                    setting us on a course to explore our (inner)Cosmos. It's an
                    invitation to become not just astronauts but "intronauts,"
                    embarking on a journey through the vast Cosmos within each
                    of us. This (inner) Cosmos is far from a vacuous void; it's
                    a vibrant expanse teeming with life, waiting to be nurtured,
                    explored, and expanded. As we each cultivate our
                    (inner)Garden, we contribute to a billion others, creating a
                    veritable 'Big Bloom' of (inner) universes that together
                    offer unprecedented resources for empathy, creativity, and
                    transformation.
                  </p>

                  <p>
                    This movement signals a new phase in our evolutionary story,
                    one where our inward adventures become as consequential as
                    any outward expedition. Just as gardens require time,
                    patience, and careful tending, so too do our (inner) lives
                    require a new kind of cultivation, aided by Wellgorithms and
                    other advanced tools that help us navigate and nurture our
                    (inner) complexities. As these gardens bloom, they enrich
                    not just the individual but the collective, adding unique
                    colors, textures, and patterns to the ever-expanding thread
                    of human experience.
                  </p>

                  <hr />

                  <div className={`${cx.authorBox}`}>
                    <Image
                      src={profile}
                      alt="profile"
                      className={`${cx.profileImg}`}
                    />
                    <div className={`${cx.authorBoxBody}`}>
                      <h3>Kathleen Velasco</h3>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                    </div>
                  </div>

                  <div className={`${cx.myNest}`}>
                    <h6>Put in my Nest</h6>
                    <ul className={`${cx.iconList}`}>
                      <li>
                        <Image
                          src={icon1}
                          alt="icon1"
                          className={`${cx.img}`}
                        />
                      </li>
                      <li>
                        <Image
                          src={icon2}
                          alt="icon2"
                          className={`${cx.img}`}
                        />
                      </li>
                      <li>
                        <Image
                          src={icon3}
                          alt="icon3"
                          className={`${cx.img}`}
                        />
                      </li>
                    </ul>
                  </div>

                  <ul className={`${cx.tagList}`}>
                    <li>
                      <button className={`${cx.tagBtn} btn`}>Tag Name 1</button>
                    </li>
                    <li>
                      <button className={`${cx.tagBtn} btn`}>Tag Name 2</button>
                    </li>
                    <li>
                      <button className={`${cx.tagBtn} btn`}>Tag Name 3</button>
                    </li>
                  </ul>
                </div>
              </div>
              <div className={`${cx.arrowBtn}`}>
                <button className="btn">
                  <FaAngleLeft /> Journal Title
                </button>
                <button className="btn">
                  Journal Title <FaAngleRight />
                </button>
              </div>

              <h2 className={`${cx.titleN}`}>People also explored</h2>

              <Row>
                <Col md={6}>
                  <div className={`${cx.blogCard}`}>
                    <div className={`${cx.blogCardImg}`}>
                      <Image
                        src={banner4}
                        alt="banner"
                        className={`${cx.bannerImg}`}
                      />
                      <button className={`${cx.tag} btn`}>
                        (thankful)Nest
                      </button>
                    </div>
                    <div className={`${cx.blogCardBody}`}>
                      <h3>Write a thank-you note to yourself</h3>
                      <p>
                        Acknowledge your efforts and accomplishments of the day
                        in a self-directed thank-you note.
                      </p>
                      <hr />
                      <Image
                        src={icon5}
                        alt="icon5"
                        className={`${cx.iconImg}`}
                      />
                      <div className={`${cx.buttons}`}>
                        <button className="btn">
                          <b>20</b>pts
                        </button>
                        <button className={`${cx.readBtn} btn`}>Read</button>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col md={6}>
                  <div className={`${cx.blogCard}`}>
                    <div className={`${cx.blogCardImg}`}>
                      <Image
                        src={banner4}
                        alt="banner"
                        className={`${cx.bannerImg}`}
                      />
                      <button className={`${cx.tag} btn`}>
                        (thankful)Nest
                      </button>
                    </div>
                    <div className={`${cx.blogCardBody}`}>
                      <h3>Write a thank-you note to yourself</h3>
                      <p>
                        Acknowledge your efforts and accomplishments of the day
                        in a self-directed thank-you note.
                      </p>
                      <hr />
                      <Image
                        src={icon5}
                        alt="icon5"
                        className={`${cx.iconImg}`}
                      />
                      <div className={`${cx.buttons}`}>
                        <button className="btn">
                          <b>20</b>pts
                        </button>
                        <button className={`${cx.readBtn} btn`}>Read</button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>

              <h2 className={`${cx.titleN2}`}>Reflections 17</h2>
              <ul className={`${cx.reflectionsList}`}>
                <li>
                  <Image src={plus} alt="banner" className={`${cx.icon}`} />
                  Share your thoughts
                </li>
                <li>
                  <Image src={plus} alt="banner" className={`${cx.icon}`} />
                  Share your thoughts
                  <button className="btn">sign up</button>
                  <Link href="#">log(in)</Link>
                </li>
              </ul>

              <div className={`${cx.searchBox}`}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Write your response here..."
                />
                <IoMdSend className={`${cx.sendIcon}`} />
              </div>
              <hr />

              <ul className={`${cx.listTagsNew}`}>
                <li>
                  <div className={`${cx.listTagsNewHead}`}>
                    <div className={`${cx.left}`}>
                      <Image
                        src={profile}
                        alt="banner"
                        className={`${cx.img}`}
                      />
                      <p>Doris Edwards</p>
                    </div>
                    <div className={`${cx.right}`}>
                      <Image src={icon1} alt="icon1" className={`${cx.img}`} />
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </li>
                <li>
                  <div className={`${cx.listTagsNewHead}`}>
                    <div className={`${cx.left}`}>
                      <Image
                        src={profile}
                        alt="banner"
                        className={`${cx.img}`}
                      />
                      <p>Doris Edwards</p>
                    </div>
                    <div className={`${cx.right}`}>
                      <Image src={icon1} alt="icon1" className={`${cx.img}`} />
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </li>
                <li>
                  <div className={`${cx.listTagsNewHead}`}>
                    <div className={`${cx.left}`}>
                      <Image
                        src={profile}
                        alt="banner"
                        className={`${cx.img}`}
                      />
                      <p>Doris Edwards</p>
                    </div>
                    <div className={`${cx.right}`}>
                      <Image src={icon1} alt="icon1" className={`${cx.img}`} />
                    </div>
                  </div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                </li>
              </ul>
            </Col>
            <Col lg={3}>
              <div className={`${cx.rightHero}`}>
                <Image
                  src={profile2}
                  alt="profile2"
                  className={`${cx.profile}`}
                />
                <h5>XBT</h5>
                <p>Expanded Behavioral Therapy</p>
                <button className="btn">Journal in 3D</button>
              </div>

              <div className={`${cx.rightHero2}`}>
                <h5>proximity</h5>
                <h6>anxiety, creativity</h6>
                <p>
                  Our movement isn't merely about individual well-being or
                  societal betterment.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}

export default Detailspage;
