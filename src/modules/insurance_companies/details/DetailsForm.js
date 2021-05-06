import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, Card, CardTitle, CardBody } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../core/contexts';
import { useToasts } from 'react-toast-notifications';
import Loading from '../../global/Loading';
import Swal from 'sweetalert2';
import S3 from 'react-aws-s3';
import uploading from '../../../assets/images/uploading.gif';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const DetailForm = props => {
	const Id = props.params.id;
  const config = {
		bucketName: process.env.REACT_APP_AWS_BUCKETNAME,
		dirName: process.env.REACT_APP_AWS_DIRNAME,
		region: process.env.REACT_APP_AWS_REGION,
		accessKeyId: process.env.REACT_APP_AWS_ACCESSKEYID,
		secretAccessKey: process.env.REACT_APP_AWS_SECRETACCESSKEY,
		s3Url: process.env.REACT_APP_AWS_S3URL
	};
	const ReactS3Client = new S3(config);
	const history = useHistory();
	const { addToast } = useToasts();

	const { list, update, archive, remove, getDetail } = useContext(Context);
	const [detail, setDetail] = useState(null);
	const [selectedFile, setSelectedFile] = useState('');
  const [summary, setSummary] = useState("");
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, false] }],
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };
  const formats = ["bold", "italic", "underline", "list", "bullet"];

  const docHandler = async event => {
		const fileName = event.target.files[0];
		const regex = / /gi;
    const date = new Date();
    const milliseconds = String(date.getTime());
		const newFileName = milliseconds.concat("-",fileName.name.replace(regex, '-'));
		setSelectedFile(uploading);
		try{
			const awsUrl = await ReactS3Client.uploadFile(event.target.files[0], newFileName);
			const fileURL = process.env.REACT_APP_AWS_S3URL + awsUrl.key;
			setSelectedFile(fileURL);
		}catch(e){
			console.log(e);
			setSelectedFile('');
		}
	};

	const submitUpdate = e => {
		e.preventDefault();
		const { id, _id, __v, created_at, updated_at, slug, google_doc_id, description, ...rest } = detail;
		let formData = { ...rest };
		formData.image = selectedFile;
    formData.summary = summary;
		update(Id, formData).then(d => {
			Swal.fire('Successful!', 'Company details updated successfully.', 'success')
				.then()
				.catch(err => {
					addToast('Something went wrong on server!', {
						appearance: 'error',
						autoDismiss: true
					});
				});
		});
	};
	
	const handleContentChange = async (content) => {
    setSummary(content);
  };
	async function removeData(Id) {
		let result = await Swal.fire({
			title: 'Are you sure?',
			text: `This Company will be deleted!`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		});
		if (result.isConfirmed) {
			try {
				let d = await remove(Id);
				if (d) {
					addToast(`Company deleted successfully.`, {
						appearance: 'success',
						autoDismiss: true
					});
					list();
					history.push('/companies');
				}
			} catch {
				addToast('Something went wrong on server!', {
					appearance: 'error',
					autoDismiss: true
				});
			}
		}
	}

	async function archiveData(Id) {
		let result = await Swal.fire({
			title: 'Are you sure?',
			text: `Career will be archived!`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes'
		});
		if (result.isConfirmed) {
			try {
				let d = await archive(Id);
				if (d) {
					addToast(`Career archived successfully.`, {
						appearance: 'success',
						autoDismiss: true
					});
					list();
					history.push('/companies');
				}
			} catch {
				addToast('Something went wrong on server!', {
					appearance: 'error',
					autoDismiss: true
				});
			}
		}
	}

	const loaddetail = () => {
		getDetail(Id)
			.then(d => {
				setDetail(d);
        const editorText = d.summary ? d.summary : "";
        setSummary(editorText);
			})
			.catch(() => {
				addToast('Something went wrong!', {
					appearance: 'error',
					autoDismiss: true
				});
			});
	};

	useEffect(loaddetail, []);
	useEffect(()=>{
		if(detail && detail.image) setSelectedFile(detail.image);
	}, [detail]);

	return (
		<>
			{detail ? (
				<div>
					<Card>
						<CardTitle className="mb-0 p-3 border-bottom bg-light">
							<Row>
								<Col md="8">
									<i className="mdi mdi-book mr-2"></i>Insurance Company Detail
								</Col>
								<Col md="4" className="text-right">
									<Button color="warning" className="text-white" onClick={() => archiveData(detail._id)}>
										<i className="mdi mdi-delete mr-2"></i>Archive
									</Button>
									&nbsp;
									<Button color="danger" onClick={() => removeData(detail._id)}>
										<i className="mdi mdi-delete mr-2"></i>Delete
									</Button>
								</Col>
							</Row>
						</CardTitle>

						<CardBody>
							<Form onSubmit={submitUpdate}>
								<div className="basic detail">
									<Row>
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
														<Label for="title">Name:</Label>
														<Input
															type="text"
															name="name"
															value={detail ? detail.name : ''}
															onChange={e => setDetail({ ...detail, [e.target.name]: e.target.value })}
															placeholder="Enter Name"
														/>
													</FormGroup>
								</Col>
								<Row>
								<Col md='6'>
								
													<FormGroup>
														<Label for="symbol">Symbol:</Label>
														<Input
															type="text"
															name="symbol"
															value={detail ? detail.symbol : ''}
															onChange={e => setDetail({ ...detail, [e.target.name]: e.target.value })}
															placeholder="Enter symbol"
														/>
													</FormGroup>
								</Col>
								<Col md='6'>
													<FormGroup>
														<Label for="longImg">Product Image:</Label>
														<Input
															type="text"
															name="longImg"
															value={detail ? detail.longImg : ''}
															onChange={e => setDetail({ ...detail, [e.target.name]: e.target.value })}
															placeholder="Enter Full Image link"
														/>
													</FormGroup>
								</Col>
								</Row>
								</Col>
									</Row>
													<Row>
														<Col md="4">
															<FormGroup>
																<Label for="primary_contact">Primary Contact:</Label>
																<Input
																	type="text"
																	name="primary_contact"
																	value={detail ? detail.primary_contact : ''}
																	onChange={e => setDetail({ ...detail, [e.target.name]: e.target.value })}
																	placeholder="Enter Multiple Primary Contact"
																/>
															</FormGroup>
														</Col>
														<Col md="4">
															<FormGroup>
																<Label for="email">Email:</Label>
																<Input
																	type="text"
																	name="email"
																	value={detail ? detail.email : ''}
																	onChange={e => setDetail({ ...detail, [e.target.name]: e.target.value })}
																	placeholder=" Enter email"
																/>
															</FormGroup>
														</Col>
														<Col md="4">
															<FormGroup>
																<Label for="website">Website:</Label>
																<Input
																	type="text"
																	name="website"
																	value={detail ? detail.website : ''}
																	onChange={e => setDetail({ ...detail, [e.target.name]: e.target.value })}
																	placeholder=" Enter website"
																/>
															</FormGroup>
														</Col>
													</Row>
													<Row>
														<Col md="8">
															<FormGroup>
																<Label for="address">Address:</Label>
																<Input
																	type="text"
																	name="address"
																	value={detail ? detail.address : ''}
																	onChange={e => setDetail({ ...detail, [e.target.name]: e.target.value })}
																	placeholder="Enter Address"
																/>
															</FormGroup>
														</Col>
														<Col md="4">
															<FormGroup>
																<Label for="type">Type:</Label>
																<Input type="select" name="type" value={detail ? detail.type : ''} onChange={e => setDetail({ ...detail, [e.target.name]: e.target.value })}>
																	<option value=""> -- Select -- </option>
																	<option value="Life insurance">Life Insurance</option>
																	<option value="Life and Non-life insurance">Life and Non-life Insurance</option>
																	<option value="Non-life insurance">Non-life insurance</option>
																</Input>
															</FormGroup>
														</Col>
													</Row>
													<Row form>
														<Col md="12">
															<FormGroup>
																<Label>Company Summary</Label>
																<ReactQuill
																	modules={modules}
																	formats={formats}
																	value={summary}
																	placeholder="Write the company Summary"
																	theme={"snow"}
																	style={{ height: "250px" }}
																	onChange={(e) => handleContentChange(e)}
																/>
															</FormGroup>
														</Col>
                </Row>
								</div>
								<br />
								<br />
								<Button color="success" type="submit">
									Submit
								</Button>
								<Link to="/companies" className="btn btn-dark ml-2">
									Cancel
								</Link>
							</Form>
						</CardBody>
					</Card>
				</div>
			) : (
				<Loading />
			)}
		</>
	);
};
export default DetailForm;
