const promptSync = require('prompt-sync');


class Person {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Ride {
    id: number;
    origin: number;
    destination: number;
    seats: number;
    rideStatus = RideStatus.IDLE;
    AMT_PER_KM: number = 10;

    constructor(id: number, origin: number, dest: number, seats: number) {
        this.id = id;
        this.origin = origin;
        this.destination = dest;
        this.seats = seats
    }



    //either we can use getters and setters to set and get the value or we can do it 
    //by using dot operator it is supported in javasctipt

    calculateFare(isPriorityRider: boolean) {
        let dist = this.destination - this.origin;
        if (this.seats < 2) {
            return dist * this.AMT_PER_KM * (isPriorityRider ? 0.75 : 1);
        }
        return dist * this.seats * this.AMT_PER_KM * (isPriorityRider ? 0.75 : 1);

    }
}

// const RideStatus = Object.freeze({  //like enums in javascript
//     IDLE: 0, 
//     CREATED: 1, 
//     WITHDRAWN: 2, 
//     COMPLETED: 3, 
// });

enum RideStatus {
    IDLE,
    CREATED,
    WITHDRAWN,
    COMPLETED
}

class Driver extends Person {
    constructor(name: string) {
        super(name);
    }
    currentRide!: Ride;
}

class Rider extends Person {
    constructor(name: string) {
        super(name);
    }

    completedRides: any = [];
    currentRide!: Ride;

    createRide(id: number, origin: number, dest: number, seats: number) {

        if (origin > dest) {
            console.log("Cannot Create Ride");
            return;
        }

        this.currentRide = new Ride(id, origin, dest, seats);
        this.currentRide.rideStatus = RideStatus.CREATED;

        console.log("Ride Created\n", this.currentRide);
    }

    updateRide(id: number, origin: number, dest: number, seats: number) {
        //console.log("Ride is updated",this.currentRide);
        if (this.currentRide.rideStatus === 2) {
            console.log("Cannot Update Ride is withdrawn ");
            return;
        }

        if (this.currentRide.rideStatus === 3) {
            console.log("Cannot Update Ride is completed");
            return;
        }

        this.currentRide.id = id;
        this.currentRide.origin = origin;
        this.currentRide.destination = dest;
        this.currentRide.seats = seats;

        console.log("Ride Updated\n", this.currentRide);


    }

    withdrawRide() {

    }

    closeRide() {
        this.currentRide.rideStatus = 3;
        this.completedRides.push(this.currentRide);
        console.log("Ride is Completed and Closed");
        console.log("Total Rides", this.completedRides);

    }
}

const menuInterface = () => {
    var prompt = promptSync({});

    console.log("Create New Ride (1)\n Update Ride (2)\n Close Ride (3)\n  Add Rider(4)\n Add Driver(5)\n View Your Rides (6)\n Main Menu (7)\n");
    let myInput = prompt("Enter Input : ");
    myInput = parseInt(myInput);
    switch (myInput) {
        case 1:
            let riderName = prompt("Enter Rider Name: ")
            let rider1 = new Rider(riderName);
            let id = prompt("Enter Ride ID: ");
            id = parseInt(id);
            let origin = prompt("Enter Origin: ");
            let destination = prompt("Enter Destination: ");
            let seats = prompt("Enter Seats: ");

            rider1.createRide(id,origin,destination,seats);

            break;
        case 2:

            break;
        case 3:

            break;
        case 4:

            break;
        case 5:

            break;
        case 6:

            break;
        case 7:
            break;

        default:
            break;

    }
    //console.log("You Entered ", myInput);
}

function main() {
    console.log("Ride Share Application Started");

    //let r1 = new Ride(1,3,6,2);
    //console.log("Total Ride amount:",r1.calculateFare(false));

    // let rider1 = new Rider("Tej");
    // rider1.createRide(2,4,8,4);
    // rider1.closeRide();
    // rider1.updateRide(2,5,8,3);

    //menuInterface();

    var prompt = promptSync({});
    let myInput = prompt("Enter Input : ");
    myInput = parseInt(myInput);

    while(myInput != 0){
        console.log("my input is not zero")
    }
    

}

main();

// npx ts-node ride-share.ts
//to run this script