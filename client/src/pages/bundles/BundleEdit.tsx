import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { MultipleSelect } from "../../components/MultipleSelect";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { useStyles } from "../../styles/common";
import { Bundle, BundleDetail } from "../../types/bundle";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MyOptions } from "../../utils/utils";
import { getListUseCase } from "../../api/use-cases";
import { useQuery } from "react-query";
import { Typography } from "@mui/material";
import { UseCaseEdit } from "../../types/use-cases";
import { getBundle, updateBundle } from "../../api/bundle";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { AxiosError, AxiosResponse } from "axios";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

//css flex box
export const BundleEdit = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const params = useParams();

  const [data] = useState<Bundle>(state.data ?? null);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };

  const [formState, setFormState] = useState<Bundle>({
    id: data ? data.id : "",
    name: data ? data.name : "",
    useCases: data ? data.useCases : [],
    description: data ? data.description : "",
  });
  const bundleId = params?.bundleId ?? null;
  useEffect(() => {
    if (bundleId) {
      getBundle(bundleId).then((result: AxiosResponse<BundleDetail>) => {
        setFormState({
          id: result.data.data.id,
          name: result.data.data.name,
          description: result.data.data.description,
          useCases: result.data.data.useCases,
        });
      });
    }
  }, [bundleId]);
  const onChangeText = (name: string, text: string) => {
    setFormState({ ...formState, [name]: text });
  };

  const onChangeMultipleSelect = (name: string, item: MyOptions[]) => {
    setFormState({ ...formState, [name]: item });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateBundle(formState.id, {
      ...formState,
      useCases: (formState.useCases as MyOptions[]).map(
        (item: MyOptions) => item.id
      ),
    })
      .then((data) => {
        if (data.status === 202) {
          enqueueSnackbar("Edit Bundle Success!", {
            variant: "success",
          });
          setEditMode(!editMode);
        }
      })
      .catch((error: AxiosError) => {
        enqueueSnackbar(`${error.message}`, {
          variant: "error",
        });
      });
  };
  const dataQueryUseCases = useQuery({
    queryKey: ["useCases"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListUseCase(1, 10000, "", controller.signal);
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
  });
  const navigate = useNavigate();
  const handleClick = () => {
    // Navigate to another component
    navigate("/bundles/all");
  };
  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <Grid container>
        <Grid item xs={9} md={9}>
          <h2 className={classes.headerText}>Edit Bundle</h2>
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
              Bundles Information
            </Typography>
          </Grid>
          <Grid item container spacing={6}>
            <TextComponent
              icon={<AbcIcon />}
              name="Name"
              itemId="name"
              onChangeText={onChangeText}
              type={"text"}
              require={true}
              disable={!editMode}
              value={formState.name}
            />
            <MultipleSelect
              name="Use Cases"
              itemId="useCases"
              onChangeSelect={onChangeMultipleSelect}
              options={
                dataQueryUseCases.data
                  ? dataQueryUseCases.data.data.data.map(
                      (item: UseCaseEdit) => {
                        return {
                          id: item.id,
                          name: item.name,
                          value: item.name,
                        } as MyOptions;
                      }
                    )
                  : []
              }
              require={true}
              disable={!editMode}
              value={
                formState.useCases.length > 0
                  ? (formState.useCases as MyOptions[])
                  : (formState.useCases as [])
              }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Use Case Information
            </Typography>
          </Grid>
          <TextComponent
            icon={<AbcIcon />}
            name="Description"
            itemId="description"
            onChangeText={onChangeText}
            type={"text"}
            require={true}
            disable={!editMode}
            value={formState.description}
          />
          <Grid item container>
            <SubmitButton type={"Submit"} display={editMode} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
