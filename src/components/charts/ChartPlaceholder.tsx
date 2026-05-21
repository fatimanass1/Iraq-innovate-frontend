import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";

export function ChartPlaceholder() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analytics Chart</CardTitle>
        <CardDescription>Dashboard-ready chart slot for future metrics.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-48 items-center justify-center rounded-lg border border-dashed border-border bg-muted/40 text-sm text-muted-foreground">
          Chart component placeholder
        </div>
      </CardContent>
    </Card>
  );
}
