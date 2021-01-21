import ACTION from "../actions/blog";

export default (state, action) => {
  const result = action.res;
  switch (action.type) {
    case `${ACTION.LIST_SUCCESS}`:
      return {
        ...state,
        blog: result.data,
        pagination: {
          total: result.total,
          limit: result.limit,
          start: result.start,
          currentPage: result.page,
          totalPages: Math.ceil(result.total / result.limit),
        },
      };

    case `${ACTION.GET_BLOG_SUCCESS}`:
      return {
        ...state,
        blog_details: action.res.blogs,
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
