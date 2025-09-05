import { AccountRepository } from '@/infra/repository/account-repository';
import { RideRepository } from '@/infra/repository/ride-repository';

export default class GetRide {
  constructor(
    readonly accountDAO: AccountRepository,
    readonly rideDAO: RideRepository
  ) {}

  async execute(rideId: string): Promise<Output> {
    const ride = await this.rideDAO.getRideById(rideId);
    const passengerAccount = await this.accountDAO.getAccountById(ride.passengerId);
    if (!passengerAccount) throw new Error('Passenger not found');
    return {
      rideId: ride.rideId,
      passengerId: ride.passengerId,
      passengerName: passengerAccount.name,
      driverId: ride.driverId,
      from: {
        latitude: ride.fromLat,
        longitude: ride.fromLong,
      },
      to: {
        latitude: ride.toLat,
        longitude: ride.toLong,
      },
      fare: ride.fare,
      distance: ride.distance,
      status: ride.status,
      date: ride.date,
    };
  }
}

type Output = {
  rideId: string;
  passengerId: string;
  passengerName: string;
  driverId: string | null;
  from: {
    latitude: number;
    longitude: number;
  };
  to: {
    latitude: number;
    longitude: number;
  };
  fare: number;
  distance: number;
  status: string;
  date: Date;
};
