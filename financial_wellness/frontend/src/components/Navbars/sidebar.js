import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IOIcons from "react-icons/io";
import * as IOIcons5 from "react-icons/io5";
import * as VscIcons from "react-icons/vsc";
import * as BiIcons from "react-icons/bi";

// A list of attributes for each respective menu item
export const SidebarValues = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <AiIcons.AiFillHome />,
    catName: "nav-text",
  },

  {
    title: "Create Articles",
    path: "/admin/create",
    icon: <BiIcons.BiCommentDetail />,
    catName: "nav-text",
  },

  {
    title: "Manage Articles",
    path: "/admin/manage",
    icon: <IOIcons5.IoBookmarksOutline />,
    catName: "nav-text",
  },

  {
    title: "Register Email Addresses",
    path: "/admin/emails",
    icon: <IOIcons.IoIosCloudUpload />,
    catName: "nav-text",
  },

  {
    title: "View/Edit User Info",
    path: "/admin/userinfo",
    icon: <VscIcons.VscListUnordered />,
    catName: "nav-text",
  },

  {
    title: "Download Reports",
    path: "/admin/reports",
    icon: <IOIcons.IoMdCloudDownload />,
    catName: "nav-text",
  },

  // {
  //     title: 'Logout',
  //     path: '/login',
  //     icon: <IOIcons5.IoReturnDownBackSharp/>,
  //     catName: 'nav-text'
  // },
];
