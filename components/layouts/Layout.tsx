import type { ReactNode } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <p>Header</p>
      {children}
      <p>Footer</p>
    </>
  );
}
