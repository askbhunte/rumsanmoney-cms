import ACTIONS from "../actions/user";

export default (state, action) => {
  switch (action.type) {
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
