import { Car, Motorcycle } from "../classes/index.mjs";
import { Vendor } from "../services/vendor.mjs";
import { data } from "../data-vehicles.mjs";

export class App {
  constructor() {
    this.concesionaria = new Vendor();
    this.concesionaria.loadData(data);
  }

  printFullList() {
    for (const vehicle of this.concesionaria.vehicles) {
      const { make, model, price } = vehicle;
      const formattedPrice = new Intl.NumberFormat("es-AR", {
        minimumFractionDigits: 2,
      }).format(price);
      if (vehicle.hasOwnProperty("doors")) {
        const { doors } = vehicle;
        console.log(
          `Marca: ${make} // Model: ${model} // Puertas: ${doors} // Precio: $${formattedPrice}`
        );
      } else if (vehicle.hasOwnProperty("cylinder")) {
        const { cylinder } = vehicle;
        console.log(
          `Marca: ${make} // Model: ${model} // Cilindrada: ${cylinder}cc // Precio: $${formattedPrice}`
        );
      }
    }
  }

  getMostExpensive() {
    const mostExpensive = this.concesionaria.vehicles.reduce(
      (prevVehicle, currentVehicle) => {
        if (prevVehicle.price > currentVehicle.price) {
          return prevVehicle;
        } else {
          return currentVehicle;
        }
      },
      { price: 0 }
    );

    return mostExpensive;
  }

  getMostCheap() {
    const mostCheap = this.concesionaria.vehicles.reduce(
      (prevVehicle, currentVehicle) => {
        if (prevVehicle.price < currentVehicle.price) {
          return prevVehicle;
        } else {
          return currentVehicle;
        }
      },
      { price: this.concesionaria.vehicles[0] + 1 }
    );

    return mostCheap;
  }

  getModelWithY() {
    const modelWithY = this.concesionaria.vehicles.reduce(
      (prevVehicle, currentVehicle) => {
        const pattern = /[Y]/g;
        if (currentVehicle.model.match(pattern)) {
          return currentVehicle;
        } else {
          return prevVehicle;
        }
      },
      {}
    );

    return modelWithY;
  }

  getSortedList() {
    const sortedList = this.concesionaria.vehicles.sort(
      (vehicleA, vehicleB) => vehicleB.price - vehicleA.price
    );
    return sortedList;
  }

  print() {
    const formatter = new Intl.NumberFormat("es-AR", {
      minimumFractionDigits: 2,
    });
    const divider = "=============================";

    // method that prints everything
    this.printFullList();
    console.log(divider);

    // methods that return a concrete query
    const mostExpensive = this.getMostExpensive();
    const mostCheap = this.getMostCheap();
    const modelWithY = this.getModelWithY();
    console.log(
      `Vehículo más caro: ${mostExpensive.make} ${mostExpensive.model}`
    );
    console.log(`Vehículo más barato: ${mostCheap.make} ${mostCheap.model}`);
    console.log(
      `Vehículo que contiene en el modelo la letra 'Y': ${modelWithY.make} ${
        modelWithY.model
      } $${formatter.format(modelWithY.price)}`
    );
    console.log(divider);

    // method that sorts data by price
    console.log("Vehículos ordenados por precio de mayor a menor:");
    this.getSortedList().forEach((vehicle) =>
      console.log(`${vehicle.make} ${vehicle.model}`)
    );
  }
}
