import { AccountDAO } from './accountDAO';
import { RideDAO } from './rideDAO';

export default class RequestRide {
  constructor(
    readonly accountDAO: AccountDAO,
    readonly rideDAO: RideDAO
  ) {}

  async execute(input: Input) {
    const accountData = await this.accountDAO.getAccountById(input.passengerId);
    if (!accountData.isPassenger) {
      throw new Error('Only passengers can request rides');
    }
    const hasActiveRide = await this.rideDAO.hasActiveRideByPassengerId(input.passengerId);
    if (hasActiveRide) {
      throw new Error('Passenger already has an active ride');
    }
    const ride = {
      rideId: crypto.randomUUID(),
      passengerId: input.passengerId,
      from: {
        latitude: input.from.latitude,
        longitude: input.from.longitude,
      },
      to: {
        latitude: input.to.latitude,
        longitude: input.to.longitude,
      },
      status: 'requested',
      fare: 0,
      distance: 0,
      date: new Date(),
    };
    await this.rideDAO.saveRide(ride);
    return {
      rideId: ride.rideId,
    };
  }
}

type Input = {
  passengerId: string;
  from: {
    latitude: number;
    longitude: number;
  };
  to: {
    latitude: number;
    longitude: number;
  };
};
