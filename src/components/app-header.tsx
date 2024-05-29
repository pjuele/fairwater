'use client';
import { Separator } from "@radix-ui/react-separator";
import { FullLogo } from "./logo-full";
import NavMenu from "./nav-menu";

export function AppHeader() {
    return (
        <div className="p-3 flex flex-row items-center justify-center gap-4 border-b-2 border-black">
            <div className="max-w-40 p-3 ml-0 mr-auto">
                <FullLogo />
            </div>
            <NavMenu />
        </div>
    );
}