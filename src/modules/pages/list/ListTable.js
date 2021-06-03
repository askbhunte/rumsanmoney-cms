import React, { useState, useContext, useEffect, useCallback } from "react";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";
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
import { PagesContext } from "../../../contexts/PagesContext";

export default function PagesList() {
  const { addToast } = useToasts();
  const [current, setCurrent] = useState(0);

  const { listPages, pages, pagination, deletePage } = useContext(PagesContext);

  const handlePagination = (current_page) => {
    let _start = current_page * pagination.limit;
    setCurrent(current_page);
    let query = { name: "" };
    return loadPagesList({
      start: _start,
      limit: pagination.limit,
      ...query,
    });
  };

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    return fetchList({ start: 0, limit: pagination.limit, name: value });
  };

  const fetchList = (query) => {
    let params = { ...pagination, ...query };
    listPages(params)
      .then()
      .catch(() => {
        addToast("Something went wrong!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };
  const loadPagesList = (query) => {
    if (!query) query = null;
    listPages(query)
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
      listPages(params);
    },
    [listPages]
  );

  function handleDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deletePage(id)
          .then((d) => {
            if (
              pagination.totalPages === pagination.currentPage &&
              pagination.total === pagination.start + 1 &&
              pagination.currentPage !== 1
            ) {
              setCurrent(pagination.currentPage - 2);
              fetchList({
                total: pagination.total - 1,
                currentPage: pagination.currentPage - 1,
                start: pagination.start - pagination.limit,
                totalPages: pagination.totalPages - 1,
              });
            } else {
              fetchList({ total: pagination.total - 1 });
            }
            Swal.fire("Deleted!", `Your file has been deleted.`, "success");
          })
          .catch((e) => {
            Swal.fire(
              "Not Deleted!",
              "There has been an error.</br>" + e,
              "error"
            );
          });
      }
    });
  }

  useEffect(fetchList, []);
  /*useEffect(loadPagesList, []);*/
  return (
    <>
      <Card>
        <CardTitle className="mb-0 p-3 border-bottom bg-light">
          <Row>
            <Col md="4">
              <i className="mdi mdi-border-right mr-2"></i>Pages List
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
                    placeholder="Enter Page Name ..."
                    onChange={handleSearchInputChange}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </Col>
            <Col md="2">
              <div style={{ float: "right" }}>
                <Link className="btn btn-primary" to="/addpages">
                  Add New Page
                </Link>
              </div>
            </Col>
          </Row>
        </CardTitle>
        <CardBody>
          <Table className="no-wrap v-middle" responsive>
            <thead>
              <tr className="border-0">
                <th className="border-0">Name</th>
                <th className="border-0">Slug</th>
                <th className="border-0">Status</th>
                <th className="border-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {pages.length ? (
                pages.map((d) => {
                  return (
                    <tr key={d._id}>
                      <td>{d.name || "N/A"}</td>
                      <td>{d.slug || "N/A"}</td>
                      <td>{d.status || "N/A"}</td>
                      <td className="blue-grey-text  text-darken-4 font-medium">
                        <Link
                          className="btn btn-primary"
                          to={`/pages/${d._id}`}
                        >
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger ml-3"
                          onClick={() => handleDelete(d._id)}
                        >
                          Delete
                        </button>
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
}
