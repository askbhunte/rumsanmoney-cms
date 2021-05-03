import React, { useState, useEffect, useContext } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, Card, CardTitle, CardBody } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../core/contexts';
import { useToasts } from 'react-toast-notifications';
import Loading from '../../global/Loading';
import Swal from 'sweetalert2';
import { dateFormatter } from '../../../utils/formatter';

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
			Swal.fire('Successful!', 'Career details updated successfully.', 'success')
				.then()
				.catch(err => {
					addToast('Something went wrong on server!', {
						appearance: 'error',
						autoDismiss: true
					});
				});
		});
	};

	async function delete_career(Id) {
		let result = await Swal.fire({
			title: 'Are you sure?',
			text: `Career will be deleted!`,
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
					addToast(`Career deleted successfully.`, {
						appearance: 'success',
						autoDismiss: true
					});
					list();
					history.push('/careers');
				}
			} catch {
				addToast('Something went wrong on server!', {
					appearance: 'error',
					autoDismiss: true
				});
			}
		}
	}

	async function archive_career(Id) {
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
					history.push('/careers');
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
									<Button color="warning" className="text-white" onClick={() => archive_career(detail._id)}>
										<i className="mdi mdi-delete mr-2"></i>Archive
									</Button>
									&nbsp;
									<Button color="danger" onClick={() => delete_career(detail._id)}>
										<i className="mdi mdi-delete mr-2"></i>Delete
									</Button>
								</Col>
							</Row>
						</CardTitle>

						<CardBody>
							<Form onSubmit={submitUpdate}>
								<div className="basic detail">
													<FormGroup>
														<Label for="title">Title:</Label>
														<Input
															type="text"
															name="title"
															id="title"
															value={detail ? detail.title : ''}
															onChange={e => setDetail({ ...detail, [e.target.name]: e.target.value })}
															placeholder="Enter Title"
														/>
													</FormGroup>
													<FormGroup>
														<Label for="sub_title">Subtitle:</Label>
														<Input
															type="text"
															name="sub_title"
															id="sub_title"
															value={detail ? detail.sub_title : ''}
															onChange={e => setDetail({ ...detail, [e.target.name]: e.target.value })}
															placeholder="Enter subtitle"
														/>
													</FormGroup>
													<Row>
														<Col md="6">
															<FormGroup>
																<Label for="expiryDate">Expiry Date:</Label>
																<Input
																	type="date"
																	name="expiryDate"
																	value={detail ? dateFormatter(detail.expiryDate, 'YYYY-MM-DD') : ''}
																	onChange={e => setDetail({ ...detail, [e.target.name]: e.target.value })}
																	placeholder="Enter career expiry date"
																/>
															</FormGroup>
														</Col>
														<Col md="6">
															<FormGroup>
																<Label for="vacancies">Vacancies:</Label>
																<Input
																	type="text"
																	name="vacancies"
																	id="vacancies"
																	value={detail ? detail.vacancies : ''}
																	onChange={e => setDetail({ ...detail, [e.target.name]: e.target.value })}
																	placeholder=" Enter vacancies"
																/>
															</FormGroup>
														</Col>
													</Row>
								</div>
								<br />
								<Button color="success" type="submit">
									Submit
								</Button>
								<Link to="/careers" className="btn btn-dark ml-2">
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
