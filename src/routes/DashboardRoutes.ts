import { DashboardMenuProps } from "types";
import { v4 as uuid } from "uuid";

export const DashboardMenu: DashboardMenuProps[] = [
  {
    id: uuid(),
    title: "Dashboard",
    icon: "home",
    link: "/",
  },
  {
    id: uuid(),
    title: "LAYOUTS & PAGES",
    grouptitle: true,
  },
  {
    id: uuid(),
    title: "Pages",
    icon: "layers",
    children: [
      { id: uuid(), link: "/pages/Dano", name: "Daño" },
      { id: uuid(), link: "/pages/AccVSTime", name: "Aceleración vs Tiempo" },
      { id: uuid(), link: "/pages/CDC", name: "Centro de carga" },
      { id: uuid(), link: "/pages/Bod", name: "Dummy" },
      { id: uuid(), link: "/not-found", name: "404 Error" },
    ],
  },
  {
    id: uuid(),
    title: "UI COMPONENTS",
    grouptitle: true,
  },
  {
    id: uuid(),
    title: "Components",
    icon: "monitor",
    children: [
      { id: uuid(), link: "/components/accordions", name: "Accordions" },
      { id: uuid(), link: "/components/alerts", name: "Alerts" },
      { id: uuid(), link: "/components/badges", name: "Badges" },
      { id: uuid(), link: "/components/breadcrumbs", name: "Breadcrumbs" },
      { id: uuid(), link: "/components/buttons", name: "Buttons" },
      { id: uuid(), link: "/components/button-group", name: "ButtonGroup" },
      { id: uuid(), link: "/components/cards", name: "Cards" },
      { id: uuid(), link: "/components/carousels", name: "Carousel" },
      { id: uuid(), link: "/components/close-button", name: "Close Button" },
      { id: uuid(), link: "/components/collapse", name: "Collapse" },
      { id: uuid(), link: "/components/dropdowns", name: "Dropdowns" },
      { id: uuid(), link: "/components/list-group", name: "Listgroup" },
      { id: uuid(), link: "/components/modal", name: "Modal" },
      { id: uuid(), link: "/components/navs", name: "Navs" },
      { id: uuid(), link: "/components/navbar", name: "Navbar" },
      { id: uuid(), link: "/components/offcanvas", name: "Offcanvas" },
      { id: uuid(), link: "/components/overlays", name: "Overlays" },
      { id: uuid(), link: "/components/pagination", name: "Pagination" },
      { id: uuid(), link: "/components/popovers", name: "Popovers" },
      { id: uuid(), link: "/components/progress", name: "Progress" },
      { id: uuid(), link: "/components/spinners", name: "Spinners" },
      { id: uuid(), link: "/components/tables", name: "Tables" },
      { id: uuid(), link: "/components/toasts", name: "Toasts" },
      { id: uuid(), link: "/components/tooltips", name: "Tooltips" },
    ],
  },
  {
    id: uuid(),
    title: "Menu Level",
    icon: "corner-left-down",
    children: [
      {
        id: uuid(),
        link: "#",
        title: "Two Level",
        children: [
          { id: uuid(), link: "#", name: "NavItem 1" },
          { id: uuid(), link: "#", name: "NavItem 2" },
        ],
      },
      {
        id: uuid(),
        link: "#",
        title: "Three Level",
        children: [
          {
            id: uuid(),
            link: "#",
            title: "NavItem 1",
            children: [
              { id: uuid(), link: "#", name: "NavChildItem 1" },
              { id: uuid(), link: "#", name: "NavChildItem 2" },
            ],
          },
          { id: uuid(), link: "#", name: "NavItem 2" },
        ],
      },
    ],
  },
  {
    id: uuid(),
    title: "Documentation",
    grouptitle: true,
  },

];
