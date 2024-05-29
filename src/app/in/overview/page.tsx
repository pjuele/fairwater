import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FullLogo } from "@/components/logo-full";
import WorldMap, { GdpData } from "@/components/world-map";

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

export function XTable({data}: {data: {[key: string]: string}[]}) {
  if (!data || !data.length) return null;
  return(
    <Table>
    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
    <TableHeader>
      <TableRow>
        {Object.keys(data[0]).map((key, i) => (
          <TableHead key={i}>{key}</TableHead>
        ))}
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((row: {[key: string]: string}, i) => {
        console.dir(row);
        return (
        <TableRow key={i}>
          {Object.keys(row).map((key, i) => (
            <TableCell key={i}>{row[key]}</TableCell>
          ))}
      </TableRow>
    )})}
    </TableBody>
  </Table>
  );
}


function Block1() {
  return (
    <Block title="El logo">
      <FullLogo />
    </Block>
  );
}

function Block2({gdpData}: {gdpData: GdpData[]}) {
  return (
    // <Block title="Agency per Country">
    <Block>
      <WorldMap data={gdpData} width={800} height={400} events={true} />
    </Block>
  );
}

function Block3() {
  return (
    <Block title="Block 3">
      <p className="text-sm text-pretty">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur odit aliquid velit nam voluptate ipsum dolorem dicta nemo labore! Inventore, nobis nisi. Necessitatibus aspernatur ea esse voluptate consequuntur odio saepe.
      </p>
    </Block>
  );
}

function Block4({gdpData}: {gdpData: GdpData[]}) {
  return (
    <Block>
      <XTable data={gdpData as any}/>
    </Block>
  );
}

export function Block({children, title}: {children?: JSX.Element, title?: string}) {
  return (
    <Card>
      {title && <CardHeader>
        <CardTitle>{title}</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>}
      <CardContent>
        {children}
      </CardContent>
      {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
    </Card>
  );
}

