import Footer from "@/components/main/landing-page/footer";
import Navbar from "@/components/main/navbar/page";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
