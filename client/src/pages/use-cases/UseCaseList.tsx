import {
  GridColDef,
  GridRenderCellParams,
  GridTreeNodeWithRender,
} from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useStyles } from "../../styles/common";
import { useState, useEffect } from "react";
import { useQueryClient } from "react-query";
import css from "../../components/PaginationTable.module.css";
import { PaginationTable } from "../../components/PaginationTable";
import Grid from "@mui/material/Grid";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { NavigateButton } from "../../components/NavigateButton";
import { UseCaseDetail, UseCasesList } from "../../types/use-cases";
import { getListUseCase } from "../../api/use-cases";

export const UseCaseList = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [pagination, setPagination] = useState(1);
  const handleViewDetail = (
    params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>
  ) => {
    navigate(`/use-cases/${params.row["id"]}`, {
      replace: true,
      state: { data: params.row as UseCaseDetail },
    });
  };

  const [searchTerm, setSearchTerm] = useState("");
  const dataQuery = useQuery({
    queryKey: ["useCaseDetail", pagination, searchTerm],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListUseCase(pagination, 10, searchTerm, controller.signal);
    },
    keepPreviousData: false,
    retry: 0,
  });

  useEffect(() => {
    queryClient.refetchQueries(["useCaseDetail", pagination, searchTerm]);
  }, [searchTerm, pagination, queryClient]);

  const onPageChange = (page: number) => {
    setPagination(page);
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      headerAlign: "left",
      flex: 1,
      type: "string",
      sortable: false,
      headerClassName: css["header-column"],
    },
    {
      field: "parentName",
      headerName: "Parent Name",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable: false,
      headerClassName: css["header-column"],
    },
    {
      field: "parentId",
      headerName: "Parent Id",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable: false,
      headerClassName: css["header-column"],
    },

    {
      field: "active",
      headerName: "Active",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable: false,
      headerClassName: css["header-column"],
    },
    {
      field: "createdAt",
      headerName: "Created At",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable: false,
      headerClassName: css["header-column"],
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      type: "string",
      flex: 1,
      headerAlign: "left",
      sortable: false,
      headerClassName: css["header-column"],
    },
    {
      field: "view",
      headerName: "View",
      type: "any",
      flex: 0,
      headerAlign: "left",
      sortable: false,
      headerClassName: css["header-column-no-border"],
      renderCell: (params) => (
        <VisibilityIcon onClick={() => handleViewDetail(params)} />
      ),
    },
  ];
  const classes = useStyles();

  const handleClick = () => {
    // Navigate to another component
    navigate("/");
  };
  return (
    <div>
      <div
        style={{
          height: "100%",
          width: "90%",
          margin: "2.5% 0% 0% 5%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <KeyboardBackspaceIcon
          onClick={handleClick}
          className={classes.backIcon}
        />

        <Grid container spacing={2} style={{ marginBottom: "10px" }}>
          <Grid
            item
            xs={4}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <TextField
              style={{
                width: "300px",
              }}
              id="outlined-basic"
              size="small"
              value={searchTerm}
              defaultValue={""}
              placeholder="Value"
              onChange={(event) => {
                setSearchTerm(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={4} alignItems="flex-end" direction="row">
            <Typography style={{ fontSize: "24px" }}>Use Cases</Typography>
          </Grid>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <NavigateButton name="Add" path="/use-cases/create" />
          </Grid>
        </Grid>

        <PaginationTable
          columns={columns}
          pagination={pagination}
          dataQuery={
            dataQuery.data
              ? ({
                  data: dataQuery.data.data.data,
                  total: dataQuery.data.data.total,
                } as UseCasesList)
              : { data: [], total: 0 }
          }
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};
