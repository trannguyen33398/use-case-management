import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type TNavigateButtonProps = {
  name: string;
  path: string;
};

export const NavigateButton = (props: TNavigateButtonProps) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="contained"
      style={{
        height: "40px",
        width: "100px",
      }}
      onClick={() => navigate(props.path)}
    >
      {props.name}
    </Button>
  );
};
