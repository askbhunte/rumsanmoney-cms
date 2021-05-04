import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, Card, CardTitle, CardBody } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../core/contexts';
import { useToasts } from 'react-toast-notifications';
import Loading from '../../global/Loading';
import Swal from 'sweetalert2';

const DetailForm = props => {
	const Id = props.params.id;

	const history = useHistory();
	const { addToast } = useToasts();
	const { list, update, archive, remove, getDetail } = useContext(Context);
	const [detail, setDetail] = useState(null);

	const submitUpdate = e => {
		e.preventDefault();
		const { id, _id, __v, created_at, updated_at, slug, google_doc_id, description, ...rest } = detail;
		let formData = { ...rest };
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
			})
			.catch(() => {
				addToast('Something went wrong!', {
					appearance: 'error',
					autoDismiss: true
				});
			});
	};

	useEffect(loaddetail, []);

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
								</div>
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
