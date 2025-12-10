import { RideRepository } from '@/infra/repository/ride-repository';

export default class StartRide {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input) {
    const ride = await this.rideRepository.getRideById(input.rideId);
    if (!ride) throw new Error('Ride not found');
    ride.start();
    await this.rideRepository.updateRide(ride);
  }
}

type Input = {
  rideId: string;
};
