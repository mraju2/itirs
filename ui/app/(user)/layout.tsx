import "../../app/globals.css";
import Header from "../../components/header";
import Footer from "../../components/footer";

export const metadata = {
  title: "SkillsConnect",
  description: "ITI Students Job Platform",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-[80vh] px-4 sm:px-8">{children}</main>
      <Footer />
    </>
  );
}
