import ACTION from "../actions/request";

export default (state, action) => {
  const result = action.res;
  switch (action.type) {
    case `${ACTION.LIST_SUCCESS}`:
      return {
        ...state,
        request: result.data,
        pagination: {
          total: Number(result.total),
          limit: Number(result.limit),
          start: Number(result.start),
          currentPage: Number(result.page),
          totalPages: Math.ceil(result.total / result.limit),
        },
      };

    case `${ACTION.GET_REQUEST_SUCCESS}`:
      return {
        ...state,
        request_details: action.res.request,
      };

    case `${ACTION.SET_LOADING}`:
      return {
        ...state,
        loading: true,
      };

    case `${ACTION.RESET_LOADING}`:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
