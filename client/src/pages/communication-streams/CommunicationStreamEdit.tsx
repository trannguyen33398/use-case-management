import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { BooleanSelection } from "../../components/Boolean";
import { useStyles } from "../../styles/common";

import { useLocation, useNavigate } from "react-router-dom";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import {
  getCommunicationStream,
  updateCommunicationStream,
} from "../../api/communication-streams";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { CommunicationStream } from "../../types/communication-streams";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { enqueueSnackbar } from "notistack";
import { Typography } from "@mui/material";
//css flex box
export const CommunicationStreamEdit = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const params = useParams();
  let data;
  if (state) {
    data = state.data;
  }

  const [formState, setFormState] = useState<CommunicationStream>({
    id: data ? data.id : null,
    name: data ? data.name : null,
    description: data ? data.description : null,
    responsiblePerson: data ? data.responsiblePerson : null,
    active: data ? data.active : null,
  });
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const communicationStreamId = params?.communicationStreamId ?? null;

  useEffect(() => {
    if (communicationStreamId) {
      getCommunicationStream(communicationStreamId).then((result) => {
        setFormState({
          id: result.data.data.id,
          name: result.data.data.name,
          description: result.data.data.description,
          responsiblePerson: result.data.data.responsiblePerson,
          active: result.data.data.active,
        });
      });
    }
  }, [communicationStreamId]);

  const onChangeText = (name: string, text: string) => {
    setFormState({ ...formState, [name]: text });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   

    updateCommunicationStream(communicationStreamId as string, {
      ...formState,
      active: formState.active === "true" ? true : false,
    })
      .then((data) => {
        if (data.status === 202) {
          enqueueSnackbar("Edit Communication Stream Success!", {
            variant: "success",
          });
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
    navigate("/communication-streams/all");
  };

  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <Grid container>
        <Grid item xs={9} md={9}>
          <h2 className={classes.headerText}>Edit Communication Stream</h2>
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
              Communication Stream Information
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
          <TextComponent
            icon={<AbcIcon />}
            name="Responsible Person"
            itemId="responsiblePerson"
            value={formState.responsiblePerson}
            onChangeText={onChangeText}
            type={"text"}
            require={true}
            disable={!editMode}
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
