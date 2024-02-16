import Wrapper from "../assets/wrappers/BigSidebar";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";
import NavLinks from "./NavLinks";
const BigSidebar = () => {
  const { showSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          !showSidebar ? "sidebar-container show-sidebar" : "sidebar-container "
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSidebar;
