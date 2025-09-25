import { HelpRequestForm } from "@/components/HelpRequestForm";
import { GenerateForm } from "@/components/GenerateForm";
import { cookies } from "next/headers";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type HelpRequest = {
  id: number;
  description?: string;
  address: string;
  latitude?: number;
  longitude?: number;
  created_at: string;
  process_status: string;
};

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("apiToken")?.value;

  let helpRequests: HelpRequest[] = [];
  let error = null;

  if (token) {
    try {
      const res = await fetch(`http://tsunagime-api:8000/api/v1/help-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        next: {
          revalidate: 0 // Don't cache this request
        },
      });

      if (res.ok) {
        helpRequests = await res.json();
      } else {
        error = `Failed to fetch help requests: ${res.status} ${res.statusText}`;
        console.error("API Response:", await res.text().catch(() => "Could not read response text"));
      }
    } catch (e) {
      error = "An error occurred while fetching help requests";
      console.error(e);
    }
  }

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-6xl px-4 sm:px-6 py-10 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Your Dashboard</h1>
          {token && (
            <Link href="/signin">
              <Button variant="outline">Back to Sign in</Button>
            </Link>
          )}
        </div>

        {!token ? (
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Authentication Required</CardTitle>
              <CardDescription>
                You need an API token to access this dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                You&apos;re not currently authenticated. Please generate a token or return to the login page.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <GenerateForm />
                  <Link href="/signin">
                      <Button variant="outline">Back to Sign in</Button>
                  </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <HelpRequestForm />
            </div>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Your Help Requests</CardTitle>
                <CardDescription>
                  All your saved help requests are listed below
                </CardDescription>
              </CardHeader>
              <CardContent>
                {error && (
                  <p className="text-red-500 mb-4">{error}</p>
                )}

                {helpRequests.length === 0 ? (
                  <p className="text-muted-foreground py-4">
                    You haven&apos;t added any help requests yet. Add your first one!
                  </p>
                ) : (
                  <ul className="divide-y">
                    {helpRequests.map((helpRequest) => (
                      <li key={helpRequest.id} className="py-3">
                        <p className="text-xs text-gray-500 mt-1">
                          Added on {new Date(helpRequest.created_at).toLocaleDateString()}
                        </p>
                        <p>{ helpRequest.description }</p>
                        <p>{ helpRequest.address }</p>
                        <p className="text-xs text-gray-500 ml-2">
                          ( { helpRequest.latitude }, { helpRequest.longitude } )
                        </p>
                        <p>{ helpRequest.process_status }</p>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
