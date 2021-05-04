import React, { useContext, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ReactQuill from 'react-quill';
import Swal from "sweetalert2";
import 'react-quill/dist/quill.snow.css';
import S3 from 'react-aws-s3';

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

import { CategoryContext } from "../../../contexts/CategoryContext";
import Loading from "../../global/Loading";

export default function DetailsForm(props) {
  const history = useHistory();
  const categoryId = props.params.id;
  const config = {
		bucketName: process.env.REACT_APP_AWS_BUCKETNAME,
		dirName: process.env.REACT_APP_AWS_DIRNAME,
		region: process.env.REACT_APP_AWS_REGION,
		accessKeyId: process.env.REACT_APP_AWS_ACCESSKEYID,
		secretAccessKey: process.env.REACT_APP_AWS_SECRETACCESSKEY,
		s3Url: process.env.REACT_APP_AWS_S3URL
	};
	const ReactS3Client = new S3(config);
  const { addToast } = useToasts();
  const [category_details, setCategoryDetails] = useState(null);
  const [content, setContent] = useState('');
  const [extraContent, setExtraContent] = useState('');
  const modules = {
			toolbar: [
          [{ 'header': [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
		      ['clean']
		    ]
    };
  const freemodules = {
			toolbar: [
          [{ 'header': [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'color': []}],
		      ['clean']
		    ]
    };
  const formats = [
		    'bold', 'italic', 'underline',
		    'list', 'bullet'
      ];
  const freeformats = [
		    'header', 'bold', 'italic', 'underline',
		    'list', 'bullet', 'color'
      ];

	const [selectedFile, setSelectedFile] = useState('');
  const docHandler = async event => {
		const fileName = event.target.files[0];
		const regex = / /gi;
    const date = new Date();
    const milliseconds = String(date.getTime());
		const newFileName = milliseconds.concat("-",fileName.name.replace(regex, '-'));
		const awsUrl = await ReactS3Client.uploadFile(event.target.files[0], newFileName);
		const fileURL = process.env.REACT_APP_AWS_S3URL + awsUrl.key;
		setSelectedFile(fileURL);
	};

  const {
    loading,
    setLoading,
    resetLoading,
    getCategoryDetails,
    updateCategory,
  } = useContext(CategoryContext);

  const loadCategoryDetails = () => {
    getCategoryDetails(categoryId)
      .then(d =>{
          setCategoryDetails(d);
          const editorText = d.required_docs ? d.required_docs : '';
          setContent(editorText);
          const extraText = d.extras ? d.extras : '';
          setExtraContent(extraText);
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
      let formData = {...category_details};
      formData.required_docs = content;
      formData.extras = extraContent;
			formData.image = selectedFile;
    setLoading();
    updateCategory(categoryId, formData)
      .then(() => {
        resetLoading();
        Swal.fire("Successful!", "Category details updated successfully.", "success").then((result) => {})
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
  }
  const handleExtraContentChange = async (extraContent) => {
      setExtraContent(extraContent);
  }
  useEffect(loadCategoryDetails, []);

  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <CardTitle className="bg-light border-bottom p-3 mb-0">
              <i className="mdi mdi-book mr-2"></i>Category Details.
            </CardTitle>
            <CardBody>
              <Form onSubmit={submitUpdate} >
                <Row form>
                <Col md="4">
                  <Col md="4">
                  <FormGroup>
                  <Label>Image</Label>
                  <div className="text-center mb-0">
								<Label for="doc-upload" className="custom-doc-upload text-center">
									<div>
										<img
											src={ category_details && category_details.image  ? category_details.image : selectedFile }
											className="form-group text-center"
                      onError={(e)=>{e.target.onerror = null; e.target.src="https://9to5wordpress.com/wp-content/uploads/2020/11/ninja-forms-file-upload.png"}}  
											width="250"
											height="100"
											alt="new file for uploading"
										/>
									</div>
								</Label>
								<Input id="doc-upload" type="file" name="image_upload" onChange={e => docHandler(e)} />
							</div>
                </FormGroup>
                </Col>
                </Col>
                <Col md="8">
                  <Col md="12">
                  <FormGroup>
                  <Label>Name</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="name"   
                      defaultValue={category_details ? category_details.name : ""}
                      onChange={e => setCategoryDetails({ ...category_details, name: e.target.value })}
                    />
                  </InputGroup>
                </FormGroup>
                </Col>
                <Col md="12">
                <FormGroup>
                  <Label>Category Icon</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="icon"   
                      defaultValue={category_details ? category_details.icon : ""}
                      onChange={e => setCategoryDetails({ ...category_details, icon: e.target.value })}
                    />
                  </InputGroup>
                </FormGroup>
                </Col>
                </Col>
                <Col md="12">
                  <FormGroup>
                  <Label>Sub Head</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="sub_head"   
                      defaultValue={category_details ? category_details.sub_head : ""}
                      onChange={e => setCategoryDetails({ ...category_details, sub_head: e.target.value })}
                    />
                  </InputGroup>
                </FormGroup>
                </Col>
                </Row>
                <Row form>
                <Col md="12">
                <FormGroup>
                  <Label>Required Doc</Label>
                    <ReactQuill
                      modules={modules}
			              	formats={formats}
                      value={content}
                      placeholder="Write the Required Docs for the category"
                      theme={"snow"}
                      style={{height: '250px'}}
                      onChange={e => handleContentChange(e)} />
                </FormGroup>
                </Col>
                </Row>
                <br/>
                <br/>
                <Row form>
                <Col md="12">
                <FormGroup>
                  <Label>Extra Information</Label>
                    <ReactQuill
                      modules={freemodules}
			              	formats={freeformats}
                      value={extraContent}
                      placeholder="Write extra information in free form"
                      theme={"snow"}
                      style={{height: '400px'}}
                      onChange={e => handleExtraContentChange(e)} />
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
                      <Button onClick={() => history.goBack()} className="btn btn-dark">
                        Cancel
                      </Button>
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
