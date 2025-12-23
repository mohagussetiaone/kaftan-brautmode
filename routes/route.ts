import { Activity, BookImage, Building2Icon, CalendarDays, HandCoins, HelpCircle, HomeIcon, ListOrdered, Logs, ReceiptText, Send, Users } from "lucide-react";

type Route = {
  name: string;
  to: string;
  perm: string[];
  tag: string;
};

export const routes: Route[] = [
  { name: "Home", to: "/", perm: ["public"], tag: "public" },
  { name: "Shop", to: "/shop", perm: ["public"], tag: "public" },
  { name: "About Us", to: "/about", perm: ["public"], tag: "public" },
  { name: "Blog", to: "/#blog", perm: ["public"], tag: "public" },
  { name: "Contact", to: "/#contact", perm: ["public"], tag: "public" },
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
