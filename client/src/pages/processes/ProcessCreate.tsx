import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { BooleanSelection } from "../../components/Boolean";
import { useStyles } from "../../styles/common";
import { useNavigate } from "react-router-dom";
import { SingleSelect } from "../../components/SingleSelect";
import { useQuery } from "react-query";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Process } from "../../types/processes";
import { createProcess, getListProcess } from "../../api/processes";
import { ProcessType } from "./process.constant";
import { enqueueSnackbar } from "notistack";
import { Typography } from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import CategoryIcon from "@mui/icons-material/Category";
//css flex box
export const ProcessCreate = () => {
  const classes = useStyles();

  const [formState, setFormState] = useState<Process>({
    id: "",
    name: "",
    parentId: "",
    parentName: "",
    focusField: true,
    type: "",
    active: true,
  });

  const dataQueryParent = useQuery({
    queryKey: ["process"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListProcess(1, 10000, "", controller.signal);
    },
    keepPreviousData: true,
    retry: 0,
  });

  const onChangeText = (name: string, text: string) => {
    setFormState({ ...formState, [name]: text });
  };

  const onChangeSingleSelect = (
    name: string,
    id: string,
    parentName?: string
  ) => {
    if (name === "type") {
      setFormState({ ...formState, [name]: id });
    } else {
      setFormState({
        ...formState,
        [name]: id,
        parentName: parentName as string,
      });
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createProcess({
      ...formState,
      active: formState.active === "true" ? true : false,
      focusField: formState.focusField === "true" ? true : false,
    })
      .then((data) => {
        if (data.status === 201) {
          navigate("/processes/all");
          enqueueSnackbar("Create Process Success!", { variant: "success" });
        }
      })
      .catch((error) => {
        enqueueSnackbar(`${error.message}`, { variant: "error" });
      });
  };
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to another component
    navigate("/processes/all");
  };

  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <h2 className={classes.headerText}>Create Process</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6} rowSpacing={3}>
          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Processes Information
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
            onChangeSelect={onChangeSingleSelect}
            options={
              dataQueryParent.data?.data.data.map((item) => {
                return {
                  id: item.id,
                  name: item.name,
                  value: item.name,
                };
              }) ?? []
            }
          />
          <SingleSelect
            name="Type"
            itemId="type"
            icon={<CategoryIcon />}
            value={{
              id: formState.type,
              name: formState.type,
              value: formState.type,
            }}
            onChangeSelect={onChangeSingleSelect}
            options={ProcessType}
            isParent={false}
            require={true}
          />
          <BooleanSelection
            icon={<AbcIcon />}
            name="Focus Field"
            itemId="focusField"
            value={formState.focusField}
            onChangeText={onChangeText}
          />
          <BooleanSelection
            icon={<ToggleOnIcon />}
            name="Active"
            itemId="active"
            value={formState.active}
            onChangeText={onChangeText}
          />

          <Grid item container>
            <SubmitButton type={"Submit"} display={true} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
