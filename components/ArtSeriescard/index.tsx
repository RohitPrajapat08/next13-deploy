import React, { useEffect } from "react";
import cx from "./index.module.scss";
import { FaUserCircle } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Col } from "react-bootstrap";
import {
  apigetartseriesData,
  artseriesget,
} from "../../redux/reducers/GetArtseriesdataReducer";
import Link from "next/link";
import Image from "next/image";
import { post2 } from "../../public/images";
import { MdModeEdit } from "react-icons/md";

export default function ArtSeriescard() {
  const dispatch = useAppDispatch();
  const ArticlesSeries = useAppSelector(apigetartseriesData);
  async function getarticles() {
    await dispatch(artseriesget());
  }
  useEffect(() => {
    getarticles();
  }, []);

  return (
    <>
      {ArticlesSeries?.length > 0 &&
        ArticlesSeries?.map((item: any, index: number) => {
          return (
            <>
              <Col key={index} md={6} lg={4}>
                <div className={`position-relative ${cx.blogCard}`}>
                  <Link
                    href={`/journey/${item.title}/${item?._id}`}
                    className={`${cx.link}`}
                  >
                    <div className={`${cx.blogCardImg}`}>
                      {/* /blog-details */}

                      <Image
                        style={{
                          objectFit: "contain",
                        }}
                        width={100}
                        height={100}
                        className={`${cx.postImg}`}
                        src={item?.seriesImage ?? post2}
                        alt="post"
                        placeholder="empty"
                      />
                    </div>
                  </Link>

                  <div className={`${cx.blogCardBody}`}>
                    <Link
                      href={`/journey/${item.title}/${item?._id}`}
                      className={`${cx.link}`}
                    >
                      <h2>{item?.title}</h2>
                      <div className={`${cx.author}`}>
                        <FaUserCircle />
                        <span>Created By </span> - {item?.createFrom}
                      </div>
                    </Link>
                  </div>
                  <div>
                    <Link
                      href={`/gardener-profile/AddSeries/${item?._id}`}
                      className={`${cx.link}`}
                    >
                      <div className={`${cx.editIcon}`}>
                        <MdModeEdit />
                      </div>
                    </Link>
                  </div>
                </div>
              </Col>
            </>
          );
        })}
    </>
  );
}
