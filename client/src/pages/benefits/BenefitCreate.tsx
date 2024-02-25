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
import { createBenefit, getListBenefit } from "../../api/benefits";
import { MyOptions } from "../../utils/utils";
import { getListUseCase } from "../../api/use-cases";
import { FloatNumber } from "../../components/FloatNumber";
import { enqueueSnackbar } from "notistack";
import { Benefit } from "../../types/benefits";
import { UseCaseEdit } from "../../types/use-cases";
import { getListBenefitCategory } from "../../api/benefit-categories";
import { BenefitCategory } from "../../types/benefit-categories";
import { useNavigate } from "react-router-dom";
import NumbersIcon from "@mui/icons-material/Numbers";
//css flex box
export const BenefitCreate = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState<Benefit>({
    id: "",
    name: "",
    parentId: null,
    parentName: null,
    comments: null,
    type: null,
    sprintId: null,
    sprintStatus: null,
    calculationInput: null,
    savings: null,
    reliability: [],
    useCases: [],
    benefitCategories: [],
  });
  const onChangeText = (name: string, text: string) => {
    setFormState({ ...formState, [name]: text });
  };

  const onChangeSingleSelect = (name: string, id: string) => {
    setFormState({ ...formState, [name]: id });
  };
  const onChangeMultipleSelect = (name: string, item: MyOptions[]) => {
    setFormState({ ...formState, [name]: item });
  };
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createBenefit({
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
    })
      .then((data) => {
        if (data.status === 201) {
          navigate("/benefits/all");
          enqueueSnackbar("Create Benefits Success!", {
            variant: "success",
          });
        }
      })
      .catch((error: Error) => {
        enqueueSnackbar(`${error.message}`, { variant: "error" });
      });
  };

  const onChangeNumber = (name: string, number: number | string) => {
    setFormState({ ...formState, [name]: number });
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

  return (
    <div className={classes.div}>
      <h2 className={classes.headerText}>Benefit</h2>
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
            onChangeSelect={onChangeSingleSelect}
            options={
              dataQueryBenefit.data?.data.data.map((item) => {
                return {
                  id: item.id,
                  name: item.name,
                  value: item.name,
                };
              }) ?? []
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
              xs={4}
              md={4}
              value={
                formState.useCases.length > 0
                  ? (formState.useCases as MyOptions[])
                  : (formState.useCases as [])
              }
              require={true}
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
              onChangeSelect={onChangeMultipleSelect}
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
              require={false}
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
            />
            <TextComponent
              icon={<AbcIcon />}
              name="Calculation Input"
              itemId="calculationInput"
              onChangeText={onChangeText}
              type={"text"}
              value={formState.calculationInput}
              require={true}
            />
          </Grid>
          <MultipleSelect
            require={true}
            name="Reliability"
            itemId="reliability"
            onChangeSelect={onChangeMultipleSelect}
            options={ReliabilityType}
            value={formState.reliability as MyOptions[]}
          />
          <FloatNumber
            icon={<NumbersIcon />}
            require={true}
            type="text"
            name="Savings"
            itemId="savings"
            onChangeText={onChangeNumber}
          />

          <Grid item xs={12} md={12}>
            <Typography className={classes.subHeader}>
              Planning Information
            </Typography>
          </Grid>
          <Grid item container spacing={6}>
            <TextComponent
              icon={<AbcIcon />}
              name="Sprint"
              itemId="sprintId"
              onChangeText={onChangeText}
              type={"text"}
              value={formState.sprintId}
            />
            <TextComponent
              icon={<AbcIcon />}
              name="Sprint Status"
              itemId="sprintStatus"
              onChangeText={onChangeText}
              type={"text"}
              value={formState.sprintStatus}
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
              value={formState.comments}
            />
          </Grid>

          <Grid item container>
            <SubmitButton type={"Submit"} display={true} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
