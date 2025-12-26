// Server-safe exports (components that can be used in Server Components)
// Note: PuckRendererServer is actually a Client Component but can be imported
// in Server Components - Next.js handles the client/server boundary automatically
export { PuckRendererServer } from "./components/server/PuckRenderer.server";
export { defaultBlocks } from "./blocks";
export { Heading, Paragraph, ImageBlock, Container } from "./blocks";
export { cn } from "./utils/cn";

// Re-export types (these are safe for server components)
export type {
  PuckRendererProps,
  CustomBlockProps,
  Config,
  Data,
} from "./types";

