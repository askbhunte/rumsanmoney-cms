import moment from 'moment';

export const dateFormatter = (date, format) => {
	const dateFormat = format || 'll';
	return moment(date).format(dateFormat);
};

export const sanitizePayload = payload => {
	const { _id, created_at, created_by, updated_at, updated_by, __v, is_archived, id, ...rest } = payload;
	return rest;
};

export const properCase = string => {
	return string.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};
