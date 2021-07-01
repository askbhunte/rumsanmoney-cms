import React, { useState, useContext, useEffect, useCallback } from "react";
import { useToasts } from "react-toast-notifications";
import { Link } from "react-router-dom";
import Paginate from "../../global/Paginate";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
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
import { BankContext } from "../../../contexts/BankContext";
import { ProductContext } from "../../../contexts/ProductContext";

export default function BankList() {
  const { addToast } = useToasts();
  const [modal, setModal] = useState(false);
  const [current, setCurrent] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState("");

  const size = "xl";
  const { listBank, bank, pagination, addBank } = useContext(BankContext);
  const { listProduct,updateDate } = useContext(ProductContext);
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };
  const formats = ["bold", "italic", "underline", "list", "bullet"];

  const handleContentChange = async (content) => {
    setContent(content);
  };

  const handlePagination = (current_page) => {
    let _start = current_page * pagination.limit;
    setCurrent(current_page);
    let query = { name: searchText };
    if (filter.searchBy === searchOptions.ADDRESS) {
      query = { baserate: searchText };
    }
    return loadBankList({
      start: _start,
      limit: pagination.limit,
      ...query,
    });
  };
  const toggle = () => setModal(!modal);

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
    setSearchText(value);
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

  //update all products
  const updateProducts = async(bank)=>{    
    let result = await Swal.fire({
			title: 'Are you sure?',
			text: `All the products of ${bank} will be updated`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		});
		if (result.isConfirmed) {
			try {		
        let bankProducts = await listProduct({bankname:bank});	      
        bankProducts.data.forEach(el=>{
          updateDate(el._id)
          .then()
          .catch((e)=>{
            addToast(e.message, {
            appearance: "error",
            autoDismiss: true,
            });
          })
        });
        addToast("Products Successfully Updated", {
          appearance: "success",
          autoDismiss: true,
        });            
			} catch(e) {
				addToast(e.message, {
					appearance: 'error',
					autoDismiss: true
				});
			}
		}
  }

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
            <Col md="2">
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
                <th className="border-0">Head Office Location</th>
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
                      <td>{d.head_office || "N/A"}</td>
                      <td>{d.primary_contact || "N/A"}</td>
                      <td className="blue-grey-text  text-darken-4 font-medium">
                        <Link
                          className="btn btn-secondary"
                          to={`/bank/${d._id}`}
                        >
                          Edit
                        </Link>
                      </td>
                      <td className="blue-grey-text  text-darken-4 font-medium">
                        <button
                          className="btn btn-primary"  onClick={()=> updateProducts(`${d.name}`)}              
                        >
                          Update Products
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
      <Modal isOpen={modal} toggle={toggle} size={size}>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            addBank(e, content)
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
                  type="text"
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
                <label htmlFor="email">Email</label>
                <br />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  className="form-field"
                />
              </div>
              <div className="form-item">
                <label htmlFor="email">Base Rate</label>
                <br />
                <Input
                  name="base_rate"
                  type="Number"
                  step=".01"
                  placeholder="Base Rate"
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
                <label htmlFor="logo_url">Bank Logo Url</label>
                <br />
                <Input
                  name="logo_url"
                  type="text"
                  placeholder="Link of Logo"
                  className="form-field"
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
                />
              </div>
              <div className="form-item">
                <label htmlFor="product_url">Product URL</label>
                <br />
                <Input
                  name="product_url"
                  type="text"
                  placeholder="Product URL"
                  className="form-field"
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
                <label htmlFor="">Bank Summary</label>
                <br />
                <ReactQuill
                  modules={modules}
                  formats={formats}
                  value={content}
                  placeholder="Write the Bank Summary"
                  theme={"snow"}
                  style={{ height: "250px" }}
                  onChange={(e) => handleContentChange(e)}
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
