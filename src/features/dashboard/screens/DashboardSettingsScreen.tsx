import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";

export function DashboardSettingsScreen() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-2 text-muted-foreground">
          Future admin configuration modules can live in this feature namespace.
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Workspace Preferences</CardTitle>
          <CardDescription>
            Extend this screen with role-based settings, billing, and integrations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Settings forms, validation schemas, and API services should be added under{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">features/dashboard/</code>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
