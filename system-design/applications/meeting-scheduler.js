class Room {
    name;
    calendar=[];

    constructor(name){
        this.name = name;
    }

    bookRoom(start,end){
        for(let meeting of this.calendar){
            // todo implement this function
            if(meeting.start < end && start < meeting.end){
                return false;
            }
        }
        let newMeeting = new Meeting(start,end);
        this.calendar.push(newMeeting);
        return true;
    }

    getAllMeetings(){
        return this.calendar;
    }
}

class Meeting {
    start;
    end;
    room;
    
    constructor(start,end,room){
       this.start = start,
       this.end = end;
       this.room = room;        
    }
}

class Scheduler {
    rooms = [];
    constructor(rooms){
        this.rooms = rooms;
    }

    book(start,end){
        for(let room of this.rooms){
            let flag = room.bookRoom(start,end);
            if(flag == true){
                //console.log(room);
                return room.name;
            }
        }

        return "No Rooms Available";
    }
}

function main() {
    let r1 = new Room("Atlas");
    let r2 = new Room("Nexus");
    let r3 = new Room("Holy cow");

    let rooms = [];
    rooms.push(r1);
    rooms.push(r2);
    rooms.push(r3);

    let newSchedular = new Scheduler(rooms);
    console.log(newSchedular.book(2,5));
    console.log(newSchedular.book(5,8));
    console.log(newSchedular.book(4,8));
    console.log(newSchedular.book(3,6));
    console.log(newSchedular.book(7,8));
}

main();

