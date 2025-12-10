import { Position } from '@/core/domain/position';
import { RideRepository } from '@/infra/repository/ride-repository';

export default class UpdatePosition {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input) {
    const ride = await this.rideRepository.getRideById(input.rideId);
    const position = Position.create(input.rideId, input.latitude, input.longitude);
    ride.updatePosition(position);
    await this.rideRepository.updateRide(ride);
  }
}

type Input = {
  rideId: string;
  latitude: number;
  longitude: number;
};
