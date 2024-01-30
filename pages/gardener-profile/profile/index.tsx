import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import st from "../../../styles/website/style.module.scss";
import cx from "./index.module.scss";
import Link from "next/link";
import Image from "next/image";
import { UserMenu } from "../../../components";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { post2 } from "../../../public/images";

interface URLs {
  url: string;
  facebook: string;
  insta: string;
  linkedin: string;
  twitter: string;
  threads: string;
}

export default function Profile() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAboutUs, setUserAboutUs] = useState("");
  const [imagename, setImagename] = React.useState<any>(post2);
  const [imageagain, setImageAgain] = React.useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [socialURLs, setSocialURLs] = useState<URLs>({
    url: "",
    facebook: "",
    insta: "",
    linkedin: "",
    twitter: "",
    threads: "",
  });

  useEffect(() => {
    let profileData: any = JSON.parse(localStorage.getItem("UserData")!);
    console.log(profileData, "Profile Data");
    setUserId(profileData?._id);
    setUserName(profileData?.userName);
    setUserEmail(profileData?.email);
    setUserAboutUs(profileData?.description);
    setImagename(profileData?.file);
    /**
     * @param pdkey: profile data object keys
     * @param pdvalue: profile data object values
     */
    Object?.entries(profileData).forEach(
      ([pdkey, pdvalue]: [pdkey: string, pdvalue: string]) => {
        console.log(pdkey, pdvalue, "profile data keys ");
        if (pdkey === "url") {
          setSocialURLs((prev: URLs) => ({ ...prev, url: pdvalue }));
        }
        if (pdkey === "facebook") {
          setSocialURLs((prev: URLs) => ({ ...prev, facebook: pdvalue }));
        }
        if (pdkey === "insta") {
          setSocialURLs((prev: URLs) => ({ ...prev, insta: pdvalue }));
        }
        if (pdkey === "linkedin") {
          setSocialURLs((prev: URLs) => ({ ...prev, linkedin: pdvalue }));
        }
        if (pdkey === "twitter") {
          setSocialURLs((prev: URLs) => ({ ...prev, twitter: pdvalue }));
        }
        if (pdkey === "threads") {
          setSocialURLs((prev: URLs) => ({ ...prev, threads: pdvalue }));
        }
      }
    );
  }, []);
  // const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
  //   const fileList = e.target.files;
  //   if (!fileList) return;
  //   let display = URL.createObjectURL(fileList[0]);
  //   setImagename(display);
  //   setImageAgain(fileList[0]);
  // };
  const [errorMessage, setErrorMessage] = useState<string>("");
  const handleImageChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files;
    if (!fileList) return;

    const selectedFile = fileList[0];

    if (selectedFile.size > 500 * 1024) {
      setErrorMessage("File size should be 500KB or less");
      e.target.value = "";
      setImagename("");
      setImageAgain(null);
      return;
    }
    let display = URL.createObjectURL(selectedFile);
    setImagename(display);
    setImageAgain(selectedFile);
  };

  function AccountDetails() {
    if (!userName.trim()) {
      setUserNameError(true);
      return;
    }
    setIsLoading(true);
    let formdata = new FormData();
    if (imageagain) {
      formdata.append("file", imageagain);
    }
    formdata.append("userName", userName);
    formdata.append("description", userAboutUs);
    Object.entries(socialURLs).forEach(([urlKeys, urlValues]) => {
      formdata.append(`${urlKeys}`, `${urlValues}`);
    });
    let config = {
      method: "PATCH",
      url: `${process.env.NEXT_PUBLIC_APP_BASEURL}/updateuser/${userId}`,
      headers: {
        Authorization: localStorage.getItem("UserToken")!,
      },
      data: formdata,
    };
    axios(config)
      .then(function (response) {
        // console.log(response, "AccountDetails");
        if (response.data.status) {
          localStorage.removeItem("UserData");
          localStorage.setItem(
            "UserData",
            JSON.stringify(response.data.result)
          );
        }

        if (response.data.status) {
          toast.success(response.data.message);
          localStorage.removeItem("UserData");
          localStorage.setItem(
            "UserData",
            JSON.stringify(response.data.result)
          );
        } else {
          toast.error(response.data.message);
        }
      })
      .catch(function (error) {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
        setUserNameError(false);
      });
  }

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
                    <h5>Basic Details</h5>
                  </Col>

                  <div className={`${cx.contentInside}`}>
                    <Row>
                      <Col md={12} className={`${st.form_box}`}>
                        <div className={`${cx.uploadPhoto}`}>
                          <Image
                            style={{
                              objectFit: "contain",
                            }}
                            width={0}
                            height={0}
                            sizes="100vw"
                            src={imagename || post2}
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

                          <span style={{ color: "red" }}>{errorMessage}</span>
                        </div>
                      </Col>
                      <Col md={12} className={`${st.form_box}`}>
                        <label className="form-label">
                          Full Name<span className="text-danger"></span> :
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          value={userName}
                          onChange={(e) => {
                            setUserName(e.target.value);
                          }}
                        />
                        {userNameError && (
                          <p style={{ color: "red" }}>This Field is required</p>
                        )}
                      </Col>
                      <Col md={12} className={`${st.form_box}`}>
                        <label className="form-label">
                          Email Address<span className="text-danger"></span> :
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          disabled
                          value={userEmail}
                          onChange={(e) => {
                            setUserEmail(e.target.value);
                          }}
                        />
                      </Col>

                      <Col md={12} className={`${st.form_box}`}>
                        <label className="form-label">
                          ABOUT ME<span className="text-danger"></span> :
                        </label>
                        <textarea
                          onChange={(e) => {
                            setUserAboutUs(e.target.value);
                          }}
                          value={userAboutUs}
                          className="form-control"
                        />
                      </Col>

                      <Col md={12} className={`${st.form_box}`}>
                        <label className="form-label">
                          Url<span className="text-danger"></span> :
                        </label>
                        <textarea
                          onChange={(e) => {
                            setSocialURLs((prev: URLs) => ({
                              ...prev,
                              url: e.target.value,
                            }));
                          }}
                          value={socialURLs.url}
                          className="form-control"
                        />
                      </Col>

                      <Col md={12} className={`${st.form_box}`}>
                        <label className="form-label">
                          Facebook <span className="text-danger"></span> :
                        </label>
                        <textarea
                          onChange={(e) => {
                            setSocialURLs((prev: URLs) => ({
                              ...prev,
                              facebook: e.target.value,
                            }));
                          }}
                          value={socialURLs.facebook}
                          className="form-control"
                        />
                      </Col>

                      <Col md={12} className={`${st.form_box}`}>
                        <label className="form-label">
                          Instagram <span className="text-danger"></span> :
                        </label>
                        <textarea
                          onChange={(e) => {
                            setSocialURLs((prev: URLs) => ({
                              ...prev,
                              insta: e.target.value,
                            }));
                          }}
                          value={socialURLs.insta}
                          className="form-control"
                        />
                      </Col>

                      <Col md={12} className={`${st.form_box}`}>
                        <label className="form-label">
                          LinkedIn <span className="text-danger"></span> :
                        </label>
                        <textarea
                          onChange={(e) => {
                            setSocialURLs((prev: URLs) => ({
                              ...prev,
                              linkedin: e.target.value,
                            }));
                          }}
                          value={socialURLs.linkedin}
                          className="form-control"
                        />
                      </Col>

                      <Col md={12} className={`${st.form_box}`}>
                        <label className="form-label">
                          Twitter <span className="text-danger"></span> :
                        </label>
                        <textarea
                          onChange={(e) => {
                            setSocialURLs((prev: URLs) => ({
                              ...prev,
                              twitter: e.target.value,
                            }));
                          }}
                          value={socialURLs.twitter}
                          className="form-control"
                        />
                      </Col>

                      <Col md={12} className={`${st.form_box}`}>
                        <label className="form-label">
                          Threads <span className="text-danger"></span> :
                        </label>
                        <textarea
                          onChange={(e) => {
                            setSocialURLs((prev: URLs) => ({
                              ...prev,
                              threads: e.target.value,
                            }));
                          }}
                          value={socialURLs.threads}
                          className="form-control"
                        />
                      </Col>

                      <Col md={12} className={`${st.form_box}`}>
                        <Button
                          className="btn btn-primary"
                          onClick={AccountDetails}
                          disabled={isLoading}
                        >
                          {isLoading ? "Loading..." : "Submit"}
                        </Button>
                      </Col>
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
