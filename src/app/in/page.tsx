import NavMenu from "@/components/nav-menu";
import { DashboardContent } from "./dashboard-content";
import * as z from "zod";

const apiData = z.object({
  countryIsoCode: z.string(),
  countryName: z.string(),
  data: z.array(z.number()),
  isoData: z.any(),
  // z.object({
  //   "flag": z.string(),
  //   "officialName": z.string(),
  // })
})

export type ApiData = z.infer<typeof apiData>;

async function getData(countryIsoCode: string) {
  const url = `http://127.0.0.1:8000/data/${countryIsoCode}`;
  console.log("Calling API: ", url);
  const res = await fetch(url);
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  const data = apiData.parse(await res.json())
  return data;
}

type ApiResponse = {
  [key: string]: unknown;
}
 
export default async function DashPage() {
  const data = {}; //await getData("UY");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="flex flex-col items-center justify-center gap-4 p-4">
        <DashboardContent data={data as ApiData} />
      </section>
    </main>
  );
}
