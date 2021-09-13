import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Card, CardTitle, CardBody, Table } from "reactstrap";
import { Context } from "../core/contexts";
import Loading from "../../global/Loading";
import { dateFormatter } from "../../../utils/formatter";
import { useToasts } from "react-toast-notifications";
import Paginate from "../../global/Paginate";
const DetailForm = (props) => {
  const Id = props.params.id;
  const { addToast } = useToasts();
  const { listHistory, get, pagination } = useContext(Context);
  const [detail, setDetail] = useState(null);
  const [userHistory, setUserHistory] = useState(null);
  const [current, setCurrent] = useState(0);

  const handlePagination = (current_page) => {
    let _start = current_page * pagination.limit;
    setCurrent(current_page);
    return loadList({
      start: _start,
      limit: pagination.limit,
    });
  };

  const loadList = (query) => {
    listHistory(detail._id, query)
      .then((d) => {
        setUserHistory(d.data);
      })
      .catch(() => {
        addToast("Something went wrong!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const loaddetail = () => {
    get(Id)
      .then((d) => {
        setDetail(d);
      })
      .catch(() => {});
  };
  const userHistoryList = () => {
    if (detail) {
      listHistory(detail._id)
        .then((d) => {
          setUserHistory(d.data);
        })
        .catch(() => {});
    }
  };
  useEffect(loaddetail, []);
  useEffect(userHistoryList, [detail]);

  return (
    <>
      {detail ? (
        <div>
          <Card>
            <CardTitle className="mb-0 p-3 border-bottom bg-light">
              <Row>
                <Col md="8">
                  <i className="mdi mdi-account mr-2"></i>User Analytics Detail
                </Col>
              </Row>
            </CardTitle>

            <CardBody>
              <Row>
                <Col md="12">
                  <h5>Name</h5>
                  <div className="mt-2">{detail.user ? detail.user : "-"}</div>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col md="6">
                  <h5>Cookie Name</h5>
                  <div className="mt-2">{detail ? detail.name : "-"}</div>
                </Col>
                <Col md="6">
                  <h5> IP Address</h5>
                  <div className="mt-2">
                    {detail && detail.ip ? detail.ip : "-"}
                  </div>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col md="6">
                  <h5>Device</h5>
                  <div className="mt-2">
                    {detail && detail.device ? detail.device : "-"}
                  </div>
                </Col>
                <Col md="6">
                  <h5>Referral</h5>
                  <div className="mt-2">
                    {detail && detail.referral ? detail.referral : "-"}
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
          {detail && detail.preference.length > 0 && (
            <Card>
              <CardTitle className="mb-0 p-3 border-bottom bg-light">
                <Row>
                  <Col md="8">
                    <i className="mdi mdi-account-star-variant mr-2"></i>User
                    Preference Detail
                  </Col>
                </Row>
              </CardTitle>
              {detail.preference.reverse().map((d) => {
                return (
                  <CardBody key={d.full_name}>
                    <Row className="mb-4">
                      <Col md={12}>
                        <h5>
                          Created at:
                          <span> {d.created_at ? d.created_at : "-"}</span>
                        </h5>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <h5>Name</h5>
                        <div className="mt-2">
                          {d.full_name ? d.full_name : "-"}
                        </div>
                      </Col>
                      <Col md="4">
                        <h5>Email</h5>
                        <div className="mt-2">{d.email ? d.email : "-"}</div>
                      </Col>
                      <Col md="4">
                        <h5>Phone Number</h5>
                        <div className="mt-2">{d.phone ? d.phone : "-"}</div>
                      </Col>
                    </Row>
                    <Row className="mt-5">
                      <Col md="4">
                        <h5>Age Group</h5>
                        <div className="mt-2">
                          {d.age_group ? d.age_group : "-"}
                        </div>
                      </Col>
                      <Col md="4">
                        <h5> Occupation</h5>
                        <div className="mt-2">
                          {d.occupation ? d.occupation : "-"}
                        </div>
                      </Col>
                      <Col md="4">
                        <h5> Foreign employment?</h5>
                        <div className="mt-2">
                          {d.foreign_employment ? d.foreign_employment : "-"}
                        </div>
                      </Col>
                    </Row>
                    <Row className="mt-5">
                      <Col md="4">
                        <h5>Annual Income</h5>
                        <div className="mt-2">
                          {d.annual_income ? d.annual_income : "-"}
                        </div>
                      </Col>
                      <Col md="4">
                        <h5>Location</h5>
                        <div className="mt-2">
                          {d.location ? d.location : "-"}
                        </div>
                      </Col>
                      <Col md="4">
                        <h5>Gender</h5>
                        <div className="mt-2">{d.gender ? d.gender : "-"}</div>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={12}>
                        <hr className="mt-5"></hr>
                      </Col>
                    </Row>
                  </CardBody>
                );
              })}
            </Card>
          )}
        </div>
      ) : (
        <Loading />
      )}

      <Card>
        <CardTitle className="mb-0 p-3 border-bottom bg-light">
          <Row>
            <Col md="4">
              <i className="mdi mdi-chart-line mr-2"></i>User Analytics
            </Col>
          </Row>
        </CardTitle>
        <CardBody>
          <Table className="no-wrap v-middle" responsive>
            <thead>
              <tr className="border-0">
                <th className="border-0">S.N.</th>
                <th className="border-0">User Actions</th>
              </tr>
            </thead>
            <tbody>
              {userHistory && userHistory.length ? (
                userHistory.map((d, i) => {
                  return (
                    <tr key={d._id}>
                      <td>{i + 1}</td>
                      <td>{d && d.data ? d.data : "-"}</td>
                      <td>
                        {d && d.created_at
                          ? dateFormatter(d.created_at, "lll")
                          : "-"}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={4}>No data available.</td>
                </tr>
              )}
            </tbody>
          </Table>
          <Paginate
            limit={pagination.limit}
            total={pagination.total}
            current={current}
            onChange={handlePagination}
          />
        </CardBody>
      </Card>
    </>
  );
};
export default DetailForm;
