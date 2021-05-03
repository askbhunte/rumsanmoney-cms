import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import {
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  Table,
  Input,
} from "reactstrap";
import { UserContext } from "../../contexts/UserContext";
import { getUser } from "../../utils/sessionManager";
import ACTIONS from "../../actions/user";
import Paginate from "../global/Paginate";
import CustomModal from "../global/CustomModal";

export default function List() {
  const { addToast } = useToasts();
  const [current, setCurrent] = useState(0);
  const [modal, setModal] = useState(false);

  const currentUser = getUser();
  const { org_id } = currentUser;
  const {
    changeUserStatus,
    addUser,
    list,
    listUsers,
    dispatch,
    pagination,
  } = useContext(UserContext);

  const toggleModal = () => {
    setModal(!modal);
  };

  // Can send search params like name, phone in query later
  const fetchUsersByOrg = (query) => {
    let params = { ...pagination, ...query };
    listUsers(params)
      .then((res) => {
        dispatch({ type: ACTIONS.LIST_BY_ORG, data: res });
      })
      .catch(() => {
        addToast("Internal server error!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const handlePagination = (current_page) => {
    let _start = current_page * pagination.limit;
    setCurrent(current_page);
    return fetchUsersByOrg({ start: _start, limit: pagination.limit });
  };

  const handleUserAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const roleName = formData.get("roles");
    const payload = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      password: formData.get("password"),
      type: formData.get("userType"),
      province: formData.get("province"),
      district: formData.get("area"),
      municipality: formData.get("municipality"),
      storeName: formData.get("storeName"),
    };
    payload.roles = [roleName];
    payload.org_id = org_id;
    if (!payload.type) delete payload.type;
    saveUser(payload);
  };

  const saveUser = (payload) => {
    addUser(payload)
      .then(() => {
        addToast("User added successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        toggleModal();
        fetchUsersByOrg();
      })
      .catch((err) => {
        addToast(err.message, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const handleCheckboxChange = (userId, status) => {
    const FLAG = status === "true" ? "ACTIVATED" : "SUSPENDED";
    changeUserStatus(userId, status)
      .then(() => {
        fetchUsersByOrg();
        addToast(`User account ${FLAG} successfully`, {
          appearance: "success",
          autoDismiss: true,
        });
      })
      .catch(() => {
        addToast(`Internal server error!`, {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  useEffect(fetchUsersByOrg, []);

  return (
    <>
      <CustomModal
        toggle={toggleModal}
        open={modal}
        title="Add New User"
        handleSubmit={handleUserAddSubmit}
        size="lg"
      >
        <div>
          <div className="form-item">
            <label htmlFor="name">Name</label>
            <br />
            <Input
              name="name"
              type="text"
              placeholder="Enter full name"
              className="form-field"
              required
            />
          </div>
        </div>
        <br />
        <div>
          <div className="form-item">
            <label htmlFor="phone">Phone</label>
            <br />
            <Input
              name="phone"
              type="number"
              placeholder="Enter phone number"
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
            <label htmlFor="email">Email</label>
            <br />
            <Input
              name="email"
              type="email"
              placeholder="Enter valid email"
              className="form-field"
              required
            />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password</label>
            <br />
            <Input
              name="password"
              type="text"
              placeholder="Create password"
              className="form-field"
              required
            />
          </div>
        </div>
        <br />
        <br />
      </CustomModal>
      <Card>
        <CardTitle className="mb-0 p-3 border-bottom bg-light">
          <Row>
            <Col md="4">
              <i className="mdi mdi-border-right mr-2"></i>Users List
            </Col>
            <Col md="6"></Col>
            <Col md="2">
              <div style={{ float: "right" }}>
                <Button onClick={toggleModal} color="info">
                  Add User
                </Button>
              </div>
            </Col>
          </Row>
        </CardTitle>
        <CardBody>
          {list && list.length ? (
            <Table className="no-wrap v-middle" responsive>
              <thead>
                <tr className="border-0">
                  <th className="border-0">Name</th>
                  <th className="border-0">Email</th>
                  <th className="border-0">Phone</th>
                  <th className="border-0">Address</th>
                  <th className="border-0">Status</th>
                  <th className="border-0">Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((user) => {
                  return (
                    <tr key={user._id}>
                      <td>{user.full_name}</td>
                      <td>{user.email || "-"}</td>
                      <td>{user.phone || "-"}</td>
                      <td>{user.district || "-"}</td>
                      <td>
                        {!!user.is_active ? (
                          <input
                            type="checkbox"
                            defaultChecked={true}
                            onChange={() =>
                              handleCheckboxChange(user._id, "false")
                            }
                          />
                        ) : (
                          <input
                            type="checkbox"
                            defaultChecked={false}
                            onChange={() =>
                              handleCheckboxChange(user._id, "true")
                            }
                          />
                        )}
                      </td>
                      <td className="blue-grey-text  text-darken-4 font-medium">
                        <Link
                          className="btn btn-secondary"
                          to={`/users/${user._id}`}
                        >
                          Details
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            "No data available."
          )}

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
