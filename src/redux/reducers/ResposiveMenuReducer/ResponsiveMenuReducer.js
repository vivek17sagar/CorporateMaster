const initialState = {
  isMenuOpen: false,
};

const ResponsiveMenuReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLOSE_RESPONSIVE_MENU": {
      return { ...state, isMenuOpen: action.value };
    }

    default: {
      return state;
    }
  }
};

export default ResponsiveMenuReducer;
