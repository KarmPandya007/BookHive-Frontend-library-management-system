"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Compass } from "lucide-react";

export default function ExploreBooks() {
  return (
    <div className="container mx-auto py-20 flex justify-center items-center h-[calc(100vh-64px)]">
      <Card className="max-w-md w-full text-center p-8 border-dashed">
        <CardHeader className="flex flex-col items-center gap-4">
          <div className="bg-primary/10 p-4 rounded-full">
            <Compass className="h-10 w-10 text-primary animate-pulse" />
          </div>
          <CardTitle className="text-3xl font-bold">Explore Books</CardTitle>
          <CardDescription className="text-lg">
            Our AI-powered recommendation system is currently under development.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Soon you'll be able to discover books based on your interests and previous reading history. Stay tuned!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
