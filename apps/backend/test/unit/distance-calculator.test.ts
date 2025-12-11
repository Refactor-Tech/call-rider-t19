import { describe, it, expect } from 'vitest';
import { DistanceCalculator } from '../../src/core/domain/service/distance-calculator';
import Coordinates from '@/core/domain/value-objects/coordinates';

describe('Distance Calculator', () => {
  it('should calculate the distance between two coordinates', () => {
    const from = new Coordinates(-27.584905257808835, -48.545022195325124);
    const to = new Coordinates(-27.496887588317275, -48.522234807851476);

    const distance = DistanceCalculator.calculate(from, to);
    expect(distance).toBe(10);
  });

  it('should calculate the distance between two coordinates approximately', () => {
    const from = new Coordinates(52.52, 13.405);
    const to = new Coordinates(48.8566, 2.3522);

    const distance = DistanceCalculator.calculate(from, to);
    expect(distance).toBeCloseTo(877, 0);
  });
});
