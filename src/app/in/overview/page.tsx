import { Block2, Block4 } from "@/components/xtable";

async function getGdpData() {
    const data = await fetch('http://localhost:8000/gdp');
    const json = await data.json();
    // console.log(json)
    const result = json
    .filter((d: any) => d.code)
    .map((d: any) => ({code: d.code, code3: d.code3, name: d.name, agency_score: d.agency_score, GDP: d.last_gdp, Year: d.last_year, gdp_rank: d.gdp_rank}))
    .sort((a: { gdp_rank: number; }, b: { gdp_rank: number; }) => b.gdp_rank - a.gdp_rank);
    const maxRank = json.reduce((max: number, d: any) => Math.max(max, d.gdp_rank), 0);
    result.forEach((d: { gdp_rank: number; }, i: number) => d.gdp_rank = (maxRank - d.gdp_rank) + 1);
    return result;

}

export default async function Home() {
  const gdpData = await getGdpData();
  return (
    <main className="container min-h-screen flex flex-col items-center justify-top gap-4">
      <h2>Agency per country</h2>
      <section className="grid grid-cols-2 gap-5">
        {/* <Block1 /> */}
        <Block2 gdpData={gdpData}/>
        <Block4 gdpData={gdpData} />
      </section>
    </main>
  );
}

