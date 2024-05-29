'use client';
import React from 'react';
import { scaleQuantize } from '@visx/scale';
import { Mercator, Graticule } from '@visx/geo';
import * as topojson from 'topojson-client';
import topology from '../world-topo.json';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';

  const palettes = [
    ["#de2104", "#e93e04", "#f35b04", "#f18701", "#f7b801", "#6e6780", "#7b758c", "#878296", "#928da0", "#9c97a9"].reverse(),
    ["#de2104", "#e93e04", "#f35b04", "#f18701", "#f7b801", "#b79877", "#9788b2", "#7678ed", "#5a56bc", "#3d348b"].reverse(),
    ["#489f31", "#72a632", "#95ad39", "#b5b445", "#d2ba55", "#ecc068", "#da9d4e", "#c57a39", "#af5727", "#97341a", "#7e0211"].reverse(),
    ["#010101", "#111111", "#171717", "#1c1a15", "#32281e", "#493429", "#855e53", "#aa8a82", "#a0a4a5"],
    ["#390099", "#6c0079", "#9e0059", "#cf0057", "#ff0054", "#ff2a2a", "#ff5400", "#ff8900", "#ffbd00", "#ffce47"],
    ["#489f31", "#73b142", "#99c256", "#aacf5f", "#bcd46b", "#eac972", "#d39b4d", "#ba6e31", "#9e401d", "#7e0211"].reverse(),
    ["#00876c", "#45a074", "#72b97c", "#9fd184", "#cee98f", "#ffff9d", "#fedb79", "#fab560", "#f38f52", "#e7674e", "#d43d51"].reverse(),
    ["#ff3300", "#ff5814", "#ff7328", "#ff8a3d", "#ff9e54", "#feb16d", "#fec287", "#fed3a3", "#ffe3c0"].reverse(),
    ["#00876c", "#4aa076", "#77b880", "#a4d08d", "#d1e89c", "#ffffaf", "#fbdc88", "#f6b76a", "#ef9158", "#e56950", "#d43d51"],
    ['#fae0e4', '#f7cad0', '#f9bec7', '#fbb1bd', '#ff99ac', '#ff85a1', '#ff7096', '#ff5c8a', '#ff477e', '#ff0a54'],
    ["#ff0a54", "#ff477e", "#ff5c8a", "#ff7096", "#ff85a1", "#ff99ac", "#fbb1bd", "#f9bec7", "#f7cad0", "#fae0e4"],
    ["#00296b","#003f88","#00509d","#fdc500","#ffd500"],
    ["#641220","#6e1423","#85182a","#a11d33","#a71e34","#b21e35","#bd1f36","#c71f37","#da1e37","#e01e37"],
    ['#ffb01d', '#ffa020', '#ff9221', '#ff8424', '#ff7425', '#fc5e2f', '#f94b3a', '#f63a48'],
];

  export class MergedCountries {
    protected countryData: GdpData[];
    constructor(isoCountries: GdpData[]) {
        this.countryData = isoCountries;
        // this.countryData = mergedCountries(isoCountries);
        // console.dir (this.countryData);
    }
    getGdpBucketFrom3LetterCode(code: string): number | null {
        return this.countryData.find((c) => c.code3 === code)?.agency_score || null;
    }

    listAllAgencyScores() {
        this.countryData
            .sort((a, b) => (a.agency_score || 0) - (b.agency_score || 0))
            .forEach((c) => {
                console.log(c.name, "Agency (0-10) = ", Intl.NumberFormat("en-US").format(c.agency_score || 0));
            });
    }
}


export type GeoMercatorProps = {
data: GdpData[];
width: number;
height: number;
events?: boolean;
};

interface FeatureShape {
type: 'Feature';
id: string;
geometry: { coordinates: [number, number][][]; type: 'Polygon' };
properties: { name: string };
}

// @ts-expect-error
const world = topojson.feature(topology, topology.objects.units) as {
type: 'FeatureCollection';
features: FeatureShape[];
};


