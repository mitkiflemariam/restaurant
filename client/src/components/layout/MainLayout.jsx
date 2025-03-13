import Navbar from "../main/Navbar";
import { Card, CardContent } from "../ui/card";

export function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen  py-8 px-4">
        <Card className="max-w-7xl mx-auto">
          <CardContent className="p-6">{children}</CardContent>
        </Card>
      </div>
    </>
  );
}
