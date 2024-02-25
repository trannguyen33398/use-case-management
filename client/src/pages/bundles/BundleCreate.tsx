import * as React from "react";
import Grid from "@mui/material/Grid";
import AbcIcon from "@mui/icons-material/Abc";
import { MultipleSelect } from "../../components/MultipleSelect";
import { TextComponent } from "../../components/Text";
import { useState } from "react";
import { SubmitButton } from "../../components/Submit";
import { useStyles } from "../../styles/common";
import { DefaultOption } from "../../common/common.constant";
import { Bundle } from "../../types/bundle";
import { useNavigate } from "react-router-dom";
import { MyOptions } from "../../utils/utils";
import { getListUseCase } from "../../api/use-cases";
import { useQuery } from "react-query";
import { Typography } from "@mui/material";
import { UseCaseEdit } from "../../types/use-cases";
import { createBundle } from "../../api/bundle";
import { enqueueSnackbar } from "notistack";

//css flex box
export const BundleCreate = () => {
  const classes = useStyles();
  const [formState, setFormState] = useState<Bundle>({
    id: "",
    name: "",
    useCases: [],
    description: "",
  });
  const onChangeText = (name: string, text: string) => {
    setFormState({ ...formState, [name]: text });
  };

  const onChangeMultipleSelect = (name: string, item: MyOptions[]) => {
    setFormState({ ...formState, [name]: item });
  };
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createBundle({
      ...formState,
      useCases: (formState.useCases as MyOptions[]).map(
        (item: MyOptions) => item.id
      ),
    })
      .then((data) => {
        if (data.status === 201) {
          navigate("/bundles/all");
          enqueueSnackbar("Create Bundles Success!", {
            variant: "success",
          });
        }
      })
      .catch((error: Error) => {
        enqueueSnackbar(`${error.message}`, { variant: "error" });
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
  return (
    <div className={classes.div}>
      <h2 className={classes.headerText}>Bundles</h2>
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
            value={formState.description}
          />

          <Grid item container>
            <SubmitButton type={"Submit"} display={true} />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
