export const handleResponsiveMenuOperation = (value) => (dispatch) => {
  dispatch({ type: "CLOSE_RESPONSIVE_MENU", value });
};
