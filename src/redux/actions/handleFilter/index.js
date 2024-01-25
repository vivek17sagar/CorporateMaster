export const handleFilterTabs = (data) => {
  return (dispatch) => {
    dispatch({
      type: "filter",
      data,
    });
  };
};
