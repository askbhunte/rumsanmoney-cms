import ACTION from "../actions/request";

export default (state, action) => {
  const result = action.res;
  switch (action.type) {
    case `${ACTION.LIST_SUCCESS}`:
      return {
        ...state,
        request: result.data,
        pagination: {
          total: result.total,
          limit: result.limit,
          start: result.start,
          currentPage: result.page,
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
