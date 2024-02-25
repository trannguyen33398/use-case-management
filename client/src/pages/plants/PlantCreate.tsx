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
import { createPlant, getListPlant } from "../../api/plants";
import { Plant } from "../../types/plants";
import { PlantsSegment, PlantsType } from "./plants.constant";
import { enqueueSnackbar } from "notistack";
import { Typography } from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import CategoryIcon from "@mui/icons-material/Category";
import { MultipleSelect } from "../../components/MultipleSelect";
import { MyOptions } from "../../utils/utils";

//css flex box
export const PlantCreate = () => {
  const classes = useStyles();

  const [formState, setFormState] = useState<Plant>({
    id: "",
    name: "",
    parentId: "",
    parentName: "",
    operationsCluster: "",
    zebra: true,
    type: "",
    nameAbbreviation: "",
    segment: [],
    active: true,
  });

  const dataQueryParent = useQuery({
    queryKey: ["plant"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListPlant(1, 10000, "", controller.signal);
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

  const onChangeMultipleSelect = (name: string, id: any[]) => {
    setFormState({ ...formState, [name]: id });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createPlant({
      ...formState,
      active: formState.active === "true" ? true : false,
      zebra: formState.zebra === "true" ? true : false,
      segment: (formState.segment as MyOptions[]).map((item) => item.name),
    })
      .then((data) => {
        if (data.status === 201) {
          navigate("/plants/all");
          enqueueSnackbar(`Create Plant Success`, { variant: "success" });
        }
      })
      .catch((error) => {
        enqueueSnackbar(`${error.message}`, { variant: "error" });
      });
  };
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to another component
    navigate("/plants/all");
  };

  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <h2 className={classes.headerText}>Create Plant</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6} rowSpacing={3}>
          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Plant Information
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
            require={false}
            name="Parent"
            itemId="parentId"
            value={{
              id: formState.parentId,
              name: formState.parentName,
              value: formState.parentName,
            }}
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
          <TextComponent
            icon={<AbcIcon />}
            name="Name Abbreviation"
            itemId="nameAbbreviation"
            value={formState.nameAbbreviation}
            onChangeText={onChangeText}
            type={"text"}
            require={true}
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
            require={true}
            onChangeSelect={onChangeSingleSelect}
            options={PlantsType}
            isParent={false}
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
            name="Operations Cluster"
            itemId="operationsCluster"
            value={formState.operationsCluster}
            onChangeText={onChangeText}
            type={"text"}
            require={true}
          />
          <MultipleSelect
            name="Segment"
            itemId="segment"
            require={false}
            value={formState.segment as MyOptions[]}
            onChangeSelect={onChangeMultipleSelect}
            options={PlantsSegment}
          />
          <BooleanSelection
            icon={<CategoryIcon />}
            name="Zebra"
            itemId="zebra"
            value={formState.zebra}
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
