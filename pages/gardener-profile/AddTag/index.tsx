import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
// import cx from "../AddTagGroup/index.scss";
import { useRouter } from "next/router";
import axios from "axios";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import Image from "next/image";
import st from "../../../styles/website/style.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import cx from "./index.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  blogPageDataCapture,
  localDataFields,
} from "../../../redux/reducers/dataReducer";

const AddTag = () => {
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

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const sendData = {
      tags: data.tags,
      gardnerId: UserData.uniqueId,
    };

    console.log("sendData", sendData);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BASEURL}/createtag`,
        {
          method: "POST",
          headers: {
            Authorization: localStorage.getItem("UserToken"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendData),
        }
      );
      const responseData = await response.json();
      if (responseData.status) {
        toast.success(responseData.message);
        reset();
        router.push("/gardener-profile/tags/");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Error:", error.message);
    }
  };

  return (
    <section className={`${cx.formMain_sec}`}>
      <Container>
        <Row>
          <Col md={7} className="m-auto">
            <div className={`${cx.form_box}`}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Add Tag</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Tag Name"
                    {...register("tags", {
                      required: "Tag name is required",
                    })}
                  />
                  {errors.tags && (
                    <p className="text-danger">Tag name is required</p>
                  )}
                </Form.Group>

                <Col md={4} className="m-auto">
                  <Button className="btn w-100" type="submit">
                    Submit
                  </Button>
                </Col>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default AddTag;
