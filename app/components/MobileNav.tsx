import React from "react";
import {
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { XMarkIcon, RectangleGroupIcon } from "@heroicons/react/24/outline";
import { PowerIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import useAuth from "@hooks/useAuth";
import { MenuItems } from "@types";
import Logo from "./navbar/Logo";

interface Props {
  open: boolean;
  onClose(): void;
  menuItems: MenuItems[];
}

export function MobileNav({ open, onClose, menuItems }: Props) {
  const {  loggedIn,isAdmin } = useAuth();

  return (
    <>
      <Drawer placeholder={""} open={open} onClose={onClose}>
        <div className="mb-2 flex items-center justify-between p-4 z-50">
          <Logo width={60} height={30}/>
          <IconButton
            placeholder={""}
            variant="text"
            color="blue-gray"
            onClick={onClose}
          >
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <List placeholder={""}>
          {menuItems.map(({ href, icon, label }) => {
            return (
              <Link key={href} href={href}>
                <ListItem placeholder={""} onClick={onClose}>
                  <ListItemPrefix placeholder={""}>{icon}</ListItemPrefix>
                  {label}
                </ListItem>
              </Link>
            );
          })}

          {isAdmin ? (
            <Link href="/dashboard">
              <ListItem placeholder={""} onClick={onClose}>
                <ListItemPrefix placeholder={""}>
                  <RectangleGroupIcon className="h-4 w-4" />
                </ListItemPrefix>
                Dashboard
              </ListItem>
            </Link>
          ) : null}

          {loggedIn ? (
            <ListItem placeholder={""}>
              <ListItemPrefix placeholder={""}>
                <PowerIcon className="h-5 w-5" />
              </ListItemPrefix>
              Sign Out
            </ListItem>
          ) : (
            <div className="flex items-center">
              <Link
                className="px-4 py-1 flex-1 text-center"
                href="/auth/signin"
              >
                Sign in
              </Link>
              <Link
                className="bg-blue-500 text-white px-4 py-1 rounded flex-1 text-center"
                href="/auth/signup"
              >
                Sign up
              </Link>
            </div>
          )}
        </List>
      </Drawer>
    </>
  );
}
