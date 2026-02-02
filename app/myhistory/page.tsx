"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { History } from "lucide-react";

export default function MyHistory() {
  return (
    <div className="container mx-auto py-20 flex justify-center items-center h-[calc(100vh-64px)]">
      <Card className="max-w-md w-full text-center p-8 border-dashed">
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <History className="h-10 w-10 text-primary animate-pulse" />
          </div>
          <CardTitle className="text-3xl font-bold">My Reading History</CardTitle>
          <CardDescription className="text-lg">
            Track your literary journey seamlessly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            We are working on bringing your personalized reading history and bookmarks to this page. Check back soon!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
