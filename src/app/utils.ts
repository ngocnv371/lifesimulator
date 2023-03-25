import { Curve, Progression } from "./models";

/**
 * bezier path with 4 control points
 * P = (1−t)^3 P1 + 3(1−t)^2 tP2 +3(1−t)t^2 P3 + t^3 P4
 * @param t [0-1]
 * @param a first point
 * @param b second point
 * @param c third point
 * @param d fourth point
 * @returns result value
 */
export function cubicBezier(
  t: number,
  a: number,
  b: number,
  c: number,
  d: number
) {
  return (
    (1 - t) * (1 - t) * (1 - t) * a +
    3 * (1 - t) * (1 - t) * t * b +
    3 * (1 - t) * t * t * c +
    t * t * t * d
  );
}

function curveToPoints(curve: Curve): number[] {
  const sampleCurves: Record<Curve, number[]> = {
    linear: [0, 0, 1, 1],
    "ease-out": [0, 0, 0.58, 1],
    "ease-in-out": [0.42, 0, 0.58, 1],
    "ease-in": [0.42, 0, 1, 1],
  };
  return sampleCurves[curve];
}

export function calculateProgression(
  progression: Progression,
  value: number
): number {
  const [curve, min, max] = progression;
  const points = curveToPoints(curve);
  const position = cubicBezier(
    value,
    points[0],
    points[1],
    points[2],
    points[3]
  );
  return Math.floor(min + position * max);
}

/**
 * get a random value in range
 * @param min inclusive
 * @param max exclusive upper
 * @returns random
 */
export function randomRange(min: number, max: number) {
  return Math.floor(min + Math.random() * max);
}

export function oneOf<T>(items: T[]): T {
  const length = items.length;
  const index = Math.floor(Math.random() * length);
  return items[index];
}

/**
 * get threshold
 * @param bag bag of
 * @param value
 */
export function getThresholdValue<T>(bag: Record<number, T>, value: number) {
  const sortedKeys = Object.keys(bag)
    .map((k) => +k)
    .sort((a, b) => a - b);

  let index = 0;
  for (let i = 1; i < sortedKeys.length; i++) {
    if (sortedKeys[i] > value) {
      break;
    }
    index = i;
  }
  return bag[sortedKeys[index]];
}

export function formatCurrency(value: number) {
  // Format the amount as currency
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
  return formattedAmount;
}
