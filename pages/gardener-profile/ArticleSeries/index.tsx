import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import cx from "./index.module.scss";
import Link from "next/link";
import { ArtSeriescard, UserMenu } from "../../../components";

export default function ArticleSeries() {
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
                    <h5>
                      Article Series
                      <Link
                        className={`btn ${cx.addBtn}`}
                        href="/gardener-profile/AddSeries"
                      >
                        Add New Series
                      </Link>
                    </h5>
                  </Col>
                  <div className={`${cx.contentInside}`}>
                    <Row>
                      <ArtSeriescard />
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
