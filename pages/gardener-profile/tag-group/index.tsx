import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import cx from "./index.module.scss";
import Link from "next/link";
import { Userblogcard, UserMenu } from "../../../components";
import useSWR from "swr";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  blogPageDataCapture,
  localDataFields,
} from "../../../redux/reducers/dataReducer";

const fetcher = (url: string) =>
  fetch(url, {
    headers: {
      Authorization: window.localStorage.getItem("UserToken"),
    },
  }).then((res) => res.json());

export default function Blogs() {
  const [getTags, setGetTags] = useState([]);
  const [tab, setTab] = useState(1);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      blogPageDataCapture({
        UserData: JSON.parse(localStorage.getItem("UserData")!),
        UserToken: localStorage.getItem("UserToken")!,
      })
    );
  }, []);
  const { UserData = {}, UserToken = "" } = useAppSelector(localDataFields);
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/gettaggroupinarticle?gardnerid=${UserData?.uniqueId}`,
    fetcher
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://inner.garden/API/api/grouptagsget?gardnerId=${UserData.uniqueId}`,
          {
            headers: {
              Authorization: localStorage.getItem("UserToken"),
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setGetTags(data.taggroupData);

          console.log(
            data.taggroupData,
            "data.taggroupDatadata.taggroupDatadata.taggroupDatadata.taggroupData"
          );
        } else {
          console.error(`Failed to fetch data. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setTab(1);
  };

  const handleClick2 = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setTab(2);
  };
  return (
    <>
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
                      <h5>Tag Group</h5>
                      <Link href={"/gardener-profile/AddTagGroup/"}>
                        Add Tag Group
                      </Link>
                    </div>
                  </Col>
                  <div className={`${cx.contentInside}`}>
                    <div className={`${cx.useTag_btn} ${cx.active} `}>
                      <button
                        className={`${tab === 1 ? cx.active : ""}`}
                        onClick={handleClick}
                      >
                        Use Tag Group
                      </button>
                      <button
                        className={`${tab === 2 ? cx.active : ""}`}
                        onClick={handleClick2}
                      >
                        Create Tag Group
                      </button>
                    </div>
                    {tab === 1 && (
                      <ul className={`${cx.taggroupList}`}>
                        {data?.result?.map((item: any) => {
                          return <li key={item?._id}>{item?.groupName}</li>;
                        })}
                      </ul>
                    )}

                    {tab === 2 && (
                      <ul className={`${cx.taggroupList}`}>
                        {getTags?.map((item: any) => (
                          <li key={item?._id}>{item?.groupName}</li>
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
    </>
  );
}
