/*
 * Sistemas con integración publicada (Salesforce, SAP, HubSpot y Excel; plan §6.1) y ejemplos de Acciones
 * conectadas: un evento en root dispara una acción en el sistema. Módulo sin "use client" para que lo lean
 * tanto la escena D5 como las páginas de servidor. Zoho, Google Sheets y «cualquier sistema con API» no se
 * publican hasta que producto los confirme (plan §6.2).
 */

export type SystemId = "salesforce" | "hubspot" | "sap" | "excel";

export type System = { id: SystemId; name: string; kind: string; event: string; examples: [string, string][] };

export const SYSTEMS: System[] = [
  {
    id: "salesforce",
    name: "Salesforce",
    kind: "CRM",
    event: "Nuevo prospecto → crear lead",
    examples: [
      ["Entra un prospecto por WhatsApp", "se crea el lead en Salesforce con sus datos y su origen"],
      ["El agente hace el relevo", "se crea una tarea para el dueño de la cuenta"],
    ],
  },
  {
    id: "hubspot",
    name: "HubSpot",
    kind: "CRM",
    event: "Cita confirmada → actualizar etapa",
    examples: [
      ["Se confirma una cita", "el trato avanza de etapa en HubSpot"],
      ["El agente califica a un prospecto", "se actualiza el contacto con lo que respondió"],
    ],
  },
  {
    id: "sap",
    name: "SAP",
    kind: "ERP",
    event: "Trato ganado → crear pedido",
    examples: [
      ["Marcas un trato como ganado", "se crea el pedido en SAP"],
      ["Actualizas el correo o el teléfono de un cliente", "se actualiza su ficha en SAP"],
    ],
  },
  {
    id: "excel",
    name: "Excel",
    kind: "Hojas de cálculo",
    event: "Corte diario → exportar tratos",
    examples: [
      ["Cierra el día", "se exportan los tratos y su etapa a tu archivo"],
      ["Se gana un trato", "se agrega una fila a tu reporte de ventas"],
    ],
  },
];

