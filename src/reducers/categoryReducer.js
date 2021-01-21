import ACTION from "../actions/category";

export default (state, action) => {
  const result = action.res;
  switch (action.type) {
    case `${ACTION.LIST_SUCCESS}`:
      return {
        ...state,
        category: result.data,
        pagination: {
          total: result.total,
          limit: result.limit,
          start: result.start,
          currentPage: result.page,
          totalPages: Math.ceil(result.total / result.limit),
        },
      };

    case `${ACTION.GET_CATEGORY_SUCCESS}`:
      return {
        ...state,
        category_details: action.res.category,
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
