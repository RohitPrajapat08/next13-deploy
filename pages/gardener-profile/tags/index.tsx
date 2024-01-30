import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import cx from "./index.module.scss";
import Link from "next/link";
import { Userblogcard, UserMenu } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  blogPageDataCapture,
  localDataFields,
} from "../../../redux/reducers/dataReducer";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: window.localStorage.getItem("UserToken"),
    },
  }).then((res) => res.json());

const Blogs: React.FC = () => {
  const [getTags, setGetTags] = useState([]);
  const [tab, setTab] = useState(1);

  const dispatch = useAppDispatch();
  const { UserData = {} } = useAppSelector(localDataFields);
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/gettaginarticle?gardnerid=${UserData?.uniqueId}`,
    fetcher
  );

  useEffect(() => {
    dispatch(
      blogPageDataCapture({
        UserData: JSON.parse(localStorage.getItem("UserData")!),
        UserToken: localStorage.getItem("UserToken")!,
      })
    );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!UserData.uniqueId) {
          return;
        }
        const response = await fetch(
          `https://inner.garden/API/api/tagget?gardnerId=${UserData.uniqueId}`,
          {
            headers: {
              Authorization: localStorage.getItem("UserToken"),
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setGetTags(data.tagData);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [getTags]);

  const router = useRouter();
  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setTab(1);
  };

  const handleClick2 = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setTab(2);
  };

  return (
    <section className={`${cx.complete_profile}`}>
      <Container>
        <form className={`${cx.login_form}`}>
          <Col md={12} className={`${cx.title}`}>
            <h2>Dashboard</h2>
          </Col>

          <Row>
            <Col md={3}>
              <UserMenu />
            </Col>

            <Col md={9}>
              <div className={`${cx.contentBody}`}>
                <Col md={12} className={`${cx.profileTitle}`}>
                  <div className={`${cx.topHeading}`}>
                    <h5>Tags</h5>
                    <Link href={"/gardener-profile/AddTag/"}>Add New Tag</Link>
                  </div>
                </Col>
                <div className={`${cx.contentInside}`}>
                  <div className={`${cx.useTag_btn}`}>
                    <button
                      className={`${tab === 1 ? cx.active : ""}`}
                      // onClick={() => setTab(1)}
                      onClick={handleClick}
                    >
                      Use Tag
                    </button>
                    <button
                      className={`${tab === 2 ? cx.active : ""}`}
                      // onClick={() => setTab(2)}
                      onClick={handleClick2}
                    >
                      Create Tag
                    </button>
                  </div>

                  {tab === 1 && (
                    <ul className={`${cx.tagList}`}>
                      {data?.result?.map((item: any) => (
                        <li key={item?._id}>{item?.tags}</li>
                      ))}
                    </ul>
                  )}

                  {tab === 2 && (
                    <ul className={`${cx.tagList}`}>
                      {getTags?.map((item: any) => (
                        <li key={item?._id}>{item?.tags}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </form>
      </Container>
    </section>
  );
};

export default Blogs;
