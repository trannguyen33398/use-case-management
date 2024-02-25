import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles({
  gridItem: {
    alignItems: "flex-start",
    display: "flex",
  },
  textItem: {
    width: "100%",
  },
  headerText: {
    textAlign: "left",
  },
  hideButton: {
    display: 'none',
  },
  backIcon: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "&:hover": {
      color: "blue",
    },
    transform: "scale(1)",
    marginBottom: "10px",
  },

  div: {
    margin: "3% 3% 3% 8%",
    justifyContent: "center",
  },
  ratio: {
    display: "flex",
    flexDirection: "row",
  },
  datePicker: {
    width: "100%",
    textAlign: "center",
    justifyContent: "center",
  },
  subHeader: {
    textAlign: "left",
    textDecoration: "underline",
    fontSize: "17px !important",
  }
});

export const textFieldStyles = {
  boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.0)", // Customize the shadow here
};
