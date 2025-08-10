"use client"

import Image from "next/image";
import { Button } from "./ui/button";
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { SheetClose, SheetContent, SheetTitle } from "./ui/sheet";
import { quickSearchOptions } from "../_constants/search";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage } from "./ui/avatar";
import SignInDialog from "./sign-in-dialog";


const SidebarButton = () => {
  const { data } = useSession();
  const handleLogoutGoogleClick = () => signOut();

  return (
    <SheetContent>
      <SheetTitle>Menu</SheetTitle>

      <div className="py-5 border-b flex items-center gap-3 border-solid justify-between">
        {data?.user ? (
          <div className="flex gap-3">
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ""} />
            </Avatar>

            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-gray-400 text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon">
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[90%]">
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
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
          <SheetClose key={option.title} asChild>
            <Button
              variant="ghost"
              className="justify-start gap-3"
              asChild>
              <Link href={`/barbershops?service=${option.title}`} >
                <Image
                  src={option.imageUrl}
                  height={18}
                  width={18}
                  alt={option.title} />
                {option.title}

              </Link>
            </Button>
          </SheetClose>
        ))}

      </div>

      <div className="flex flex-col gap-2 py-5">
        <Button variant="ghost" className="justify-start gap-3" onClick={handleLogoutGoogleClick}>
          <LogOutIcon size={18} />
          Sair da conta</Button>
      </div>
    </SheetContent>)
}

export default SidebarButton;