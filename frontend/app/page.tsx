import { Hero } from "@/components/Hero";
import { HowToUse } from "@/components/HowToUse";
import { Navbar } from "@/components/Navbar";
import { SchemeCat } from "@/components/SchemeCat";

export default function Home() {
  return (
    <div className="">
     {/* <Navbar/> */}
     <Hero/>
     <SchemeCat/>
     <HowToUse/>
    </div>
  );
}
