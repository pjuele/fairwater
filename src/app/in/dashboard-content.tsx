'use client';

import { ApiData } from "./page";
import data from "../../../data/tabula-amnesty.json";
import * as z from "zod";

const amnestyData = z.array(z.array(z.string()));
type AmnestyData = z.infer<typeof amnestyData>;
const parsedData = amnestyData.parse(data);
const headerRow = parsedData.shift();

export function DashboardContent({data}: {data: ApiData}): JSX.Element {
    return(
        <div className="flex flex-col items-center justify-center gap-4 p-4">
            {/* <h1>Data for {data.isoData}</h1>
            <ul>
                {data.data.map((d, i) => <li key={i}>
                    {d}
                </li>)}
            </ul> */}
            <h3>The human rights to water and sanitation</h3>
            <p>The UN General Assembly and Human Rights Council resolutions refer to the ›right to safe drinking water and sanitation.‹ Amnesty Interna- tional and WASH United interpret these references as implying two rights: a right to water and a right to sanitation. This is similar to the freedom of thought, conscience and religion which is made up of three distinct but related rights. The UN Committee on Economic, Social and Cultural Rights and the UN Special Rapporteur on these rights both consider that water and sanitation are distinct human rights in inter- national law.6 It is important to specify that these are distinct rights as any national and international programmes to promote ›water and sanitation‹ often tend to ignore the latter. There is a consensus in the development community that sanitation deserves special attention in order to prevent its neglect.</p>
            <Component />
        </div>
    )
}

import Image from "next/image"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Component() {
  return (
    <><Card>
          <CardHeader>
              <CardTitle>Commitment to Water as a Human Right</CardTitle>
              <CardDescription>
                  Measured based on country participation in UN resolutions on the matter.
              </CardDescription>
          </CardHeader>
          <CardContent>
              <Table>
                  <TableHeader>
                    <TableRow>
                        {headerRow && headerRow.map((cell, cellIndex) => (
                            <TableHead key={cellIndex}>{cell}</TableHead>
                        ))}
                    </TableRow>
              </TableHeader>
              <TableBody>
                {parsedData.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <TableCell className="hidden md:table-cell" key={cellIndex}>{cell}</TableCell>
                        ))}
                    </TableRow>
                ))}
              </TableBody>
          </Table>
      </CardContent><CardFooter>
              <div className="text-xs text-muted-foreground">
                  Showing <strong>1-10</strong> of <strong>32</strong> products
              </div>
          </CardFooter>
    </Card></>
  )
}
