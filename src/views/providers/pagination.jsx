import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const MainPaginationComponent = ({
  currentPage,
  handlePaginationBehaviour,
  totalPages,
}) => {
  return (
    <>
      <Stack spacing={2}>
        <Pagination
          page={currentPage}
          count={totalPages}
          color="primary"
          defaultPage={1}
          variant="outlined"
          onChange={(event, value) => handlePaginationBehaviour(value)}
        />
      </Stack>
    </>
  );
};

export default MainPaginationComponent;
