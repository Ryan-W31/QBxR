import { useEffect, useState } from "react";
import { Collapsible, CollapsibleContent } from "./ui/collapsible";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";

type SearchPageFilterMenuProps = {
  getFilters: (filters: {
    player: boolean;
    nonplayer: boolean;
    active: boolean;
    inactive: boolean;
    name: boolean;
    schoolOrg: boolean;
  }) => void;
};
// SearchPageFilterMenu component. This component displays the filter menu for the search page.
const SearchPageFilterMenu = ({ getFilters }: SearchPageFilterMenuProps) => {
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
      <Button size="lg" onClick={toggleCollapse}>
        Filters
      </Button>
      <Collapsible
        open={openCollapse}
        onOpenChange={toggleCollapse}
        className={cn(openCollapse && "border-2 border-primary", "mt-2 w-[75%] rounded-lg")}
      >
        <CollapsibleContent className="bg-dark-secondary flex flex-row items-center justify-between p-4">
          <div className="grid grid-cols-1 place-items-start">
            <label className="mb-2 flex items-center">
              <p className="text-light-primary text-base">Search By User Type:</p>
            </label>{" "}
            <div className="flex items-center">
              <Checkbox id="player" onCheckedChange={() => setPlayer(!player)} checked={player} />
              <label htmlFor="player" className="text-light-primary ml-2 text-base">
                Player
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox id="nonplayer" onCheckedChange={() => setNonplayer(!nonplayer)} checked={nonplayer} />
              <label htmlFor="label" className="text-light-primary ml-2 text-base">
                Nonplayer
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 place-items-start">
            <label className="mb-2 flex items-center">
              <p className="text-light-primary text-base">Search By Status:</p>
            </label>
            <div className="flex items-center">
              <Checkbox id="active" onCheckedChange={() => setActive(!active)} checked={active} />
              <label htmlFor="active" className="text-light-primary ml-2 text-base">
                Active
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox id="inactive" onCheckedChange={() => setInactive(!inactive)} checked={inactive} />
              <label htmlFor="inactive" className="text-light-primary ml-2 text-base">
                Inactive
              </label>
            </div>
          </div>
          <div className="grid grid-cols-1 place-items-start">
            <label className="mb-2 flex items-center">
              <p className="text-light-primary text-base">Search By:</p>
            </label>
            <div className="flex items-center">
              <Checkbox id="name" onCheckedChange={() => setName(!name)} checked={name} />
              <label htmlFor="name" className="text-light-primary ml-2 text-base">
                Name
              </label>
            </div>
            <div className="flex items-center">
              <Checkbox id="school" onCheckedChange={() => setSchoolOrg(!schoolOrg)} checked={schoolOrg} />
              <label htmlFor="school" className="text-light-primary ml-2 text-base">
                School/Organization
              </label>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );

  return content;
};

export default SearchPageFilterMenu;
