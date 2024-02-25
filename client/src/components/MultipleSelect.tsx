import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Chip, InputLabel, OutlinedInput, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { textFieldStyles, useStyles } from "../styles/common";
import { useState } from "react";
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
  onChangeSelect: (name: string, item: MyOptions[]) => void;
  options: T[];
  require: boolean;
  value: MyOptions[]  | null;
  disable?: boolean;
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
export const MultipleSelect: React.FC<TSelectProp<MyOptions>> = ({
  xs = 3,
  md = 3,
  ...props
}) => {
  const [value, setValue] = useState<string[] | []>(
    props.value && props.value.length > 0
      ? props.value.map((item) => item.name)
      : []
  );

  React.useEffect(() => {
    if (props.value && props.value.length > 0) {
      setValue(props.value.map((item) => item.id));
    }
      else {
        setValue([])
      }
  }, [props.value]);

  const keys = new Map();
  const values = new Map();
  props.options.forEach((item) => {
    keys.set(item.name, item.id);
    values.set(item.id, item.name);
  });
  const theme = useTheme();

  const handleChange = (event: SelectChangeEvent<typeof value>) => {
    setValue(event.target.value as string[]);
   console.log(event.target.value)
    
    props.onChangeSelect(
      props.itemId,
      (event.target.value as string[]).map((item) => {
        return { id: item, name: keys.get(item), value: keys.get(item) };
      })
    )
    
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
            <CompareArrowsIcon />
          </Grid>
          <Grid item>
            <InputLabel shrink={false}>
              <Typography>{props.name}</Typography>
            </InputLabel>
          </Grid>
        </Grid>
        <Box sx={{ boxShadow: textFieldStyles, width: "100%" }}>
          <FormControl sx={{ width: "100%" }}>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={value}
              required={props.require}
              onChange={handleChange}
              disabled={props.disable}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((id) =>
                    id !== "" ? <Chip key={id} label={values.get(id)} /> : null
                  )}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {props.options.map((el) => (
                <MenuItem
                  key={el.id}
                  value={el.id}
                  style={getStyles(el.id, value, theme)}
                >
                  {el.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </>
  );
};
