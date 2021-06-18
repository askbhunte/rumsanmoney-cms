import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { Row, Col, Card, CardTitle, CardBody, Input, Table, CustomInput } from 'reactstrap';
import { Context } from '../core/contexts';
import Paginate from '../../global/Paginate';
import { properCase } from '../../../utils/formatter';

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
		if (filter.searchBy === searchOptions.CATEGORY) {
			query = { category: searchText };
		}
		if (filter.searchBy === searchOptions.COMPANYNAME) {
			query = { companyname: searchText };
		}
		return loadList({
			start: _start,
			limit: pagination.limit,
			...query
		});
	};

	const handleSearchInputChange = (e) => {
		const { value } = e.target;
		setSearchText(value);
		if (filter.searchBy === searchOptions.COMPANYNAME) {
			return fetchList({ start: 0, limit: pagination.limit, companyname: value });
		}
		if (filter.searchBy === searchOptions.NAME) {
			return fetchList({ start: 0, limit: pagination.limit, name: value });
		}
		if (filter.searchBy === searchOptions.CATEGORY) {
			return fetchList({ start: 0, limit: pagination.limit, category: value });
		}
		fetchList({ start: 0, limit: pagination.limit });
	};

	const searchOptions = {
		COMPANYNAME: "companyname",
		NAME: "name",
		CATEGORY: "category",
	};

	const [filter, setFilter] = useState({
		searchPlaceholder: "Enter name...",
		searchBy: "name",
	});

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

	const handleFilterChange = (e) => {
		let { value } = e.target;
		if (value === searchOptions.NAME) {
			setFilter({
				searchPlaceholder: "Enter name...",
				searchBy: searchOptions.NAME,
			});
		}
		if (value === searchOptions.COMPANYNAME) {
			setFilter({
				searchPlaceholder: "Enter company name...",
				searchBy: searchOptions.COMPANYNAME,
			});
		}
		if (value === searchOptions.CATEGORY) {
			setFilter({
				searchPlaceholder: "Enter product category...",
				searchBy: searchOptions.CATEGORY,
			});
		}
		fetchList({ start: 0, limit: pagination.limit });
	};

	useEffect(fetchList, []);

	return (
		<>
			<Card>
				<CardTitle className="mb-0 p-3 border-bottom bg-light">
					<Row>
						<Col md="4">
							<i className="mdi mdi-border-right mr-2"></i>Insurance Product List
						</Col>
						<Col md="6" className="text-right">
							<CustomInput
								type="select"
								id="exampleCustomSelect"
								name="customSelect"
								defaultValue=""
								style={{ width: "auto" }}
								onChange={handleFilterChange}
							>
								<option value="name">Search By Product Name</option>
								<option value="companyname">By Company Name</option>
								<option value="category">By Product Category</option>
							</CustomInput>
							<div style={{ display: "inline-flex" }}>
								<Input
									placeholder={filter.searchPlaceholder}
									onChange={handleSearchInputChange}
									style={{ width: "100%" }}
								/>
							</div>
						</Col>
						<Col md="2">
							<Link className="btn btn-primary" to="/newcompany">
								Add
							</Link>
						</Col>
					</Row>
				</CardTitle>
				<CardBody>
					<Table className="no-wrap v-middle" responsive>
						<thead>
							<tr className="border-0">
								<th className="border-0">Name</th>
								<th className="border-0">Company</th>
								<th className="border-0">Category</th>
								<th className="border-0">Action</th>
							</tr>
						</thead>
						<tbody>
							{data.length ? (
								data.map(d => {
									return (
										<tr key={d._id}>
											<td>
												<div className="text-dark">{d.name ? properCase(d.name) : '-'}</div>
											</td>
											<td>{d.companyInfo && d.companyInfo.name ? properCase(d.companyInfo.name) : '-'}</td>
											<td>{d.categoryinfo && d.categoryinfo.name ? properCase(d.categoryinfo.name) : '-'}</td>
											<td className="blue-grey-text text-darken-4 font-medium">
												<Link className="btn btn-secondary" to={`/insurance/${d._id}`}>
													Edit
												</Link>
											</td>
										</tr>
									);
								})
							) : (
									<tr>
										<td colSpan={4}>No data available.</td>
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
