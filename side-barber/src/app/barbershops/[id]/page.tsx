import PhoneItem from "@/app/_components/phone-item";
import ServiceItem from "@/app/_components/service-item";
import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeft, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BarbershopPageProps {
  params: {
    id: string
  }
}

const BarberShopsPage = async ({ params }: BarbershopPageProps) => {
  // chamar bd
  const barbershop = await db.barberShop.findUnique({
    where: {
      id: params.id,
    }, include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound();
  }

  return (
    <div>
      {/* Imagem */}
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop?.imageUrl}
          fill
          className="object-cover"
          alt={barbershop?.name} />

        <Button
          size="icon"
          variant="secondary"
          className="absolute left-4 top-4"
          asChild
        >
          <Link href="/">
            <ChevronLeft />
          </Link>
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="absolute right-4 top-4">
          <MenuIcon />
        </Button>
      </div>

      {/* INFOS */}
      <div className="border-b border-solid p-5">
        <h1 className="text-xl font-bold mb-3">{barbershop?.name}</h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className=" text-primary" size={18} />
          <p className="text-sm">{barbershop?.address}</p>
        </div>
        <div className="mb-2 flex items-center gap-2">
          <StarIcon className="fill-primary text-primary" size={18} />
          <p className="text-sm">5,0 (889 avaliações)</p>
        </div>
      </div>

      {/* DESCRIÇÃO */}
      <div className="border-b border-solid p-5 space-y-2">
        <h2 className="text-xs font-bold uppercase text-gray-400">Sobre nós</h2>
        <p className="text-sm text-justify">{barbershop?.description}</p>
      </div>

      {/* SERVIÇOS */}
      <div className="border-b border-solid p-5 space-y-2">
        <h2 className="text-xs font-bold uppercase text-gray-400 mb-3">Serviços</h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
            />
          ))}
        </div>
      </div>


      {/* CONTATO */}
      <div className="p-5 space-y-3">
        {barbershop.phones.map((phone) => (
          <PhoneItem phone={phone} key={phone} />
        ))}
      </div>
    </div>
  );
}

export default BarberShopsPage;