import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  PowerIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Link from "next/link";
import useAuth from "@hooks/useAuth";
import { MenuItems } from "@types";
import {signOut} from "next-auth/react"

interface Props {
  menuItems: MenuItems[];
}

export default function ProfileMenu({ menuItems }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const { isAdmin } = useAuth();

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
          placeholder={""}
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="candice wu"
            className="border border-blue-500 p-0.5"
            placeholder={""}
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList placeholder={""} className="p-1">
        {menuItems.map(({ href, icon, label }) => {
          return (
            <Link key={href} href={href} className="outline-none">
              <MenuItem
                placeholder={""}
                onClick={closeMenu}
                className="flex items-center gap-2 rounded"
              >
                {icon}
                <span>{label}</span>
              </MenuItem>
            </Link>
          );
        })}

        {isAdmin ? (
          <Link href="/dashboard" className="outline-none">
            <MenuItem
              placeholder={""}
              onClick={closeMenu}
              className="flex items-center gap-2 rounded"
            >
              <RectangleGroupIcon className="h-4 w-4" />
              <span>Dashboard</span>
            </MenuItem>
          </Link>
        ) : null}

        <MenuItem placeholder={""}>
          <div onClick={async()=>await signOut()}>
            <p className="flex items-center gap-2 rounded">
              <PowerIcon className="h-4 w-4" />
              <span>Sign Out</span>
            </p>
          </div>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
