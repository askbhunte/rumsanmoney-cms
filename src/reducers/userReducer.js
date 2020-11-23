export default (state, action) => {
  switch (action.type) {
    case "GET_USER_DETAILS":
      return {
        ...state,
        user_info: action.data,
      };

    default:
      return state;
  }
};
