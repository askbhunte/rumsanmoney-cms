import React, { useContext } from "react";
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
  InputGroup
} from "reactstrap";

import { BankContext } from "../../../contexts/BankContext";
import Loading from "../../global/Loading";

export default function DetailsForm(props) {
  const bankId = props.params.id;
  const { addToast } = useToasts();
  const {
    loading,
    bank_details,
    setLoading,
    resetLoading,
    approveBank,
  } = useContext(BankContext);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.value) {
        submitUpdate();
      }
    });
  };

  const submitUpdate = () => {
    setLoading();
    approveBank(bankId)
      .then(() => {
        resetLoading();
        Swal.fire("Approved!", "Bank details updated successfully.", "success");
      })
      .catch((err) => {
        addToast("Something went wrong on server!", {
          appearance: "error",
          autoDismiss: true,
        });
        resetLoading();
      });
  };

  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <CardTitle className="bg-light border-bottom p-3 mb-0">
              <i className="mdi mdi-book mr-2"></i>Bank Details.
            </CardTitle>
            <CardBody>
              <Form>
                <FormGroup>
                  <Label>Bank Name</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="name"
                      value={bank_details ? bank_details.name : "N/A"}
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label>Address</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="address"
                      value={
                        bank_details && bank_details.address
                          ? bank_details.address
                          : "N/A"
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
                      value={
                        bank_details && bank_details.email
                          ? bank_details.email
                          : "N/A"
                      }
                    />
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <Label>Web Url</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="website"
                      value={
                        bank_details ? bank_details.website : "N/A"
                      }
                    />
                  </InputGroup>
                </FormGroup>
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
