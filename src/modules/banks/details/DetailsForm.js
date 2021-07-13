import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css";

import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  InputGroup,
} from "reactstrap";

import { BankContext } from "../../../contexts/BankContext";
import { ProductContext } from "../../../contexts/ProductContext";
import Loading from "../../global/Loading";

export default function DetailsForm(props) {
  const bankId = props.params.id;
  const { addToast } = useToasts();
  const [bank_details, setBankDetails] = useState(null);
  const [content, setContent] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };
  const formats = ["bold", "italic", "underline", "list", "bullet"];

  const {
    loading,
    setLoading,
    resetLoading,
    getBankDetails,
    updateBank,
  } = useContext(BankContext);

  const {listProduct, updateProduct} = useContext(ProductContext);

  const loadBankDetails = () => {
    getBankDetails(bankId)
      .then((d) => {
        setBankDetails(d);
        const editorText = d.desc ? d.desc : "";
        setContent(editorText);
      })
      .catch(() => {
        addToast("Something went wrong!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    let formData = { ...bank_details };
    formData.desc = content;
    setLoading();
    updateBank(bankId, formData).then(() => {
      resetLoading();
      Swal.fire("Successful!", "Bank details updated successfully.", "success")
        .then((result) => {
          if (result.value) {
            window.location.href = "/banks";
          }
        })
        .catch((err) => {
          addToast("Something went wrong on server!", {
            appearance: "error",
            autoDismiss: true,
          });
          resetLoading();
        });
    });    
    try {
      let bankProducts = await listProduct({bankname:bank_details.name,limit:2000});
      bankProducts.data.forEach((el)=>{
        updateProduct(el._id,{base_rate: formData.base_rate})
        .then()
        .catch(e=>{
          addToast(e.message, {
              appearance: "error",
              autoDismiss: true,
          });
        })      
      });
      addToast("All Products BaseRate Successfully Updated", {
          appearance: "success",
          autoDismiss: true,
        });      
    } catch (e) {
      addToast(e.message, {
					appearance: 'error',
					autoDismiss: true
      });      
    }  
  };
  const handleContentChange = async (content) => {
    setContent(content);
  };
  useEffect(loadBankDetails, []);

  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <CardTitle className="bg-light border-bottom p-3 mb-0">
              <i className="mdi mdi-book mr-2"></i>Bank Details.
            </CardTitle>
            <CardBody>
              <Form onSubmit={submitUpdate}>
                <FormGroup>
                  <Label>Bank Name</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="name"
                      defaultValue={bank_details ? bank_details.name : ""}
                      onChange={(e) =>
                        setBankDetails({
                          ...bank_details,
                          name: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label>Head Office Address</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="address"
                      defaultValue={
                        bank_details ? bank_details.head_office : ""
                      }
                      onChange={(e) =>
                        setBankDetails({
                          ...bank_details,
                          head_office: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label>Email Address</Label>
                  <InputGroup>
                    <Input
                      type="email"
                      name="email"
                      defaultValue={bank_details ? bank_details.email : ""}
                      onChange={(e) =>
                        setBankDetails({
                          ...bank_details,
                          email: e.target.value,
                        })
                      }
                    />
                  </InputGroup>
                </FormGroup>
                <Row form>
                  <Col md="4">
                    <FormGroup>
                      <Label>Primary Contact</Label>
                      <InputGroup>
                        <Input
                          type="text"
                          name="primary_contact"
                          defaultValue={
                            bank_details ? bank_details.primary_contact : ""
                          }
                          onChange={(e) =>
                            setBankDetails({
                              ...bank_details,
                              primary_contact: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Secondary Contacts</Label>
                      <InputGroup>
                        <Input
                          type="text"
                          name="secondary_contacts"
                          defaultValue={
                            bank_details ? bank_details.secondary_contacts : ""
                          }
                          onChange={(e) =>
                            setBankDetails({
                              ...bank_details,
                              secondary_contacts: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>

                  <Col md="4">
                    <FormGroup>
                      <Label>Base Rate</Label>
                      <InputGroup>
                        <Input
                          type="number"
                          step=".01"
                          name="base_rate"
                          defaultValue={
                            bank_details ? bank_details.base_rate : ""
                          }
                          onChange={(e) =>
                            setBankDetails({
                              ...bank_details,
                              base_rate: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md="4">
                    <FormGroup>
                      <Label>Product Url</Label>
                      <InputGroup>
                        <Input
                          type="text"
                          name="product_url"
                          defaultValue={
                            bank_details ? bank_details.product_url : ""
                          }
                          onChange={(e) =>
                            setBankDetails({
                              ...bank_details,
                              product_url: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Web Url</Label>
                      <InputGroup>
                        <Input
                          type="text"
                          name="website"
                          defaultValue={
                            bank_details ? bank_details.website : ""
                          }
                          onChange={(e) =>
                            setBankDetails({
                              ...bank_details,
                              website: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="4">
                    <FormGroup>
                      <Label>Logo Url</Label>
                      <InputGroup>
                        <Input
                          type="text"
                          name="logo_url"
                          defaultValue={
                            bank_details ? bank_details.logo_url : ""
                          }
                          onChange={(e) =>
                            setBankDetails({
                              ...bank_details,
                              logo_url: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md="12">
                    <FormGroup>
                      <Label>Bank Summary</Label>
                      <ReactQuill
                        modules={modules}
                        formats={formats}
                        value={content}
                        placeholder="Write the Bank Summary"
                        theme={"snow"}
                        style={{ height: "250px" }}
                        onChange={(e) => handleContentChange(e)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <div className="border-top pt-3 mt-3">
                  {loading ? (
                    <Loading />
                  ) : (
                      <div style={{ marginTop: 20, marginBottom: 10 }}>
                        <Button type="submit" className="btn btn-success mr-2">
                          Submit
                      </Button>
                        <Link to="/banks" className="btn btn-dark">
                          Cancel
                      </Link>
                      </div>
                    )}
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
}
