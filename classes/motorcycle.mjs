import { Vehicle } from "./vehicle.mjs";

export class Motorcycle extends Vehicle {
  constructor(make, model, cylinder, price) {
    super(make, model, price);
    this.cylinder = cylinder;
  }
}
