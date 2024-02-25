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
import { Sprint } from "../../types/sprint";
import { MyOptions } from "../../utils/utils";
import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import { getListUseCase } from "../../api/use-cases";
import { UseCaseEdit } from "../../types/use-cases";
import { getListBundle } from "../../api/bundle";
import { Bundle } from "../../types/bundle";
import { createSprint } from "../../api/sprints";
import { useNavigate } from "react-router-dom";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { enqueueSnackbar } from "notistack";
//css flex box
export const SprintCreate = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState<Sprint>({
    id: null,
    name: null,
    bundleId: null,
    bundleName: null,
    plannedFrom: null,
    plannedTo: null,
    step: 0,
    description: null,
    status: null,
    developmentStatus: null,
    iterationStatus: null,
    implementationStatus: null,
    handoverStatus: null,
    implementedAt: null,
    documents: null,
    useCases: [],
  });
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
    
      createSprint({
        ...formState,
        useCases: (formState.useCases as MyOptions[]).map((item) => item.id),
      })
        .then((data) => {
          if (data.status === 201) {
            navigate("/sprints/all");
            enqueueSnackbar("Create Sprint Success!", {
              variant: "success",
            });
          }
        })
        .catch((error) => {
          enqueueSnackbar(`${error.message}`, { variant: "error" });
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
      <h2 className={classes.headerText}>Sprints</h2>
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
              xs={6}
              md={6}
            />
            <CustomDatePicker
              name="Planned From"
              itemId="plannedFrom"
              onChangeText={onChangeText}
              require={true}
              value={null}
            />
          </Grid>

          <Grid item container spacing={6}>
            <CustomDatePicker
              name="Planned To"
              itemId="plannedTo"
              onChangeText={onChangeText}
              require={true}
              value={null}
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
            />

            <NumberComponent
              name="Step"
              itemId="step"
              onChangeText={onChangeNumber}
              icon={<NumbersIcon />}
              require={true}
            />
          </Grid>
          <SingleSelect
            name="Bundles"
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
            require={true}
            value={null}
          />
          <TextComponent
            icon={<AbcIcon />}
            name="Description"
            itemId="description"
            onChangeText={onChangeText}
            type={"text"}
            value={formState.description}
            xs={6}
            md={6}
          />
          <Grid item container spacing={6}>
            <SingleSelect
              isParent={false}
              name="Status"
              itemId="status"
              onChangeSelect={onChangeSingleSelect}
              options={StatusType}
              value={null}
              require={true}
            />
            <SingleSelect
              isParent={false}
              name="Development Status"
              itemId="developmentStatusId"
              onChangeSelect={onChangeSingleSelect}
              options={StatusType}
              value={null}
              require={false}
            />
            <SingleSelect
              isParent={false}
              name="Iteration Status"
              itemId="iterationStatusId"
              onChangeSelect={onChangeSingleSelect}
              options={StatusType}
              value={null}
              require={false}
            />
          </Grid>
          <Grid item container spacing={6}>
            <SingleSelect
              isParent={false}
              name="Implementation Status"
              itemId="implementationStatusId"
              onChangeSelect={onChangeSingleSelect}
              options={StatusType}
              value={null}
              require={false}
            />
            <SingleSelect
              isParent={false}
              name="Handover Status"
              itemId="handoverStatusId"
              onChangeSelect={onChangeSingleSelect}
              options={StatusType}
              value={null}
              require={false}
            />
            <CustomDatePicker
              name="Implemented At"
              itemId="implementedAt"
              onChangeText={onChangeText}
            />
          </Grid>
          <TextComponent
            icon={<AbcIcon />}
            name="Documents"
            itemId="documents"
            onChangeText={onChangeText}
            type={"text"}
            value={formState.documents}
          />

          <Grid item container>
            <SubmitButton type={"Submit"} display={true} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
