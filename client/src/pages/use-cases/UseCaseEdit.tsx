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
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import { UseCaseEdit } from "../../types/use-cases";
import { getListUseCase, getUseCase, updateUseCase } from "../../api/use-cases";
import { enqueueSnackbar } from "notistack";
import { useEffect } from "react";
import { MyOptions } from "../../utils/utils";

export const UseCasesEdit = () => {
  const classes = useStyles();
  const { state } = useLocation();
  const params = useParams();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [data] = useState<UseCaseEdit>(state ? state.data : null);
  const [formState, setFormState] = useState<UseCaseEdit>({
    id: data ? data.id : null,
    name: data ? data.name : null,
    processParentId: data ? data.processParentId : null,
    parentId: data ? data.parentId : null,
    parentName: data ? data.parentName : null,
    systems: data ? data.systems : [],
    useCaseClusters: data ? data.useCaseClusters : [],
    plantId: data ? data.plantId : null,
    processId: data ? data.processId : null,
    priority: data ? data.priority : 1,
    machines: data ? data.machines : [],
    risks: data ? data.risks : [],
    type: data ? data.type : null,
    category: data ? data.category : null,
    descriptionRating: data ? data.descriptionRating : null,
    serviceLines: data ? data.serviceLines : [],
    responsiblePerson: data ? data.responsiblePerson : null,
    collectedAt: data ? data.collectedAt : null,
    targetDefinition: data ? data.targetDefinition : null,
    majorIssueDefinition: data ? data.majorIssueDefinition : null,
    relevantTags: data ? data.relevantTags : null,
    blockPoints: data ? data.blockPoints : null,
    blockingPointsToServiceLines: data ? data.blockingPointsToServiceLines : [],
    comment: data ? data.comment : null,
    projectName: data ? data.projectName : null,
    communicationStreams: data ? data.communicationStreams : [],
    active: data ? data.active : null,
    processParentName: data ? data.processParentName : null,
    processName: data ? data.processName : null,
    plantName: data ? data.plantName : null,
  });
  const useCaseId = params?.useCaseId ?? null;

  useEffect(() => {
    if (useCaseId) {
      getUseCase(useCaseId).then((result) => {
        setFormState({
          id: result.data.data.id,
          name: result.data.data.name,
          processParentId: result.data.data.processParentId,
          parentId: result.data.data.parentId,
          parentName: result.data.data.parentName,
          systems: result.data.data.systems,
          useCaseClusters: result.data.data.useCaseClusters,
          plantId: result.data.data.plantId,
          processId: result.data.data.processId,
          priority: result.data.data.priority,
          machines: result.data.data.machines,
          risks: result.data.data.risks,
          type: result.data.data.type,
          category: result.data.data.category,
          descriptionRating: result.data.data.descriptionRating,
          serviceLines: result.data.data.serviceLines,
          responsiblePerson: result.data.data.responsiblePerson,
          collectedAt: result.data.data.collectedAt,
          targetDefinition: result.data.data.targetDefinition,
          majorIssueDefinition: result.data.data.majorIssueDefinition,
          relevantTags: result.data.data.relevantTags,
          blockPoints: result.data.data.blockPoints,
          blockingPointsToServiceLines:
            result.data.data.blockingPointsToServiceLines,
          comment: result.data.data.comment,
          projectName: result.data.data.projectName,
          communicationStreams: result.data.data.communicationStreams,
          active: result.data.data.active,
          processParentName: result.data.data.processParentName,
          processName: result.data.data.processName,
          plantName: result.data.data.plantName,
        });
      });
    }
  }, [useCaseId]);
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

    updateUseCase(useCaseId as string, {
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
        if (data.status === 202) {
          enqueueSnackbar("Edit Use Case Cluster Success!", {
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
    navigate("/use-cases/all");
  };
  const onChangeSingleSelect = (
    name: string,
    id: string,
    parentName?: string,
    itemName?: string
  ) => {
    setFormState({
      ...formState,
      [name]: id,
      [itemName as string]: parentName as string,
    });
  };
  const handleEditMode = () => {
    setEditMode(!editMode);
  };
  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <Grid container>
        <Grid item xs={9} md={9}>
          <h2 className={classes.headerText}>Use Cases</h2>
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
            disable={!editMode}
            xs={4}
            md={4}
          />

          <SingleSelect
            require={true}
            isParent={true}
            name="Plant"
            itemId="plantId"
            onChangeSelect={onChangeSingleSelect}
            disable={!editMode}
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
            value={{
              id: formState.plantId,
              name: formState.plantName,
              value: formState.plantName,
            }}
            xs={3}
            md={3}
          />

          <CustomDatePicker
            name="Collection Date"
            itemId="collectedAt"
            onChangeText={onChangeText}
            disable={!editMode}
            xs={2}
            md={2}
            value={formState.collectedAt}
          />
          <Grid item container spacing={6}>
            <SingleSelect
              name="Description Rating"
              itemId="descriptionRating"
              onChangeSelect={onChangeSingleSelect}
              options={DescriptionRating}
              disable={!editMode}
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
              disable={!editMode}
            />

            <TextComponent
              icon={<AbcIcon />}
              name="Project Name"
              itemId="projectName"
              onChangeText={onChangeText}
              type={"text"}
              value={formState.projectName}
              disable={!editMode}
            />
          </Grid>
          <BooleanSelection
            icon={<AbcIcon />}
            name="Active"
            itemId="active"
            disable={!editMode}
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
            itemName="processName"
            onChangeSelect={onChangeSingleSelect}
            disable={!editMode}
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
            value={{
              id: formState.processId,
              name: formState.processName,
              value: formState.processName,
            }}
            xs={3}
            md={3}
          />

          <SingleSelect
            isParent={true}
            require={false}
            name="Process Parent"
            itemId="processParentId"
            itemName="processParentName"
            disable={!editMode}
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
            value={{
              id: formState.processParentId,
              name: formState.processParentName,
              value: formState.processParentName,
            }}
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
              itemId="parentId"
              itemName="parentName"
              disable={!editMode}
              onChangeSelect={onChangeSingleSelect}
              options={
                dataQueryUseCases.data
                  ? dataQueryUseCases.data.data.data
                      .map((item: any) => {
                        return {
                          id: item.id,
                          name: item.name,
                          value: item.name,
                        } as MyOptions;
                      })
                      .filter((item) => item.id !== useCaseId) ?? []
                  : []
              }
              value={{
                id: formState.parentId,
                name: formState.parentName,
                value: formState.parentName,
              }}
              xs={3}
              md={3}
            />

            <MultipleSelect
              disable={!editMode}
              name="Use Case Cluster"
              itemId="useCaseClusterId"
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
              disable={!editMode}
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
              disable={!editMode}
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
              disable={!editMode}
              name="Service Line"
              itemId="serviceLines"
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
              disable={!editMode}
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
              disable={!editMode}
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
            disable={!editMode}
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
              disable={!editMode}
              value={formState.majorIssueDefinition}
            />

            <TextComponent
              icon={<AbcIcon />}
              name="Target Definition"
              itemId="targetDefinition"
              onChangeText={onChangeText}
              type={"text"}
              require={true}
              disable={!editMode}
              value={formState.targetDefinition}
            />

            <MultipleSelect
              disable={!editMode}
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
            disable={!editMode}
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
            disable={!editMode}
            value={formState.blockPoints}
          />

          <MultipleSelect
            disable={!editMode}
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
            disable={!editMode}
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
            <SubmitButton type={"Submit"} display={editMode} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
