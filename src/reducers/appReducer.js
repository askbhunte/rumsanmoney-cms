export default (state, action) => {
  switch (action.type) {
    case "GET_APP":
      return {
        ...state,
      };

    default:
      return state;
  }
};
