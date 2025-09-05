import Ride from '@/core/domain/ride';
import { AccountRepository } from '@/infra/repository/account-repository';
import { RideRepository } from '@/infra/repository/ride-repository';

export default class RequestRide {
  constructor(
    readonly accountRepository: AccountRepository,
    readonly rideRepository: RideRepository
  ) {}

  async execute(input: Input) {
    const accountData = await this.accountRepository.getAccountById(input.passengerId);
    if (!accountData?.isPassenger) {
      throw new Error('Only passengers can request rides');
    }
    const hasActiveRide = await this.rideRepository.hasActiveRideByPassengerId(
      input.passengerId
    );
    if (hasActiveRide) {
      throw new Error('Passenger already has an active ride');
    }
    const ride = Ride.create(
      input.passengerId,
      input.from.latitude,
      input.from.longitude,
      input.to.latitude,
      input.to.longitude
    );

    await this.rideRepository.saveRide(ride);
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
