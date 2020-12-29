import { Vehicle } from "./vehicle.mjs";

export class Car extends Vehicle {
  constructor(make, model, doors, price) {
    super(make, model, price);
    this.doors = doors;
  }
}
