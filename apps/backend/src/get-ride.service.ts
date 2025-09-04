import { AccountRepository } from './account-repository';
import { RideDAO } from './rideDAO';

export default class GetRide {
  constructor(
    readonly accountDAO: AccountRepository,
    readonly rideDAO: RideDAO
  ) {}

  async execute(rideId: string): Promise<Output> {
    const rideData = await this.rideDAO.getRideById(rideId);
    const passengerData = await this.accountDAO.getAccountById(rideData.passengerId);
    return {
      ...rideData,
      passengerName: passengerData.name,
    };
  }
}

type Output = {
  rideId: string;
  passengerId: string;
  passengerName: string;
  driverId: string;
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
