import { fetchSiteIntegrations } from "@/data/integrations";
import IntegrationsManager from "@/components/admin/integrations/IntegrationsManager";

export default async function AdminIntegrationsPage() {
    const integrations = await fetchSiteIntegrations();
    return <IntegrationsManager initial={integrations} />;
}
