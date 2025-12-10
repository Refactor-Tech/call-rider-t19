import Ride from '@/core/domain/ride';
import { AccountRepository } from '@/infra/repository/account-repository';
import { RideRepository } from '@/infra/repository/ride-repository';

export default class AcceptRide {
  constructor(
    readonly accountRepository: AccountRepository,
    readonly rideRepository: RideRepository
  ) {}

  async execute(input: Input) {
    const accountData = await this.accountRepository.getAccountById(input.driverId);
    if (!accountData?.isDriver) throw new Error('Only drivers can accept rides');
    const hasActiveRide = await this.rideRepository.hasActiveRideByDriverId(
      input.driverId
    );
    if (hasActiveRide) throw new Error('Driver already has an active ride');
    const ride = await this.rideRepository.getRideById(input.rideId);
    if (!ride) throw new Error('Ride not found');
    ride.accept(input.driverId);
    await this.rideRepository.updateRide(ride);
  }
}

type Input = {
  rideId: string;
  driverId: string;
};
