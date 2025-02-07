import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IOIcons from 'react-icons/io';
import * as IOIcons5 from 'react-icons/io5';

// A list of attributes for each respective menu item
export const SidebarValues = [
    {
        title: 'Home',
        path: '/dashboard',
        icon: <AiIcons.AiFillHome/>,
        catName: 'nav-text'
    },

    {
        title: 'Profile',
        path: '/profile',
        icon: <IOIcons.IoMdPerson/>,
        catName: 'nav-text'
    },

    {
        title: 'Articles',
        path: '/articles',
        icon: <IOIcons.IoIosPaper/>,
        catName: 'nav-text'
    },

    {
        title: 'Contact Coach',
        path: '/contact-coach',
        icon: <IOIcons5.IoPaperPlaneSharp/>,
        catName: 'nav-text'
    },

    {
        title: 'Financial Tools',
        path: '/tools',
        icon: <IOIcons.IoMdStats/>,
        catName: 'nav-text'
    },

    {
        title: "Help",
        path: '/help',
        icon: <IOIcons.IoIosHelpCircle/>,
        catName: 'nav-text'
    },

    // {
    //     title: 'Logout',
    //     path: '/login',
    //     icon: <IOIcons5.IoReturnDownBackSharp/>,
    //     catName: 'nav-text'
    // },
]