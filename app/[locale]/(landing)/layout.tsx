import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="bg-background overflow-hidden">
      <Navbar colorIcon="white" />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
