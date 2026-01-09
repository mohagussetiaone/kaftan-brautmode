import { Activity, BookImage, Building2Icon, CalendarDays, HandCoins, HelpCircle, HomeIcon, ListOrdered, Logs, ReceiptText, Send, Users } from "lucide-react";

export interface SubItems {
  name: string;
  to: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface SubRouteItem {
  name: string;
  items?: SubItems[];
}

export interface RouteItem {
  name: string;
  to: string;
  subRoutes?: SubRouteItem[];
  description?: string;
}

export const routes: RouteItem[] = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Shop",
    to: "/shop",
    subRoutes: [
      {
        name: "Wedding dress",
        items: [
          {
            name: "Modest",
            to: "/shop?category=modest",
            description: "Browse our complete collection",
          },
          {
            name: "A Line",
            to: "/shop?category=a-line",
            description: "Latest products just arrived",
          },
          {
            name: "Open ecked",
            to: "/shop?category=open-ecked",
            description: "Our most popular items",
          },
          {
            name: "Luxury",
            to: "/shop?category=luxury",
            description: "Curated selections",
          },
          {
            name: "Plus size",
            to: "/shop?category=plus-size",
            description: "Clothing & accessories for men",
          },
        ],
      },
      {
        name: "Accessories",
        items: [
          {
            name: "Veils",
            to: "/shop?category=veils",
            description: "Browse our complete collection",
          },
          {
            name: "Gloves",
            to: "/shop?category=gloves",
            description: "Browse our complete collection",
          },
          {
            name: "Baleros",
            to: "/shop?category=baleros",
            description: "Browse our complete collection",
          },
          {
            name: "Jewelry",
            to: "/shop?category=jewelry",
            description: "Browse our complete collection",
          },
          {
            name: "Beits",
            to: "/shop?category=beits",
            description: "Browse our complete collection",
          },
        ],
      },
      {
        name: "Uncovered",
      },
    ],
  },
  {
    name: "About Us",
    to: "/about",
  },
  {
    name: "Contact",
    to: "/contact",
  },
];

export const sidebarRoutes = {
  user: {
    name: "Moh Agus Setiawan",
    email: "mohagussetiaone@gmail.com",
    avatar: "../assets/images/logo/logo.png",
  },
  dashboard: [
    {
      name: "Dashboard",
      url: "/admin",
      icon: HomeIcon,
    },
    {
      name: "Pengguna",
      url: "/admin/users",
      icon: Users,
    },
    {
      name: "Perusahaan",
      url: "/admin/company",
      icon: Building2Icon,
    },
  ],
  produk: [
    {
      title: "Katalog & Produk",
      url: "#",
      icon: BookImage,
      items: [
        {
          title: "Kategori Undangan",
          url: "/admin/category-invitation",
        },
        {
          title: "Katalog Undangan",
          url: "/admin/catalog",
        },
        {
          title: "Rating & Review",
          url: "/admin/reviews",
        },
        {
          title: "Template Doa",
          url: "/admin/prayer-templates",
        },
        {
          title: "Manajemen Lagu",
          url: "/admin/songs",
        },
      ],
    },
  ],
  undangan: [
    {
      title: "Katalog",
      url: "#",
      icon: BookImage,
      items: [
        {
          title: "Kategori Undangan",
          url: "/admin/category-invitation",
        },
        {
          title: "Katalog Undangan",
          url: "/admin/catalog",
        },
        {
          title: "Ratting Katalog",
          url: "/admin/catalog/rating",
        },
      ],
    },
    {
      title: "Undangan",
      url: "#",
      icon: Send,
      items: [
        {
          title: "Semua Undangan",
          url: "/admin/invitations-user",
        },
        {
          title: "Buku Tamu",
          url: "/admin/guest-books",
        },
        {
          title: "Konfirmasi Kehadiran",
          url: "/admin/invitations-rsvp",
        },
        {
          title: "Template Pesan Tamu",
          url: "/admin/guest-templates",
        },
        {
          title: "Template Lagu",
          url: "/admin/songs-templates",
        },
      ],
    },
  ],
  transaksi: [
    {
      name: "Semua Transaksi",
      url: "/admin/transactions",
      icon: Logs,
    },
    {
      name: "Manajemen Order",
      url: "/admin/orders",
      icon: ListOrdered,
    },
    {
      name: "Manajemen Invoice",
      url: "/admin/invoices",
      icon: ReceiptText,
    },
    {
      name: "Laporan Keuangan",
      url: "/admin/financial-reports",
      icon: HandCoins,
    },
  ],
  reservasi: [
    {
      name: "Semua Reservasi",
      url: "/admin/reservation",
      icon: ListOrdered,
    },
    {
      name: "Kalender Reservasi",
      url: "/admin/reservation-calendar",
      icon: CalendarDays,
    },
  ],
  system: [
    // {
    //   name: "Notifikasi Sistem",
    //   url: "/admin/notifications",
    //   icon: Bell,
    // },
    {
      name: "Audit Log",
      url: "/admin/audit-logs",
      icon: Activity,
    },
    {
      name: "Manajemen FAQ",
      url: "/admin/faq",
      icon: HelpCircle,
    },
  ],
};
