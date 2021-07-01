import React, { useContext } from 'react';
import { Row, Col, Button, Form, FormGroup, Label, Input, Card, CardBody, CardHeader } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { CompanyContext } from '../core/contexts';
import { useToasts } from 'react-toast-notifications';

const Add = () => {
	const { addToast } = useToasts();
	const { add } = useContext(CompanyContext);
	const history = useHistory();

	const handleFormSubmit = e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const payload = {
			title: formData.get('title'),
			sub_title: formData.get('sub_title'),
			expiryDate: formData.get('expiryDate'),
			vacancies: formData.get('vacancies'),
		};
		saveDetails(payload);
	};

	const saveDetails = payload => {
		add(payload)
			.then(() => {
				addToast('Career added successfully!', {
					appearance: 'success',
					autoDismiss: true
				});
				history.push('/careers');
			})
			.catch(err => {
				addToast(err.message, {
					appearance: 'error',
					autoDismiss: true
				});
			});
	};

	return (
		<Card>
			<CardHeader>Add</CardHeader>
			<CardBody>
				<Form onSubmit={handleFormSubmit}>
					<FormGroup>
						<Label for="title">Title:</Label>
						<Input type="text" name="title" id="title" placeholder="Enter Title" />
					</FormGroup>
					<FormGroup>
						<Label for="sub_title">Subtitle:</Label>
						<Input type="text" name="sub_title" id="sub_title" placeholder="Enter subtitle" />
					</FormGroup>
					<Row>
						<Col md="6">
							<FormGroup>
								<Label for="expiryDate">Expiry Date:</Label>
								<Input type="date" name="expiryDate" id="expiryDate" placeholder="Enter expiry date (mm-dd-yy)" />
							</FormGroup>
						</Col>
						<Col md="6">
							<FormGroup>
								<Label for="vacancies">Vacancies:</Label>
								<Input type="text" name="vacancies" id="vacancies" placeholder=" Enter number of vacancies" />
							</FormGroup>
						</Col>
					</Row>
					<FormGroup>
						<Label for="content">Content:</Label>
						{/* <CKEditor data="" config={CKConfig} onChange={handleChange} /> */}
					</FormGroup>
					<Button type="submit">Submit</Button>
					<Link to="/careers" className="btn btn-danger ml-2">
						Cancel
					</Link>
				</Form>
			</CardBody>
		</Card>
	);
};
export default Add;
