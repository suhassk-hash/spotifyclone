import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height:{
        '80p': '80vh',
      },
      colors: {
        background: "linear-gradient(to right, #1f1f1f 0%, #1f1f1f 100%)",
        foreground: "var(--foreground)",
        text:"#b2b2b2",
        bg:"#121212",
        box:"#1f1f1f",
      },
    },
  },
  plugins: [],
};
export default config;
// {!session && <div className="color-white">Create your first playlist</div>}