import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { MultipleSelect } from "../../components/MultipleSelect";
import { CustomDatePicker } from "../../components/DatePicker";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { useStyles } from "../../styles/common";
import { SingleSelect } from "../../components/SingleSelect";
import { NumberComponent } from "../../components/Number";
import NumbersIcon from "@mui/icons-material/Numbers";
import { StatusType } from "./sprint.constant";
import { Sprint, SprintDetail } from "../../types/sprint";
import { MyOptions } from "../../utils/utils";
import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import { getListUseCase } from "../../api/use-cases";
import { UseCaseEdit } from "../../types/use-cases";
import { getListBundle } from "../../api/bundle";
import { Bundle } from "../../types/bundle";
import { getSprint, updateSprint } from "../../api/sprints";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { AxiosError, AxiosResponse } from "axios";

//css flex box
export const SprintEdit = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const params = useParams();

  const [data] = useState<Sprint>(state.data ?? null);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };
  const [formState, setFormState] = useState<Sprint>({
    id: data ? data.id : null,
    name: data ? data.name : null,
    bundleId: data ? data.bundleId : null,
    bundleName: data ? data.bundleName : null,
    plannedFrom: data ? data.plannedFrom : null,
    plannedTo: data ? data.plannedTo : null,
    step: data ? data.step : 0,
    description: data ? data.description : null,
    status: data ? data.status : null,
    developmentStatus: data ? data.developmentStatus : null,
    iterationStatus: data ? data.iterationStatus : null,
    implementationStatus: data ? data.implementationStatus : null,
    handoverStatus: data ? data.handoverStatus : null,
    implementedAt: data ? data.implementedAt : null,
    documents: data ? data.documents : null,
    useCases: data ? data.useCases : [],
  });
  const sprintId = params?.sprintId ?? null;
  useEffect(() => {
    if (sprintId) {
      getSprint(sprintId).then((result: AxiosResponse<SprintDetail>) => {
        setFormState({
          id: result.data.data.id,
          name: result.data.data.name,
          bundleId: result.data.data.bundleId,
          bundleName: result.data.data.bundleName,
          plannedFrom: result.data.data.plannedFrom,
          plannedTo: result.data.data.plannedTo,
          step: result.data.data.step,
          description: result.data.data.description,
          status: result.data.data.status,
          developmentStatus: result.data.data.developmentStatus,
          iterationStatus: result.data.data.iterationStatus,
          implementationStatus: result.data.data.implementationStatus,
          handoverStatus: result.data.data.handoverStatus,
          implementedAt: result.data.data.implementedAt,
          documents: result.data.data.documents,
          useCases: result.data.data.useCases,
        });
      });
    }
  }, [sprintId]);
  const onChangeText = (name: string, text: string) => {
    setFormState({ ...formState, [name]: text });
  };

  const onChangeNumber = (name: string, number: number) => {
    setFormState({ ...formState, [name]: number });
  };

  const onChangeSingleSelect = (name: string, id: string) => {
    setFormState({ ...formState, [name]: id });
  };
  const onChangeMultipleSelect = (name: string, item: MyOptions[]) => {
    setFormState({ ...formState, [name]: item });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.plannedFrom) {
      enqueueSnackbar(`Planned Form can not be null`, { variant: "error" });
    } else if (!formState.plannedTo) {
      enqueueSnackbar(`Planned To can not be null`, { variant: "error" });
    } else {
      updateSprint(formState.id as string, {
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
    }
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

  const dataQueryBundles = useQuery({
    queryKey: ["bundles"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListBundle(1, 10000, "", controller.signal);
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
  });
  const navigate = useNavigate();
  const handleClick = () => {
    // Navigate to another component
    navigate("/sprints/all");
  };
  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <Grid container>
        <Grid item xs={9} md={9}>
          <h2 className={classes.headerText}>Edit Sprint</h2>
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
              Sprints Information
            </Typography>
          </Grid>
          <Grid item container spacing={6}>
            <TextComponent
              icon={<AbcIcon />}
              name="Name"
              itemId="name"
              onChangeText={onChangeText}
              type={"text"}
              value={formState.name}
              require={true}
              disable={!editMode}
              xs={6}
              md={6}
            />
            <CustomDatePicker
              name="Planned From"
              itemId="plannedFrom"
              onChangeText={onChangeText}
              require={true}
              disable={!editMode}
              value={formState.plannedFrom}
            />
          </Grid>
          <Grid item container spacing={6}>
            <CustomDatePicker
              name="Planned To"
              itemId="plannedTo"
              onChangeText={onChangeText}
              require={true}
              disable={!editMode}
              value={formState.plannedTo}
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
              value={
                formState.useCases.length > 0
                  ? (formState.useCases as MyOptions[])
                  : (formState.useCases as [])
              }
              require={true}
              disable={!editMode}
            />

            <NumberComponent
              name="Step"
              itemId="step"
              onChangeText={onChangeNumber}
              icon={<NumbersIcon />}
              require={true}
              disable={!editMode}
              value={formState.step}
            />
          </Grid>
          <TextComponent
            icon={<AbcIcon />}
            name="Description"
            itemId="description"
            onChangeText={onChangeText}
            type={"text"}
            value={formState.description}
            disable={!editMode}
            xs={6}
            md={6}
          />
          <SingleSelect
            name="Bundle"
            itemId="bundleId"
            isParent={true}
            onChangeSelect={onChangeSingleSelect}
            options={
              dataQueryBundles.data
                ? dataQueryBundles.data.data.data.map((item: Bundle) => {
                    return {
                      id: item.id,
                      name: item.name,
                      value: item.name,
                    } as MyOptions;
                  })
                : []
            }
            disable={!editMode}
            require={true}
            value={{
              id: formState.bundleId,
              name: formState.bundleName,
              value: formState.bundleName,
            }}
          />
          <Grid item container spacing={6}>
            <SingleSelect
              isParent={false}
              name="Status"
              itemId="status"
              onChangeSelect={onChangeSingleSelect}
              options={StatusType}
              value={{
                id: "",
                name: formState.status,
                value: formState.status,
              }}
              disable={!editMode}
              require={true}
            />
            <SingleSelect
              isParent={false}
              name="Development Status"
              itemId="developmentStatus"
              onChangeSelect={onChangeSingleSelect}
              options={StatusType}
              value={{
                id: "",
                name: formState.developmentStatus,
                value: formState.developmentStatus,
              }}
              disable={!editMode}
              require={false}
            />
            <SingleSelect
              isParent={false}
              name="Iteration Status"
              itemId="iterationStatus"
              onChangeSelect={onChangeSingleSelect}
              options={StatusType}
              value={{
                id: "",
                name: formState.iterationStatus,
                value: formState.iterationStatus,
              }}
              require={false}
              disable={!editMode}
            />
          </Grid>
          <Grid item container spacing={6}>
            <SingleSelect
              isParent={false}
              name="Implementation Status"
              itemId="implementationStatus"
              onChangeSelect={onChangeSingleSelect}
              options={StatusType}
              value={{
                id: "",
                name: formState.implementationStatus,
                value: formState.implementationStatus,
              }}
              require={false}
              disable={!editMode}
            />
            <SingleSelect
              isParent={false}
              name="Handover Status"
              itemId="handoverStatus"
              onChangeSelect={onChangeSingleSelect}
              options={StatusType}
              value={{
                id: "",
                name: formState.handoverStatus,
                value: formState.handoverStatus,
              }}
              require={false}
              disable={!editMode}
            />
            <CustomDatePicker
              name="Implemented At"
              itemId="implementedAt"
              onChangeText={onChangeText}
              value={formState.implementedAt}
              disable={!editMode}
            />
          </Grid>
          <TextComponent
            icon={<AbcIcon />}
            name="Documents"
            itemId="documents"
            onChangeText={onChangeText}
            type={"text"}
            value={formState.documents}
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
