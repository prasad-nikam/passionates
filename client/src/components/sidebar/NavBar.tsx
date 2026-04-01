import { NavLink, useLocation } from "react-router-dom";
import { motion } from "motion/react";

const NavBar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { label: "Feed", href: "/" },
    { label: "Message", href: "/message" },
    { label: "Friends", href: "/friends" },
  ];

  return (
    <div className="mt-4 flex w-full flex-col gap-2 text-xl font-semibold">
      {navItems.map(({ label, href }) => {
        const isActive =
          href === "/" ? pathname === "/" : pathname.startsWith(href);

        return (
          <NavLink
            key={href}
            to={href}
            className="relative flex h-12 w-full items-center justify-center rounded-2xl"
          >
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 rounded-2xl bg-neutral-950"
                transition={{ type: "spring", stiffness: 1000, damping: 45 }}
              />
            )}
            <span
              className={`relative z-10 ${isActive ? "text-white" : "text-black"}`}
            >
              {label}
            </span>
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavBar;
