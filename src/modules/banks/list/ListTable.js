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
import { BankContext } from "../../../contexts/BankContext";


export default function BankList() {
  const { addToast } = useToasts();
  const [model, setModel] = useState(false);
  const size = "xl";
  const { listBank, bank, pagination, addBank } = useContext(BankContext);

  const handlePagination = (current_page) => {
    let _start = current_page * pagination.limit - 1;
    return loadBankList({ start: _start, limit: pagination.limit });
  };
  const toggle = () => setModel(!model);

  const searchOptions = { ADDRESS: "address", NAME: "name" };
  const [filter, setFilter] = useState({
    searchPlaceholder: "Enter bank name...",
    searchBy: "name",
  });

  const handleFilterChange = (e) => {
    let { value } = e.target;
    if (value === searchOptions.NAME) {
      setFilter({
        searchPlaceholder: "Enter Bank name...",
        searchBy: searchOptions.NAME,
      });
    }
    if (value === searchOptions.ADDRESS) {
      setFilter({
        searchPlaceholder: "Enter address...",
        searchBy: searchOptions.ADDRESS,
      });
    }
    fetchList({ start: 0, limit: pagination.limit });
  };

  const handleSearchInputChange = (e) => {
    const { value } = e.target;
    if (filter.searchBy === searchOptions.ADDRESS) {
      return fetchList({ start: 0, limit: pagination.limit, address: value });
    }
    if (filter.searchBy === searchOptions.NAME) {
      return fetchList({ start: 0, limit: pagination.limit, name: value });
    }
    fetchList({ start: 0, limit: pagination.limit });
  };

  const fetchList = (query) => {
    let params = { ...pagination, ...query };
    listBank(params)
      .then()
      .catch(() => {
        addToast("Something went wrong!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };


  const loadBankList = (query) => {
    if (!query) query = null;
    listBank(query)
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
      listBank(params);
    },
    [listBank]
  );

  useEffect(fetchList, []);
  useEffect(loadBankList, []);
  return (
    <>
      <Card>
        <CardTitle className="mb-0 p-3 border-bottom bg-light">
          <Row>
            <Col md="4">
              <i className="mdi mdi-border-right mr-2"></i>Bank List
            </Col>
            <Col md="7">
                <div
                  style={{
                    float: "right",
                    display: "flex"
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
                    <option value="name">Search By Name</option>
                    <option value="address">By Address</option>
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
            <Col md="1">
            <div style={{ float: "right" }}>
              <Button color="info" onClick={(e) => toggle()}>
                Add Bank
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
                <th className="border-0">Address</th>
                <th className="border-0">Contact</th>
                <th className="border-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {bank.length ? (
                bank.map((d) => {
                  return (
                    <tr key={d._id}>
                      <td>{d.name}</td>
                      <td>{d.address || "n/a"}</td>
                      <td>{d.primary_contact || "n/a"}</td>
                      <td className="blue-grey-text  text-darken-4 font-medium">
                        <Link
                          className="btn btn-secondary"
                          to={`/bank/${d._id}`}
                        >
                          Details
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
      <Modal isOpen={model} toggle={toggle} size={size}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            addBank(e)
              .then((d) => {
                addToast("Bank Added successfully", {
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
              <h3>Add Bank</h3>
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
                  placeholder="Bank Full Name"
                  className="form-field"
                  required
                />
              </div>
              <div className="form-item">
                <label htmlFor="headOffice">Head Office Address</label>
                <br />
                <Input
                  name="head_office"
                  type="text"
                  placeholder="Address of Head Office"
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
                <label htmlFor="primary_contact">Primary Phone</label>
                <br />
                <Input
                  name="primary_contact"
                  type="number"
                  placeholder="Primary Phone no"
                  className="form-field"
                  required
                />
              </div>
              
              <div className="form-item">
                <label htmlFor="secondary_contacts">Secondary Contacts</label>
                <br />
                <Input
                  name="secondary_contacts"
                  type="text"
                  placeholder="Secondary Contacts separated by comma"
                  className="form-field"
                  required
                />
              </div>
            </div>
            <br />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gridColumnGap: "10px",
              }}
            > 
            <div className="form-item">
                <label htmlFor="email">Email</label>
                <br />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="form-field"
                  required
                />
              </div>
              <div className="form-item">
                <label htmlFor="logo_url">Bank Logo</label>
                <br />
                <Input
                  name="logo_url"
                  type="text"
                  placeholder="Link of Logo"
                  className="form-field"
                  required
                />
              </div>
              <div className="form-item">
                <label htmlFor="website">Website URL</label>
                <br />
                <Input
                  name="website"
                  type="text"
                  placeholder="Website URL"
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
