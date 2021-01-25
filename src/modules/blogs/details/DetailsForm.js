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

import { BlogContext } from "../../../contexts/BlogContext";
import Loading from "../../global/Loading";

export default function DetailsForm(props) {
  const blogId = props.params.id;
  const { addToast } = useToasts();
  const [blog_details, setBlogDetails] = useState(null);
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
    getBlogDetails,
    updateBlog,
  } = useContext(BlogContext);

  const loadBlogDetails = () => {
    getBlogDetails(blogId)
      .then((d) => {
        setBlogDetails(d);

        const blogContent = d.content ? d.content : "";
        setContent(blogContent);
      })
      .catch(() => {
        addToast("Something went wrong!", {
          appearance: "error",
          autoDismiss: true,
        });
      });
  };

  const submitUpdate = (e) => {
    e.preventDefault();
    let formData = { ...blog_details };

    setLoading();
    updateBlog(blogId, formData).then(() => {
      resetLoading();
      Swal.fire("Successful!", "Blog details updated successfully.", "success")
        .then((result) => {
          if (result.value) {
            window.location.href = "/blogs";
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
  };
  const handleContentChange = async (content) => {
    setContent(content);
  };
  useEffect(loadBlogDetails, []);

  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <CardTitle className="bg-light border-bottom p-3 mb-0">
              <i className="mdi mdi-book mr-2"></i>Blog Details.
            </CardTitle>
            <CardBody>
              <Form onSubmit={submitUpdate}>
                <Row form>
                  <Col md="6">
                    <FormGroup>
                      <Label>Name</Label>
                      <InputGroup>
                        <Input
                          type="text"
                          name="name"
                          defaultValue={blog_details ? blog_details.name : ""}
                          onChange={(e) =>
                            setBlogDetails({
                              ...blog_details,
                              name: e.target.value,
                            })
                          }
                        />
                      </InputGroup>
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <Label>Image Url</Label>
                      <InputGroup>
                        <Input
                          type="text"
                          name="image_url"
                          defaultValue={
                            blog_details ? blog_details.image_url : ""
                          }
                          onChange={(e) =>
                            setBlogDetails({
                              ...blog_details,
                              image_url: e.target.value,
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
                      <Label>Content</Label>
                      <ReactQuill
                        modules={modules}
                        formats={formats}
                        value={content}
                        placeholder="Write the Required Docs for the Blog"
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
                      <Link to="/blogs" className="btn btn-dark">
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
