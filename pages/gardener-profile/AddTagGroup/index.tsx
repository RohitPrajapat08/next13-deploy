import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
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

const AddTagGroup = () => {
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
  const router = useRouter();
  const [tagData, setTagData] = useState(null);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://inner.garden/API/api/tagget",
          {
            headers: {
              Authorization: localStorage.getItem("UserToken"),
            },
          }
        );

        if (response.status === 200) {
          const tagOptions = response?.data?.tagData?.map(
            (tag: { _id: string; tags: string }) => ({
              value: tag._id,
              label: tag.tags,
            })
          );
          setTagData(tagOptions);
        } else {
          console.error("Error fetching data. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: any) => {
    const sendData = {
      gardnerId: UserData.uniqueId,
      groupName: data.groupName,
      tags: data.tags.map((tag: any) => tag.value).join(","),
    };
    try {
      const response = await fetch(
        "https://inner.garden/API/api/createtaggroup",
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
        router.push("/gardener-profile/tag-group/");
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <section className={`${cx.formMain_sec}`}>
      <Container>
        <Row>
          <Col md={7} className="m-auto">
            <div className={`${cx.form_box}`}>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Add New Tag Group</Form.Label>
                  <Controller
                    name="groupName"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Tag Group is required" }}
                    render={({ field }) => (
                      <Form.Control
                        type="text"
                        placeholder="Enter Tag Group"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                        }}
                      />
                    )}
                  />
                  {errors.groupName && (
                    <p className="text-danger">Tag Group is required</p>
                  )}
                </Form.Group>

                <div>
                  <Form.Label>Select Tag</Form.Label>
                  <Controller
                    name="tags"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Select Tag is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        isSearchable={true}
                        className="react-dropdown"
                        classNamePrefix="dropdown"
                        options={tagData}
                      />
                    )}
                  />
                  {errors.tags && (
                    <p className="text-danger">Tag Group is required</p>
                  )}
                </div>
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

export default AddTagGroup;
