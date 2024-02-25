import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Chip, InputLabel, OutlinedInput, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { textFieldStyles, useStyles } from "../styles/common";
import { useState, useEffect } from "react";
import { useTheme, Theme } from "@mui/material/styles";
import { MyOptions } from "../utils/utils";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type TSelectProp<T> = {
  name: string;
  itemId: string;
  itemName?: string
  onChangeSelect: (name: string, id: string, parentName: string,itemName?:string) => void;
  options: T[];
  value: {
    id: string | null
    name: string | null
    value: string | null
  } |  null;
  isParent: boolean;
  require: boolean;
  disable?: boolean;
  icon?: any
  xs?: number;
  md?: number;
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const SingleSelect: React.FC<TSelectProp<MyOptions>> = ({
  isParent = false,
  xs = 3,
  md = 3,
  ...props
}) => {
  const listValue = {} as any;
  // eslint-disable-next-line array-callback-return
   props.options.map((item) => {
    Object.assign(listValue, {
      [item.id]: item.name,
    });
  });
  const theme = useTheme();
  const [value, setValue] = useState<string>(props.value?.id ?? "");
 
  useEffect(() => {
     setValue(props.value?.id ?? "");
   
  }, [props.value?.id]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);

    if (!isParent) {
      props.onChangeSelect(props.itemId, listValue[event.target.value], "");
    } else {
      const activeName = listValue[event.target.value];
     
      props.onChangeSelect(
        props.itemId,
        event.target.value,
        activeName,
        props.itemName
      );
    }
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
          <Grid item>
          {props?.icon ? props.icon :   <CompareArrowsIcon />}
          </Grid>
          <Grid item>
           
            <InputLabel shrink={false}>
              <Typography>{props.name}</Typography>
            </InputLabel>
          </Grid>
        </Grid>
        <Box sx={{ boxShadow: textFieldStyles, width: "100%" }}>
          <FormControl sx={{ width: "100%", textAlign: "left" }}>
            <Select
              required={props.require}
              displayEmpty
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              value={value}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              MenuProps={MenuProps}
              disabled={props.disable}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected !== "" ? 
                    <Chip key={listValue[selected]} label={listValue[selected]} /> : null
              }
                </Box>
              )}
            >
              {isParent ? (
                <MenuItem key="parentId" value="">
                  None
                </MenuItem>
              ) : null}
              {props.options.map((item) => (
                <MenuItem key={item.id} value={item.id}   style={getStyles(item.name, [value], theme)}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </>
  );
};
