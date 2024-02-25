import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { InputLabel, Typography } from "@mui/material";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { textFieldStyles, useStyles } from "../styles/common";
import * as React from "react";

type TTextProps = {
  name: string;
  itemId: string;
  onChangeText: (name: string, text: string) => void;
  icon: React.ReactNode;
  type: "text" | "email";
  value: string | null;
  disable?: boolean;
  require?: boolean;
  xs?: number;
  md?: number;
};
export const TextComponent: React.FC<TTextProps> = ({
  type = "text",
  xs = 3,
  md = 3,
  ...props
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const text = event.target.value;

    props.onChangeText(props.itemId, text);
  };

  const classes = useStyles();
  return (
    <>
      <Grid
        container
        item
        xs={xs}
        md={md}
        className={classes.gridItem}
        direction="column"
        
      >
        <Grid container alignItems="center" spacing={1}>
          <Grid item>{props.icon}</Grid>
          <Grid item>
            <InputLabel shrink={false}>
              <Typography>{props.name}</Typography>
            </InputLabel>
          </Grid>
        </Grid>
        <TextField
          type={type}
          label=""
          InputProps={{
            style: textFieldStyles,
            inputComponent: TextareaAutosize,
          }}
          id="outlined-basic"
          variant="outlined"
          value={props.value}
          className={classes.textItem}
          name={props.name}
          required={props.require ?? false}
          disabled={props.disable}
          onChange={handleChange}
        />
      </Grid>
    </>
  );
};
