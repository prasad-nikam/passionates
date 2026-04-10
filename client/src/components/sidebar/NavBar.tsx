import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  House,
  MessageCircle,
  MessageSquare,
  Search,
  StickyNote,
  User,
} from 'lucide-react';

const NavBar = () => {
  const { pathname } = useLocation();

  type NavItem = {
    label: string;
    href: string;
    icon?: React.ReactNode;
    badge?: React.ReactNode;
  };

  const navItems: NavItem[] = [
    { label: 'Feed', href: '/', icon: <StickyNote /> },
    { label: 'Messages', href: '/message', icon: <MessageSquare /> },
    { label: 'Friends', href: '/friends', icon: <User /> },
    { label: 'Search', href: '/search', icon: <Search /> },
  ];

  return (
    <div className="mt-4 flex w-full flex-col gap-2 text-xl font-semibold">
      {navItems.map(({ label, href, icon }) => {
        const isActive =
          href === '/' ? pathname === '/' : pathname.startsWith(href);

        return (
          <NavLink
            key={href}
            to={href}
            className="relative flex h-12 w-full items-center justify-between rounded-2xl"
          >
            {isActive && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 rounded-2xl bg-neutral-950"
                transition={{ type: 'spring', stiffness: 1000, damping: 45 }}
              />
            )}
            <div
              className={`z-10 flex items-center justify-between gap-4 px-4 ${isActive ? 'text-white' : 'text-black'}`}
            >
              {icon && icon}
              <span className={`relative`}>{label}</span>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default NavBar;
