import { Header } from "@/components/ui/header";
import { BottomNav } from "@/components/ui/bottom-nav";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-md mx-auto pt-12 pb-16 px-4">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
