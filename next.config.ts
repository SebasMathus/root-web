import type { NextConfig } from "next";

// Exportación estática a `out/` (sin servidor, sin CMS): cualquier hosting de archivos sirve el sitio.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  // Hay otro package-lock.json en la carpeta de arriba: fija la raíz del proyecto.
  turbopack: { root: __dirname },
};

export default nextConfig;
