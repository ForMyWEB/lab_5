class Vehicle {
    constructor(licensePlate, size) {
      this.licensePlate = licensePlate;
      this.size = size;
      this.parkingTime = null;
    }
  }
  
  class Car extends Vehicle {
    constructor(licensePlate) {
      super(licensePlate, 1);
    }
  }
  
  class Truck extends Vehicle {
    constructor(licensePlate) {
      super(licensePlate, 2);
    }
  }
  
  class Motorcycle extends Vehicle {
    constructor(licensePlate) {
      super(licensePlate, 1);
    }
  }
  
  class ParkingSpot {
    constructor(spotNumber, size) {
      this.spotNumber = spotNumber;
      this.size = size;
      this.isOccupied = false;
      this.vehicle = null;
    }
  
    assignVehicle(vehicle) {
      if (!this.isOccupied && vehicle.size <= this.size) {
        this.isOccupied = true;
        this.vehicle = vehicle;
        this.vehicle.parkingTime = Date.now();
        return true;
      }
      return false;
    }
  
    freeSpot() {
      if (this.isOccupied) {
        const parkedTime = (Date.now() - this.vehicle.parkingTime) / 1000;
        console.log(`Vehicle ${this.vehicle.licensePlate} stayed for ${parkedTime} seconds.`);
        this.isOccupied = false;
        this.vehicle = null;
      }
    }
  }
  
  class ParkingLot {
    constructor(spots) {
      this.spots = spots;
    }
  
    parkVehicle(vehicle) {
      for (let spot of this.spots) {
        if (!spot.isOccupied && vehicle.size <= spot.size) {
          if (spot.assignVehicle(vehicle)) {
            console.log(`Vehicle ${vehicle.licensePlate} parked at spot ${spot.spotNumber}.`);
            return true;
          }
        }
      }
      console.log(`No available spot for vehicle ${vehicle.licensePlate}.`);
      return false;
    }
  
    leaveSpot(spotNumber) {
      const spot = this.spots.find(s => s.spotNumber === spotNumber);
      if (spot && spot.isOccupied) {
        console.log(`Spot ${spot.spotNumber} is now free.`);
        spot.freeSpot();
      } else {
        console.log(`Spot ${spotNumber} is already free or does not exist.`);
      }
    }
  
    checkFreeSpots() {
      const freeSpots = this.spots.filter(spot => !spot.isOccupied);
      console.log(`Free spots: ${freeSpots.map(s => s.spotNumber).join(', ')}`);
    }
  }
  
  const parkingSpots = [
    new ParkingSpot(1, 1),
    new ParkingSpot(2, 1),
    new ParkingSpot(3, 2),
    new ParkingSpot(4, 2),
  ];
  
  const parkingLot = new ParkingLot(parkingSpots);
  
  const car = new Car("ABC-123");
  const truck = new Truck("DEF-456");
  const motorcycle = new Motorcycle("GHI-789");
  
  parkingLot.checkFreeSpots();
  parkingLot.parkVehicle(car);
  parkingLot.parkVehicle(truck);
  parkingLot.parkVehicle(motorcycle);
  
  parkingLot.checkFreeSpots();
  
  setTimeout(() => {
    parkingLot.leaveSpot(2);
    parkingLot.checkFreeSpots();
  }, 3000);