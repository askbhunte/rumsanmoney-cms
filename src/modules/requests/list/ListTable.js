import React, { useState, useContext, useEffect, useCallback } from "react";
import { useToasts } from "react-toast-notifications";
import Paginate from "../../global/Paginate";
import Swal from "sweetalert2";

import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Table,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  CustomInput,
} from "reactstrap";
import { RequestContext } from "../../../contexts/RequestContext";

export default function RequestList() {
  const { addToast } = useToasts();

  const [model, setModel] = useState(false);
  const [extrasViewModal, setExtrasViewModal] = useState(false);
  const [current, setCurrent] = useState(0);
  const [request_details, setRequestDetails] = useState({});

  const size = "lg";

  const {
    listRequests,
    request,
    pagination,
    resetLoading,
    getRequestDetails,
    addRequest,
    updateRequest,
    deleteRequest,
  } = useContext(RequestContext);

  const loadDeleteRequest = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    })
      .then((result) => {
        if (result.value) {
          deleteRequest(id)
            .then((d) => {
              addToast("Request Deleted successfully", {
                appearance: "success",
                autoDismiss: true,
              });
              get();
            })
            .catch(() => {
              addToast("Something went wrong!", {
                appearance: "error",
                autoDismiss: true,
              });
            });
        }
      })
      .catch((err) => {
        addToast("Something went wrong on server!", {
          appearance: "error",
          autoDismiss: true,
        });
        resetLoading();
      });
  };

  const loadRequestDetails = (id) => {
    getRequestDetails(id)
      .then((d) => {
        setRequestDetails(d);
      })
      .catch(() => {
        addToast("Something went wrong!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const handlePagination = (current_page) => {
    let _start = current_page * pagination.limit;
    setCurrent(current_page);
    let query = { name: "" };
    return loadRequestList({
      start: _start,
      limit: pagination.limit,
      ...query,
    });
  };

  const toggle = () => setModel(!model);
  const toggleViewModal = () => setExtrasViewModal(!extrasViewModal);

  const closeModal = () => {
    setRequestDetails({});
    toggle();
  };

  const checkExtrasState = (id) => {
    if (id) {
      toggleViewModal();
      loadRequestDetails(id);
    } else {
      toggleViewModal();
      setRequestDetails(null);
    }
  };

  const checkState = (id) => {
    if (id) {
      toggle();
      loadRequestDetails(id);
    } else {
      toggle();
      setRequestDetails(null);
    }
  };

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    return fetchList({ start: 0, limit: pagination.limit, name: value });
  };

  const handleChange = (e, requestId) => {
    const isChecked = e.target.checked;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    })
      .then((result) => {
        if (result.value) {
          updateRequest(requestId, { is_contacted: isChecked }).then((d) => {
            get();
            addToast("Request Contact Status updated successfully", {
              appearance: "success",
              autoDismiss: true,
            });
          });
        }
      })
      .catch((err) => {
        addToast("Something went wrong on server!", {
          appearance: "error",
          autoDismiss: true,
        });
        resetLoading();
      });

    // do whatever you want with isChecked value
  };

  const fetchList = (query) => {
    let params = { ...pagination, ...query };
    listRequests(params)
      .then()
      .catch(() => {
        addToast("Something went wrong!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };
  const loadRequestList = (query) => {
    if (!query) query = null;
    listRequests(query)
      .then()
      .catch(() => {
        addToast("Something went wrong!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  let get = useCallback(
    (params) => {
      listRequests(params);
    },
    [listRequests]
  );

  useEffect(fetchList, []);
  useEffect(loadRequestList, []);

  return (
    <>
      <Card>
        <CardTitle className="mb-0 p-3 border-bottom bg-light">
          <Row>
            <Col md="4">
              <i className="mdi mdi-border-right mr-2"></i>Request List
            </Col>
            <Col md="6">
              <div
                style={{
                  float: "right",
                  display: "flex",
                  marginRight: "-12%",
                }}
              >
                <CustomInput
                  type="select"
                  id="exampleCustomSelect"
                  name="customSelect"
                  defaultValue=""
                  style={{ width: "auto" }}
                >
                  <option value="name">Search By Name</option>
                </CustomInput>
                <div style={{ display: "inline-flex" }}>
                  <Input
                    placeholder="Enter Request Name ..."
                    onChange={handleSearchInputChange}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </Col>
            <Col md="2">
              <div style={{ float: "right" }}>
                <Button color="info" onClick={(e) => checkState()}>
                  Add Request
                </Button>
              </div>
            </Col>
          </Row>
        </CardTitle>
        <CardBody>
          <Table className="no-wrap v-middle" responsive>
            <thead>
              <tr className="border-0">
                <th className="border-0">Name</th>
                <th className="border-0">Phone</th>
                <th className="border-0">Email</th>
                <th className="border-0">Bank</th>
                <th className="border-0">Product</th>
                <th className="border-0">IsChecked</th>
                <th className="border-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {request.length ? (
                request.map((d) => {
                  return (
                    <tr key={d._id}>
                      <td>{d.name || "N/A"}</td>
                      <td>{d.phone || "N/A"}</td>
                      <td>{d.email || "N/A"}</td>
                      <td>{d.bank || "N/A"}</td>
                      <td>{d.product || "N/A"}</td>
                      <td>
                        <Input
                          type="checkbox"
                          checked={d.is_contacted}
                          onChange={(e) => handleChange(e, d._id)}
                        />
                      </td>
                      <td className="blue-grey-text  text-darken-4 font-medium">
                        <Button
                          className="btn btn-primary"
                          onClick={(e) => checkState(d._id)}
                        >
                          Edit
                        </Button>
                        <Button
                          className="btn btn-info"
                          onClick={(e) => checkExtrasState(d._id)}
                        >
                          View
                        </Button>
                        <Button
                          className="btn btn-danger"
                          onClick={(e) => {
                            loadDeleteRequest(d._id);
                          }}
                        >
                          Delete
                        </Button>
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
      <Modal isOpen={model} toggle={toggle} size={size}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();

            addRequest(e)
              .then((d) => {
                addToast(d.message, {
                  appearance: "success",
                  autoDismiss: true,
                });

                get();
                toggle();
              })
              .catch((err) =>
                addToast(err.message, {
                  appearance: "error",
                  autoDismiss: true,
                })
              );
          }}
        >
          <ModalHeader toggle={toggle}>
            <div>
              <h3>Add New Request</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                gridColumnGap: "10px",
              }}
            >
              <Row>
                <Col md="6">
                  <div className="form-item">
                    <label htmlFor="name">Name</label>
                    <br />
                    <Input
                      name="name"
                      type="text"
                      value={request_details ? request_details.name : ""}
                      onChange={(e) =>
                        setRequestDetails({
                          ...request_details,
                          name: e.target.value,
                        })
                      }
                      placeholder="Request Title"
                      className="form-field"
                      required
                    />
                  </div>
                </Col>
                <Input
                  name="_id"
                  type="hidden"
                  value={request_details ? request_details._id : ""}
                />
                <Col md="6">
                  <div className="form-item">
                    <label htmlFor="name">Phone</label>
                    <br />
                    <Input
                      name="phone"
                      type="text"
                      value={request_details ? request_details.phone : ""}
                      onChange={(e) =>
                        setRequestDetails({
                          ...request_details,
                          phone: e.target.value,
                        })
                      }
                      placeholder="Contact Number"
                      className="form-field"
                      required
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <div className="form-item">
                    <label htmlFor="name">Email</label>
                    <br />
                    <Input
                      name="email"
                      type="email"
                      value={request_details ? request_details.email : ""}
                      onChange={(e) =>
                        setRequestDetails({
                          ...request_details,
                          email: e.target.value,
                        })
                      }
                      placeholder="Email"
                      className="form-field"
                      required
                    />
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-item">
                    <label htmlFor="name">Bank</label>
                    <br />
                    <Input
                      name="bank"
                      type="text"
                      value={request_details ? request_details.bank : ""}
                      onChange={(e) =>
                        setRequestDetails({
                          ...request_details,
                          bank: e.target.value,
                        })
                      }
                      placeholder="Bank Name"
                      className="form-field"
                      required
                    />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md="6">
                  <div className="form-item">
                    <label htmlFor="name">Product</label>
                    <br />
                    <Input
                      name="product"
                      type="text"
                      value={request_details ? request_details.product : ""}
                      onChange={(e) =>
                        setRequestDetails({
                          ...request_details,
                          product: e.target.value,
                        })
                      }
                      placeholder="Product"
                      className="form-field"
                      required
                    />
                  </div>
                </Col>
                <Col md="6">
                  <div className="form-item">
                    <label htmlFor="name">Product Detail</label>
                    <br />
                    <Input
                      name="product_detail"
                      type="text"
                      value={
                        request_details ? request_details.product_detail : ""
                      }
                      onChange={(e) =>
                        setRequestDetails({
                          ...request_details,
                          product_detail: e.target.value,
                        })
                      }
                      placeholder="Product Detail"
                      className="form-field"
                      required
                    />
                  </div>
                </Col>
              </Row>
            </div>

            <br />
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Submit</Button>

            <Button color="secondary" onClick={closeModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <br />
      <Modal isOpen={extrasViewModal} toggle={toggleViewModal} size={size}>
        <ModalHeader toggle={toggleViewModal}>
          <div>
            <h3>Request Full Details</h3>
          </div>
        </ModalHeader>
        <ModalBody>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
              gridColumnGap: "10px",
            }}
          >
            <div>
              {request_details.extras ? (
                <ul>
                  {Object.keys(request_details.extras).map((value, index) => (
                    <li key={index}>
                      {value} : {request_details.extras[value]}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>
                  <h3>N/A</h3>
                </div>
              )}
            </div>
          </div>

          <br />
        </ModalBody>
      </Modal>
      <br />
    </>
  );
}
