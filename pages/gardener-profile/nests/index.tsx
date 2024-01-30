import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import cx from "./index.module.scss";
import { Nestblogcard, UserMenu } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  apigetuserblogData,
  userblogget,
} from "../../../redux/reducers/GetUserBlogsdataReducer";

export default function Nests() {
  const dispatch = useAppDispatch();
  const UserBlogsData = useAppSelector(apigetuserblogData);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    let profileData: any = JSON.parse(localStorage.getItem("UserData")!);
    setUserId(profileData?._id);
  }, []);

  useEffect(() => {
    if (userId !== "") getuserblogs();
  }, [userId]);

  async function getuserblogs() {
    await dispatch(userblogget(userId));
  }
  console.log(UserBlogsData, "UserBlogsData");
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
                    <h5>Nests</h5>
                  </Col>
                  <div className={`${cx.contentInside}`}>
                    <Row>
                      <Nestblogcard />
                    </Row>
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