export default function WorldMap({ data, width, height, events = false }: GeoMercatorProps) {
    const [showDialog, setShowDialog] = React.useState(false);
    const [dialogData, setDialogData] = React.useState({name: "", GDP: 0, Year: 0, gdp_rank: 0, agency_score: 0});
    // Select a random index for the pallettes array:
    const randomPaletteIndex = 0; // Math.floor(Math.random() * palettes.length);
    const [selectedPalette, setSelectedPalette] = React.useState(randomPaletteIndex);
    const paletteText = "Palette #" + (selectedPalette + 1) + " selected";
    const centerX = width / 2;
    const centerY = height / 2;
    const scale = (width / 630) * 100;
    const countries = new MergedCountries(data);
    countries.listAllAgencyScores();

    function handleMapClick(feature: any) {
        const name = feature.properties.name;
        const code = feature.id;
        const gdpObject = data.find((d) => d.code3 === code) as GdpData;
        const agency_score = gdpObject?.agency_score || 0;
        const GDP = gdpObject?.GDP || 0;
        const Year = gdpObject?.Year || 0;
        const gdp_rank = gdpObject?.gdp_rank || 0;
        setDialogData({name, GDP, Year, gdp_rank, agency_score});
        setShowDialog(true);
    }

    const color = scaleQuantize({
        domain: [0, 10],
        range: palettes[selectedPalette],
    // domain: [
    //     countries.getMaxGdp(), // Math.min(...world.features.map((f) => f.geometry.coordinates.length)),
    //     countries.getMinGdp(), // Math.max(...world.features.map((f) => f.geometry.coordinates.length)),
    // ],
    });

return width < 10 ? null : (
    <>
        {dialogData.name && <SelectedCountryDetail dialogData={dialogData as GdpData}/>}

        <PaletteSwatch palette={palettes[selectedPalette]} selectedPalette={selectedPalette} setSelectedPalette={setSelectedPalette}/>{/* <Badge variant="outline">{paletteText}</Badge> */}

        {/* <Dialog open={showDialog} onOpenChange={setShowDialog}>
            {/* <DialogTrigger>Open</DialogTrigger> * /}
            <DialogContent>
                <DialogHeader>
                <DialogTitle>{dialogData.name}</DialogTitle>
                <DialogDescription>
                    GDP: USD {Number(dialogData.GDP).toLocaleString()}
                    <br />
                    Agency Score: {dialogData.agency_score}
                    <br />
                    GDP Global Rank: {dialogData.gdp_rank}
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog> */}

        <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill={"transparent"} rx={14} />
        <Mercator<FeatureShape>
            data={world.features}
            scale={scale}
            translate={[centerX, centerY + 50]}
        >
            {(mercator) => (
            <g>
                <Graticule graticule={(g) => mercator.path(g) || ''} stroke="transparent" />
                {mercator.features.map(({ feature, path }, i) => (
                <path
                    key={`map-feature-${i}`}
                    d={path || ''}
                    fill={color(countries.getGdpBucketFrom3LetterCode(feature.id) || 0)}
                    // fill={color(feature.geometry.coordinates.length)}
                    // stroke={"transparent"}
                    strokeWidth={1.4}
                    onClick={() => {
                        handleMapClick(feature);
                        // console.log(feature);
                        // if (events) alert(`Clicked: ${feature.properties.name} (${feature.id})`);
                    }}
                    className="stroke-background stroke-[1.5] cursor-pointer"
                />
                ))}
            </g>
            )}
        </Mercator>
        </svg>
    </>
);
}

export interface IsoCountry {
    code: string;
    name: string;
    code3?: string;
}

export interface GdpData extends IsoCountry {
    GDP: number | null;
    Year: number | null;
    gdp_rank?: number | null;
    agency_score: number | null;
    gdp_bucket: number | null;
}

export function PaletteSwatch(
    {palette, selectedPalette, setSelectedPalette}:
    {palette: string[], selectedPalette: number, setSelectedPalette: (i: number) => void}) {
    return (
        <div className="flex flex-row gap-0">
            <Button variant="outline" size="sm">
            <ChevronLeft className="h-2 w-2" onClick={() => setSelectedPalette(selectedPalette <= 0 ? palettes.length - 1 : selectedPalette - 1)} />
            </Button>
            {palette.slice().reverse().map((color, i) => (
            // {palette.map((color, i) => (
                <div
                    key={i}
                    className="h-7 w-7"
                    style={{backgroundColor: color}}
                />
            ))}
            <Button variant="outline" size="sm" onClick={() => setSelectedPalette(selectedPalette >= palettes.length - 1 ? 0 : selectedPalette + 1)}>
            <ChevronRight className="h-2 w-2" />
            </Button>
        </div>
    );
}

export function SelectedCountryDetail({dialogData}: {dialogData: GdpData}) {
    return (
        <Card className="absolute bottom-[2vh] left-[2vw] shadow-xl max-w-[50vw] z-50">
        <CardHeader>
            <CardTitle>{getFlag(dialogData.name)} {dialogData.name}</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-3 gap-4">
                <div className="overflow-clip border-[1px] rounded-lg p-4">
                    As of <Badge variant="secondary">{dialogData.Year}</Badge> the national GDP was <Badge variant="secondary">USD {Number(dialogData.GDP).toLocaleString()}</Badge> <em>per inhabitant</em></div>
                <div className="overflow-clip border-[1px] rounded-lg p-4">{dialogData.name} ranks <Badge variant="secondary">{dialogData.gdp_rank}</Badge> in the world in terms of last-reported figures per country</div>
                <div className="overflow-clip border-[1px] rounded-lg p-4">This places {dialogData.name} in Bucket <Badge variant="secondary">{dialogData.agency_score}</Badge> out of <Badge variant="secondary">10</Badge></div>
                <div className="col-span-3 overflow-clip">Based on this we give it an <strong>💰 Agency Score</strong> of <Badge variant="destructive">{dialogData.agency_score}</Badge></div>
            </div>
        </CardContent>
        <CardFooter>
            <div className="flex flex-row gap-2">
                <Badge variant="outline">❤️ Commitment 9</Badge>
                <Badge variant="outline">😰 Challenges 5</Badge>
                {/* <Badge variant="outline">💰 Agency 3</Badge> */}
                <Badge variant="outline">🏆 Progress 8</Badge>
            </div>
        </CardFooter>
        </Card>
    );
}

function getFlag(name: string) {
    if (!name) return "🏴‍☠️";
    switch (name) {
        case "United States":
            return "🇺🇸";
        case "Uruguay":
            return "🇺🇾";
        case "Argentina":
            return "🇦🇷";
        case "Chile":
            return "🇨🇱";
        case "Brazil":
            return "🇧🇷";
        case "United Kingdom":
            return "🇬🇧";
        default:
            return "🏴‍☠️";
    }
}
