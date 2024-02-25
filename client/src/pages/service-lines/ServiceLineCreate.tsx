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
import { ServiceLine } from "../../types/service-lines";
import { createServiceLine, getListServiceLine } from "../../api/service-lines";
import { useSnackbar } from "notistack";
import { Typography } from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";

//css flex box
export const ServiceLineCreate = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [formState, setFormState] = useState<ServiceLine>({
    id: "",
    name: "",
    parentId: "",
    parentName: "",
    description: "",
    responsiblePerson: "",
    active: true,
  });

  const dataQueryParent = useQuery({
    queryKey: ["service-line"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListServiceLine(1, 10000, "", controller.signal);
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
    setFormState({
      ...formState,
      [name]: id,
      parentName: parentName as string,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createServiceLine({
      ...formState,
      active: formState.active === "true" ? true : false,
    })
      .then((data) => {
        if (data.status === 201) {
          navigate("/service-lines/all");
          enqueueSnackbar("Create Service Line Success!", {
            variant: "success",
          });
        }
      })
      .catch((error) => {
        enqueueSnackbar(`${error.message}`, { variant: "error" });
      });
  };
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to another component
    navigate("/service-lines/all");
  };

  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <h2 className={classes.headerText}>Create Service Line</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6} rowSpacing={3}>
          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Service Information
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
            require={false}
            isParent={true}
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
          <BooleanSelection
            icon={<ToggleOnIcon />}
            name="Active"
            itemId="active"
            value={formState.active}
            onChangeText={onChangeText}
          />
          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Detail Information
            </Typography>
          </Grid>
          <TextComponent
            icon={<AbcIcon />}
            name="Responsible Person"
            itemId="responsiblePerson"
            value={formState.responsiblePerson}
            onChangeText={onChangeText}
            type={"text"}
            require={true}
          />
          <Grid item xs={12} md={12}>
            <span></span>
          </Grid>
          <TextComponent
            icon={<AbcIcon />}
            name="Description"
            itemId="description"
            value={formState.description}
            onChangeText={onChangeText}
            type={"text"}
            require={true}
            xs={7}
            md={7}
          />

          <Grid item container>
            <SubmitButton type={"Submit"} display={true} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
