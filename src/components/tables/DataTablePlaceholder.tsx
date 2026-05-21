import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

const SAMPLE_ROWS = [
  { id: "1", name: "Innovation Hub", status: "Active" },
  { id: "2", name: "Startup Program", status: "Pending" },
  { id: "3", name: "Research Grant", status: "Active" },
];

export function DataTablePlaceholder() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="py-3 pr-4 font-medium">Name</th>
                <th className="py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_ROWS.map((row) => (
                <tr key={row.id} className="border-b border-border/70">
                  <td className="py-3 pr-4">{row.name}</td>
                  <td className="py-3">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
