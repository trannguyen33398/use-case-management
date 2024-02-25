import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { MultipleSelect } from "../../components/MultipleSelect";
import { CustomDatePicker } from "../../components/DatePicker";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { BooleanSelection } from "../../components/Boolean";
import { useStyles } from "../../styles/common";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import NumbersIcon from "@mui/icons-material/Numbers";
import { SingleSelect } from "../../components/SingleSelect";
import { NumberComponent } from "../../components/Number";
import { Category, DescriptionRating, Type } from "./use-cases.constant";
import { useQuery } from "react-query";
import { getListSystem } from "../../api/systems";

import { getListUseCaseCluster } from "../../api/use-case-cluster";
import { getListMachine } from "../../api/machines";
import { getListRisk } from "../../api/risks";
import { getListServiceLine } from "../../api/service-lines";
import { getListProcess } from "../../api/processes";
import { getListPlant } from "../../api/plants";
import { getListCommunicationStream } from "../../api/communication-streams";
import { UseCaseCreate, UseCaseEdit } from "../../types/use-cases";
import { createUseCase, getListUseCase } from "../../api/use-cases";
import { enqueueSnackbar } from "notistack";
import { MyOptions } from "../../utils/utils";

export const UseCasesCreate = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState<UseCaseCreate>({
    id: null,
    name: null,
    processParentId: null,
    parentId: null,
    parentName: null,
    systems: [],
    useCaseClusters: [],
    plantId: null,
    processId: null,
    priority: 1,
    machines: [],
    risks: [],
    type: null,
    category: null,
    descriptionRating: null,
    serviceLines: [],
    responsiblePerson: null,
    collectedAt: null,
    targetDefinition: null,
    majorIssueDefinition: null,
    relevantTags: null,
    blockPoints: null,
    blockingPointsToServiceLines: [],
    comment: null,
    projectName: null,
    communicationStreams: [],
    active: "true",
  });

  const dataQuerySystem = useQuery({
    queryKey: ["system"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListSystem(1, 10000, "", controller.signal);
    },
    keepPreviousData: true,
    retry: 0,
  });

  const dataQueryUseCaseCluster = useQuery({
    queryKey: ["useCaseCluster"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListUseCaseCluster(1, 10000, "", controller.signal);
    },
    keepPreviousData: true,
    retry: 0,
  });

  const dataQueryMachine = useQuery({
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

  const dataQueryRisk = useQuery({
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

  const dataQueryServiceLine = useQuery({
    queryKey: ["serviceLine"],
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

  const dataQueryProcess = useQuery({
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

  const dataQueryPlant = useQuery({
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

  const dataQueryCommunicationStream = useQuery({
    queryKey: ["communicationStream"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListCommunicationStream(1, 10000, "", controller.signal);
    },
    keepPreviousData: true,
    retry: 0,
  });

  const dataQueryUseCase = useQuery({
    queryKey: ["useCase"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListUseCase(1, 10000, "", controller.signal);
    },
    keepPreviousData: true,
    retry: 0,
  });

  const onChangeText = (name: string, text: string | number) => {
    setFormState({ ...formState, [name]: text });
  };

  const onChangeMultipleSelect = (name: string, item: MyOptions[]) => {
    setFormState({ ...formState, [name]: item });
  };

  const onChangeNumber = (name: string, number: number) => {
    setFormState({ ...formState, [name]: number });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createUseCase({
      ...formState,
      active: formState.active === "true" ? true : false,
      serviceLines: formState.serviceLines.map((item) => item.id),
      systems: formState.systems.map((item) => item.id),
      machines: formState.machines.map((item) => item.id),
      risks: formState.risks.map((item) => item.id),
      blockingPointsToServiceLines: formState.blockingPointsToServiceLines.map(
        (item) => item.id
      ),
      communicationStreams: formState.communicationStreams.map(
        (item) => item.id
      ),
      useCaseClusters: formState.useCaseClusters.map((item) => item.id),
    })
      .then((data) => {
        if (data.status === 201) {
          navigate("/use-cases/all");
          enqueueSnackbar("Create Use case Success!", {
            variant: "success",
          });
        }
      })
      .catch((error: Error) => {
        enqueueSnackbar(`${error.message}`, { variant: "error" });
      });
  };
  const navigate = useNavigate();
  const handleClick = () => {
    // Navigate to another component
    navigate("/use-cases/all");
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
  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <h2 className={classes.headerText}>Use Cases</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={6} rowSpacing={3}>
          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              UseCase Information
            </Typography>
          </Grid>

          <TextComponent
            icon={<AbcIcon />}
            name="Name"
            itemId="name"
            onChangeText={onChangeText}
            type={"text"}
            value={formState.name}
            require={true}
            xs={4}
            md={4}
          />

          <SingleSelect
            require={true}
            isParent={true}
            name="Plant"
            itemId="plantId"
            onChangeSelect={onChangeSingleSelect}
            options={
              dataQueryPlant.data
                ? dataQueryPlant.data.data.data.map((item: any) => {
                    return {
                      id: item.id,
                      name: item.name,
                      value: item.name,
                    } as MyOptions;
                  })
                : []
            }
            value={null}
            xs={3}
            md={3}
          />

          <CustomDatePicker
            name="Collection Date"
            itemId="collectedAt"
            onChangeText={onChangeText}
            xs={2}
            md={2}
          />
          <Grid item container spacing={6}>
            <SingleSelect
              name="Description Rating"
              itemId="descriptionRating"
              onChangeSelect={onChangeSingleSelect}
              options={DescriptionRating}
              value={{
                id: formState.descriptionRating,
                name: formState.descriptionRating,
                value: formState.descriptionRating,
              }}
              isParent={false}
              xs={2}
              md={2}
              require={false}
            />
            <TextComponent
              icon={<AbcIcon />}
              name="Responsible Person"
              itemId="responsiblePerson"
              onChangeText={onChangeText}
              type={"text"}
              value={formState.responsiblePerson}
              require={true}
            />

            <TextComponent
              icon={<AbcIcon />}
              name="Project Name"
              itemId="projectName"
              onChangeText={onChangeText}
              type={"text"}
              value={formState.projectName}
            />
          </Grid>
          <BooleanSelection
            icon={<AbcIcon />}
            name="Active"
            itemId="active"
            onChangeText={onChangeText}
            xs={3}
            md={3}
          />

          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Process Information
            </Typography>
          </Grid>

          <SingleSelect
            isParent={true}
            require={true}
            name="Process"
            itemId="processId"
            onChangeSelect={onChangeSingleSelect}
            options={
              dataQueryProcess.data
                ? dataQueryProcess.data.data.data.map((item: any) => {
                    return {
                      id: item.id,
                      name: item.name,
                      value: item.name,
                    } as MyOptions;
                  })
                : []
            }
            value={null}
            xs={3}
            md={3}
          />

          <SingleSelect
            isParent={true}
            require={false}
            name="Process Parent"
            itemId="processParentId"
            onChangeSelect={onChangeSingleSelect}
            options={
              dataQueryProcess.data
                ? dataQueryProcess.data.data.data
                    .filter((item) => item.parentId !== null)
                    .map((item: any) => {
                      return {
                        id: item.parentId,
                        name: item.parentName,
                        value: item.parentName,
                      } as MyOptions;
                    })
                : []
            }
            value={null}
            xs={3}
            md={3}
          />

          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Standardization Information
            </Typography>
          </Grid>
          <Grid item container spacing={6}>
            <SingleSelect
              isParent={true}
              require={false}
              name="Standard Parent"
              itemId="standardParentId"
              onChangeSelect={onChangeSingleSelect}
              options={
                dataQueryUseCase.data
                  ? dataQueryUseCase.data.data.data.map((item: UseCaseEdit) => {
                      return {
                        id: item.id,
                        name: item.name,
                        value: item.name,
                      } as MyOptions;
                    })
                  : []
              }
              value={null}
              xs={3}
              md={3}
            />

            <MultipleSelect
              name="Use Case Cluster"
              itemId="useCaseClusters"
              onChangeSelect={onChangeMultipleSelect}
              options={
                dataQueryUseCaseCluster.data
                  ? dataQueryUseCaseCluster.data.data.data.map((item: any) => {
                      return {
                        id: item.id,
                        name: item.name,
                        value: item.name,
                      } as MyOptions;
                    })
                  : []
              }
              value={formState.useCaseClusters}
              require={false}
            />

            <SingleSelect
              name="Type"
              itemId="type"
              onChangeSelect={onChangeSingleSelect}
              options={Type}
              value={{
                id: formState.type,
                name: formState.type,
                value: formState.type,
              }}
              isParent={false}
              require={true}
            />
          </Grid>

          <Grid item container spacing={6}>
            <SingleSelect
              name="Category"
              itemId="category"
              onChangeSelect={onChangeSingleSelect}
              options={Category}
              value={{
                id: formState.category,
                name: formState.category,
                value: formState.category,
              }}
              isParent={false}
              require={true}
            />

            <MultipleSelect
              name="Service Line"
              itemId="serviceLineId"
              onChangeSelect={onChangeMultipleSelect}
              options={
                dataQueryServiceLine.data
                  ? dataQueryServiceLine.data.data.data.map((item: any) => {
                      return {
                        id: item.id,
                        name: item.name,
                        value: item.name,
                      } as MyOptions;
                    })
                  : []
              }
              value={formState.serviceLines}
              require={true}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Input Information
            </Typography>
          </Grid>
          <Grid item container spacing={6}>
            <MultipleSelect
              name="System"
              itemId="systems"
              onChangeSelect={onChangeMultipleSelect}
              options={
                dataQuerySystem.data
                  ? dataQuerySystem.data.data.data.map((item: any) => {
                      return {
                        id: item.id,
                        name: item.name,
                        value: item.name,
                      } as MyOptions;
                    })
                  : []
              }
              value={formState.systems}
              require={true}
            />

            <NumberComponent
              name="Priority"
              itemId="priority"
              value={formState.priority}
              onChangeText={onChangeNumber}
              icon={<NumbersIcon />}
              xs={1.3}
              md={1.3}
            />

            <MultipleSelect
              name="Machine"
              itemId="machines"
              onChangeSelect={onChangeMultipleSelect}
              options={
                dataQueryMachine.data
                  ? dataQueryMachine.data.data.data.map((item: any) => {
                      return {
                        id: item.id,
                        name: item.name,
                        value: item.name,
                      } as MyOptions;
                    })
                  : []
              }
              value={formState.machines}
              require={true}
            />
          </Grid>
          <TextComponent
            icon={<AbcIcon />}
            name="Relevant Tags"
            itemId="relevantTags"
            onChangeText={onChangeText}
            type={"text"}
            value={formState.relevantTags}
            require={true}
          />

          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Details Information
            </Typography>
          </Grid>

          <Grid item container spacing={6}>
            <TextComponent
              icon={<AbcIcon />}
              name="Major Issue Definition"
              itemId="majorIssueDefinition"
              onChangeText={onChangeText}
              type={"text"}
              require={true}
              value={formState.majorIssueDefinition}
            />

            <TextComponent
              icon={<AbcIcon />}
              name="Target Definition"
              itemId="targetDefinition"
              onChangeText={onChangeText}
              type={"text"}
              require={true}
              value={formState.targetDefinition}
            />

            <MultipleSelect
              name="Risk"
              itemId="risks"
              onChangeSelect={onChangeMultipleSelect}
              options={
                dataQueryRisk.data
                  ? dataQueryRisk.data.data.data.map((item: any) => {
                      return {
                        id: item.id,
                        name: item.name,
                        value: item.name,
                      } as MyOptions;
                    })
                  : []
              }
              value={formState.risks}
              require={false}
            />
          </Grid>

          <TextComponent
            icon={<AbcIcon />}
            name="Comment"
            itemId="comment"
            onChangeText={onChangeText}
            type={"text"}
            value={formState.comment}
            xs={4}
            md={4}
          />

          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Dependency Information
            </Typography>
          </Grid>

          <TextComponent
            icon={<AbcIcon />}
            name="Blocking Points"
            itemId="blockPoints"
            onChangeText={onChangeText}
            type={"text"}
            value={formState.blockPoints}
          />

          <MultipleSelect
            name="Blocking Points Service"
            itemId="blockingPointsToServiceLines"
            onChangeSelect={onChangeMultipleSelect}
            options={
              dataQueryServiceLine.data
                ? dataQueryServiceLine.data.data.data.map((item: any) => {
                    return {
                      id: item.id,
                      name: item.name,
                      value: item.name,
                    } as MyOptions;
                  })
                : []
            }
            value={formState.blockingPointsToServiceLines}
            require={false}
          />

          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Communication Information
            </Typography>
          </Grid>

          <MultipleSelect
            name="Communication Stream"
            itemId="communicationStreams"
            onChangeSelect={onChangeMultipleSelect}
            options={
              dataQueryCommunicationStream.data
                ? dataQueryCommunicationStream.data.data.data.map(
                    (item: any) => {
                      return {
                        id: item.id,
                        name: item.name,
                        value: item.name,
                      } as MyOptions;
                    }
                  )
                : []
            }
            value={formState.communicationStreams}
            require={false}
          />
          <Grid item container>
            <SubmitButton type={"Submit"} display={true} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
