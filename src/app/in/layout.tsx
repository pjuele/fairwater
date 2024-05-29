import { AppHeader } from "@/components/app-header";

export default function DashLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {children}
    </>
  )
}
