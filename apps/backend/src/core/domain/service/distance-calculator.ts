import Coordinates from '@/core/domain/value-objects/coordinates';

export class DistanceCalculator {
  static calculate(from: Coordinates, to: Coordinates) {
    const earthRadiusKm = 6371;
    const degreesToRadians = Math.PI / 180;
    const deltaLat = (to.getLatitude() - from.getLatitude()) * degreesToRadians;
    const deltaLon = (to.getLongitude() - from.getLongitude()) * degreesToRadians;
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(from.getLatitude() * degreesToRadians) *
        Math.cos(to.getLatitude() * degreesToRadians) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;
    return Math.round(distance);
  }
}
