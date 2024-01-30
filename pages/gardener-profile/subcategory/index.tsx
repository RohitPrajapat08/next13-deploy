import React, { useEffect } from "react";
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
    `${process.env.NEXT_PUBLIC_APP_BASEURL}/getsubcategoryinarticle?gardnerid=${UserData?.uniqueId}`,
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
                    <h5>Sub Category</h5>
                  </Col>
                  <div className={`${cx.contentInside}`}>
                    <ul className={`${cx.subCategoryList}`}>
                      {data?.result?.map((item) => {
                        return <li key={item?._id}>{item?.topicName}</li>;
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
