import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import {   Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const Home = () => {
  const { toast } = useToast();

  return (
    <Card className="relative rounded-lg border text-card-foreground border-[#d8dde6] dark:border-[#272727] bg-background dark:bg-[#191919] py-8 px-4 my-5 lg:my-8 mx-auto max-w-screen-xl w-11/12 lg:py-7 lg:px-12 overflow-hidden">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start ">
        <Button
          onClick={() => {
            toast({
              title: "Scheduled: Catch up",
              description: "Friday, February 10, 2023 at 5:57 PM",
            });
          }}
        >
          Show Toast
        </Button>

        <Dialog>
  <DialogTrigger><Button>Open Dialog Box</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

      </main>
    </Card>
  );
};

export default Home;
