import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import cx from "./index.module.scss";
import { UserMenu } from "../../../components";
import { useRouter } from "next/router";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  apiArticleSeries,
  updateArticleSeries,
  articleSeriesList,
} from "../../../redux/reducers/GetBlogsdataReducer";
import Reorder from "../../../components/Reorder";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

export default function AddSeries() {
  const router = useRouter();

  const [addButtonStatus, setAddButtonStatus] = useState(null);
  const [inputFields, setInputFields] = useState([]); // Initial input fields
  const [articles, setArticles] = useState([]);
  const [newtitleName, setNewTitleName] = useState("");
  const [seriesImage, setSeriesImage] = useState<any>();
  const [seriesImageError, setSeriesImageError] = useState(false);
  const [newtitleNameError, setNewTitleNameError] = useState(false);
  const [seriesError, setSeriesError] = useState(false);
  const [uniqueSeriesError, setUniqueSeriesError] = useState(false);
  const [emptySeriesError, setEmptySeriesError] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<{
    value: string;
    label: string;
  }>({ value: "", label: "" });

  const dispatch = useAppDispatch();
  const {
    apiSeriesData,
    articleSeriesListCount,
    series,
    removeSeriesListCount,
    lifecycleType,
  } = useAppSelector(apiArticleSeries);

  useEffect(() => {
    dispatch(articleSeriesList());
  }, []);

  useEffect(() => {
    setInputFields(apiSeriesData);
  }, [articleSeriesListCount]);

  useEffect(() => {
    if (removeSeriesListCount && lifecycleType === "remove") {
      setInputFields(apiSeriesData);
      setArticles(series);
    }
  }, [removeSeriesListCount, series.length]);

  function AddSeries() {
    if (!newtitleName.trim() || !series.length) {
      !newtitleName.trim() && setNewTitleNameError(true);
      !series.length && setSeriesError(true);
      return;
    }

    setAddButtonStatus(true);

    let data = new FormData();
    data.append("title", newtitleName);
    data.append("titleId", series.map((item) => item?.value).join(","));
    data.append("seriesImage", seriesImage);

    let config = {
      method: "post",
      url: `${process.env.NEXT_PUBLIC_APP_BASEURL}/createarticlseries`,
      headers: {
        Authorization: localStorage.getItem("UserToken"),
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        setTimeout(() => {
          router.push("/gardener-profile/ArticleSeries");
        }, 4000);
      })
      .catch(function (error) {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setTimeout(() => {
          setAddButtonStatus(false);
        }, 4000);
      });
  }

  async function addingArticlesToSeriesContainer(event) {
    if (Object.values(selectedArticle).some((item) => item.length === 0)) {
      setEmptySeriesError(true);
      return;
    }
    if (articles.find((item) => item.value === selectedArticle?.value)) {
      setUniqueSeriesError(true);
      return;
    }

    const updateInputField = inputFields.filter(
      (item) => item.value !== selectedArticle?.value
    );

    setInputFields(updateInputField);
    dispatch(
      updateArticleSeries({ apiSeriesData: updateInputField, type: "update" })
    );
    setArticles((prev) => [...prev, selectedArticle]);
    setSeriesError(false);
    setEmptySeriesError(false);
    setUniqueSeriesError(false);
  }
  const [err, setErr] = useState("");

  const validateFileSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file && file[0]) {
      const fileSize = file[0].size / 1024;
      return fileSize <= 500;
    }
    setErr("File size should be 500KB or less");
    return false;
  };

  return (
    <>
      <section className={`${cx.complete_profile}`}>
        <ToastContainer />
        <Container>
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
                  <h5>Add New Series</h5>
                </Col>
                <div className={`${cx.contentInside}`}>
                  <Row>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          setNewTitleName(e.target.value);
                        }}
                        onBlur={() => {
                          setNewTitleNameError(false);
                        }}
                      />
                      {newtitleNameError && (
                        <p style={{ color: "red" }}>This Field is required</p>
                      )}
                    </div>

                    <div className="col-md-12 mb-3">
                      <label className="form-label">Image</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={(e) => {
                          setSeriesImage(e.target.files[0]);
                          validateFileSize(e);
                        }}
                        onBlur={() => {
                          setSeriesImageError(false);
                        }}
                      />
                      {seriesImage === undefined && (
                        <p style={{ color: "red" }}>This Field is required</p>
                      )}
                      <p style={{ color: "red" }}>{err}</p>
                    </div>

                    <div className="col-md-12 mb-3">
                      <div className="col-md-12 mb-3">
                        <label className="form-label">
                          Select Article Title
                        </label>
                        <Select
                          options={inputFields}
                          name="articleSeriesTitle"
                          onChange={(event) => {
                            setSeriesError(false);
                            setEmptySeriesError(false);
                            setUniqueSeriesError(false);
                            setSelectedArticle(event);
                          }}
                        />
                        {seriesError && (
                          <p style={{ color: "red" }}>This Field is required</p>
                        )}
                        {emptySeriesError && (
                          <p style={{ color: "red" }}>
                            Please Select Something from above Dropdown
                          </p>
                        )}
                        {uniqueSeriesError && (
                          <p style={{ color: "red" }}>
                            You can't add the selected field again
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={addingArticlesToSeriesContainer}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <Reorder articles={articles} />

                    <div className="col-md-12">
                      <button
                        type="button"
                        className="btn CancelBtn me-3"
                        onClick={() => {
                          router.push("/gardener-profile/ArticleSeries");
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        disabled={seriesImage === undefined ? true : false}
                        // disabled={addButtonStatus}
                        type="button"
                        className="btn submitBtn me-3"
                        onClick={() => {
                          AddSeries();
                        }}
                      >
                        {addButtonStatus ? "Loading..." : "Submit"}
                      </button>
                    </div>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
}
