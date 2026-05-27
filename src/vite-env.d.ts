/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_BASEURL: string;
  readonly VITE_DEV_AUTH_BYPASS?: string;
}

declare module '*.svg?react' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: React.FC<React.SVGProps<SVGSVGElement>>;
  export default src;
}
