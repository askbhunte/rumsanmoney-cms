import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ReactQuill from "react-quill";
import Swal from "sweetalert2";
import "react-quill/dist/quill.snow.css";
//ckeditor stuff
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MyUploadAdapter from "../../../services/MyUploader";

import {
    Card,
    CardBody,
    CardTitle,
    CardHeader,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    InputGroup,
} from "reactstrap";

import { PagesContext } from "../../../contexts/PagesContext";
import Loading from "../../global/Loading";

export default function DetailsForm(props) {
    const [extraContent, setExtraContent] = useState("");
    const custom_config = {
        extraPlugins: [MyCustomUploadAdapterPlugin],
        height: "400px",
        toolbar: {
            items: [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "|",
                "blockQuote",
                "insertTable",
                "|",
                "imageUpload",
                "mediaEmbed",
                "|",
                "undo",
                "redo",
            ],
        },
        table: {
            contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
        },
    };
    //ck editor end
    function MyCustomUploadAdapterPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return new MyUploadAdapter(loader);
        };
    }
    const pageId = props.params.id;
    const { addToast } = useToasts();
    const [page_details, setPageDetails] = useState(null);
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
        getPagesDetails,
        updatePages,
    } = useContext(PagesContext);

    const loadPageDetails = () => {
        getPagesDetails(pageId)
            .then((d) => {
                setPageDetails(d);
                const content = d.content ? d.content : '';
                setExtraContent(content);
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
        let formData = { ...page_details };
        formData.desc = content;
        setLoading();
        updatePages(pageId, formData).then(() => {
            resetLoading();
            Swal.fire("Successful!", "Page details updated successfully.", "success")
                .then((result) => {
                    if (result.value) {
                        window.location.href = "/pages";
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
    useEffect(loadPageDetails, []);

    return (
        <>
            <Card>
                <CardHeader>Add New Pages</CardHeader>
                <CardBody>
                    <Form onSubmit={submitUpdate}>
                        <FormGroup>
                            <Label for="title">Page Title:</Label>
                            <Input
                                type="text"
                                name="title"
                                defaultValue={page_details ? page_details.name : ""}
                                onChange={e => setPageDetails({ ...page_details, name: e.target.value })}
                                id="title"
                                placeholder="Enter Title"
                                required
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="sub_title">Content:</Label>
                            <br />
                            <CKEditor
                                editor={ClassicEditor}
                                config={custom_config}
                                data={extraContent}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    setExtraContent(data);
                                }}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="Status">Status:</Label>
                            <Input
                                type="select"
                                name="status"
                                placeholder="Status"
                                className="form-field"
                                value={page_details ? page_details.status : ""}
                                onChange={e => setPageDetails({ ...page_details, status: e.target.value })}
                                required
                            >
                                <option value="">-- Select Type --</option>
                                <option value="PUBLISHED">PUBLISHED</option>
                                <option value="DRAFT">DRAFT</option>
                            </Input>
                        </FormGroup>
                        <Button type="submit">Submit</Button>
                        <Link to="/pages" className="btn btn-danger ml-2">
                            Cancel
          </Link>
                    </Form>
                </CardBody>
            </Card>
        </>
    );
}
