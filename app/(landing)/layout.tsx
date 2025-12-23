import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="bg-background">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
