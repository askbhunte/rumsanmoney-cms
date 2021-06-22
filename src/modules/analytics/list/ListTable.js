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
		let query = { search: searchText };
		return loadList({
			start: _start,
			limit: pagination.limit,
			...query
		});
	};

	const handleSearchInputChange = (e) => {
		const { value } = e.target;
		setSearchText(value);
		if (filter.searchBy === searchOptions.NAME) {
			return fetchList({ start: 0, limit: pagination.limit, search: value });
		}
		fetchList({ start: 0, limit: pagination.limit });
	};

	const searchOptions = {
		NAME: "search"
	};

	const [filter, setFilter] = useState({
		searchPlaceholder: "Enter name...",
		searchBy: "search",
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

		fetchList({ start: 0, limit: pagination.limit });
	};

	useEffect(fetchList, []);

	return (
		<>
			<Card>
				<CardTitle className="mb-0 p-3 border-bottom bg-light">
					<Row>
						<Col md="4">
							<i className="mdi mdi-border-right mr-2"></i>User Analytics
						</Col>
						<Col md="8" className="text-right">
							<CustomInput
								type="select"
								id="exampleCustomSelect"
								name="customSelect"
								defaultValue=""
								style={{ width: "auto" }}
								onChange={handleFilterChange}
							>
								<option value="search">Search By Device Name</option>
							</CustomInput>
							<div style={{ display: "inline-flex" }}>
								<Input
									placeholder={filter.searchPlaceholder}
									onChange={handleSearchInputChange}
									style={{ width: "100%" }}
								/>
							</div>
						</Col>

					</Row>
				</CardTitle>
				<CardBody>
					<Table className="no-wrap v-middle" responsive>
						<thead>
							<tr className="border-0">
								<th className="border-0">Name</th>
								<th className="border-0">IP Address</th>
								<th className="border-0">Device</th>
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
											<td>{d && d.ip ? d.ip : '-'}</td>
											<td>{d && d.device ? properCase(d.device).substring(0, 42).concat('','...') : '-'}</td>
											<td className="blue-grey-text text-darken-4 font-medium">
												<Link className="btn btn-secondary" to={`/analytic/${d.name}`}>
													<i className="fa fa-eye"></i>
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
