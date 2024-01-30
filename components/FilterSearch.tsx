import React from "react";
import cx from "./index.module.scss";
import { Col, Row } from "react-bootstrap";

function FilterSearch({ headerName, displayData }) {
  console.log(displayData, "Display Data while searching");
  return (
    <div className={`${cx.filterTags}`}>
      <h4>{headerName}</h4>
      <Row>
        {displayData.map(({ _id, image, title }) => (
          <Col lg="3" md="4" sm="6" key={_id}>
            <div className={`${cx.filterBox}`}>
              <div className={`${cx.filterimg}`}>
                <img src={image} alt={`${headerName} Image`} />
              </div>
              <div className={`${cx.contentText}`}>
                <h5>{title}</h5>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default FilterSearch;
