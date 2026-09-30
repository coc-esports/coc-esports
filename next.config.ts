import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {};

// News articles are .mdx files in src/content/news, loaded with dynamic imports.
const withMDX = createMDX({});

export default withMDX(nextConfig);
