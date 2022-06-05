import { Layout, Sliders, Users } from "react-feather";

const overview = [
  {
    href: "/overview",
    icon: Sliders,
    title: "Overview",
  },
];

const pagesSection = [
  // {
  //   href: "/listings",
  //   icon: Layout,
  //   title: "Listings",
  // },
  // {
  //   href: "/reviews",
  //   icon: Users,
  //   title: "Reviews",
  //   children: [
  //     {
  //       href: "/reviews/manager",
  //       title: "Review Manager",
  //     },
  //     {
  //       href: "/reviews/request",
  //       title: "Review Request",
  //     },
  //   ],
  // },
  {
    href: "/seo/keyword-search",
    icon: Layout,
    title: "Beyond SEO",
  },
];

const partnerTool = [
  {
    href: "/tools",
    icon: Sliders,
    title: "Partner Tools",
    children: [
      // {
      //   href: "/tools/devices",
      //   title: "Devices",
      // },
      {
        href: "/tools/accounts",
        title: "Accounts",
      },
      // {
      //   href: "/tools/partner",
      //   title: "Partner",
      // },
      // {
      //   href: "/tools/wifi-marketing-demo",
      //   title: "WIFI Marketing Demo",
      // },
      // {
      //   href: "/tools/demo-accounts",
      //   title: "Demo Accounts",
      // },
      // {
      //   href: "/tools/partner-insights",
      //   title: "Partner Insights",
      // },
    ],
  },
];
const myLocations = [
  {
    href: "/location",
    icon: Sliders,
    title: "Locations",
    children: [
      // {
      //   href: "/tools/devices",
      //   title: "Devices",
      // },
      {
        href: "/location/add-locations",
        title: "Add new location",
      },
      {
        href: "/location",
        title: "My Locations",
      },
      // {
      //   href: "/tools/wifi-marketing-demo",
      //   title: "WIFI Marketing Demo",
      // },
      // {
      //   href: "/tools/demo-accounts",
      //   title: "Demo Accounts",
      // },
      // {
      //   href: "/tools/partner-insights",
      //   title: "Partner Insights",
      // },
    ],
  },
];

const navItems = [
  {
    title: "",
    pages: overview,
  },
  {
    title: "Products",
    pages: pagesSection,
  },
  {
    title: "",
    pages: partnerTool,
  },
  {
    title: "Manage locations",
    pages: myLocations,
  },
];

export default navItems;
