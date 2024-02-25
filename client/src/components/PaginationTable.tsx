import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Pagination } from "@mui/material";
import css from "./PaginationTable.module.css";

const styles = {
  dataGrid: {
    flexGrow: 1,
    width: "100%",
    borderRadius: "5px",
  },
};

type TPaginationTable<T> = {
  columns: GridColDef[];
  pagination: number;
  dataQuery: { data: T[]; total: number };
  onPageChange: (page: number) => void;
};
export const PaginationTable = <T,>(props: TPaginationTable<T>) => {
  return (
    <div
      className={
        props.dataQuery.data.length > 0 ? "table-container" : css["empty-table"]
      }
    >
      {" "}
      <DataGrid
        columnVisibilityModel={{
          parentId: false,
        }}
        rows={props.dataQuery.data ?? []}
        columns={props.columns}
        initialState={{
          pagination: {
            paginationModel: {
              page: props.pagination,
              pageSize: 10,
            },
          },
        }}
        style={styles.dataGrid}
        disableColumnMenu={true}
        // disableColumnFilter={true}
        disableColumnSelector={true}
        disableRowSelectionOnClick={true}
        disableVirtualization={true}
        density="compact"
        hideFooter={true}
        rowHeight={75}
        columnHeaderHeight={75}
        sx={{
          ".MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold !important",
            overflow: "visible !important",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
        }}
        slots={{ toolbar: GridToolbar }}
      />
      <div className={css["pagination"]}>
        <Pagination
          count={props.dataQuery ? Math.ceil(props.dataQuery.total / 10) : 0}
          page={props.pagination}
          onChange={(event, page) => {
            props.onPageChange(page);
          }}
        />
      </div>
    </div>
  );
};
