import { AccountRepository } from '@/infra/repository/account-repository';
import { RideRepository } from '@/infra/repository/ride-repository';

export default class GetRide {
  constructor(
    readonly accountDAO: AccountRepository,
    readonly rideDAO: RideRepository
  ) {}

  async execute(rideId: string): Promise<Output> {
    const ride = await this.rideDAO.getRideById(rideId);
    const passengerAccount = await this.accountDAO.getAccountById(ride.getPassengerId());
    if (!passengerAccount) throw new Error('Passenger not found');
    return {
      rideId: ride.getRideId(),
      passengerId: ride.getPassengerId(),
      passengerName: passengerAccount.getName(),
      driverId: ride.getDriverId(),
      from: {
        latitude: ride.getFrom().getLatitude(),
        longitude: ride.getFrom().getLongitude(),
      },
      to: {
        latitude: ride.getTo().getLatitude(),
        longitude: ride.getTo().getLongitude(),
      },
      fare: ride.fare,
      distance: ride.getDistance(),
      status: ride.getStatus(),
      date: ride.date,
    };
  }
}

type Output = {
  rideId: string;
  passengerId: string;
  passengerName: string;
  driverId?: string;
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
