import React, { useContext, useState} from "react";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
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

import { BlogContext } from "../../../contexts/BlogContext";
import Loading from "../../global/Loading";
import Hash from 'ipfs-only-hash';
//ckeditor stuff
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '../../../services/MyUploader';

export default function DetailsForm(props) {
  const history = useHistory();
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
  
  //ck editor part
  const [content, setContent] = useState('');
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
    let fileSize = ((event.target.files[0].size/1024)/1024*1024).toFixed(0);
    if(fileSize > 100){				
				addToast('File size must not exceed 100 KB.', {
					appearance: 'error',
					autoDismiss: true
				});
		}
		else{
			const b64file = await fileToBase64(fileName);
			const fileHash = await Hash.of(b64file);
			setSelectedFile(uploading);
			try{
				
				const awsUrl = await ReactS3Client.uploadFile(event.target.files[0], fileHash);
				const fileURL = process.env.REACT_APP_AWS_S3URL + awsUrl.key;
				setSelectedFile(fileURL);
			}catch(e){
				console.log(e);
				setSelectedFile('');
			}
		}
	};

  const {
   addBlogs,
   loading
  } = useContext(BlogContext); 

  let [slug,setSlug] = useState('');

  async function submitHandler(e){
    e.preventDefault();

    const formData = new FormData(e.target);

    let payload = {
      name: formData.get("name"),
      excerpt: formData.get("excerpt"),
      content,
      slug: formData.get("slug"),
      image_url: selectedFile,
      status: formData.get("status")
    };
    if(!payload.image_url.name){
       addToast('Please upload Image', {
          appearance: "error",
          autoDismiss: true,
        });       
    }
    else{
      addBlogs(payload)
      .then(() => {
        addToast("Page added successfully!", {
          appearance: "success",
          autoDismiss: true,
        });
        history.push("/blogs");
      })
      .catch((err) => {
        addToast(err.message, {
          appearance: "error",
          autoDismiss: true,
        });
      });
    }    
  }

  function nameHandler(e){   
    let name = e.target.value;
    let slug =  name
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, "");
    setSlug(slug);   
  }

  function slugHandler(e){
    setSlug(e.target.value);
  }
    
  return (
    <>
      <Row>
        <Col md="12">
          <Card>
            <CardTitle className="bg-light border-bottom p-3 mb-0">
              <i className="mdi mdi-book mr-2"></i>Add Blog
            </CardTitle>
            <CardBody>
              <Form onSubmit={submitHandler} >
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
								<Input id="doc-upload" type="file" name="image_upload" onChange={e => docHandler(e)}/>
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
                      onChange={e=>nameHandler(e)}   
                      required              
                    />
                  </InputGroup>
                  </FormGroup>
                  </Col>
                  <Col md="12">
                  <FormGroup>
                    <Label>Slug</Label>
                    <InputGroup>
                      <Input
                        type="text"
                        name="slug"   
                        value={slug}
                        onChange={e=> slugHandler(e)} 
                        required                  
                      />
                    </InputGroup>
                  </FormGroup>
                  </Col>
                  <Col md="12">
                    <FormGroup>
                      <Label>Status</Label>
                      <InputGroup>
                        <Input
                          type="select"
                          name="status"
                        > 
                            <option>Published</option>
                            <option>Draft</option>
                            <option>Archived</option>                            
                        </Input>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Col>
                <Col md="12">
                  <FormGroup>
                  <Label>Excerpt</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      name="excerpt"  
                      required
                    />
                  </InputGroup>
                </FormGroup>
                </Col>
                </Row> 
                <br/>
                <Row form>
                <Col md="12">
                <FormGroup>
                  <Label>Content</Label>
                    <CKEditor editor={ ClassicEditor } config={custom_config} data={content}  onChange={ ( event, editor ) => {
                        const data = editor.getData();
		                    setContent(data);
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