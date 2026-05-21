import { ChartPlaceholder } from "@/components/charts/ChartPlaceholder";
import { DataTablePlaceholder } from "@/components/tables/DataTablePlaceholder";
import { Badge } from "@/components/ui";

export function DashboardScreen() {
  return (
    <div className="space-y-8">
      <div>
        <Badge className="mb-3">Dashboard</Badge>
        <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
        <p className="mt-2 text-muted-foreground">
          Admin-ready workspace with reusable charts, tables, and sidebar navigation.
        </p>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartPlaceholder />
        <DataTablePlaceholder />
      </div>
    </div>
  );
}
