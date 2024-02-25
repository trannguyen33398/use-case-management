import Grid from "@mui/material/Grid";
import {
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useStyles } from "../styles/common";
import { useEffect, useState } from "react";

export const BooleanSelection = ({ xs = 3, md = 3, ...props }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;

    props.onChangeText(props.itemId, text);
  };
  const [value, setValue] = useState<string>(props.value);
  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

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
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={handleChange}
          value={value}
          defaultValue={"true"}
        
        >
          <FormControlLabel value="true" control={<Radio />} label="True" disabled={props.disable}/>
          <FormControlLabel value="false" control={<Radio />} label="False" disabled={props.disable}/>
        </RadioGroup>
      </Grid>
    </>
  );
};
