import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import cx from "./index.module.scss";
import { UserMenu } from "../../../components";
import { useRouter } from "next/router";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  apiArticleSeries,
  articleSeriesList,
  updateArticleSeries,
} from "../../../redux/reducers/GetBlogsdataReducer";
import Reorder from "../../../components/Reorder";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import { post2 } from "../../../public/images";

export default function EditSeries() {
  const router = useRouter();

  const [addButtonStatus, setAddButtonStatus] = useState(null);
  const [inputFields, setInputFields] = useState([]); // Initial input fields
  const [articles, setArticles] = useState([]);
  const [newtitleName, setNewTitleName] = useState("");
  const [newtitleNameError, setNewTitleNameError] = useState(false);
  const [seriesError, setSeriesError] = useState(false);
  const [uniqueSeriesError, setUniqueSeriesError] = useState(false);
  const [emptySeriesError, setEmptySeriesError] = useState(false);
  const [imagename, setImagename] = React.useState<any>(post2);
  const [imageagain, setImageAgain] = React.useState<any>();
  const [imageag, setImage] = React.useState<any>();

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
    articleseriesget(apiSeriesData);
  }, [articleSeriesListCount]);

  useEffect(() => {
    if (removeSeriesListCount && lifecycleType === "remove") {
      setInputFields(apiSeriesData);
      setArticles(series);
    }
  }, [removeSeriesListCount, series.length]);

  async function articleseriesget(series) {
    await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASEURL}/articleseriesget?seriesId=${router.query.id}`,
      {
        headers: {
          Authorization: localStorage.getItem("UserToken"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const result = data?.result;
        const seqArticle = result?.titleId?.map((item) => ({
          label: item?.articleTitle,
          value: item?._id,
        }));
        const seqArticleIds = result?.titleId
          ?.map((item) => item?._id)
          .join(",");
        const remainingFields = series?.filter(
          (item) => !seqArticleIds.includes(item?.value)
        );

        setNewTitleName(result?.title);
        setArticles(seqArticle);
        setImage(result.seriesImage);
        setInputFields(remainingFields);
      });
  }

  function EditSeries() {
    if (!newtitleName.trim() || !series.length) {
      !newtitleName.trim() && setNewTitleNameError(true);
      !series.length && setSeriesError(true);
      return;
    }

    setAddButtonStatus(true);

    let data = new FormData();
    if (imageagain) {
      data.append("seriesImage", imageagain);
    }

    data.append("title", newtitleName);
    data.append("titleId", series.map((item) => item?.value).join(","));

    let config = {
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_APP_BASEURL}/articleseriesupdate/${router.query.id}`,
      headers: {
        Authorization: localStorage.getItem("UserToken"),
        "Content-Type": "Application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        // console.log(response, "AddSeries");
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
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;

    if (!fileList) return;

    const selectedFile = fileList[0];

    if (selectedFile.size > 500 * 1024) {
      setErrorMessage("File size should be 500KB or less");
      // Optionally, you might want to clear the file input or take other actions
      e.target.value = "";
      setImagename("");
      setImageAgain(null);
      return;
    }
    setErrorMessage("");

    let display = URL.createObjectURL(selectedFile);
    setImagename(display);
    setImageAgain(selectedFile);
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
                  <h5>Edit New Series</h5>
                </Col>
                <div className={`${cx.contentInside}`}>
                  <Row>
                    <div className="col-md-12 mb-3">
                      <div className={`${cx.uploadPhoto}`}>
                        <Image
                          style={{
                            objectFit: "contain",
                          }}
                          width={0}
                          height={0}
                          sizes="100vw"
                          src={imageag}
                          alt="profile"
                          // style={{ width: "100%", height: "auto" }} // optional
                        />

                        <button>
                          <input
                            type="file"
                            onChange={(event) => {
                              handleImageChange(event);
                            }}
                          />
                          Upload Photo
                        </button>
                      </div>
                      <span style={{ color: "red" }}>{errorMessage}</span>
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newtitleName}
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
                      <div className="col-md-12 mb-3">
                        <label className="form-label">
                          Select Article Title
                        </label>
                        <Select
                          options={inputFields}
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
                        disabled={errorMessage ? true : false}
                        type="button"
                        className="btn submitBtn me-3"
                        onClick={() => {
                          EditSeries();
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
