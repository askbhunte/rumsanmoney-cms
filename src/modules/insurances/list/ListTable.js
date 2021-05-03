import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Row, Col, Card, CardTitle, CardBody, Input, Table } from 'reactstrap';
import { Context } from '../context';
import Paginate from '../../global/Paginate';
import { dateFormatter } from '../../../utils/formatter';

const List = () => {
	const { addToast } = useToasts();
	const [current, setCurrent] = useState(0);
	const { data, list, pagination } = useContext(Context);
	const [searchText, setSearchText] = useState('');

	const fetchList = query => {
		let params = { ...pagination, ...query };
		list(params)
			.then()
			.catch(() => {
				addToast('Internal server error!', {
					appearance: 'error',
					autoDismiss: true
				});
			});
	};

	const handlePagination = current_page => {
		let _start = current_page * pagination.limit;
		setCurrent(current_page);
		let query = { name: searchText };
		return loadList({
			start: _start,
			limit: pagination.limit,
			...query
		});
	};

	const handleSearchInputChange = e => {
		const value = e.target.value;
		setSearchText(value);
		fetchList({ start: 0, limit: pagination.limit, search: value });
	};

	const loadList = query => {
		if (!query) query = null;
		list(query)
			.then()
			.catch(() => {
				addToast('Something went wrong!', {
					appearance: 'error',
					autoDismiss: true
				});
			});
	};

	useEffect(fetchList, []);

	return (
		<>
			<Card>
				<CardTitle className="mb-0 p-3 border-bottom bg-light">
					<Row>
						<Col md="7">
							<i className="mdi mdi-border-right mr-2"></i>Career List
						</Col>
						<Col md="3">
							<Input placeholder="Enter title name ..." onChange={handleSearchInputChange} />
						</Col>
						<Col md="2">
							<Link className="btn btn-primary" to="/career/add">
								Add
							</Link>
						</Col>
					</Row>
				</CardTitle>
				<CardBody>
					<Table className="no-wrap v-middle" responsive>
						<thead>
							<tr className="border-0">
								<th className="border-0">Title</th>
								<th className="border-0">Expiry Date</th>
								<th className="border-0">Vacancy</th>
								<th className="border-0">Applicants</th>
								<th className="border-0">Action</th>
							</tr>
						</thead>
						<tbody>
							{data.length ? (
								data.map(d => {
									return (
										<tr key={d._id}>
											<td>
												<div className="text-dark">{d.title ? d.title : '-'}</div>
											</td>
											<td>{d.expiryDate ? dateFormatter(d.expiryDate) : '-'}</td>
											<td>{d.vacancies ? d.vacancies : '-'}</td>
											<td>{d.count ? d.count : '-'}</td>
											<td className="blue-grey-text text-darken-4 font-medium">
												<Link className="btn btn-secondary" to={`/career/${d._id}`}>
													Edit
												</Link>
											</td>
										</tr>
									);
								})
							) : (
								<tr>
									<td colSpan={5}>No data available.</td>
								</tr>
							)}
						</tbody>
					</Table>
					<Paginate limit={pagination.limit} total={pagination.total} current={current} onChange={handlePagination} />
				</CardBody>
			</Card>
			<br />
		</>
	);
};

export default List;
