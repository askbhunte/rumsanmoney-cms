import React, { useContext, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import ReactQuill from 'react-quill';
import Swal from "sweetalert2";
import 'react-quill/dist/quill.snow.css';
import S3 from 'react-aws-s3';
import uploading from '../../../assets/images/uploading.gif';
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
import Hash from 'ipfs-only-hash';
//ckeditor stuff
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '../../../services/MyUploader';

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
  const modules = {
			toolbar: [
          [{ 'header': [1, 2, 3, 4, false] }],
          ['bold', 'italic', 'underline'],
          [{'list': 'ordered'}, {'list': 'bullet'}],
		      ['clean']
		    ]
    };
  
  const formats = [
		    'bold', 'italic', 'underline',
		    'list', 'bullet'
      ];
  //ck editor part
  const [extraContent, setExtraContent] = useState('');
  const custom_config = {
      extraPlugins: [ MyCustomUploadAdapterPlugin ],
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'blockQuote',
          'insertTable',
          '|',
          'imageUpload', 'mediaEmbed', '|',
          'undo',
          'redo'
        ],
        
      },
      table: {
        contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
      },
      // image: {
      //       // Configure the available styles.
      //       styles: [
      //           'alignLeft', 'alignCenter', 'alignRight'
      //       ],
      //       // Configure the available image resize options.
      //       resizeUnit: "%",
      //       resizeOptions: [
      //           {
      //               name: 'resizeImage:original',
      //               label: 'Original',
      //               value: null
      //           },
      //           {
      //               name: 'resizeImage:50',
      //               label: '50%',
      //               value: '50'
      //           },
      //           {
      //               name: 'resizeImage:75',
      //               label: '75%',
      //               value: '75'
      //           }
      //       ],

      //       // You need to configure the image toolbar, too, so it shows the new style
      //       // buttons as well as the resize buttons.
      //       toolbar: [
      //           'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
      //           '|',
      //           'resizeImage:25', 'resizeImage:50', 'resizeImage:75', 'resizeImage:original',
      //           '|',
      //           'imageTextAlternative'
      //       ]
      //   }
    }
  //ck editor end
	const [selectedFile, setSelectedFile] = useState('');
  
  const fileToBase64 = async file =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = e => reject(e);
		});

  const docHandler = async event => {
		event.persist();
		const fileName = event.target.files[0];
    const fileSize = ((event.target.files[0].size/1024)/1024*1024).toFixed(0);       
		const b64file = await fileToBase64(fileName);
		const fileHash = await Hash.of(b64file);
		setSelectedFile(uploading);
		try{
       if(fileSize > 200){
     throw new Error('File size must not exceed 200 KB.',)
    }
			const awsUrl = await ReactS3Client.uploadFile(event.target.files[0], fileHash);
			const fileURL = process.env.REACT_APP_AWS_S3URL + awsUrl.key;
			setSelectedFile(fileURL);      
		}catch(e){
			addToast(e.message, {
					appearance: 'error',
					autoDismiss: true
				});
			setSelectedFile('');
		}
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
			formData.image = selectedFile;
		  formData.extras = extraContent ? extraContent : category_details.extras;
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

  useEffect(loadCategoryDetails, []);
  useEffect(()=>{
		if(category_details && category_details.image) setSelectedFile(category_details.image);
	}, [category_details]);
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
											src={ selectedFile }
											className="form-group text-center"
                      onError={(e)=>{e.target.onerror = null; e.target.src="https://9to5wordpress.com/wp-content/uploads/2020/11/ninja-forms-file-upload.png"}}  
											width="260"
											height="150"
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
                    <CKEditor editor={ ClassicEditor } config={custom_config} data={extraContent}  onChange={ ( event, editor ) => {
                        const data = editor.getData();
		                    setExtraContent(data);
                    } }/>
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


function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader)
  }
}