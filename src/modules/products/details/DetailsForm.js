import React, { useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Swal from "sweetalert2";

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
  ButtonGroup,
  InputGroup
} from "reactstrap";

import { ProductContext } from "../../../contexts/ProductContext";
import Loading from "../../global/Loading";

export default function DetailsForm(props) {
  const productId = props.params.id;
  const { addToast } = useToasts();
  const [product_details, setProductDetails] = useState(null);

  const {
    loading,
    setLoading,
    resetLoading,
    getProductDetails,
    updateProduct,
    changeStatus
  } = useContext(ProductContext);

  const loadProductDetails = () => {
    getProductDetails(productId)
      .then(d =>setProductDetails(d))
      .catch(() => {
        addToast("Something went wrong!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const submitUpdate = (e) => {
      e.preventDefault();
      const formData = {...product_details}
    setLoading();
    updateProduct(productId, formData)
      .then(() => {
        resetLoading();
        Swal.fire("Successful!", "Product details updated successfully.", "success").then((result) => {
            if(result.value) {
              window.location.href = '/products';
            };
      })
      .catch((err) => {
        addToast("Something went wrong on server!", {
          appearance: "error",
          autoDismiss: true,
        });
        resetLoading();
      });
  })
};

  const handleStatusChange = async (status) => {
    const title = status.is_active ? "Active" : "Inactive"; 
    let result = await Swal.fire({
      title: "Are you sure?",
      text: `Product will be marked as ${title}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    });
    if (result.isConfirmed) {
      try {
        let d = await changeStatus(productId, status);
        if (d) {
          setProductDetails(d);
          addToast(`Product marked as ${title}.`, {
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
  useEffect(loadProductDetails, []);
  
  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <CardTitle className="bg-light border-bottom p-3 mb-0">
              <Row form>
                <Col md="6">
                <i className="mdi mdi-book mr-2"></i>Product Details.
                </Col>
                <Col md="6">
                  <div
                  style={{
                    float: "right",
                    display: "flex"
                  }}
                >
                 <FormGroup>
                    <ButtonGroup>
                      <Button
                        color="success"
                        onClick={() => handleStatusChange({is_active : false})}
                        disabled={
                          product_details && product_details.is_active === false
                        }
                      >
                        Active
                      </Button>
                      <Button
                        disabled={
                          product_details && product_details.is_active !== false
                        }
                        color="danger"
                        onClick={() => handleStatusChange({is_active : true})}
                      >
                        Inactive
                      </Button>
                    </ButtonGroup>
                  </FormGroup>
                 </div>
                </Col>
              </Row>
            </CardTitle>
            <CardBody>
              <Form onSubmit={submitUpdate} >
              <Row form>
                <Col md="6">
                <FormGroup>
                  <Label>Product Name</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="name"
                      defaultValue={product_details ? product_details.name : ""}
                      onChange={e => setProductDetails({ ...product_details, name: e.target.value })}
                    />
                  </InputGroup>
                </FormGroup>
                </Col>
                  <Col md="6">
                <FormGroup>
                  <Label>Bank Name</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="bank_id"
                      defaultValue={product_details ? product_details.bank_id : ""}
                      onChange={e => setProductDetails({ ...product_details, bank_id: e.target.value })}

                    />
                  </InputGroup>
                </FormGroup>
                </Col>
                </Row>
                <Row form>
                <Col md="6">
                <FormGroup>
                  <Label>Product Link</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="plink" 
                      defaultValue={product_details ? product_details.plink : ""}
                      onChange={e => setProductDetails({ ...product_details, plink: e.target.value })}
                    />
                  </InputGroup>
                </FormGroup>
                </Col>
                <Col md="6">
                <FormGroup>
                  <Label>Product Image Url</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="image_url"   
                      defaultValue={product_details ? product_details.image_url : ""}
                      onChange={e => setProductDetails({ ...product_details, image_url: e.target.value })}
                    />
                  </InputGroup>
                </FormGroup>
                </Col>
                </Row>
                <Row form>
                <Col md="4">
                  <FormGroup>
                  <Label>Loan Type</Label>
                  <InputGroup>
                     <Input type="select" name="loan_type"
                     value={product_details ? product_details.loan_type : ""}
                     onChange={e => setProductDetails({ ...product_details, loan_type: e.target.value })}
                     >
                      <option value="">-- Select Type --</option>
                      <option value="saving">Saving</option>
                      <option value="current">Current</option>
                      <option value="loan">Loan</option>
                    </Input>
                  </InputGroup>
                </FormGroup>
                </Col>
                <Col md="4">
                <FormGroup>
                  <Label>Base Rate</Label>
                  <InputGroup>
                    <Input
                      type="Number"
                      name="base_rate"   
                      defaultValue={product_details ? product_details.base_rate : ""}
                      onChange={e => setProductDetails({ ...product_details, base_rate: e.target.value })}
                    />
                  </InputGroup>
                </FormGroup>
                </Col>
                <Col md="4">
                <FormGroup>
                  <Label>Interest Rate</Label>
                  <InputGroup>
                    <Input
                      type="Number"
                      name="interest_rate"   
                      defaultValue={product_details ? product_details.interest_rate : ""}
                      onChange={e => setProductDetails({ ...product_details, interest_rate: e.target.value })}
                    />
                  </InputGroup>
                </FormGroup>
                </Col>
                </Row>
                <Row form>
                <Col md="12">
                <FormGroup>
                  <Label>Description</Label>
                  <InputGroup>
                    <Input
                      type="textarea"
                      name="description"
                      rows="12"   
                      defaultValue={product_details ? product_details.description : ""}
                      onChange={e => setProductDetails({ ...product_details, description: e.target.value })}
                    />
                  </InputGroup>
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
                      <Link to="/products" className="btn btn-dark">
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
