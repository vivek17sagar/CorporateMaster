const initialState = {
  filterChange: { value: false },
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "filter":
      return {
        ...state,
        filterChange: { value: action?.data },
      };
    default:
      return state;
  }
};

export default filterReducer;
