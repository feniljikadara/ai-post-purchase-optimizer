import {
  Page,
  Card,
  Button,
  Form,
  FormLayout,
  TextField,
  Layout,
} from "@shopify/polaris";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";
import { useState, useCallback } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  // In the future, we will fetch existing upsell configurations here.
  return json({
    shopName: "Merchant's Shop",
  });
}

export default function UpsellsPage() {
  const { shopName } = useLoaderData<typeof loader>();
  const submit = useSubmit();
  const [offerName, setOfferName] = useState("");

  const handleNameChange = useCallback((value: string) => setOfferName(value), []);
  
  const handleSubmit = () => {
    // In the future, this will submit the form data to our backend.
    console.log("Submitting:", { offerName });
  };

  return (
    <Page
      title="Create new upsell"
      primaryAction={<Button variant="primary" onClick={handleSubmit}>Save</Button>}
      backAction={{ content: "Upsells", url: "/app/upsells" }}
    >
      <Layout>
        <Layout.Section>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <Card>
                <TextField
                  label="Upsell offer name"
                  value={offerName}
                  onChange={handleNameChange}
                  autoComplete="off"
                  helpText="A descriptive name for your internal reference."
                />
              </Card>
            </FormLayout>
          </Form>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
