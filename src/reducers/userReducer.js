import ACTIONS from "../actions/user";

export default (state, action) => {
  const result = action.res;
  switch (action.type) {
    case `${ACTIONS.LIST_SUCCESS}`:
      return {
        ...state,
        list: result.data,
        pagination: {
          total: Number(result.total),
          limit: Number(result.limit),
          start: Number(result.start),
          currentPage: Number(result.page),
          totalPages: Math.ceil(result.total / result.limit),
        },
      };

    case ACTIONS.USER_DETAILS:
      return {
        ...state,
        user_info: action.data,
      };

    case ACTIONS.LOGIN:
      return {
        ...state,
        user_info: action.data,
      };

    case ACTIONS.GET_USER_DETAIL:
      return {
        ...state,
        user_info: action.data,
      };

    default:
      return state;
  }
};
