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
  
  
export function XTable({data}: {data: {[key: string]: string}[]}): JSX.Element | null {
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
  
  
  export function Block1() {
    return (
      <Block title="El logo">
        <FullLogo />
      </Block>
    );
  }
  
  export function Block2({gdpData}: {gdpData: GdpData[]}) {
    return (
      // <Block title="Agency per Country">
      <Block>
        <WorldMap data={gdpData} width={800} height={400} events={true} />
      </Block>
    );
  }
  
  export function Block3() {
    return (
      <Block title="Block 3">
        <p className="text-sm text-pretty">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur odit aliquid velit nam voluptate ipsum dolorem dicta nemo labore! Inventore, nobis nisi. Necessitatibus aspernatur ea esse voluptate consequuntur odio saepe.
        </p>
      </Block>
    );
  }
  
  export function Block4({gdpData}: {gdpData: GdpData[]}) {
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
  
  