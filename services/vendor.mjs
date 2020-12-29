import { Car, Motorcycle } from "../classes/index.mjs";
import { data } from "../data-vehicles.mjs";

export class Vendor {
  constructor() {
    this.vehicles = [];
  }

  loadData(data) {
    for (const vehicle of data) {
      switch (vehicle.type) {
        case "car":
          const car = this.loadCar(vehicle);
          this.vehicles.push(car);
          break;
        case "motorcycle":
          const motorcycle = this.loadMotorcycle(vehicle);
          this.vehicles.push(motorcycle);
          break;
        default:
          throw new Error(
            `El vehículo de tipo '${vehicle.type}' no es válido.`
          );
      }
    }
  }

  loadCar(car) {
    const { make, model, doors, price } = car;
    const newCar = new Car(make, model, doors, price);
    return newCar;
  }

  loadMotorcycle(motorcycle) {
    const { make, model, cylinder, price } = motorcycle;
    const newMotorcycle = new Motorcycle(make, model, cylinder, price);
    return newMotorcycle;
  }
}
