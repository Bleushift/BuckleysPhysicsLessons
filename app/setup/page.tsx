import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Database, ExternalLink } from "lucide-react"

export default function SetupPage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Database Setup</h1>
        <p className="text-muted-foreground">Configure your database connection to enable full functionality</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Neon Database Setup
            </CardTitle>
            <CardDescription>Follow these steps to set up your Neon PostgreSQL database</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">1. Create a Neon Account</h3>
              <p className="text-sm text-muted-foreground">
                Go to{" "}
                <a
                  href="https://neon.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-flex items-center gap-1"
                >
                  neon.tech <ExternalLink className="h-3 w-3" />
                </a>{" "}
                and create a free account
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">2. Create a New Project</h3>
              <p className="text-sm text-muted-foreground">Create a new project and database in your Neon dashboard</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">3. Get Connection String</h3>
              <p className="text-sm text-muted-foreground">
                Copy your database connection string from the Neon dashboard
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold">4. Set Environment Variable</h3>
              <Alert>
                <AlertDescription>
                  Add this to your environment variables:
                  <br />
                  <code className="bg-muted px-2 py-1 rounded text-sm mt-2 block">
                    DATABASE_URL=your_neon_connection_string_here
                  </code>
                </AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alternative: Local Development</CardTitle>
            <CardDescription>For local development without a database</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <AlertDescription>
                The dashboard will work in demo mode without a database connection. CSV uploads will be parsed and
                displayed, but data won't be persisted.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database Schema</CardTitle>
            <CardDescription>Once connected, the following tables will be created automatically</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div>
                <strong>students</strong> - Student information and groups
              </div>
              <div>
                <strong>questions</strong> - Question details and topics
              </div>
              <div>
                <strong>attempts</strong> - Student attempt records
              </div>
              <div>
                <strong>topics</strong> - Physics topic hierarchy
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
