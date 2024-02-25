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
import { useQuery } from "react-query";
import { getListRisk, getRisk, updateRisk } from "../../api/risks";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Risk } from "../../types/risks";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { enqueueSnackbar } from "notistack";
import { Typography } from "@mui/material";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
//css flex box
export const RiskEdit = () => {
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

  const [formState, setFormState] = useState<Risk>({
    id: data ? data.id : null,
    name: data ? data.name : null,
    parentId: data ? data.parentId : null,
    parentName: data ? data.parentName : null,
    priority: data ? data.priority : null,
    description: data ? data.description : null,
    active: data ? data.active : null,
  });
  const riskId = params?.riskId ?? null;
  useEffect(() => {
    if (riskId) {
      getRisk(riskId).then((result) => {
        setFormState({
          id: result.data.data.id,
          name: result.data.data.name,
          parentId: result.data.data.parentId,
          parentName: result.data.data.parentName,
          priority: result.data.data.priority,
          description: result.data.data.description,
          active: result.data.data.active,
        });
      });
    }
  }, [riskId]);

  const dataQueryParent = useQuery({
    queryKey: ["risk"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListRisk(1, 10000, "", controller.signal);
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

    updateRisk(riskId as string, {
      ...formState,
      active: formState.active === "true" ? true : false,
    })
      .then((data) => {
        if (data.status === 202) {
          enqueueSnackbar("Edit Risk Success!", { variant: "success" });
          setEditMode(!editMode);
        }
      })
      .catch((error) => {
        enqueueSnackbar(`${error.message}`, { variant: "error" });
      });
    setEditMode(!editMode);
  };
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to another component
    navigate("/Risks/all");
  };

  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <Grid container>
        <Grid item xs={9} md={9}>
          <h2 className={classes.headerText}>Edit Risk</h2>
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
              Risk Information
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
                .filter((item) => item.id !== riskId) ?? []
            }
          />
          <BooleanSelection
            icon={<ToggleOnIcon />}
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
          <TextComponent
            icon={<AbcIcon />}
            name="Description"
            itemId="description"
            value={formState.description}
            onChangeText={onChangeText}
            type={"text"}
            require={true}
            disable={!editMode}
            xs={7}
            md={7}
          />

          <Grid item container>
            <SubmitButton type={"Submit"} display={editMode} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
