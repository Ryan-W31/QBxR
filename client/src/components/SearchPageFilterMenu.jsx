import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Card,
  Collapse,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
// SearchPageFilterMenu component. This component displays the filter menu for the search page.
const SearchPageFilterMenu = ({ getFilters }) => {
  const [openCollapse, setOpenCollapse] = useState(false);
  const [player, setPlayer] = useState(false);
  const [nonplayer, setNonplayer] = useState(false);
  const [active, setActive] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [name, setName] = useState(true);
  const [schoolOrg, setSchoolOrg] = useState(true);

  useEffect(() => {
    getFilters({
      player: player,
      nonplayer: nonplayer,
      active: active,
      inactive: inactive,
      name: name,
      schoolOrg: schoolOrg,
    });
  }, [player, nonplayer, active, inactive, name, schoolOrg]);

  const toggleCollapse = () => {
    setOpenCollapse((prevState) => !prevState);
  };

  let content;

  content = (
    <div className="grid place-items-center">
      <Button
        className="bg-green-primary rounded-full px-4 py-2 hover:bg-green-secondary font-Audiowide text-center text-sm"
        onClick={toggleCollapse}
      >
        Filters
      </Button>
      <Collapse open={openCollapse} className="mt-2 w-fit">
        <Card className="flex flex-row bg-dark-secondary border-2 border-green-primary rounded-lg">
          <List>
            <label className="flex items-center px-4 py-2">
              <Typography className="text-light-primary text-sm font-Audiowide">
                Search By Type:
              </Typography>
            </label>
            <ListItem className="p-0 hover:bg-dark-primary active:bg-opacity-80 active:bg-light-secondary text-light-primary focus:bg-opacity-80 focus:bg-dark-primary">
              <label
                htmlFor="player"
                className="flex cursor-pointer items-center px-4 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="player"
                    ripple={false}
                    className="before:bg-dark-secondary checked:bg-green-primary checked:before:bg-green-primary checked:border-green-primary hover:before:opacity-0 border-light-primary before:border-light-primary"
                    containerProps={{
                      className: "p-0",
                    }}
                    onChange={() => setPlayer(!player)}
                    checked={player}
                  />
                </ListItemPrefix>
                <Typography className="text-light-primary text-sm font-Audiowide">
                  Player
                </Typography>
              </label>
            </ListItem>
            <ListItem className="p-0 hover:bg-dark-primary active:bg-opacity-80 active:bg-light-secondary text-light-primary focus:bg-opacity-80 focus:bg-dark-primary">
              <label
                htmlFor="nonplayer"
                className="flex cursor-pointer items-center px-4 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="nonplayer"
                    ripple={false}
                    className="before:bg-dark-secondary checked:bg-green-primary checked:before:bg-green-primary checked:border-green-primary hover:before:opacity-0 border-light-primary before:border-light-primary"
                    containerProps={{
                      className: "p-0",
                    }}
                    onChange={() => setNonplayer(!nonplayer)}
                    checked={nonplayer}
                  />
                </ListItemPrefix>
                <Typography className="text-light-primary text-sm font-Audiowide">
                  Nonplayer
                </Typography>
              </label>
            </ListItem>
          </List>
          <List>
            <label className="flex  items-center px-4 py-2">
              <Typography className="text-light-primary text-sm font-Audiowide">
                Search By Activity:
              </Typography>
            </label>
            <ListItem className="p-0 hover:bg-dark-primary active:bg-opacity-80 active:bg-light-secondary text-light-primary focus:bg-opacity-80 focus:bg-dark-primary">
              <label
                htmlFor="active"
                className="flex  cursor-pointer items-center px-4 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="active"
                    ripple={false}
                    className="before:bg-dark-secondary checked:bg-green-primary checked:before:bg-green-primary checked:border-green-primary hover:before:opacity-0 border-light-primary before:border-light-primary"
                    containerProps={{
                      className: "p-0",
                    }}
                    onChange={() => setActive(!active)}
                    checked={active}
                  />
                </ListItemPrefix>
                <Typography className="text-light-primary text-sm font-Audiowide">
                  Active
                </Typography>
              </label>
            </ListItem>
            <ListItem className="p-0 hover:bg-dark-primary active:bg-opacity-80 active:bg-light-secondary text-light-primary focus:bg-opacity-80 focus:bg-dark-primary">
              <label
                htmlFor="inactive"
                className="flex cursor-pointer items-center px-4 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="inactive"
                    ripple={false}
                    className="before:bg-dark-secondary checked:bg-green-primary checked:before:bg-green-primary checked:border-green-primary hover:before:opacity-0 border-light-primary before:border-light-primary"
                    containerProps={{
                      className: "p-0",
                    }}
                    onChange={() => setInactive(!inactive)}
                    checked={inactive}
                  />
                </ListItemPrefix>
                <Typography className="text-light-primary text-sm font-Audiowide">
                  Inactive
                </Typography>
              </label>
            </ListItem>
          </List>
          <List>
            <label className="flex  items-center px-4 py-2">
              <Typography className="text-light-primary text-sm font-Audiowide">
                Search By:
              </Typography>
            </label>
            <ListItem className="p-0 hover:bg-dark-primary active:bg-opacity-80 active:bg-light-secondary text-light-primary focus:bg-opacity-80 focus:bg-dark-primary">
              <label
                htmlFor="name"
                className="flex  cursor-pointer items-center px-4 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="name"
                    ripple={false}
                    className="before:bg-dark-secondary checked:bg-green-primary checked:before:bg-green-primary checked:border-green-primary hover:before:opacity-0 border-light-primary before:border-light-primary"
                    containerProps={{
                      className: "p-0",
                    }}
                    onChange={() => setName(!name)}
                    checked={name}
                  />
                </ListItemPrefix>
                <Typography className="text-light-primary text-sm font-Audiowide">
                  Name
                </Typography>
              </label>
            </ListItem>
            <ListItem className="p-0 hover:bg-dark-primary active:bg-opacity-80 active:bg-light-secondary text-light-primary focus:bg-opacity-80 focus:bg-dark-primary">
              <label
                htmlFor="school"
                className="flex  cursor-pointer items-center px-4 py-2"
              >
                <ListItemPrefix className="mr-3">
                  <Checkbox
                    id="school"
                    ripple={false}
                    className="before:bg-dark-secondary checked:bg-green-primary checked:before:bg-green-primary checked:border-green-primary hover:before:opacity-0 border-light-primary before:border-light-primary"
                    containerProps={{
                      className: "p-0",
                    }}
                    onChange={() => setSchoolOrg(!schoolOrg)}
                    checked={schoolOrg}
                  />
                </ListItemPrefix>
                <Typography className="text-light-primary text-sm font-Audiowide">
                  School/Organization
                </Typography>
              </label>
            </ListItem>
          </List>
        </Card>
      </Collapse>
    </div>
  );

  return content;
};

export default SearchPageFilterMenu;
