import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { BooleanSelection } from "../../components/Boolean";
import { useStyles } from "../../styles/common";
import { useLocation, useNavigate } from "react-router-dom";
import { SingleSelect } from "../../components/SingleSelect";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Plant } from "../../types/plants";
import { getListPlant, getPlant, updatePlant } from "../../api/plants";
import { PlantsSegment, PlantsType } from "./plants.constant";
import { enqueueSnackbar } from "notistack";
import { Typography } from "@mui/material";
import CategoryIcon from "@mui/icons-material/Category";
import { MultipleSelect } from "../../components/MultipleSelect";
import { MyOptions } from "../../utils/utils";
//css flex box
export const PlantEdit = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const params = useParams();
  let data;
  if (state) {
    data = state.data;
  }
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const [formState, setFormState] = useState<Plant>({
    id: data ? data.id : null,
    name: data ? data.name : null,
    parentId: data ? data.parentId : null,
    parentName: data ? data.parentName : null,
    type: data ? data.type : null,
    active: data ? data.active : null,
    nameAbbreviation: data ? data.nameAbbreviation : null,
    segment: data ? data.segment : [],
    zebra: data ? data.zebra : null,
    operationsCluster: data ? data.operationsCluster : null,
  });
  const plantId = params?.plantId ?? null;
  useEffect(() => {
    if (plantId) {
      getPlant(plantId).then((result) => {
        setFormState({
          id: result.data.data.id,
          name: result.data.data.name,
          parentId: result.data.data.parentId,
          parentName: result.data.data.parentName,
          type: result.data.data.type,
          nameAbbreviation: result.data.data.nameAbbreviation,
          active: result.data.data.active,
          operationsCluster: result.data.data.operationsCluster,
          segment: result.data.data.segment
            ? ((result.data.data.segment as string[]).map((seg) => {
                return {
                  id: "",
                  name: seg,
                  value: seg,
                };
              }) as MyOptions[])
            : [],
          zebra: result.data.data.zebra,
        });
      });
    }
  }, [plantId]);

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

    updatePlant(plantId as string, {
      ...formState,
      active: formState.active === "true" ? true : false,
      zebra: formState.zebra === "true" ? true : false,
      segment: (formState.segment as MyOptions[]).map((item) => item.name),
    })
      .then((data) => {
        if (data.status === 202) {
          enqueueSnackbar("Edit Plant Success!", { variant: "success" });
          setEditMode(!editMode);
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
      <Grid container>
        <Grid item xs={9} md={9}>
          <h2 className={classes.headerText}>Edit Plant</h2>
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
                .filter((item) => item.id !== plantId) ?? []
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
            disable={!editMode}
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
            options={PlantsType}
            isParent={false}
            require={false}
            disable={!editMode}
          />
          <BooleanSelection
            icon={<AbcIcon />}
            name="Active"
            itemId="active"
            value={formState.active}
            onChangeText={onChangeText}
            disable={!editMode}
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
            disable={!editMode}
          />

          <MultipleSelect
            name="Segment"
            itemId="segment"
            require={false}
            value={formState.segment as MyOptions[]}
            onChangeSelect={onChangeMultipleSelect}
            options={PlantsSegment}
            disable={!editMode}
          />
          <BooleanSelection
            icon={<CategoryIcon />}
            name="Zebra"
            itemId="zebra"
            value={formState.zebra}
            onChangeText={onChangeText}
            disable={!editMode}
          />

          <Grid item container>
            <SubmitButton type={"Submit"} display={editMode} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
