import Navbar from "@/components/utils/Navbar";
import { useUser } from "@/utils/";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
}
