import classes from "./MenuItem.module.css";
import React from "react";
import { Typography } from "@mui/material";
type TItemInput = {
  icons: React.ReactNode;
  label: string;
  // path : string
};
export const MenuItem: React.FC<TItemInput> = (item) => {
  return (
    <div className={classes["nav-item-container"]}>
      <div className={classes["nav-item-icon-container"]}>{item.icons}</div>
      <div className={classes["nav-item-label-container"]}>
        <Typography className={classes["nav-item-label"]}>
          {item.label}
        </Typography>
      </div>
    </div>
  );
};
