import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Order from "@/pages/Order";

const Home = () => {
  const { toast } = useToast();

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start ">
      <Card className="p-6">Home Page</Card>
    </main>
  );
};

export default Home;
