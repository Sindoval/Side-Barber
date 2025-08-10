"use client"

import { BarberShop, BarberShopService, Booking } from "@/generated/prisma";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet";
import { Calendar } from "./ui/calendar";
import { ptBR } from "date-fns/locale";
import { useEffect, useState } from "react";
import { format, set } from "date-fns";
import { createBooking } from "../_actions/create-booking";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { getBookings } from "../_actions/getBookings";
import { Dialog, DialogContent } from "./ui/dialog";
import SignInDialog from "./sign-in-dialog";

interface ServiceItemProps {
  service: BarberShopService
  barbershop: Pick<BarberShop, 'name'>
}

const TIME_LIST = [
  "08:00", "08:20", "08:40",
  "09:00", "09:20", "09:40",
  "10:00", "10:20", "10:40",
  "11:00", "11:20", "11:40",
  "12:00", "12:20", "12:40",
  "13:00", "13:20", "13:40",
  "14:00", "14:20", "14:40",
  "15:00", "15:20", "15:40",
  "16:00", "16:20", "16:40",
  "17:00", "17:20", "17:40",
  "18:00"
];

const getTimeList = (booking: Booking[]) => {
  return TIME_LIST.filter((time) => {
    const hours = Number(time.split(":")[0]);
    const minutes = Number(time.split(":")[1]);

    const hasBookingOnCurrentTime = booking.some((booking) =>
      booking.date.getHours() === hours &&
      booking.date.getMinutes() === minutes
    );

    if (hasBookingOnCurrentTime) {
      return false
    }
    return true
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [dayBooking, setDayBooking] = useState<Booking[]>([]);
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false);
  const [signInDialogIsOpen, setSignInDialogIsOpen] = useState(false);

  useEffect(() => {
    if (!selectedDay) return;
    const fetch = async () => {
      const bookings = await getBookings({ date: selectedDay, serviceId: service.id })
      setDayBooking(bookings);
    }
    fetch();
  }, [selectedDay, service.id])


  const handleDaySelect = (date: Date | undefined) => {
    setSelectedDay(date);
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  }

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return;
      const hours = Number(selectedTime.split(":")[0]);
      const minutes = Number(selectedTime.split(":")[1]);
      const newDate = set(selectedDay, {
        minutes,
        hours
      })

      // server Action
      await createBooking({
        serviceId: service.id,
        date: newDate
      })
      handleSheetOpenChange();
      toast.success("Reserva criada com seucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar reserva!")
    }
  }

  const handleSheetOpenChange = () => {
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setDayBooking([]);
    setBookingSheetIsOpen(false)
  }

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true);
    }
    return setSignInDialogIsOpen(true);
  }

  return (
    <>
      <Card>
        <CardContent className="flex item-center gap-2 p-3">
          {/* IMAGEM */}
          <div className="relative h-[110px] min-w-[110px]">
            <Image
              fill
              className="object-cover rounded-lg"
              src={service.imageUrl}
              alt={service.name}
            />
          </div>
          {/* DIREITA */}
          <div className="space-y-3">
            <h3 className="font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>

            {/* PREÇO e BUTTON */}
            <div className="flex items-center justify-between">
              <p className="font-bold text-sm text-primary">{Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(Number(service.price))}</p>
              <Sheet open={bookingSheetIsOpen} onOpenChange={handleSheetOpenChange}>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleBookingClick()}
                >Reservar</Button>

                <SheetContent className="px-0">
                  <SheetHeader>
                    <SheetTitle>Fazer reserva</SheetTitle>
                  </SheetHeader>
                  <div className="py-5 border-b border-solid">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDaySelect}
                      className="w-full"
                      disabled={{ before: new Date() }}
                      styles={{
                        head_cell: {
                          width: "100%",
                          textTransform: "capitalize",
                        },
                        cell: {
                          width: "100%",
                        },
                        button: {
                          width: "100%",
                        },
                        nav_button_previous: {
                          width: "32px",
                          height: "32px",
                        },
                        nav_button_next: {
                          width: "32px",
                          height: "32px",
                        },
                        caption: {
                          textTransform: "capitalize",
                        },
                      }}
                    />
                  </div>
                  {selectedDay && (
                    <div className="p-5 flex gap-3 border-b border-solid overflow-auto ">
                      {getTimeList(dayBooking).map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className="rounded-full"
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  {selectedTime && selectedDay && (
                    <div className="p-3">
                      <Card>
                        <CardContent className="p-3 space-y-3">
                          <div className="flex justify-between items-center">
                            <h2 className="font-bold">{service.name}</h2>
                            <p className="text-sm font-bold">
                              {Intl.NumberFormat("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              }).format(Number(service.price))}
                            </p>
                          </div>

                          <div className="flex justify-between items-center">
                            <h2 className="text-sm text-gray-400">Data</h2>
                            <p className="text-sm">
                              {format(selectedDay, "d 'de' MMMM", { locale: ptBR })}
                            </p>
                          </div>

                          <div className="flex justify-between items-center">
                            <h2 className="text-sm text-gray-400">Horário</h2>
                            <p className="text-sm">
                              {selectedTime}
                            </p>
                          </div>

                          <div className="flex justify-between items-center">
                            <h2 className="text-sm text-gray-400">Barbearia</h2>
                            <p className="text-sm">
                              {barbershop.name}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                  <SheetFooter className="px-5 mt-5">
                    <SheetClose asChild>
                      <Button
                        type="submit"
                        onClick={handleCreateBooking}
                        disabled={!selectedDay || !selectedTime}
                      >Confirmar</Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={signInDialogIsOpen} onOpenChange={(open) => setSignInDialogIsOpen(open)}>
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ServiceItem;