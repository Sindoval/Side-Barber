import Header from "../_components/header";
import SignInDialog from "../_components/sign-in-dialog";
import { Dialog, DialogContent } from "../_components/ui/dialog";
import { authOptions } from "../_lib/auth";
import { getServerSession } from "next-auth";
import { db } from "../_lib/prisma";
import BookingItem from "../_components/booking-item";

const Bookings = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <Dialog open={true}>
        <DialogContent className="w-[90%]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    )
  }

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: (session.user).id,
      date: {
        gte: new Date() // maior que
      }
    },
    include: {
      service: {
        include: {
          barberShop: true,
        }
      }
    },
    orderBy: {
      date: "asc"
    }
  })

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (session.user).id,
      date: {
        lt: new Date() // menor que
      }
    },
    include: {
      service: {
        include: {
          barberShop: true,
        }
      }
    }
  })


  return (
    <div>
      <Header />
      <div className="p-5 space-y-3">
        <h1 className="text-xl font-bold">
          Agendamentos
        </h1>
        {confirmedBookings.length > 0 && (
          <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-8 p-2">
            Confirmados
          </h2>
        )}
        {confirmedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
        {concludedBookings.length > 0 && (
          <h2 className="uppercase text-gray-400 font-bold text-xs mt-6 mb-8 p-2">
            Finalizados
          </h2>)}
        {concludedBookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}

export default Bookings;