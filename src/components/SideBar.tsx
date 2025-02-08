import Flag from "/public/logos/flag.svg";
import Location from "/public/logos/location.svg";

interface SidebarProps {
  step: number;
}

const Sidebar: React.FC<SidebarProps> = ({ step }) => {
  const ACTIVE_STEP_STYLES = "bg-[#F7F7F7] font-semibold";
  const INACTIVE_TEXT_COLOR = "#6B6B6B";
  const ACTIVE_TEXT_COLOR = "#2E2B2B";

  const getNavItemClass = (itemStep: number) =>
    step === itemStep ? ACTIVE_STEP_STYLES : "";

  const getTextColor = (itemStep: number) =>
    step === itemStep ? ACTIVE_TEXT_COLOR : INACTIVE_TEXT_COLOR;

  return (
    <div className="flex flex-col pr-2 border-r-[1px] border-r-[#E7E7E7] relative ">
      <nav
        style={{ position: "-webkit-sticky" }}
        className="flex flex-col pr-[1.6rem]   sticky top-0 z-10"
      >
        <div
          className={`flex gap-[0.6rem] rounded-md ${getNavItemClass(
            1
          )} px-7 py-3`}
        >
          <Flag alt="Home" stroke={getTextColor(1)} />
          <span className={`text-[${getTextColor(1)}]`}>Activity Details</span>
        </div>
        <div
          className={`flex gap-[0.6rem] rounded-md ${getNavItemClass(
            2
          )} px-7 py-3`}
        >
          <Location alt="loc" stroke={getTextColor(2)} />
          <span className={`text-[${getTextColor(2)}]`}>Location Details</span>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
