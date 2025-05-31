import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import {
  BellIcon,
  HomeIcon,
  MessagesSquare,
  UsersIcon,
  Menu,
  X
} from "lucide-react";
import { useState, useEffect } from "react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [currentPath, isMobile]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setCollapsed(!collapsed);

  const navItems = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/friends", label: "Friends", icon: UsersIcon },
    { to: "/notifications", label: "Notifications", icon: BellIcon },
  ];

  return (
    <>
      {/* Mobile Hamburger */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 bg-base-200 rounded-lg shadow-lg border border-base-300"
        >
          {isOpen ? (
            <X className="size-6 text-base-content" />
          ) : (
            <Menu className="size-6 text-base-content" />
          )}
        </button>
      )}

      {/* Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`top-0 sticky left-0 min-h-screen border-r border-base-300 bg-base-200 z-50 flex flex-col transition-all duration-300
        ${isMobile
          ? `fixed transform ${
              isOpen ? "translate-x-0 w-48" : "-translate-x-full w-0"
            } overflow-hidden`
          : `sticky ${collapsed ? "w-20" : "w-64"}`}
        `}
      >
        {/* Brand */}
        <div className="p-0 lg:p-5 border-b border-base-300 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <MessagesSquare className="size-6 text-primary" />
            {!collapsed && (
              <span className="text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                Synkora
              </span>
            )}
          </Link>
          {!isMobile && (
            <button
              className="ml-auto p-1 rounded-md hover:bg-base-300"
              onClick={toggleCollapse}
            >
              {collapsed ? <Menu className="size-5" /> : <X className="size-5" />}
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`btn btn-ghost w-full flex items-center gap-3 px-3 normal-case justify-start ${
                currentPath === to ? "btn-active" : ""
              }`}
            >
              <Icon className="size-5 text-base-content opacity-70" />
              {!collapsed && <span>{label}</span>}
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-base-300 mt-auto">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={authUser?.profilePic} alt="User Avatar" />
              </div>
            </div>
            {!collapsed && (
              <div className="flex-1">
                <p className="font-semibold text-sm">{authUser?.fullName}</p>
                <p className="text-xs text-success flex items-center gap-1">
                  <span className="size-2 rounded-full bg-success inline-block" />
                  Online
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
