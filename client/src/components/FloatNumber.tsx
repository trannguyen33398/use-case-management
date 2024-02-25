import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { InputLabel, Typography } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { textFieldStyles, useStyles } from "../styles/common";
import * as React from "react";
import { enqueueSnackbar } from "notistack";

type TTextProps = {
  name: string;
  itemId: string;
  onChangeText: (name: string, text: number | string) => void;
  icon: React.ReactNode;
  value?: number | null;
  disable?: boolean;
  require?: boolean;
  type?: "number" | "text";
};
export const FloatNumber: React.FC<TTextProps> = (props) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const text = event.target.value;

    props.onChangeText(props.itemId, text);
  };

  const classes = useStyles();
  return (
    <>
      <Grid item xs={3} md={3} className={classes.gridItem} direction="column">
        <Grid container alignItems="center" spacing={1}>
          <Grid item>{props.icon}</Grid>
          <Grid item>
            <InputLabel shrink={false}>
              <Typography>{props.name}</Typography>
            </InputLabel>
          </Grid>
        </Grid>
        <TextField
          label=""
          InputProps={{
            style: textFieldStyles,
            inputComponent: TextareaAutosize,
          }}
          id="outlined-basic"
          variant="outlined"
          className={classes.textItem}
          name={props.name}
          value={props.value}
          required={props.require}
          disabled={props.disable}
          onChange={handleChange}
        />
      </Grid>
    </>
  );
};
