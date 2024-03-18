import Navbar from "@/components/utils/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navbar home={true} />
      {children}
    </section>
  );
}
