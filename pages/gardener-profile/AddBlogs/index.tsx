import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import cx from "./index.module.scss";
import { UserMenu, Editor } from "../../../components";
import { useRouter } from "next/router";
import axios from "axios";
import Compressor from "compressorjs";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File
import { post2 } from "../../../public/images";
import Image from "next/image";
import st from "../../../styles/website/style.module.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "next/navigation";

// import * as yup from "yup";
// import { yupResolver } from "@hookform/resolvers/yup";

// const schema = yup.object().shape({
//   category: yup
//     .object()
//     .shape({
//       label: yup.string().required("category is required (from label)"),
//       value: yup.string().required("category is required"),
//     })
//     .nullable() // for handling null value when clearing options via clicking "x"
//     .required("category is required (from outter null check)"),
//   subcategory: yup
//     .object()
//     .shape({
//       label: yup.string().required("subcategory is required (from label)"),
//       value: yup.string().required("subcategory is required"),
//     })
//     .nullable() // for handling null value when clearing options via clicking "x"
//     .required("subcategory is required (from outter null check)"),
// });

export default function AddBlogs() {
  const defaultFonts = [
    "Arial",
    "Comic Sans MS",
    "Courier New",
    "Impact",
    "Georgia",
    "Tahoma",
    "Trebuchet MS",
    "Verdana",
  ];
  const sortedFontOptions = [
    "Logical",
    "Salesforce Sans",
    "Garamond",
    "Sans-Serif",
    "Serif",
    "Times New Roman",
    "Helvetica",
    ...defaultFonts,
  ].sort();
  const resetForm = () => {
    setContent("");
    setselectedOptionone("");
  };
  const router = useRouter();
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors },
    clearErrors,
    getValues,
    control,
    resetField,
  }: any = useForm({
    /*resolver: yupResolver(schema),*/ mode: "onBlur",
    reValidateMode: "onChange",
  });
  const editor = useRef(null);
  const [selectedOptiongroup, setselectedOptiongroup] = useState([]);
  const [selectedOptionGroupLabel, setSelectedOptionGroupLabel] = useState([]);
  const [selectedOptionone, setselectedOptionone] = useState<any>([]);
  const [selectedOptionTagLabel, setSelectedOptionTagLabel] = useState([]);

  //--------------//------------//
  const [addButtonStatus, setAddButtonStatus] = useState(null);
  const [content, setContent] = useState("");
  const [aiMeter, setAinumber] = useState("");
  const [wellgoHeadline, setWellgoHeadline] = useState("");
  const [wellgoContent, setWellgoContent] = useState("");
  const [science, setScience] = useState("");
  const [articleSubTitle, setArticleSubTitle] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  // const [authorImage, setAuthorImage] = useState<any>("");
  const [sendArticleImage, setSendArticleImage] = useState("");
  const [articleImage, setArticleImage] = useState("");
  const [wellgorithmsImage, setWellgorithmsImage] = useState("");
  const [sendwellgorithmsImage, setSendWellgorithmsImage] = useState("");
  const [globalImage, setGlobalImage] = useState("");
  const [sendglobalImage, setSendGlobalImage] = useState("");
  const [optionsgroup, setoptionsgroup] = useState([]);
  const [selectedMultipleGroups, setSelectedMultipleGroups] = useState([]);
  const [options, setoptions] = useState([]);
  const [selectedOptionTagLabelTagIds, setSelectedOptionTagLabelTagIds] =
    useState([]);
  const [
    selectedOptionProblemTagLabelTagIds,
    setSelectedOptionProblemTagLabelTagIds,
  ] = useState([]);

  //----get tags API--//

  useEffect(() => {
    getnewtag();
    getgrouptags();
    getWellgorithms();
    getWeather();
    getinner();
    getCategory();
    getauthor();
  }, []);

  function getnewtag() {
    let config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_APP_BASEURL}/tagget`,
      headers: {
        Authorization: localStorage.getItem("UserToken"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(response, "getnewtag");
        response.data.tagData.forEach((tag, index) => {
          if (tag?.status == true) {
            options.push({ value: tag?._id, label: tag?.tags });
          }
        });
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  const handlechangetag = (event) => {
    let array = [];
    let arrayLabelids = [];
    let arrayLabel = [];
    event.forEach((option) => {
      array.push(option.value);
    });
    event.forEach((option) => {
      arrayLabel.push(option.label);
    });
    event.forEach((option) => {
      arrayLabelids.push({ id: option.value });
    });

    setselectedOptionone(array);
    setSelectedOptionTagLabel(arrayLabel);
    setSelectedOptionTagLabelTagIds(arrayLabelids);
  };

  const handlechangeProblemtag = (event) => {
    let array = [];
    let arrayLabelids = [];
    let arrayLabel = [];
    event.forEach((option) => {
      array.push(option.value);
    });
    event.forEach((option) => {
      arrayLabel.push(option.label);
    });
    event.forEach((option) => {
      arrayLabelids.push({ id: option.value });
    });
    setSelectedOptionProblemTagLabelTagIds(arrayLabelids);
  };
  //-----------Get Group-tag api----------//
  const [group, setGroup] = useState("");
  function getgrouptags() {
    let config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_APP_BASEURL}/grouptagsget`,
      headers: {
        Authorization: localStorage.getItem("UserToken"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        // console.log(response, "getgrouptags");

        let optionsgroup = [];
        response?.data?.taggroupData.forEach((grup, index) => {
          if (grup?.status == true) {
            optionsgroup.push({ label: grup?.groupName, value: grup?._id });
          }
        });
        setoptionsgroup(optionsgroup);
        setGroup(response?.data?.result);
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  const handlechangegroupmulti = (event) => {
    let array = [];
    let multigroupArray = [];
    let arrayLabel = [];
    event.forEach((option) => {
      array.push(option.value);
      multigroupArray.push({ id: option.value });
      arrayLabel.push(option.label);
    });
    // event.forEach((option) => {});
    setSelectedMultipleGroups(multigroupArray);
    setselectedOptiongroup(array);
    setSelectedOptionGroupLabel(arrayLabel);
  };
  //--------//--------//--------//--------//

  //--------Function to handle and set Article Banner Image--------//

  const handleArticleImage = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      new Compressor(file, {
        quality: 0.2, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult: any) => {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          let display = URL.createObjectURL(compressedResult);
          setArticleImage(display);
          setSendArticleImage(compressedResult);
        },
      });
    }
  };
  //--------Function to handle and set Wellgorithms Image--------//

  const handleWellgorithmsImage = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      new Compressor(file, {
        quality: 0.2, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult: any) => {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          let display = URL.createObjectURL(compressedResult);
          setWellgorithmsImage(display);
          setSendWellgorithmsImage(compressedResult);
        },
      });
    }
  };
  //--------Function to handle and set Image Only--------//

  const handleGlobalImage = (event) => {
    if (event.target.files[0]) {
      let file = event.target.files[0];
      new Compressor(file, {
        quality: 0.2, // 0.6 can also be used, but its not recommended to go below.
        success: (compressedResult: any) => {
          // compressedResult has the compressed file.
          // Use the compressed file to upload the images to your server.
          let display = URL.createObjectURL(compressedResult);
          setGlobalImage(display);
          setSendGlobalImage(compressedResult);
        },
      });
    }
  };
  //--------Function to render All images--------//

  const renderImages = (image) => {
    return (
      <Image
        style={{
          objectFit: "contain",
        }}
        key={image}
        width={100}
        height={100}
        src={image}
        alt="profile"
      />
    );
  };

  //-----Get-Author's-------//

  const [rowData, setRowData] = useState([]);

  function getauthor() {
    let config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_APP_BASEURL}/authorget`,
      headers: {
        Authorization: localStorage.getItem("UserToken"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        // console.log(response, "getauthor");
        let data = response?.data?.result;
        setRowData(data);
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  //--------- Get Category Api -----//
  const [categoryname, setCategoryname] = useState("");
  const [categoryData, setCategoryData] = useState([]);

  function getCategory() {
    let config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_APP_BASEURL}/categoryget`,
      headers: {
        Authorization: localStorage.getItem("UserToken"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        // console.log(response, "getCategoryData");
        const categoryData = response?.data?.result.map((item) => ({
          label: item?.category,
          value: item?._id,
        }));
        setCategoryData(categoryData);
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  console.log(categoryData, "categoryData");
  // --get Sub-category API--//
  const [subCategory, setSubCategory] = useState([]);
  const [subCategoryName, setSubCategoryName] = useState<any>("");

  /**
   * @param id : It is the category id which is coming from select box selection.
   * @function getTopics: It is used to get the  subcategory based on category id(@param id).
   */
  function getTopics(id: string) {
    resetField("subcategory", {
      keepDrity: false,
      keepError: false,
      keepTouch: false,
      defaultValue: null, // when provided with defaultVlaue update both input value and internal defaultValues
    });
    let config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_APP_BASEURL}/topicget?categoryId=${id}`,
      headers: {
        Authorization: localStorage.getItem("UserToken"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        // console.log(response, "gettopic");
        const subcategorydata = response?.data?.result?.map((item) => ({
          label: item?.topicName,
          value: item?._id,
        }));
        setSubCategory(subcategorydata);
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  console.log(subCategory, "subCategory");

  //-------- get Inners Api----//

  const [inners, setInners] = useState([]);
  const [innerWords, setInnerWords] = useState<any>("");
  const [innerloaderStatus, setInnerloaderStatus] = useState("");
  function getinner() {
    let config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_APP_BASEURL}/innerget`,
      headers: {
        Authorization: localStorage.getItem("UserToken"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        const innerWordsData = response?.data?.result?.map((item) => ({
          label: item?.inner,
          value: item?._id,
        }));
        setInners(innerWordsData);
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  //-------//--------//

  //---------get Weather tag Api----//

  const [optionsweather, setOptionsWeather] = useState([]);
  const [weatherData, setWeatherData] = useState<any>("");
  function getWeather() {
    let config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_APP_BASEURL}/weathertagget`,
      headers: {
        Authorization: localStorage.getItem("UserToken"),
        "Content-Type": "application/json",
      },
    };

    axios(config)
      .then(function (response) {
        const weatherTagsData = response?.data?.result?.map((item) => ({
          label: item?.weatherTagName,
          value: item?._id,
        }));
        setOptionsWeather(weatherTagsData);
      })
      .catch(function (error) {
        // console.log(error);
      });
  }
  //-------------/Add more Button/----------------// // Initial input fields //
  const [inputFields, setInputFields] = useState([
    { id: 1, heading: "", content: "" },
  ]);

  const [isAddButtonError, setIsAddButtonError] = useState(false);

  const handleAddInput = () => {
    if (
      inputFields.every((item) => item.content.length && item.heading.length)
    ) {
      setInputFields([
        ...inputFields,
        {
          id: inputFields[inputFields.length - 1].id + 1,
          heading: "",
          content: "",
        },
      ]);
      setIsAddButtonError(false);
    } else {
      setIsAddButtonError(true);
    }
  };
  const handleRemoveInput = (id) => {
    setInputFields(inputFields.filter((field) => field.id !== id));
    setIsAddButtonError(false);
  };
  //-------------/Get Wellgorithms Api /----------------//

  const [wellgorithmsData, setWellgorithmsData] = useState([]);
  const [wellgoTitle, setWellgoTitle] = useState<any>("");
  function getWellgorithms() {
    let config = {
      method: "get",
      url: `${process.env.NEXT_PUBLIC_APP_BASEURL}/wellgorithmsget`,

      headers: {
        Authorization: localStorage.getItem("UserToken"),
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        const wellgorithmsData = response?.data?.result?.map((item) => ({
          label: item?.name,
          value: item?._id,
        }));
        setWellgorithmsData(wellgorithmsData);
      })
      .catch(function (error) {});
  }
  //-------------//----------------//
  const [isLoading, setIsLoading] = useState<{
    draft: boolean;
    publish: boolean;
  }>({ draft: false, publish: false });

  const [userId, setUserId] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authordescription, setAuthordescription] = useState("");
  const [authorimage, setAuthorimage] = useState("");
  useEffect(() => {
    let profileData: any = JSON.parse(localStorage.getItem("UserData")!);
    setUserId(profileData?._id);
    setAuthorName(profileData?.userName);
    setAuthordescription(profileData?.description);
    setAuthorimage(profileData?.file);
  }, []);

  async function AddArticles(
    {
      aiMeter,
      articleImage,
      articleSubTitle,
      articleTitle,
      categoryId,
      articleDescription,
      groupTags,
      innerId,
      oppositeTags,
      science,
      scienceImage,
      subcategory,
      tags,
      weatherTag,
      wellgoContent,
      wellgoHeadline,
      wellgorithmsImage,
      wellgorithmsTitle,
      blogType,
    }: any,
    event
  ) {
    console.log(blogType, "blogTypeblogType");
    setIsLoading({
      draft: blogType === "Draft" ? true : false,
      publish: blogType === "Submit" ? true : false,
    });
    // setError(null); // Clear previous errors when a new request starts

    try {
      console.log(
        articleImage,
        scienceImage,
        wellgorithmsImage,
        "articleDescription"
      );
      let formData = new FormData();
      if (authorName) formData.append("userName", authorName);
      if (authordescription)
        formData.append("authordescription", authordescription);
      if (authorimage) formData.append("authorimage", authorimage);
      if (articleImage && articleImage?.[0])
        formData.append("articleImage", articleImage?.[0] ?? "");
      if (articleTitle) formData.append("articleTitle", articleTitle);
      if (articleSubTitle) formData.append("articleSubTitle", articleSubTitle);
      if (articleDescription)
        formData.append("articleDescription", articleDescription);
      if (science) formData.append("science", science);
      if (scienceImage && scienceImage?.[0])
        formData.append("scienceImage", scienceImage?.[0] ?? "");
      if (wellgorithmsImage && wellgorithmsImage?.[0])
        formData.append("wellgoImage", wellgorithmsImage?.[0] ?? "");
      if (wellgoHeadline) formData.append("wellgoHeadline", wellgoHeadline);
      if (wellgoContent) formData.append("wellgoContent", wellgoContent);
      if (aiMeter) formData.append("aiMeter", aiMeter);

      /**
       * 1. Category - Single
       * 2. SubCategory -Single
       * 3. Select Tags -Multiple
       * 4. Problem Tag - Multiple
       * 5. Select Group Tags - Multiple
       * 6. Weather Tags - Single
       * 7. (inner)Words - Single
       * 8. Wellgorithms Title - Single
       */

      if (categoryId?.value) formData.append("categoryId", categoryId.value);
      if (subcategory?.value) formData.append("topicId", subcategory?.value);
      if (weatherTag?.value) formData.append("weatherTag", weatherTag?.value);
      if (innerId?.value) formData.append("innerId", innerId?.value);
      if (wellgorithmsTitle?.value)
        formData.append("wellgoTitle", wellgorithmsTitle?.value);

      if (tags && tags.length)
        formData.append("tags", tags.map((item) => item.value).join(","));
      if (oppositeTags && oppositeTags.length)
        formData.append(
          "oppositeTags",
          oppositeTags.map((item) => item.value).join(",")
        );
      if (groupTags && groupTags.length)
        formData.append(
          "groupTags",
          groupTags.map((item) => item.value).join(",")
        );
      if (inputFields)
        formData.append("headContent", JSON.stringify(inputFields));
      formData.append("blogType", event?.type === "submit" ? "Submit" : event);
      if (userId) formData.append("gardnerId", userId);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_BASEURL}/createblog`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: localStorage.getItem("UserToken"),
          },
        }
      );

      if (!response.ok) {
        console.log(response, "Failed to submit the data");

        throw new Error(
          "Failed to submit the data. Please Fill the required fields."
        );
      }

      // Handle response if necessary
      const data = await response.json();

      if (data.status) {
        toast.success(data.message);
        resetForm();
        setAddButtonStatus(false);
        setTimeout(() => {
          router.push("/gardener-profile/Blogs");
        }, 4000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // Capture the error message to display to the user
      // setError(error.message);
      toast.error("Image too Large");
    } finally {
      setIsLoading({
        draft: false,
        publish: false,
      });
    }
  }

  const submitForm = () => {
    AddArticles(
      {
        aiMeter: getValues("aiMeter"),
        articleImage: getValues("articleImage"),
        articleSubTitle: getValues("articleSubTitle"),
        articleTitle: getValues("articleTitle"),
        articleDescription: getValues("articleDescription"),
        groupTags: getValues("groupTags"),
        oppositeTags: getValues("oppositeTags"),
        science: getValues("science"),
        scienceImage: getValues("scienceImage"),
        subcategory: getValues("subcategory"),
        tags: getValues("tags"),
        innerId: getValues("innerId"),
        categoryId: getValues("categoryId"),
        weatherTag: getValues("weatherTag"),
        wellgoContent: getValues("wellgoContent"),
        wellgoHeadline: getValues("wellgoHeadline"),
        wellgorithmsImage: getValues("wellgorithmsImage"),
        wellgorithmsTitle: getValues("wellgorithmsTitle"),
        blogType: getValues("blogType"),
      },
      "Draft"
    ); // Call the handleSubmit function
  };

  const validateFileSize = (file) => {
    if (file && file[0]) {
      const fileSize = file[0].size / 1024;
      return fileSize <= 500;
    }
    return false;
  };

  return (
    <>
      <section className={`${cx.complete_profile}`}>
        <Container>
          <form
            onSubmit={handleSubmit(AddArticles)}
            className={`${cx.login_form}`}
          >
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
                    <h5>Add Blog</h5>
                  </Col>
                  <div className={`${cx.contentInside} ${st.form_box}`}>
                    <Row>
                      {/* //----Category -section // SubCategory -section---// */}
                      <div className="col-md-12">
                        <div className="row bgBox mb-3">
                          <div className="col-md-12 mb-3">
                            <label className="form-label">Category</label>
                            <Controller
                              name="categoryId"
                              control={control}
                              rules={{
                                required: "This field is required",
                              }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  isSearchable={false}
                                  className="react-dropdown"
                                  classNamePrefix="dropdown"
                                  options={categoryData}
                                  onChange={(event) => {
                                    field.onChange(event); // Update the field value
                                    getTopics(event.value);
                                    setCategoryname(event.value);
                                    setSubCategory([]);
                                    setSubCategoryName("");
                                  }}
                                />
                              )}
                            />
                            {Object.keys(errors).includes("categoryId") && (
                              <p style={{ color: "red" }}>
                                {errors.categoryId.message}
                              </p>
                            )}
                          </div>

                          <div className="col-md-12 mb-3">
                            <label className="form-label">SubCategory</label>
                            <Controller
                              name="subcategory"
                              control={control}
                              rules={{
                                required: "This field is required",
                              }}
                              render={({ field }) => (
                                <Select
                                  // defaultValue={options[0]}
                                  {...field}
                                  isSearchable={false}
                                  className="react-dropdown"
                                  classNamePrefix="dropdown"
                                  options={subCategory}
                                  isDisabled={
                                    subCategory?.length == 0 ? true : false
                                  }
                                  onChange={(event) => {
                                    field.onChange(event); // Update the field value

                                    let { value } = event;
                                    setSubCategoryName(value);
                                  }}
                                />
                              )}
                            />
                            {Object.keys(errors).includes("subcategory") && (
                              <p style={{ color: "red" }}>
                                {errors.subcategory.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/*//----Article -section---/*/}
                      <div className="col-md-12">
                        <div className="row bgBox mb-3">
                          <div className="col-md-2">
                            <label className="form-label">Article Image</label>
                            <ul className="imagesUpload">
                              <li style={{ width: "100%", height: "128px" }}>
                                <input
                                  type="file"
                                  {...register("articleImage", {
                                    required: "file is required",
                                    validate: validateFileSize,
                                  })}
                                  onChange={(e) => {
                                    handleArticleImage(e);
                                    unregister("articleImage");
                                  }}
                                  name="articleImage"
                                />
                                {articleImage?.length === 0 ? (
                                  <Image
                                    style={{
                                      objectFit: "contain",
                                    }}
                                    width={100}
                                    height={100}
                                    src={post2}
                                    alt="profile"
                                  />
                                ) : (
                                  renderImages(articleImage)
                                )}

                                {errors?.articleImage?.type === "required" && (
                                  <p style={{ color: "red" }}>
                                    This field is required
                                  </p>
                                )}

                                {errors?.articleImage?.type === "validate" && (
                                  <p style={{ color: "red" }}>
                                    File size should be 500KB or less
                                  </p>
                                )}
                                {/* {renderImages(articleImage)} */}
                              </li>
                            </ul>
                          </div>
                          <div className="col-md-10">
                            <div className="col-md-12 mb-3">
                              <label className="form-label">
                                Article Title
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                {...register("articleTitle", {
                                  required: true,
                                })}
                                name="articleTitle"
                              />{" "}
                              {errors?.articleTitle?.type === "required" && (
                                <p style={{ color: "red" }}>
                                  This field is required
                                </p>
                              )}
                            </div>
                            <div className="col-md-12">
                              <label className="form-label">SubTitle</label>
                              <input
                                type="text"
                                className="form-control"
                                {...register("articleSubTitle", {
                                  required: true,
                                })}
                                name="articleSubTitle"
                              />{" "}
                              {errors?.articleSubTitle?.type === "required" && (
                                <p style={{ color: "red" }}>
                                  This field is required
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="col-md-12 mt-5 mb-3">
                            <label className="form-label">
                              Article Description
                            </label>
                            <div className="App">
                              <Editor
                                name="articleDescription"
                                defaultValue={content}
                                control={control}
                                placeholder="Write a Description..."
                              />
                            </div>
                            {errors?.articleDescription?.type ===
                              "required" && (
                              <p style={{ color: "red" }}>
                                This field is required
                              </p>
                            )}{" "}
                          </div>
                          <div className="col-md-12 mb-3">
                            <label className="form-label"> Select Tags </label>
                            <Controller
                              name="tags"
                              control={control}
                              rules={{
                                required: "This field is required",
                              }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  isMulti
                                  isSearchable={false}
                                  className="react-dropdown"
                                  classNamePrefix="dropdown"
                                  options={options}
                                  onChange={(event) => {
                                    field.onChange(event); // Update the field value
                                    handlechangetag(event);
                                  }}
                                />
                              )}
                            />

                            {Object.keys(errors).includes("tags") && (
                              <p style={{ color: "red" }}>
                                {errors.tags.message}
                              </p>
                            )}
                          </div>
                          <div className="col-md-12 mb-3">
                            <label className="form-label"> Problem Tag </label>

                            <Controller
                              name="oppositeTags"
                              control={control}
                              // rules={{
                              //   required: "This field is required",
                              // }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  isMulti
                                  isSearchable={false}
                                  className="react-dropdown"
                                  classNamePrefix="dropdown"
                                  options={options}
                                  onChange={(event) => {
                                    field.onChange(event); // Update the field value
                                    handlechangeProblemtag(event);
                                  }}
                                />
                              )}
                            />

                            {/* {Object.keys(errors).includes("oppositeTags") && (
    <p style={{ color: "red" }}>
      {errors.oppositeTags.message}
    </p>
  )} */}
                          </div>

                          <div className="col-md-12 mb-3">
                            <label className="form-label">
                              {" "}
                              Select Group Tags{" "}
                            </label>

                            <Controller
                              name="groupTags"
                              control={control}
                              // rules={{
                              //   required: "This field is required",
                              // }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  isMulti
                                  isSearchable={false}
                                  className="react-dropdown"
                                  classNamePrefix="dropdown"
                                  options={optionsgroup}
                                  onChange={(event) => {
                                    field.onChange(event); // Update the field value
                                    handlechangegroupmulti(event);
                                  }}
                                />
                              )}
                            />

                            {/* {Object.keys(errors).includes("groupTags") && (
    <p style={{ color: "red" }}>
      {errors.groupTags.message}
    </p>
  )} */}
                          </div>

                          <div className="col-md-12 mb-3">
                            <label className="form-label"> Weather Tags </label>
                            <Controller
                              name="weatherTag"
                              control={control}
                              rules={{
                                required: "This field is required",
                              }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  isSearchable={false}
                                  className="react-dropdown"
                                  classNamePrefix="dropdown"
                                  options={optionsweather}
                                  onChange={(event) => {
                                    field.onChange(event); // Update the field value
                                    setWeatherData(event.value);
                                  }}
                                />
                              )}
                            />

                            {Object.keys(errors).includes("weatherTag") && (
                              <p style={{ color: "red" }}>
                                {errors.weatherTag.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                      {/*//----------//----------//*/}

                      {/*//----inner -Words---/*/}
                      <div className="col-md-12">
                        <div className="row bgBox mb-3">
                          <div className="col-md-12 mb-3">
                            <label className="form-label white">
                              (inner)Words
                            </label>
                            <Controller
                              name="innerId"
                              control={control}
                              // rules={{
                              //   required: "This field is required",
                              // }}
                              render={({ field }) => (
                                <Select
                                  {...field}
                                  isSearchable={false}
                                  className="react-dropdown"
                                  classNamePrefix="dropdown"
                                  options={inners}
                                  onChange={(event) => {
                                    field.onChange(event); // Update the field value
                                    setInnerWords(event.value);
                                  }}
                                />
                              )}
                            />

                            {/* {Object.keys(errors).includes("innerId") && (
    <p style={{ color: "red" }}>
      {errors.innerId.message}
    </p>
  )} */}
                          </div>

                          <div className="col-md-12 mb-3">
                            {inputFields?.map((field, index) => (
                              <div key={`${field?.id}`}>
                                <div className="col-md-12 mb-3">
                                  <label className="form-label">Heading</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => {
                                      setInputFields((prev) => {
                                        prev[index].heading = e.target.value;
                                        return prev;
                                      });
                                    }}
                                    onBlur={(e) => {
                                      setInputFields((prev) => {
                                        return prev;
                                      });
                                    }}
                                  />
                                </div>
                                <div className="col-md-12 mb-3">
                                  <label className="form-label">Content</label>
                                  <textarea
                                    className="form-control"
                                    onChange={(e) => {
                                      setInputFields((prev) => {
                                        prev[index].content = e.target.value;
                                        return prev;
                                      });
                                    }}
                                  />
                                </div>
                                {index !== 0 && (
                                  <div className="plusBtn">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        handleRemoveInput(field.id)
                                      }
                                    >
                                      -
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                            {isAddButtonError && (
                              <p style={{ color: "red" }}>
                                The Heading and Content fields are required
                              </p>
                            )}
                            <div className="minBtn">
                              {" "}
                              <button type="button" onClick={handleAddInput}>
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*//------//----------//*/}

                      {/*//----science / image---/*/}
                      <div className="col-md-12">
                        <div className="row bgBox mb-3">
                          <div className="col-md-12 mb-3">
                            <label className="form-label">science</label>
                            <textarea
                              className="form-control"
                              {...register("science")}
                              name="science"
                            />
                            {/* Remove the error message */}
                          </div>

                          <div className="col-md-2">
                            <div className="col-md-12 mb-12">
                              <label className="form-label"> Image </label>
                              <ul className="imagesUpload">
                                <li style={{ width: "100%", height: "148px" }}>
                                  <input
                                    type="file"
                                    {...register("scienceImage", {
                                      required: "file is required",
                                      validate: validateFileSize,
                                    })}
                                    onChange={(e) => {
                                      handleGlobalImage(e);
                                      unregister("scienceImage");
                                    }}
                                    name="scienceImage"
                                  />

                                  {globalImage?.length === 0 ? (
                                    <Image
                                      style={{
                                        objectFit: "contain",
                                      }}
                                      width={100}
                                      height={100}
                                      src={post2}
                                      alt="profile"
                                    />
                                  ) : (
                                    renderImages(globalImage)
                                  )}
                                  {/* Remove the error message */}
                                </li>
                              </ul>
                              <span></span>

                              {errors?.scienceImage?.type === "validate" && (
                                <p style={{ color: "red" }}>
                                  File size should be 500KB or less
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*//------//----------//*/}

                      {/*//----Wellgorithms---/*/}
                      <div className="col-md-12">
                        <div className="row bgBox mb-3">
                          <div className="col-md-2">
                            <label className="form-label">Wellgorithms</label>
                            <ul className="imagesUpload">
                              <li style={{ width: "100%", height: "148px" }}>
                                <input
                                  type="file"
                                  {...register("wellgorithmsImage", {
                                    required: "file is required",
                                    validate: validateFileSize,
                                  })}
                                  onChange={(e) => {
                                    handleWellgorithmsImage(e);
                                    unregister("wellgorithmsImage");
                                  }}
                                  name="wellgorithmsImage"
                                />

                                {wellgorithmsImage?.length === 0 ? (
                                  <Image
                                    style={{
                                      objectFit: "contain",
                                    }}
                                    width={100}
                                    height={100}
                                    src={post2}
                                    alt="profile"
                                  />
                                ) : (
                                  renderImages(wellgorithmsImage)
                                )}
                                {/* Remove the error message */}
                              </li>
                            </ul>
                            {errors?.wellgorithmsImage?.type === "validate" && (
                              <p style={{ color: "red" }}>
                                File size should be 500KB or less
                              </p>
                            )}
                          </div>

                          <div className="col-md-10">
                            <div className="col-md-12 mb-3">
                              <label className="form-label">Title</label>
                              <Controller
                                name="wellgorithmsTitle"
                                control={control}
                                // Remove the rules object, including the required validation
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    isSearchable={false}
                                    className="react-dropdown"
                                    classNamePrefix="dropdown"
                                    options={wellgorithmsData}
                                    onChange={(event) => {
                                      field.onChange(event); // Update the field value
                                      setWellgoTitle(event.value);
                                    }}
                                  />
                                )}
                              />
                            </div>

                            {/* <div className="col-md-12 mb-3">
                              <label className="form-label">Title</label>
                              <Controller
                                name="wellgorithmsTitle"
                                control={control}
                                rules={{
                                  required: "This Field is required",
                                }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    isSearchable={false}
                                    className="react-dropdown"
                                    classNamePrefix="dropdown"
                                    options={wellgorithmsData}
                                    onChange={(event) => {
                                      field.onChange(event); // Update the field value
                                      setWellgoTitle(event.value);
                                    }}
                                  />
                                )}
                              />

                              {Object.keys(errors).includes(
                                "wellgorithmsTitle"
                              ) && (
                                <p style={{ color: "red" }}>
                                  {errors.wellgorithmsTitle.message}
                                </p>
                              )}
                            </div> */}
                            <div className="col-md-12 mb-3">
                              <label className="form-label">Headline</label>
                              <input
                                type="text"
                                className="form-control"
                                {...register("wellgoHeadline")}
                                name="wellgoHeadline"
                              />
                              {/* Remove the error message rendering */}
                            </div>

                            {/* <div className="col-md-12 mb-3">
                              <label className="form-label">Headline</label>
                              <input
                                type="text"
                                className="form-control"
                                {...register("wellgoHeadline", {
                                  required: true,
                                })}
                                name="wellgoHeadline"
                              />{" "}
                              {errors?.wellgoHeadline?.type === "required" && (
                                <p style={{ color: "red" }}>
                                  This field is required
                                </p>
                              )}
                            </div> */}
                            <div className="col-md-12 mb-3">
                              <label className="form-label">Content</label>
                              <textarea
                                className="form-control"
                                {...register("wellgoContent")}
                                name="wellgoContent"
                              />
                              {/* Remove the error message rendering */}
                            </div>

                            {/* <div className="col-md-12 mb-3">
                              <label className="form-label">Content</label>
                              <textarea
                                className="form-control"
                                {...register("wellgoContent", {
                                  required: true,
                                })}
                                name="wellgoContent"
                              />{" "}
                              {errors?.wellgoContent?.type === "required" && (
                                <p style={{ color: "red" }}>
                                  This field is required
                                </p>
                              )}
                            </div> */}
                          </div>
                        </div>
                      </div>
                      {/*//------//----------//*/}

                      {/*//----Ai Meter [0/100]---/*/}
                      <div className="col-md-12">
                        <div className="row bgBox mb-3">
                          <div className="col-md-12 mb-3">
                            <label className="form-label">
                              Ai Meter [0/100] :
                            </label>
                            <div className="d-flex align-items-center">
                              <Col xs={11}>
                                <input
                                  type="number"
                                  className="form-control"
                                  {...register("aiMeter", {
                                    required: true,
                                    min: 0,
                                    max: 100,
                                  })}
                                  name="aiMeter"
                                />{" "}
                                {errors?.aiMeter?.type === "required" && (
                                  <p style={{ color: "red" }}>
                                    Enter number between 0 to 100
                                  </p>
                                )}
                                {errors?.aiMeter?.type === "min" && (
                                  <p style={{ color: "red" }}>
                                    Not less than 0
                                  </p>
                                )}
                                {errors?.aiMeter?.type === "max" && (
                                  <p style={{ color: "red" }}>
                                    Not more than 100
                                  </p>
                                )}
                              </Col>
                              <Col
                                xs={1}
                                style={{ padding: "10px", fontSize: "20px" }}
                              >
                                %
                              </Col>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/*//------//----------//*/}

                      <div className="d-flex">
                        <button
                          type="button"
                          className="btn CancelBtn me-3"
                          onClick={() => {
                            router.push("/gardener-profile/Blogs");
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          disabled={isLoading.draft}
                          type="button"
                          className="btn submitBtn me-3"
                          name="Draft"
                          onClick={() => {
                            clearErrors();
                            register("blogType", { value: "Draft" });
                            submitForm();
                          }}
                        >
                          {isLoading.draft ? "Loading..." : "Draft"}
                        </button>
                        <button
                          type="submit"
                          name="Submit"
                          disabled={isLoading.publish}
                          className="btn submitBtn me-3"
                          onClick={() => {
                            register("blogType", { value: "Submit" });
                          }}
                        >
                          {isLoading.publish ? "Loading..." : "Submit"}
                        </button>
                      </div>
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
