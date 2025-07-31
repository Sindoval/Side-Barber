import { BarberShopService } from "@/generated/prisma";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface ServiceItemProps {
  service: BarberShopService
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
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

            <Button variant="secondary" size="sm">Reservar</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ServiceItem;