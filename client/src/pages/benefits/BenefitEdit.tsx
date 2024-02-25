import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { MultipleSelect } from "../../components/MultipleSelect";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { useStyles } from "../../styles/common";
import { BenefitType, ReliabilityType } from "./benefit.constant";
import { SingleSelect } from "../../components/SingleSelect";
import { Typography } from "@mui/material";
import { useQuery } from "react-query";
import { getBenefit, getListBenefit, updateBenefit } from "../../api/benefits";
import { MyOptions } from "../../utils/utils";
import { getListUseCase } from "../../api/use-cases";
import { FloatNumber } from "../../components/FloatNumber";
import { enqueueSnackbar } from "notistack";
import { Benefit } from "../../types/benefits";
import { UseCaseEdit } from "../../types/use-cases";
import { getListBenefitCategory } from "../../api/benefit-categories";
import { BenefitCategory } from "../../types/benefit-categories";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import NumbersIcon from "@mui/icons-material/Numbers";

//css flex box
export const BenefitEdit = () => {
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

  const [formState, setFormState] = useState<Benefit>({
    id: data ? data.id : null,
    name: data ? data.name : null,
    parentId: data ? data.parentId : null,
    parentName: data ? data.parentName : null,
    comments: data ? data.comments : null,
    type: data ? data.type : null,
    sprintId: data ? data.sprintId : null,
    sprintStatus: data ? data.sprintStatus : null,
    calculationInput: data ? data.calculationInput : null,
    savings: data ? data.savings : null,
    reliability: data ? data.reliability : [],
    useCases: data ? data.useCases : [],
    benefitCategories: data ? data.benefitCategories : [],
  });
  const benefitId = params?.benefitId ?? null;
  useEffect(() => {
    if (benefitId) {
      getBenefit(benefitId).then((result) => {
        setFormState({
          id: result.data.data.id,
          name: result.data.data.name,
          parentId: result.data.data.parentId,
          parentName: result.data.data.parentName,
          comments: result.data.data.comments,
          type: result.data.data.type,
          sprintId: result.data.data.sprintId,
          sprintStatus: result.data.data.sprintStatus,
          calculationInput: result.data.data.calculationInput,
          savings: result.data.data.savings,
          reliability: result.data.data.reliability
            ? ((result.data.data.reliability as string[]).map((reliability) => {
                return {
                  id: "",
                  name: reliability,
                  value: reliability,
                };
              }) as MyOptions[])
            : [],
          useCases: result.data.data.useCases,
          benefitCategories: result.data.data.benefitCategories,
        });
      });
    }
  }, [benefitId]);
  const onChangeText = (name: string, text: string) => {
    setFormState({ ...formState, [name]: text });
  };

  const onChangeSelect = (name: string, id: any[]) => {
    setFormState({ ...formState, [name]: id });
  };

  const onChangeSingleSelect = (name: string, id: string) => {
    setFormState({ ...formState, [name]: id });
  };
  const onChangeMultipleSelect = (name: string, item: MyOptions[]) => {
    setFormState({ ...formState, [name]: item });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const regex = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;

    if (!regex.test(formState.savings as string)) {
      enqueueSnackbar("savings must be a number!", {
        variant: "error",
      });
    } else {
      updateBenefit(formState.id, {
        ...formState,
        useCases: (formState.useCases as MyOptions[]).map(
          (item: MyOptions) => item.id
        ),

        benefitCategories: (formState.benefitCategories as MyOptions[]).map(
          (item: MyOptions) => item.id
        ),

        reliability: (formState.reliability as MyOptions[]).map(
          (item: MyOptions) => item.value
        ),
        savings: Number.parseFloat(formState.savings as string),
      })
        .then((data) => {
          if (data.status === 202) {
            enqueueSnackbar("Edit BenefitCategory Success!", {
              variant: "success",
            });
            setEditMode(!editMode);
          }
        })
        .catch((error) => {
          enqueueSnackbar(`${error.message}`, { variant: "error" });
        });
    }
  };

  const dataQueryBenefit = useQuery({
    queryKey: ["useCase"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListBenefit(1, 10000, "", controller.signal);
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
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
    refetchOnWindowFocus: false,
    retry: 0,
  });

  const dataQueryCategories = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 5000);
      return getListBenefitCategory(1, 10000, "", controller.signal);
    },
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 0,
  });
  const navigate = useNavigate();
  const handleClick = () => {
    // Navigate to another component
    navigate("/benefits/all");
  };
  return (
    <div className={classes.div}>
      <div className={classes.backIcon}>
        <KeyboardBackspaceIcon onClick={handleClick} />
      </div>
      <Grid container>
        <Grid item xs={9} md={9}>
          <h2 className={classes.headerText}>Edit Benefit</h2>
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
              Benefits Information
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
            xs={6}
            md={6}
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
              dataQueryBenefit.data?.data.data
                .map((item) => {
                  return {
                    id: item.id,
                    name: item.name,
                    value: item.name,
                  };
                })
                .filter((item) => item.id !== benefitId) ??
              [] ??
              []
            }
          />
          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Use Case Information
            </Typography>
          </Grid>
          <Grid item container spacing={6}>
            <MultipleSelect
              name="Use Cases"
              itemId="useCases"
              onChangeSelect={onChangeMultipleSelect}
              require={true}
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
              disable={!editMode}
              xs={4}
              md={4}
              value={
                formState.useCases.length > 0
                  ? (formState.useCases as MyOptions[])
                  : (formState.useCases as [])
              }
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Benefits Calculation Information
            </Typography>
          </Grid>

          <Grid item container spacing={6}>
            <MultipleSelect
              name="Category"
              itemId="benefitCategories"
              onChangeSelect={onChangeSelect}
              options={
                dataQueryCategories.data
                  ? dataQueryCategories.data.data.data.map(
                      (item: BenefitCategory) => {
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
                formState.benefitCategories.length > 0
                  ? (formState.benefitCategories as MyOptions[])
                  : (formState.benefitCategories as [])
              }
            />
            <SingleSelect
              require={true}
              isParent={false}
              name="Type"
              itemId="type"
              onChangeSelect={onChangeSingleSelect}
              options={BenefitType}
              value={{
                id: formState.type,
                name: formState.type,
                value: formState.type,
              }}
              disable={!editMode}
            />
            <TextComponent
              icon={<AbcIcon />}
              name="Calculation Input"
              itemId="calculationInput"
              onChangeText={onChangeText}
              type={"text"}
              value={formState.calculationInput}
              require={true}
              disable={!editMode}
            />
          </Grid>
          <MultipleSelect
            name="Reliability"
            itemId="reliability"
            onChangeSelect={onChangeMultipleSelect}
            options={ReliabilityType}
            require={true}
            value={
              formState.reliability.length > 0
                ? (formState.reliability as MyOptions[])
                : null
            }
            disable={!editMode}
          />
          <TextComponent
            icon={<NumbersIcon />}
            type="text"
            name="Savings"
            itemId="savings"
            disable={!editMode}
            require={true}
            onChangeText={onChangeText}
            value={formState.savings as string}
          />

          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Planning Information
            </Typography>
          </Grid>
          <Grid item container spacing={6}>
            <TextComponent
              icon={<AbcIcon />}
              name="Sprint Id"
              itemId="sprintId"
              onChangeText={onChangeText}
              type={"text"}
              value={formState.sprintId}
              disable={!editMode}
            />
            <TextComponent
              icon={<AbcIcon />}
              name="Sprint Status"
              itemId="sprintStatus"
              onChangeText={onChangeText}
              type={"text"}
              value={formState.sprintStatus}
              disable={!editMode}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Detail Information
            </Typography>
          </Grid>
          <Grid item container spacing={6}>
            <TextComponent
              icon={<AbcIcon />}
              name="Comment"
              itemId="comments"
              onChangeText={onChangeText}
              type={"text"}
              disable={!editMode}
              value={formState.comments}
            />
          </Grid>

          <Grid item container>
            <SubmitButton type={"Submit"} display={editMode} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
