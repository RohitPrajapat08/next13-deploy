import React, { useState } from "react";
import cx from "./index.module.scss";
import { Col, Container, Row } from "react-bootstrap";
import Head from "next/head";
import Image from "next/image";
import {
  footerShape,
  helix1,
  helix2,
  helix3,
  helix4,
  helix5,
  helix6,
  landing2,
  landing3,
  mobileShape,
  shape12,
  shape13,
  shape14,
  shape15,
  shape16,
  shape17,
  shape18,
  shape19,
  shape20,
  shape21,
  shape22,
  shape23,
  shape24,
  shape25,
  sperrow3,
  topBanner,
} from "../../public/images";
import Link from "next/link";
import { BlogCard2 } from "../../components";
import useSWR from "swr";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetcher = (...args: any[]) =>
  fetch(...(args as [RequestInfo, RequestInit?])).then((res) => res.json());

const Landing = () => {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/getarticlebyrank`,
    fetcher
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  }: any = useForm({
    /*resolver: yupResolver(schema),*/ mode: "onBlur",
    reValidateMode: "onChange",
  });
  // console.log(data, error, "swr response data");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit({ fullname, email }: any) {
    console.log(fullname, email, "fields data");
    setIsLoading(true); // Set loading to true when the request starts

    try {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Authorization",
        `Bearer ${process.env.NEXT_PUBLIC_MAILERLITE_TOKEN}`
      );
      let raw_data = JSON.stringify({
        email: email,
        fields: {
          name: fullname?.split(" ")?.[0],
          last_name: fullname?.split(" ")?.[1],
        },
      });
      const response = await fetch(
        "https://connect.mailerlite.com/api/subscribers",
        {
          method: "POST",
          headers: myHeaders,
          body: raw_data,
          redirect: "follow",
        }
      );

      // Handle response if necessary
      const data = await response.json();
      // ...
      console.log(data, response, "data response mailerlite");
      if (response.ok) {
        toast.success("Newsletter Subscribed Successfully");
      }
    } catch (error) {
      // Handle error if necessary
      toast.error(error.message);
    } finally {
      setIsLoading(false); // Set loading to false when the request completes
      reset();
    }
  }

  return (
    <>
      <Head>
        <title>Innerxr Landing Page</title>
        <meta name="description" content="Innerxr" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <meta property="og:title" content="Social Title for Inner Page" />
        <meta
          property="og:description"
          content="And a social description for our Inner page"
        />
        <meta
          property="og:image"
          content="	https://martinstore-images.s3.amazonaws.com/1698409578406-hacker.png"
        /> */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="INNER XR" />
        <meta
          property="og:title"
          content="Humanities Club class in singapore"
        />
        <meta
          property="og:image"
          content="https://images-klassbook.s3.ap-southeast-1.amazonaws.com/business/1667457426802-pexels-thirdman-8926546.jpg"
        />
        <meta property="og:url" content="https://innerxr.com" />
        <meta
          property="og:description"
          content='<span><p dir="ltr"><span><font face="Calibri">OUR HUMANITIES TUITION CENTRE offers Humanities tuition in Social Studies, History and Geography to students preparing for their N and O Level Examinations. With an excellent track record of students scoring distinctions, our Humanities specialists are confident of guiding your child to make significant progress in their Humanities subjects. All our tutors were trained at the National Institute of Education (NIE) and had many years of teaching experience in various government schools. Beyond teaching, our tutors are writers of the Humanities Ten-Year Series (TYS) which are used widely in schools, and they are also authors of numerous Humanities Guide books.</font></span></p></span><p><span><font face="Calibri"><br></font></span></p><table><colgroup><col width="624"></colgroup><tbody><tr><td><p dir="ltr"><span><font face="Calibri">Information Source : Official Website/Facebook Pages of &amp;#34;Humanities Club&amp;#34;</font></span></p></td></tr></tbody></table><p></p>'
        />
        <link
          href="https://nextjs.org/learn-pages-router/seo/rendering-and-ranking/url-structure"
          rel="canonical"
        />
      </Head>
      <section className={`${cx.landingSection}`}>
        <Container fluid className="p-0">
          <ToastContainer />

          <Image src={topBanner} alt="banner" className={`${cx.banner1}`} />

          <div className={`${cx.section2}`}>
            <Image src={landing2} alt="landing2" className={`${cx.banner2}`} />
            <div className={`${cx.body}`}>
              <h3>
                Explore the uncharted frontier of the <br />
                (inner)Biome — where nature,
                <br />
                emotions, wisdom and our deepest <br />
                pains interweave.
              </h3>
              <Image src={helix1} alt="helix1" className={`${cx.helix1}`} />
              <div className={`${cx.textBOx}`}>
                While past generations looked to the stars, distant lands, or
                the power of machines, we're now turning inward, mapping our
                “emotional genome”, and transforming the invisible landscapes of
                our minds into breathtaking 3D gardens.
              </div>
              <Image src={helix2} alt="helix1" className={`${cx.helix2}`} />
            </div>
          </div>

          <div className={`${cx.contentBox}`}>
            <Image src={landing3} alt="landing3" className={`${cx.landing3}`} />
            <div className={`${cx.textBody}`}>
              By creating the first-ever 3D interactive map of the psyche, we’re
              now able to explore the hidden dimensions of our emotions, from
              the peaks of ecstasy to the darker valleys of division and
              despair.
            </div>
          </div>

          <div className={`${cx.section3}`}>
            <Image src={shape12} alt="shape12" className={`${cx.shape12}`} />
            <Col md={6} className="m-auto">
              <h5>
                The (inner)Biome defies single-dimensional engagement. To probe
                its depths, we’re exploring it from multiple angles, senses and
                perspectives. Mapping it requires three groundbreaking platforms
                — a blog for reading, an app for writing, and a 3D game for
                immersing
              </h5>
            </Col>
            <div className="text-center">
              <Image src={helix3} alt="helix3" className={`${cx.helix3}`} />
            </div>
            <Container>
              <Row>
                <Col md={4}>
                  <div className={`${cx.blogCard}`}>
                    <Image
                      src={shape14}
                      alt="shape14"
                      className={`${cx.shape14}`}
                    />
                    <span className={`${cx.span1}`}>(inner)Nature</span>
                    <div className={`${cx.blogCardBody}`}>
                      <p>
                        Your journey into the (inner)Biome starts with a
                        “Cambrian Explosion of the psyche” — the sudden
                        emergence, and naming, of millions of new emotional
                        flora and fauna. You’ll discover an entirely new field
                        of psychology — Cultivational Psychology — that is
                        rekindling our connection to nature and expanding what
                        we can feel, express, and ultimately become.
                      </p>
                    </div>
                    <button className={`btn ${cx.stBtn}`}>READ</button>
                  </div>
                </Col>
                <Col md={4}>
                  <div className={`${cx.blogCard}`}>
                    <Image
                      src={shape15}
                      alt="shape14"
                      className={`${cx.shape14}`}
                    />
                    <span className={`${cx.span1}`}>(inner)Garden</span>
                    <div className={`${cx.blogCardBody}`}>
                      <p>
                        Cultivate your (inner)Garden with a series of “power
                        prompts” — guided journaling that takes you deep into
                        the landscape of your mind. Discover and master the new
                        language of wellbeing, as you learn how to nourish your
                        roots, fertilize your soil, compost your pains, prune
                        your old habits, and harvest an abundance of good cheer.
                      </p>
                    </div>
                    <button
                      className={`btn ${cx.stBtn}`}
                      style={{ background: "#5dd474" }}
                    >
                      WRITE
                    </button>
                  </div>
                </Col>

                <Col md={4}>
                  <div className={`${cx.blogCard}`}>
                    <Image
                      src={shape13}
                      alt="shape14"
                      className={`${cx.shape13}`}
                    />
                    <span className={`${cx.span1}`}>(inner)Billionaire</span>
                    <div className={`${cx.blogCardBody}`}>
                      <p>
                        With insights from the blog and app, you're ready to
                        become an (inner)Billionaire — a billionaire in love,
                        peace, joy, or whatever your heart desires. Enter a lush
                        forest of possibilities, in 3D, where each rock is a
                        revelation, and each obstacle an opportunity. Your
                        mission: to turn even the most desolate landscape into a
                        flourishing field of beauty and hope.
                      </p>
                    </div>
                    <button
                      className={`btn ${cx.stBtn}`}
                      style={{ background: "#5dd474" }}
                    >
                      PLAY
                    </button>
                  </div>
                </Col>
              </Row>
            </Container>

            <div className="text-center">
              <Image src={helix4} alt="helix3" className={`${cx.helix4}`} />
            </div>

            <Col md={6} className="m-auto">
              <h5>
                Through reading, journaling, and gaming, we're the (inner)
                explorers — Gen Cultivate — the first generation to use the new
                tools of AI and XR to unlock the secrets of the (inner)Biome.
              </h5>
            </Col>

            <div className="text-center">
              <Image src={helix5} alt="helix5" className={`${cx.helix5}`} />
            </div>

            <div className="text-center">
              <Image src={shape16} alt="shape16" className={`${cx.shape16}`} />
            </div>
          </div>

          <div className={`${cx.section4}`}>
            <Image src={shape18} alt="shape18" className={`${cx.shape18}`} />
            <Col md={6} className="text-center m-auto">
              <h2>
                <span>Wellgorithms</span>
              </h2>
              <h6>
                We all share the (inner)Biome, but each of us has our own unique
                (inner)DNA. That’s why we need Wellgorithms — a CRISPR for our
                emotions. As you cultivate your garden in 3D, you’ll learn how
                to edit your emotional codes, rewrite your behavioral patterns,
                and create new scripts of wellbeing.
              </h6>
            </Col>
            <div className="text-center">
              <Image
                src={shape17}
                alt="shape17"
                className={`${cx.shape17} ${cx.desktopImg}`}
              />
              <Image
                src={mobileShape}
                alt="shape17"
                className={`${cx.shape17} ${cx.mobileImg}`}
              />
            </div>

            <div className="text-center">
              <Image src={shape19} alt="shape19" className={`${cx.shape19}`} />
            </div>
          </div>

          <div className={`${cx.section2} ${cx.section2New}`}>
            <Image src={shape20} alt="shape20" className={`${cx.shape20}`} />
            <div className={`${cx.body}`}>
              <h3>
                In the last decade, we shared our cars and homes with strangers.
                Now we’re sharing our hearts, serving as emotional hosts, and
                inspiring people who might be a world away, yet welcome guests
                in our (inner) gardens.
              </h3>
              <Image src={helix1} alt="helix1" className={`${cx.helix1}`} />
              <div className={`${cx.textBOx}`}>
                A new kind of prosperity is emerging — emotional prosperity.
                Each of us has the capacity to become an (inner)Billionaire — a
                billionaire in peace, a billionaire in love, a billionaire in
                kindness.
              </div>
              <Image src={helix6} alt="helix1" className={`${cx.helix2}`} />
            </div>
          </div>

          <div className={`${cx.section5}`}>
            <Image src={shape21} alt="shape18" className={`${cx.shape21}`} />
            <div className={`${cx.body}`}>
              <div className={`col-md-6 ${cx.titleBox}`}>
                <Image
                  src={shape22}
                  alt="shape18"
                  className={`${cx.shape22}`}
                />
                <h4>From The Blog</h4>
                <h2>(inner)Nature</h2>
              </div>
              <div className={`${cx.blogSection}`}>
                <Container>
                  <Row>
                    {data &&
                      data?.result?.length > 0 &&
                      data.result.map((blog: any, index: number) => {
                        return (
                          <Col md={6} lg={4} key={index}>
                            <BlogCard2 blogDetails={blog} />
                          </Col>
                        );
                      })}
                  </Row>
                </Container>
              </div>
            </div>
          </div>

          <div className={`${cx.section6}`}>
            <Image src={shape23} alt="shape23" className={`${cx.shape23}`} />
            <div className={`${cx.body}`}>
              <Image
                src={sperrow3}
                alt="sperrow3"
                className={`${cx.sperrow3}`}
              />
              <div className={`${cx.bodyIn}`}>
                <Col md={8} lg={6} className="m-auto">
                  <div className={`${cx.subscribeBox}`}>
                    <h4>subscribe to innerCosmos®</h4>
                    <p>
                      Join thousands of readers who are cultivating gardens of
                      emotional prosperity, and nourishing their wellbeing with
                      weekly Wellgorithms.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Row>
                        <Col md={6}>
                          <input
                            type="text"
                            className="form-control"
                            {...register("fullname", { required: true })}
                            placeholder="Full Name"
                          />
                          {errors.fullname && (
                            <span>This field is required</span>
                          )}
                        </Col>
                        <Col md={6}>
                          <input
                            type="text"
                            {...register("email", { required: true })}
                            className="form-control"
                            placeholder="Email"
                          />
                          {errors.email && <span>This field is required</span>}
                        </Col>
                        <Col md={12}>
                          <button
                            className={`btn ${cx.submitBtn}`}
                            type="submit"
                            disabled={isLoading}
                          >
                            {isLoading ? "Loading..." : "Subscribe"}
                          </button>
                        </Col>
                      </Row>
                    </form>
                  </div>
                </Col>
              </div>
            </div>
          </div>

          <div className={`${cx.section7}`}>
            <Image src={shape24} alt="shape24" className={`${cx.shape24}`} />
            <div className={`${cx.body}`}>
              <Col md={8} lg={6} className="m-auto">
                <p>
                  <strong className="text-white">(inner)</strong> was founded by
                  a Bronx high school teacher and a U.S. Army veteran. Our
                  mission is a moonshot but our roots are humble. We're Gen
                  Cultivate, a generation on a quest to cultivate gardens of
                  personal and planetary transformation.
                </p>
                <Link href="#" className={`${cx.stBtn} btn`}>
                  our story
                </Link>
              </Col>
            </div>
          </div>

          <div className={`${cx.section8}`}>
            <Image src={shape25} alt="shape25" className={`${cx.shape25}`} />
            <div className={`${cx.videoPlayer}`}>
              <video muted controls poster="../images/videoPoster.jpg">
                <source
                  src="https://mdbootstrap.com/img/video/animation-intro.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>

          <div className={`${cx.section9}`}>
            <Image
              src={footerShape}
              alt="footerShape"
              className={`${cx.footerShape}`}
            />
            <div className={`${cx.body}`}>
              <Col md={10} lg={10} className="m-auto">
                <h5>Be one of our (inner)Angels</h5>
                <p>
                  Your generosity is helping usher in a new era of emotional
                  prosperity.
                </p>
                <Link href="#" className={`btn ${cx.donateBtn}`}>
                  donate
                </Link>
              </Col>
            </div>
          </div>
          <div className={`${cx.copyrightBox}`}>
            <ul>
              <li>
                <Link href="#">Contact</Link>
              </li>
              <li>
                <Link href="#">Policies</Link>
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Landing;
