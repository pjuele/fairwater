import Link from "next/link";
import { FullLogo } from "./logo-full";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
    return (
        <div className={cn(
            "h-screen w-screen",
            "bg-[url('https://images.unsplash.com/photo-1617657064643-aa10071535d1?q=80&w=2974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]",
            // "bg-[url('https://images.unsplash.com/photo-1538300342682-cf57afb97285?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')]",
            "bg-cover bg-top bg-no-repeat",
            "z-10",
            "before:content-['']",
            "before:absolute",
            "before:inset-0",
            "before:block",
            "before:bg-gradient-to-b",
            "before:from-background",
            "before:to-black",
            "before:opacity-90",
            "before:z-[-5]",
            "flex flex-column align-middle justify-center",
        )}>
            <div className={cn(
                "w-full h-full",
                "flex flex-col justify-center items-center",
                // "bg-background opacity-80 dark:opacity-90",
            )}>
                <div className={cn(
                    "max-w-[80%] md:max-w-[65%] lg:max-w-[40%]", //  my-auto mx-auto",
                    "flex flex-col justify-center items-center gap-5",
                    // "opacity-100",
                )}>
                    <FullLogo />
                    <div className="max-w-[70%] lg:max-w-[40%] text-center font-extralight">
                        <p>Inform adaptation & mitigation initiatives by analysing progress on human rights obligations</p>
                    </div>
                    <Button className="mt-10">
                        <Link href="/in">
                            Open the dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}