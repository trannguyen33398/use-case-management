import { Button, Grid } from "@mui/material";
import { useStyles } from "../styles/common";
import React from "react";
type TSubmitProp<T> = {
  type: string;
  onClick?: () => void;
  display: boolean;
};
interface MyOptions {
  type: string;
  display: boolean;
}
export const SubmitButton: React.FC<TSubmitProp<MyOptions>> = ({
  ...props
}) => {
  const classes = useStyles();
  const handleSubmit = () => {
    return props.onClick ? props.onClick() : null;
  };
  return (
    <>
      <Grid item xs={3} md={3} className={classes.gridItem} direction="column">
        <br />
        <Button
          type="submit"
          variant="contained"
          onClick={handleSubmit}
          style={{ display: props.display ? "block" : "none" }}
        >
          {props.type}
        </Button>
      </Grid>
    </>
  );
};
