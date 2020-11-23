import React, { useState, useContext, useEffect, useCallback } from "react";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";


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
  Pagination,
  PaginationItem,
  PaginationLink,
  CustomInput
} from "reactstrap";
import { ProductContext } from "../../../contexts/ProductContext";


export default function ProductList() {
  const { addToast } = useToasts();
  const [modal, setModal] = useState(false);
  const size = 'xl';
  const { listProduct, product, pagination, addProduct } = useContext(ProductContext);

  const handlePagination = (current_page) => {
    let _start = current_page * pagination.limit - 1;
    return loadProductList({ start: _start, limit: pagination.limit });
  };
  const toggle = () => setModal(!modal);

  const searchOptions = { BANKNAME: "bankname", NAME: "name", BASERATE: "baserate", TYPE: "type" };
  const [filter, setFilter] = useState({
    searchPlaceholder: "Enter product name...",
    searchBy: "name",
  });

  const handleFilterChange = (e) => {
    let { value } = e.target;
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
        searchPlaceholder: "Enter loan type...",
        searchBy: searchOptions.TYPE,
      });
    }
    fetchList({ start: 0, limit: pagination.limit });
  };

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
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
  
  //List Beneficiary
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
                    marginRight: "-16%"
                  }}
                >
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
                    <option value="type">By Loan Type</option>
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
                <th className="border-0">Loan Type</th>
                <th className="border-0">Base Rate</th>
                <th className="border-0">Interest Rate</th>
                <th className="border-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {product.length ? (
                product.map((d) => {
                  return (
                    <tr key={d._id}>
                      <td>{d.name}</td>
                      <td>{d.bank_id || "N/A"}</td>
                      <td>{d.loan_type ? d.loan_type.toUpperCase() : "N/A"}</td>
                      <td>{d.base_rate || "N/A"}</td>
                      <td>{d.interest_rate || "N/A"}</td>
                      {/* <td>
                        {d.is_active === true ? (
                          <span className="ml-3 badge badge-success">
                            Active
                          </span>
                        ) : (
                          <span className="ml-3 badge badge-danger">
                            Inactive
                          </span>
                        )}
                      </td> */}
                      <td className="blue-grey-text  text-darken-4 font-medium">
                        <Link
                          className="btn btn-secondary"
                          to={`/product/${d._id}`}
                        >
                          Details
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
          {pagination.totalPages > 1 ? (
            <Pagination
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "50px",
              }}
            >
              <PaginationItem>
                <PaginationLink
                  first
                  href="#first_page"
                  onClick={() => handlePagination(1)}
                />
              </PaginationItem>
              {[...Array(pagination.totalPages)].map((p, i) => (
                <PaginationItem
                  key={i}
                  active={pagination.currentPage === i + 1 ? true : false}
                  onClick={() => handlePagination(i + 1)}
                >
                  <PaginationLink href={`#page=${i + 1}`}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationLink
                  last
                  href="#last_page"
                  onClick={() => handlePagination(pagination.totalPages)}
                />
              </PaginationItem>
            </Pagination>
          ) : (
            ""
          )}
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
                <label htmlFor="name">Bank Name</label>
                <br />
                <Input
                  name="bank_id"
                  type="text"
                  placeholder="Bank Name"
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
                <Input type="select" name="loan_type" placeholder="Loan Type" className="form-field" required>
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
            <div
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
