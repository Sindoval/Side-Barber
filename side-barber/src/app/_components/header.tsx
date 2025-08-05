import { Card, CardContent } from "../_components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { Sheet, SheetTrigger } from "./ui/sheet";
import SidebarButton from "./sidebar-sheet";
import Link from "next/link";

const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 flex flex-row items-center justify-between">
        <Link href={"/"}>
          <Image
            alt="FSW Barber"
            src="/Logo.png"
            height={18}
            width={120}
          />
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarButton />
        </Sheet>
      </CardContent>
    </Card>
  )
}
// composition pattern
export default Header;