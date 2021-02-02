import React, { useState, useContext, useEffect, useCallback } from "react";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";
import Ratings from "react-ratings-declarative";
import Swal from "sweetalert2";
import Paginate from "../../global/Paginate";
import { BankSelector } from "../../banks";

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
import { ProductContext } from "../../../contexts/ProductContext";

export default function ProductList() {
  const { addToast } = useToasts();
  const [modal, setModal] = useState(false);
  const [current, setCurrent] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [baseRate, setBaseRate] = useState(null);
  const size = "xl";
  const {
    listProduct,
    product,
    pagination,
    addProduct,
    changeFeatured,
    getBankDetail,
  } = useContext(ProductContext);

  const handlePagination = (current_page) => {
    let _start = current_page * pagination.limit;
    setCurrent(current_page);
    let query = { name: searchText };
    if (filter.searchBy === searchOptions.TYPE) {
      query = { type: searchText };
    }
    if (filter.searchBy === searchOptions.BASERATE) {
      query = { baserate: searchText };
    }
    if (filter.searchBy === searchOptions.BANKNAME) {
      query = { bankname: searchText };
    }
    return loadProductList({
      start: _start,
      limit: pagination.limit,
      ...query,
    });
  };
  const toggle = () => setModal(!modal);

  const searchOptions = {
    BANKNAME: "bankname",
    NAME: "name",
    BASERATE: "baserate",
    TYPE: "type",
  };

  const [filter, setFilter] = useState({
    searchPlaceholder: "Enter product name...",
    searchBy: "name",
  });

  const handleSortChange = (e) => {
    let { value } = e.target;

    return fetchList({ start: 0, limit: pagination.limit, sortindesc: value });
  };

  const handleFilterChange = (e) => {
    let { value } = e.target;
    alert(value);
    if (value === searchOptions.NAME) {
      setFilter({
        searchPlaceholder: "Enter product name...",
        searchBy: searchOptions.NAME,
      });
    }
    if (value === searchOptions.BANKNAME) {
      setFilter({
        searchPlaceholder: "Enter bank name...",
        searchBy: searchOptions.BANKNAME,
      });
    }
    if (value === searchOptions.BASERATE) {
      setFilter({
        searchPlaceholder: "Enter base rate...",
        searchBy: searchOptions.BASERATE,
      });
    }
    if (value === searchOptions.TYPE) {
      setFilter({
        searchPlaceholder: "Enter product type...",
        searchBy: searchOptions.TYPE,
      });
    }
    fetchList({ start: 0, limit: pagination.limit });
  };

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    setSearchText(value);
    if (filter.searchBy === searchOptions.BANKNAME) {
      return fetchList({ start: 0, limit: pagination.limit, bankname: value });
    }
    if (filter.searchBy === searchOptions.NAME) {
      return fetchList({ start: 0, limit: pagination.limit, name: value });
    }
    if (filter.searchBy === searchOptions.TYPE) {
      return fetchList({ start: 0, limit: pagination.limit, type: value });
    }
    if (filter.searchBy === searchOptions.BASERATE) {
      return fetchList({ start: 0, limit: pagination.limit, baserate: value });
    }
    fetchList({ start: 0, limit: pagination.limit });
  };

  const fetchList = (query) => {
    let params = { ...pagination, ...query };
    listProduct(params)
      .then()
      .catch(() => {
        addToast("Something went wrong!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const loadBankBaseRate = (e) => {
    const { value } = e.target;

    getBankDetail(value)
      .then((d) => {
        setBaseRate(d.base_rate);
      })
      .catch(() => {
        addToast("Something went wrong!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const loadProductList = (query) => {
    if (!query) query = null;
    listProduct(query)
      .then()
      .catch(() => {
        addToast("Something went wrong!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const changeRating = async (productId, status) => {
    const title = status.is_featured
      ? "Product will be marked as Featured"
      : "Product will be removed from Featured";
    const toastTitle = status.is_featured
      ? "Product has been marked as Featured"
      : "Product has been removed from Featured";
    let result = await Swal.fire({
      title: "Are you sure?",
      text: `${title}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });
    if (result.isConfirmed) {
      try {
        let d = await changeFeatured(productId, status);
        if (d) {
          listProduct();
          addToast(`${toastTitle}.`, {
            appearance: "success",
            autoDismiss: true,
          });
        }
      } catch {
        addToast("Something went wrong on server!", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };

  //List Products
  let get = useCallback(
    (params) => {
      listProduct(params);
    },
    [listProduct]
  );

  useEffect(fetchList, []);
  useEffect(loadProductList, []);
  return (
    <>
      <Card>
        <CardTitle className="mb-0 p-3 border-bottom bg-light">
          <Row>
            <Col md="4">
              <i className="mdi mdi-border-right mr-2"></i>Product List
            </Col>
            <Col md="6">
              <div
                style={{
                  float: "right",
                  display: "flex",
                  marginRight: "-16%",
                }}
              >
                <CustomInput
                  type="select"
                  id="exampleCustomSelect"
                  name="customSelect"
                  defaultValue=""
                  style={{ width: "auto" }}
                  onChange={handleSortChange}
                >
                  <option value="">Sort By</option>
                  <option value="base_rate">Sort By Base Rate</option>
                  <option value="interest_rate">By Interest Rate</option>
                  <option value="is_featured">By Featured</option>
                </CustomInput>
                <CustomInput
                  type="select"
                  id="exampleCustomSelect"
                  name="customSelect"
                  defaultValue=""
                  style={{ width: "auto" }}
                  onChange={handleFilterChange}
                >
                  <option value="name">Search By Product Name</option>
                  <option value="bankname">By Bank Name</option>
                  <option value="type">By Product Type</option>
                  <option value="baserate">By Base Rate</option>
                </CustomInput>
                <div style={{ display: "inline-flex" }}>
                  <Input
                    placeholder={filter.searchPlaceholder}
                    onChange={handleSearchInputChange}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </Col>
            <Col md="2">
              <div style={{ float: "right" }}>
                <Button color="info" onClick={(e) => toggle()}>
                  Add Product
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
                <th className="border-0">Bank</th>
                <th className="border-0">Product Type</th>
                <th className="border-0">Base Rate</th>
                <th className="border-0">Interest Rate</th>
                <th className="border-0">Featured?</th>
                <th className="border-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {product.length ? (
                product.map((d) => {
                  return (
                    <tr key={d._id}>
                      <td>{d.name}</td>
                      <td>{d.bankinfo.name || "N/A"}</td>
                      <td>{d.loan_type ? d.ptype.toUpperCase() : "N/A"}</td>
                      <td>{d.base_rate || "N/A"}</td>
                      <td>{d.interest_rate || "N/A"}</td>
                      <td>
                        {d.is_featured ? (
                          <span>
                            <Ratings
                              rating={1}
                              widgetRatedColors="gold"
                              changeRating={() =>
                                changeRating(d._id, { is_featured: false })
                              }
                            >
                              <Ratings.Widget
                                widgetHoverColor="grey"
                                widgetDimension="25px"
                              />
                            </Ratings>
                          </span>
                        ) : (
                          <span>
                            <Ratings
                              rating={0}
                              widgetRatedColors="gold"
                              changeRating={() =>
                                changeRating(d._id, { is_featured: true })
                              }
                            >
                              <Ratings.Widget
                                widgetHoverColor="grey"
                                widgetDimension="25px"
                              />
                            </Ratings>
                          </span>
                        )}
                      </td>
                      <td className="blue-grey-text  text-darken-4 font-medium">
                        <Link
                          className="btn btn-secondary"
                          to={`/product/${d._id}`}
                        >
                          Edit
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6}>No data available.</td>
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
      <Modal isOpen={modal} toggle={toggle} size={size}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();

            addProduct(e)
              .then((d) => {
                addToast("Product Added successfully", {
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
              <h3>Add Product</h3>
            </div>
          </ModalHeader>
          <ModalBody>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gridColumnGap: "10px",
              }}
            >
              <div className="form-item">
                <label htmlFor="name">Name</label>
                <br />
                <Input
                  name="name"
                  type="text"
                  placeholder="Product Name"
                  className="form-field"
                  required
                />
              </div>
              <div className="form-item">
                <BankSelector onChange={loadBankBaseRate} />
              </div>
            </div>
            <br />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gridColumnGap: "10px",
              }}
            >
              <div className="form-item">
                <label htmlFor="headOffice">Product Link</label>
                <br />
                <Input
                  name="plink"
                  type="text"
                  placeholder="Product Url"
                  className="form-field"
                />
              </div>
              <div className="form-item">
                <label htmlFor="primary_contact">Product Image</label>
                <br />
                <Input
                  name="image_url"
                  type="text"
                  placeholder="Copy Product Image Url"
                  className="form-field"
                />
              </div>
            </div>
            <br />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gridColumnGap: "10px",
              }}
            >
              <div className="form-item">
                <label htmlFor="loan_type">Loan Type</label>
                <br />
                <Input
                  type="select"
                  name="loan_type"
                  placeholder="Loan Type"
                  className="form-field"
                  required
                >
                  <option value="">-- Select Type --</option>
                  <option value="saving">Saving</option>
                  <option value="current">Current</option>
                  <option value="loan">Loan</option>
                </Input>
              </div>
              <div className="form-item">
                <label htmlFor="logo_url">Product Type</label>
                <br />
                <Input
                  name="ptype"
                  type="text"
                  placeholder="Product Type"
                  className="form-field"
                  required
                />
              </div>
            </div>
            <br />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gridColumnGap: "10px",
              }}
            >
              <div className="form-item">
                <label htmlFor="email">Base Rate</label>
                <br />
                <Input
                  name="base_rate"
                  type="Number"
                  defaultValue={baseRate ? baseRate : ""}
                  placeholder="Base Rate"
                  className="form-field"
                  required
                />
              </div>

              <div className="form-item">
                <label htmlFor="logo_url">Interest Rate</label>
                <br />
                <Input
                  name="interest_rate"
                  type="Number"
                  placeholder="Interest Rate"
                  className="form-field"
                  required
                />
              </div>
            </div>
            <br />
            {/* <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
                gridColumnGap: "10px",
              }}
            >
              <div className="form-item">
                <label htmlFor="address">Description</label>
                <br />
                <Input
                  name="description"
                  type="textarea"
                  rows="8"
                  placeholder="Product Details"
                  className="form-field"
                  required
                />
              </div>
            </div>
            <br /> */}
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
