import { Grid } from "@mui/material";
import { useStyles } from "../../styles/common";
import { MenuItem } from "../../components/MenuItem";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import MemoryIcon from "@mui/icons-material/Memory";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";
import FactoryIcon from "@mui/icons-material/Factory";
import SettingsIcon from "@mui/icons-material/Settings";
import EarbudsIcon from "@mui/icons-material/Earbuds";
import StreamIcon from "@mui/icons-material/Stream";
import AlignVerticalCenterIcon from "@mui/icons-material/AlignVerticalCenter";
import React from "react";
import css from "./MainMenu.module.css";
import { useNavigate } from "react-router";
import CategoryIcon from '@mui/icons-material/Category';

const data = [
  {
    header: "Use Case Inventory",
    items: [
      { label: "Use Case", icons: <DashboardIcon />, path: "/use-cases/all" },
      {
        label: "Use Case Cluster",
        icons: <AlignVerticalCenterIcon />,
        path: "/use-case-cluster/all",
      },
    ],
  },
  {
    header: "Use Case Planning",
    items: [
      { label: "Sprints", icons: <AllInclusiveIcon />, path: "/sprints/all" },
      { label: "Bundles", icons: <AllInboxIcon />, path: "/bundles/all" },
    ],
  },
  {
    header: "Use Case Benefits",
    items: [
      { label: "Benefits", icons: <LoyaltyIcon />, path: "/benefits/all" },
      { label: "Benefit Categories", icons: <CategoryIcon />, path: "/benefit-categories/all" },
      { label: "Risks", icons: <CrisisAlertIcon />, path: "/risks/all" },
    ],
  },
  {
    header: "Operations Digitization Management",
    items: [
      {
        label: "Service Lines",
        icons: <EarbudsIcon />,
        path: "/service-lines/all",
      },
      {
        label: "Communication Streams",
        icons: <StreamIcon />,
        path: "/communication-streams/all",
      },
      { label: "Systems", icons: <SettingsIcon />, path: "/systems/all" },
      { label: "Machines", icons: <FactoryIcon />, path: "/machines/all" },
    ],
  },
  {
    header: "Plants And Processes",
    items: [
      { label: "Plants", icons: <FactoryIcon />, path: "/plants/all" },
      { label: "Processes", icons: <MemoryIcon />, path: "/processes/all" },
    ],
  },
];
export const MainMenu = () => {
  const navigate = useNavigate();
  const onMenuClick = (path: string) => {
    navigate(path);
  };

  const classes = useStyles();
  return (
    <div className={classes.div}>
      <h2 className={classes.headerText}>Main Menu</h2>
      {data.map((group) => (
        <React.Fragment key={group.header}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={12} sm={12} md={12}>
              <h3 className={css["grouping-header"]}>{group.header}</h3>
            </Grid>
          </Grid>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {group.items.map((item) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                key={item.label}
                onClick={() => onMenuClick(item.path)}
              >
                <MenuItem label={item.label} icons={item.icons} />
              </Grid>
            ))}
          </Grid>
        </React.Fragment>
      ))}
    </div>
  );
};
