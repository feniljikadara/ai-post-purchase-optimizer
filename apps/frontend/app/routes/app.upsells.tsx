import { Page, Card, Button, DataTable } from "@shopify/polaris";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  // In the future, we will fetch the list of existing upsells here.
  const upsells = [
    ["BFCM Special: Free Socks", "Running Shoes", "Active", "5%"],
    ["Holiday Offer", "Coffee Mug", "Draft", "10%"],
  ];
  return json({ upsells });
}

export default function UpsellsIndexPage() {
  const { upsells } = useLoaderData<typeof loader>();

  return (
    <Page
      title="Post-Purchase Upsells"
      primaryAction={
        <Button variant="primary" as={Link} url="/app/upsells/new">
          Create new upsell
        </Button>
      }
    >
      <Card>
        <DataTable
          columnContentTypes={["text", "text", "text", "numeric"]}
          headings={["Offer Name", "Trigger Product", "Status", "Conversion"]}
          rows={upsells}
        />
      </Card>
    </Page>
  );
}
