import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { BooleanSelection } from "../../components/Boolean";
import { useStyles } from "../../styles/common";
import { NumberComponent } from "../../components/Number";
import NumbersIcon from "@mui/icons-material/Numbers";
import { useLocation, useNavigate } from "react-router-dom";
import { SingleSelect } from "../../components/SingleSelect";
import { Status } from "./machine.constant";
import { useQuery } from "react-query";
import { getListMachine, getMachine, updateMachine } from "../../api/machines";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Machine } from "../../types/machines";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { enqueueSnackbar } from "notistack";
import { Typography } from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
//css flex box
export const MachineEdit = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const params = useParams();
  let data;
  if (state) {
    data = state.data;
  }

  const [formState, setFormState] = useState<Machine>({
    id: data ? data.id : null,
    name: data ? data.name : null,
    parentId: data ? data.parentId : null,
    parentName: data ? data.parentName : null,
    priority: data ? data.priority : null,
    description: data ? data.description : null,
    active: data ? data.active : null,
    status: data ? data.status : null,
  });
  const machineId = params?.machineId ?? null;
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  useEffect(() => {
    if (machineId) {
      getMachine(machineId).then((result) => {
        setFormState({
          id: result.data.data.id,
          name: result.data.data.name,
          parentId: result.data.data.parentId,
          parentName: result.data.data.parentName,
          priority: result.data.data.priority,
          description: result.data.data.description,
          active: result.data.data.active,
          status: result.data.data.status,
        });
      });
    }
  }, [machineId]);

  const dataQueryParent = useQuery({
    queryKey: ["machine"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListMachine(1, 10000, "", controller.signal);
    },
    keepPreviousData: true,
    retry: 0,
  });

  const onChangeText = (name: string, text: string) => {
    setFormState({ ...formState, [name]: text });
  };

  const onChangeNumber = (name: string, number: number) => {
    setFormState({ ...formState, [name]: number });
  };

  const onChangeSingleSelect = (
    name: string,
    id: string,
    parentName?: string
  ) => {
    setFormState({
      ...formState,
      [name]: id,
      parentName: parentName as string,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    updateMachine(machineId as string, {
      ...formState,
      active: formState.active === "true" ? true : false,
    })
      .then((data) => {
        if (data.status === 202) {
          enqueueSnackbar("Edit Machine Success!", { variant: "success" });
          setEditMode(!editMode);
        }
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar(`${error.message}`, { variant: "error" });
      });
  };
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to another component
    navigate("/machines/all");
  };

  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <Grid container>
        <Grid item xs={9} md={9}>
          <h2 className={classes.headerText}>Edit Machine</h2>
        </Grid>
        <SubmitButton
          type={"Edit"}
          display={!editMode}
          onClick={handleEditMode}
        />
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6} rowSpacing={3}>
          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Machine Information
            </Typography>
          </Grid>
          <TextComponent
            icon={<AbcIcon />}
            name="Name"
            itemId="name"
            value={formState.name}
            onChangeText={onChangeText}
            type={"text"}
            require={true}
            disable={!editMode}
            xs={4}
            md={4}
          />
          <SingleSelect
            name="Parent"
            itemId="parentId"
            value={{
              id: formState.parentId,
              name: formState.parentName,
              value: formState.parentName,
            }}
            isParent={true}
            require={false}
            disable={!editMode}
            onChangeSelect={onChangeSingleSelect}
            options={
              dataQueryParent.data?.data.data
                .map((item) => {
                  return {
                    id: item.id,
                    name: item.name,
                    value: item.name,
                  };
                })
                .filter((item) => item.id !== machineId) ?? []
            }
          />
          <BooleanSelection
            icon={<ToggleOnIcon />}
            name="Active"
            itemId="active"
            value={formState.active}
            onChangeText={onChangeText}
            disable={!editMode}
            xs={12}
            md={12}
          />
          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Detail Information
            </Typography>
          </Grid>
          <TextComponent
            icon={<AbcIcon />}
            name="Description"
            itemId="description"
            value={formState.description}
            onChangeText={onChangeText}
            type={"text"}
            require={false}
            disable={!editMode}
            xs={7}
            md={7}
          />
          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Planning Information
            </Typography>
          </Grid>
          <NumberComponent
            name="Priority"
            itemId="priority"
            value={formState.priority}
            onChangeText={onChangeNumber}
            disable={!editMode}
            icon={<NumbersIcon />}
            xs={1.2}
            md={1.2}
          />

          <SingleSelect
            isParent={false}
            require={false}
            name="Status"
            itemId="status"
            value={{
              id: formState.status,
              name: formState.status,
              value: formState.status,
            }}
            xs={2}
            md={2}
            onChangeSelect={onChangeSingleSelect}
            disable={!editMode}
            options={Status}
          />

          <Grid item container>
            <SubmitButton type={"Submit"} display={editMode} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
