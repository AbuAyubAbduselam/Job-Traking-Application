import { useState } from "react";
import { Menu } from "antd";

import { NavLink } from "react-router-dom";
import { useDashboardContext } from "../pages/DashboardLayout";
import links from "../utils/Links";

const { SubMenu } = Menu;

const NavLinks = ({ isBigSidebar }) => {
  const { toggleSidebar, user } = useDashboardContext();
  const [openKeys, setOpenKeys] = useState([]);

  const handleOpenChange = (keys) => {
    setOpenKeys(keys);
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={handleOpenChange}
      style={{ width: 256 }}
      className="flex flex-col gap-4 bg-[var( --background-color)]"
    >
      {links.map((link) => {
        const { text, path, icon, subLinks } = link;
        const { role } = user;
        if (path === "admin" && role !== "admin") return null;

        if (subLinks) {
          return (
            <SubMenu key={text} icon={icon} title={text}>
              {subLinks.map((subLink) => (
                <Menu.Item key={subLink.text}>
                  <NavLink
                    to={subLink.path}
                    onClick={isBigSidebar ? null : toggleSidebar}
                  >
                    {subLink.text}
                  </NavLink>
                </Menu.Item>
              ))}
            </SubMenu>
          );
        }

        return (
          <Menu.Item key={text} icon={icon}>
            <NavLink to={path} onClick={isBigSidebar ? null : toggleSidebar}>
              {text}
            </NavLink>
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default NavLinks;
