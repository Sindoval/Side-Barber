import { Card, CardContent } from "../_components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import { Avatar, AvatarImage } from "./ui/avatar";
import Link from "next/link";

const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 flex flex-row items-center justify-between">
        <Image alt="FSW Barber" src="/Logo.png" height={18} width={120}></Image>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetTitle>Menu</SheetTitle>

            <div className="py-5 border-b flex items-center gap-3 border-solid">
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
              </Avatar>

              <div>
                <p className="font-bold">Sindoval Alves</p>
                <p className="text-gray-400 text-xs">sindoval@email.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
              <SheetClose asChild>
                <Button variant="ghost" className="justify-start gap-3" asChild>
                  <Link href="/">
                    <HomeIcon size={18} />
                    Inicio
                  </Link>
                </Button>
              </SheetClose>

              <Button variant="ghost" className="justify-start gap-3">
                <CalendarIcon size={18} />
                Agendamentos
              </Button>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid py-5">
              {quickSearchOptions.map((option) => (
                <Button
                  key={option.title}
                  variant="ghost"
                  className="justify-start gap-3">
                  <Image
                    src={option.imageUrl}
                    height={18}
                    width={18}
                    alt={option.title} />
                  {option.title}
                </Button>
              ))}

            </div>

            <div className="flex flex-col gap-2 py-5">
              <Button variant="ghost" className="justify-start gap-3">
                <LogOutIcon size={18} />
                Sair da conta</Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}
// composition pattern
export default Header;