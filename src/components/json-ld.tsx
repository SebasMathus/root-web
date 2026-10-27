/** Datos estructurados. JSON.stringify no escapa "<"; se escapa para no cerrar el <script> por accidente. */
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
