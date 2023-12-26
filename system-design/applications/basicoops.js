


class Person {

    name;
    age;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    sayMyName() {
        console.log("person name is called", this.name)
    }
}

class Student extends Person {

    standard;
    constructor(name,age,standard) {
        super(name,age); //name, age will be putted for student object as defined in person
        this.standard = standard;
    }
    
    read(myArg) {
        console.log("student is reading in",this.standard,myArg);
    }
}




const main = () => {
    console.log("Script Running")

    let p1 = new Person("Tej", 32);
    p1.sayMyName();

    let s1 = new Student("mystudent",21,4);
    s1.sayMyName();
 
    s1.read("i am reading");
}

main();