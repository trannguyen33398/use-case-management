import NumberInput from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { InputLabel, Typography } from "@mui/material";
import { useStyles } from "../styles/common";

import * as React from "react";

type TNumberProps = {
  name: string;
  itemId: string;
  onChangeText: (name: string, number: number) => void;
  icon: React.ReactNode;
  require?: boolean;
  disable?: boolean;
  value?: number;
  xs?: number;
  md?: number;
};

export const NumberComponent: React.FC<TNumberProps> = ({
  xs = 3,
  md = 3,
  ...props
}) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const number = event.target.value;

    props.onChangeText(props.itemId, Number(number));
  };

  const classes = useStyles();
  return (
    <>
      <Grid
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
        <NumberInput
          type="number"
          id="outlined-basic"
          variant="outlined"
          value={props.value}
          className={classes.textItem}
          aria-label="Demo number input"
          placeholder="Type a number…"
          disabled={props.disable}
          required={props.require}
          onChange={handleChange}
        />
      </Grid>
    </>
  );
};
