import Header from "./_components/header";
import { Button } from "./_components/ui/button";
import Image from "next/image";
import { db } from "./_lib/prisma";
import BarbershopItem from "./_components/barbershop-item";
import { quickSearchOptions } from "./_constants/search"
import BookingItem from "./_components/booking-item";
import Search from "./_components/search";
import Link from "next/link";

export default async function Home() {
  // chamar meu bd
  const barbershops = await db.barberShop.findMany({});
  const popularBarbershops = await db.barberShop.findMany({
    orderBy: {
      name: "desc"
    }
  });

  return (
    <div>
      <Header />
      {/* TEXTO */}
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Usuário!</h2>
        <p>Quinta-feira, 24 de Julho</p>

        {/* BUSCA */}
        <div className="mt-6">
          <Search />
        </div>

        {/* BUSCA RAPIDA*/}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden]">

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
            src="/BannerPizza.png"
            alt="Agende nos melhores com FSW Barber"
            fill
            className="object-cover rounded-xl" />
        </div>

        {/* AGENDAMENTO */}
        <BookingItem />

        <h2 className="uppercase text-gray-400 font-bold text-xs mt-5 mb-3">Recomendados</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden]">
          {barbershops.map((barbershop) => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
        </div>

        <h2 className="uppercase text-gray-400 font-bold text-xs mt-5 mb-3">Populares</h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden]">
          {popularBarbershops.map((barbershop) => <BarbershopItem key={barbershop.id} barbershop={barbershop} />)}
        </div>
      </div>
    </div>
  );
}
