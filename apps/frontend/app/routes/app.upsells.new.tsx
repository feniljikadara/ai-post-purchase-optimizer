import {
  Page,
  Card,
  Button,
  Form,
  FormLayout,
  TextField,
  Layout,
  BlockStack,
} from "@shopify/polaris";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState, useCallback } from "react";
import { useAppBridge } from "@shopify/app-bridge-react";

export async function loader({ request }: LoaderFunctionArgs) {
  // In the future, we will fetch existing upsell configurations here.
  return json({
    shopName: "Merchant's Shop",
  });
}

export default function UpsellFormPage() {
  const shopify = useAppBridge();
  const { shopName } = useLoaderData<typeof loader>();
  const [offerName, setOfferName] = useState("");
  const [triggerProductId, setTriggerProductId] = useState("");
  const [offerProductId, setOfferProductId] = useState("");

  const handleNameChange = useCallback((value: string) => setOfferName(value), []);

  const handleProductSelection = async (setter: (id: string) => void) => {
    const products = await shopify.resourcePicker({
      type: "Product",
      options: { selectMultiple: false },
    });

    if (products) {
      setter(products[0].id);
    }
  };
  
  const handleSubmit = () => {
    // In the future, this will submit the form data to our backend.
    console.log("Submitting:", { offerName, triggerProductId, offerProductId });
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
                <BlockStack gap="500">
                  <TextField
                    label="Upsell offer name"
                    value={offerName}
                    onChange={handleNameChange}
                    autoComplete="off"
                    helpText="A descriptive name for your internal reference."
                  />
                </BlockStack>
              </Card>
              <Card>
                <BlockStack gap="500">
                  <Button onClick={() => handleProductSelection(setTriggerProductId)}>
                    Select trigger product
                  </Button>
                  <Button onClick={() => handleProductSelection(setOfferProductId)}>
                    Select upsell product
                  </Button>
                </BlockStack>
              </Card>
            </FormLayout>
          </Form>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
