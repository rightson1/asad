// Import Navbar component
import Navbar from "@/components/utils/Navbar";

// MainLayout component
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Return a section with Navbar and children
  return (
    <section>
      {/* // Navbar component with home prop set to true */}
      <Navbar home={true} />
      {/* // Children components */}
      {children}
    </section>
  );
}
