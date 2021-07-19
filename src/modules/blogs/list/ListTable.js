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
import { BlogContext } from "../../../contexts/BlogContext";

export default function BlogList() {
  const { addToast } = useToasts();
  const [model, setModel] = useState(false);
  const [current, setCurrent] = useState(0);

  const size = "sm";

  const { listBlog, blog, pagination, addBlogs,deleteBlog } = useContext(BlogContext);

  const handlePagination = (current_page) => {
    let _start = current_page * pagination.limit;
    setCurrent(current_page);
    let query = { name: "" };
    return loadBlogList({
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
    listBlog(params)
      .then()
      .catch(() => {
        addToast("Something went wrong!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const loadBlogList = (query) => {
    if (!query) query = null;
    listBlog(query)
      .then()
      .catch(() => {
        addToast("Something went wrong!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const deleteHandler = (id) => {   
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
        deleteBlog(id)
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
            Swal.fire("Deleted!", `Your blog has been deleted.`, "success");
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

  let get = useCallback(
    (params) => {
      listBlog(params);
    },
    [listBlog]
  );

  useEffect(fetchList, []);
  useEffect(loadBlogList, []);
  return (
    <>
      <Card>
        <CardTitle className="mb-0 p-3 border-bottom bg-light">
          <Row>
            <Col md="4">
              <i className="mdi mdi-border-right mr-2"></i>Blog List
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
                    placeholder="Enter Blog Name ..."
                    onChange={handleSearchInputChange}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </Col>
            <Col md="2">
              <div style={{ float: "right" }}>
                 <Link className="btn btn-primary" to="/addBlogs">
                  Add Blog  
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
                <th className="border-0">Action</th>
              </tr>
            </thead>
            <tbody>
              {blog.length ? (
                blog.map((d) => {
                  return (
                    <tr key={d._id}>
                      <td>
                        <div className="text-dark">{d.name ? d.name : 'N/A'}&nbsp;&nbsp;
                            {d.image_url && d.image_url.length > 0 ? (
                            <i onClick={() => window.open(`${d.image_url}`,'_blank')} className="fas fa-image fa-sm hover-pointer" style={{ color: 'red', fontSize:'15px' }}></i>
                          ) : (
                              ''
                            )}
                        </div>
                      </td>
                      <td>{d.slug || "N/A"}</td>                      
                      <td className="blue-grey-text  text-darken-4 font-medium">
                        <Link className="btn btn-primary" to={`/blog/${d._id}`}>
                          Edit
                        </Link>
                         <Button className="btn btn-danger ml-2" onClick={()=> deleteHandler(d._id)}>
                          Delete
                        </Button>
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

            addBlogs(e)
              .then((d) => {
                addToast("Blog Added successfully", {
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
              <h3>Add New Blog</h3>
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
                  placeholder="Blog Title"
                  className="form-field"
                  required
                />
              </div>
              <div className="form-item">
                <label htmlFor="content">Content</label>
                <br />
                <Input type="textarea" name="content" required />
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
                <label htmlFor="excerpt">Excerpt</label>
                <br />
                <Input
                  name="excerpt"
                  type="text"
                  placeholder="Blog Excerpt"
                  className="form-field"
                  required
                />
              </div>
              <div className="form-item">
                <label htmlFor="image_url">Image Url</label>
                <br />
                <Input
                  name="image_url"
                  type="text"
                  placeholder="Blog image_url"
                  className="form-field"
                  required
                />
              </div>
            </div>
            <br />

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
