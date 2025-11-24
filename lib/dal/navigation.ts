export type NavigationItem = {
  title: string;
  url: string;
  icon?: string;
  isActive?: boolean;
  items?: {
    title: string;
    url: string;
  }[];
};

// Simulate API delay for testing - REMOVE IN PRODUCTION
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getNavigationData(): Promise<NavigationItem[]> {
  // Simulate slow API - REMOVE IN PRODUCTION
  await delay(1000);

  return [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: "home",
      isActive: true,
    },
    {
      title: "Projects",
      url: "#",
      icon: "square-terminal",
      items: [
        {
          title: "New Project",
          url: "/projects/new",
        },
        {
          title: "All Projects",
          url: "/projects",
        },
      ],
    },
    {
      title: "Clients",
      url: "#",
      icon: "bot",
      items: [
        {
          title: "New Client",
          url: "/clients/new",
        },
        {
          title: "All Clients",
          url: "/clients",
        },
      ],
    },
    {
      title: "Users",
      url: "/users",
      icon: "book-open",
      items: [
        {
          title: "New User",
          url: "/users/new",
        },
        {
          title: "All Users",
          url: "/users",
        },
      ],
    },
  ];
}
