import React, { useState, useContext, useEffect, useCallback } from "react";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";
import Paginate from '../../global/Paginate';

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
  CustomInput
} from "reactstrap";
import { CategoryContext } from "../../../contexts/CategoryContext";

export default function CategoryList() {
  const { addToast } = useToasts();
  const [model, setModel] = useState(false);
  const [current, setCurrent] = useState(0);
  const [iconPrev, setIconPrev] = useState('');
  const size = "sm";
  const { listCategory, category, pagination, addCategory } = useContext(CategoryContext);

  const handlePagination = (current_page) => {
    let _start = current_page * pagination.limit;
    setCurrent(current_page);
    let query = { name: "" };
    return loadCategoryList({
      start: _start,
      limit: pagination.limit,
      ...query,
    });
  };
  const toggle = () => setModel(!model);

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
      return fetchList({ start: 0, limit: pagination.limit, name: value });
  };

  const fetchList = (query) => {
    let params = { ...pagination, ...query };
    listCategory(params)
      .then()
      .catch(() => {
        addToast("Something went wrong!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };
  const loadCategoryList = (query) => {
    if (!query) query = null;
    listCategory(query)
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
      listCategory(params);
    },
    [listCategory]
  );

  useEffect(fetchList, []);
  useEffect(loadCategoryList, []);
  return (
    <>
      <Card>
        <CardTitle className="mb-0 p-3 border-bottom bg-light">
          <Row>
            <Col md="4">
              <i className="mdi mdi-border-right mr-2"></i>Category List
            </Col>
            <Col md="6">
                <div
                  style={{
                    float: "right",
                    display: "flex",
                    marginRight: "-12%"
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
                        placeholder="Enter Category Name ..."
                        onChange={handleSearchInputChange}
                        style={{ width: "100%" }}
                      />
                  </div>
                </div>
              </Col>
            <Col md="2">
            <div style={{ float: "right" }}>
              <Button color="info" onClick={(e) => toggle()}>
                Add Category
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
                <th className="border-0">Icon</th>
                <th className="border-0">Preview</th>
                <th className="border-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {category.length ? (
                category.map((d) => {
                  return (
                    <tr key={d._id}>
                      <td>{d.name || "N/A"}</td>
                      <td>{d.icon || "N/A"}</td>
                      <td><i className={`${d.icon} fa-lg`}></i></td>
                      <td className="blue-grey-text  text-darken-4 font-medium">
                        <Link
                          className="btn btn-primary"
                          to={`/category/${d._id}`}
                        >
                          Edit
                        </Link>
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
            addCategory(e)
              .then((d) => {
                addToast("Category Added successfully", {
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
              <h3>Add New Category</h3>
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
              <div className="form-item">
                <label htmlFor="name">Name</label>
                <br />
                <Input
                  name="name"
                  type="text"
                  placeholder="Category Full Name"
                  className="form-field"
                  required
                />
              </div>
            </div>
            <br />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                gridColumnGap: "10px",
              }}
            >
              <div className="form-item">
                <label htmlFor="icon">Icon Code</label>
                <br />
                <Input
                  name="icon"
                  type="text"
                  placeholder="Eg: fas fa-child from font Awesome"
                  className="form-field"
                  onChange={e => setIconPrev(e.target.value)}
                  required
                />
              </div>
            </div>
            <br />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                gridColumnGap: "10px",
              }}
            >
              <div className="form-item">
                <label htmlFor="iconPreview">Icon Preview</label>
                <br />
                <div>
                  <i className={`${iconPrev} fa-lg`}></i>
                </div>
              </div>
            </div>
            <br />
          </ModalBody>
          <ModalFooter>
            <Button color="primary">Submit</Button>

            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <br />
   </>
  );
}