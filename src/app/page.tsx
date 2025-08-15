import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item";
import Search from "./_components/search";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./_lib/auth";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const barbershops = await db.barberShop.findMany({});
  const popularBarbershops = await db.barberShop.findMany({
    orderBy: {
      name: "desc"
    }
  });

  const bookings = session?.user ? await db.booking.findMany({
    where: {
      userId: (session?.user).id,
      date: {
        gte: new Date(),
      }
    },
    include: {
      service:
      {
        include: {
          barberShop: true
        }
      }
    },
    orderBy: {
      date: "asc"
    }
  }) : []

  return (
    <div>
      <Header />
      {/* TEXTO */}
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, {session?.user ? session.user.name : "bem vindo!"}</h2>
        <p className="">{format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}</p>

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RAPIDA*/}
        <div className="mt-6 flex gap-3 overflow-x-scroll scrollbar-thin">

          {quickSearchOptions.map((option) => (
            <Button
              className="gap-2"
              variant="secondary"
              key={option.title}
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title} />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        {/* IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="object-cover rounded-xl" />
        </div>

        {/* AGENDAMENTO */}
        <h2 className="uppercase text-gray-400 font-bold text-xs mt-5 mb-3">Agendamentos</h2>
        <div className="flex overflow-x-auto gap-3 scrollbar-thin">
          {bookings.map((booking) => (
            <BookingItem
              key={booking.id}
              booking={booking}
            />
          ))}
        </div>

        <h2 className="uppercase text-gray-400 font-bold text-xs mt-5 mb-3">Recomendados</h2>
        <div className="flex gap-4 overflow-auto scrollbar-thin">
          {barbershops.map((barbershop) => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
        </div>

        <h2 className="uppercase text-gray-400 font-bold text-xs mt-5 mb-3">Populares</h2>
        <div className="flex gap-4 overflow-auto scrollbar-thin">
          {popularBarbershops.map((barbershop) => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
        </div>
      </div>
    </div>
  );
}
