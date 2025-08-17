"use client"

import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Prisma } from "../../generated/prisma";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Image from "next/image";
import PhoneItem from "./phone-item";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { deleteBooking } from "../_actions/delete-booking";
import { toast } from "sonner";
import { useState } from "react";
import BookingSummary from "./booking-summary";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service:
      {
        include: {
          barberShop: true
        }
      }
    }
  }>
}

// TODO: receber agendamento como prop
const BookingItem = ({ booking }: BookingItemProps) => {
  const { service: { barberShop } } = booking;
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isConfirmed = isFuture(booking.date);

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id);
      setIsSheetOpen(false);
      toast.success("Reserva cancelada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao cancelar reserva. Tente novamente.")
    }
  }

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen);
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full min-w-[90%]">
        <Card>
          <CardContent className="flex justify-between p-0">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 py-5 pl-5 items-start">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >{isConfirmed ? "Confirmado" : "Finalizado"}</Badge>
              <h3 className="font-semibold">{booking.service.name}</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={booking.service.barberShop.imageUrl} />
                </Avatar>
                <p className="text-sm">{booking.service.barberShop.name}</p>
              </div>

            </div>

            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm capitalize">{format(booking.date, "MMMM", { locale: ptBR })}</p>
              <p className="text-2xl">{format(booking.date, "dd", { locale: ptBR })}</p>
              <p className="text-sm">{format(booking.date, "HH:mm", { locale: ptBR })}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[85%]">
        <SheetHeader className="text-left">
          <SheetTitle className="">
            Informações da Reserva
          </SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            fill
            alt={barberShop.name}
            src="/map.png"
            className="object-cover rounded-xl"
          />
          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-3 py-3">
              <Avatar>
                <AvatarImage src={barberShop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{barberShop.name}</h3>
                <p className="text-xs">{barberShop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >{isConfirmed ? "Confirmado" : "Finalizado"}</Badge>
        </div>

        <div className="mb-3 mt-6">
          <BookingSummary barbershop={barberShop} service={booking.service} selectedDate={booking.date} />
        </div>

        <div className="space-y-3">
          {barberShop.phones.map((phone, index) => (
            <PhoneItem key={index} phone={phone} />
          ))}
        </div>

        <SheetFooter className="mt-6">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">Voltar</Button>
            </SheetClose>
            {isConfirmed && (
              <Dialog>
                <DialogTrigger>
                  <Button variant="destructive" className="w-full">
                    Cancelar reserva
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-[90%]">
                  <DialogHeader>
                    <DialogTitle>Você deseja cancelar sua reserva?</DialogTitle>
                    <DialogDescription>
                      Ao cancelar, você perderá sua reserva e não poderá recuperá-la. Essa ação é irreversível.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button
                        variant="secondary"
                        className="w-full">Voltar
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        variant="destructive"
                        className="w-full"
                        onClick={handleCancelBooking}
                      >Confirmar
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}


          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default BookingItem;