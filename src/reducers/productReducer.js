import ACTION from "../actions/product";

export default (state, action) => {
  const result = action.res;
  switch (action.type) {
    case `${ACTION.LIST_SUCCESS}`:
      return {
        ...state,
        product: result.data,
        pagination: {
          total: result.total,
          limit: result.limit,
          start: result.start,
          currentPage: result.page,
          totalPages: Math.ceil(result.total / result.limit),
        },
      };

    case `${ACTION.GET_PRODUCT_SUCCESS}`:
      return {
        ...state,
        product_details: action.res.product,
      };

    case `${ACTION.DEPLOY_TOKEN_SUCCESS}`:
      return {
        ...state,
        product_details: action.res,
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
