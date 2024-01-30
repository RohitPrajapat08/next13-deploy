import React, { useEffect, useState } from "react";
import Link from "next/link";
import cx from "./index.module.scss";
import { Col, Container, Form, Row } from "react-bootstrap";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  astrorapidApi,
  captureFields,
  registrationFields,
} from "../../redux/reducers/registrationReducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const ResetPassword = () => {
  const [show, setShow] = useState(true);
  //const dispatch = useAppDispatch();
  //const router = useRouter();
  // const fields = useAppSelector(signupFields);
  // const [fieldError, setFieldError] = useState<any>({});
  // const fillFields = (key: any, value: String) => {
  //   dispatch(signupcaptureFields({ [key]: value }));

  //   if (fieldError !== undefined && fieldError[key]) {
  //     console.log("key");
  //     fieldError[key] = "";
  //   }
  // };

  // const signcallApi = async (fields: any) => {
  //   let { userName, email, password } = fields;

  //   const result: any = await dispatch(
  //     signupApi({
  //       userName,
  //       email,
  //       password,
  //     })
  //   );
  //   console.log(result, "signupApisignupApi");
  // };

  // useEffect(() => {
  //   if (fields.status === true) {
  //     router.push("/login");
  //   }
  // }, [fields.status]);

  //const regex = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  // const checkFields = (fields: any) => {
  //   console.log(fields, "fieldsfields");
  //   const fieldErr: any = {};
  //   Object.keys(fields).forEach((e: any) => {
  //     if (
  //       fields[e] === "" &&
  //       e === "userName" &&
  //       e === "email" &&
  //       e === "password"
  //     ) {
  //       fieldErr[e] = (
  //         <p style={{ color: "#fbbf15", textAlign: "center" }}>
  //           {" "}
  //           This field is required{" "}
  //         </p>
  //       );
  //     }
  //   });

  //   if (Object.keys(fieldErr).length === 0) {
  //     //CompanyRegistration(fields);
  //     if (fields.email.match(regex)) {
  //       signcallApi(fields);
  //     } else {
  //       fieldErr.email = (
  //         <p style={{ color: "#738801", textAlign: "center" }}>
  //           {" "}
  //           Invalid Email{" "}
  //         </p>
  //       );
  //       setFieldError(fieldErr);
  //     }
  //   } else {
  //     setFieldError(fieldErr);
  //   }
  // };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta name="description" content="Martin" />
        <link rel="icon" href="/images/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <section className={`${cx.birthChartSection}`}>
        <Container>
          <Col md={6} className={`m-auto ${cx.formMain}`}>
            <div className={`${cx.createBox}`}>
              <Row>
                <Col md={12} className={`${cx.innerTitle}`}>
                  <h4>Forgot Password</h4>
                  {/* <h5>FILL IN YOUR DETAILS</h5> */}
                </Col>

                <Col md={12} className={`${cx.formBox}`}>
                  <Form.Label>Email :</Form.Label>
                  <Form.Control
                    type="text"
                    // onChange={(e: any) => {
                    //   fillFields("email", e.target.value);
                    // }}
                  />
                </Col>
                {/* {fieldError?.email} */}
                <Col md={12} className={`${cx.formBox}`}>
                  <div
                    className={`btn ${cx.submitBtn}`}
                    // onClick={() => {
                    //   checkFields(fields);
                    // }}
                  >
                    CONTINUE
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Container>
      </section>
    </>
  );
};

export default ResetPassword;
