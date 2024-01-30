import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import cx from "./index.module.scss";
import { Userblogcard, UserMenu } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useSWR from "swr";
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
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/getcategoryinarticle?gardnerid=${UserData?.uniqueId}`,
    fetcher
  );

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
                    <h5>Category</h5>
                  </Col>
                  <div className={`${cx.contentInside}`}>
                    <ul className={`${cx.categoryList}`}>
                      {data?.result?.map((item) => {
                        return <li key={item?._id}>{item?.category}</li>;
                      })}
                    </ul>
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
