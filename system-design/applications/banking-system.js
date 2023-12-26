class Bank {
    code;
    name;
    customers = [];
    accounts = [];

    constructor(code, name) {
        this.code = code;
        this.name = name;
    }

    addCustomer(id, name, account_no, dob, address) {
        let new_customer = new Customer(id, name, account_no, dob, address)
        this.customers.push(new_customer);
        let account = new_customer.openAccount("both");
        this.accounts.push(account);
        console.log(new_customer);
    };
    removeCustomer(id) {
        const remainingCustomers = this.customers.filter((singleCustomer) => {
            return singleCustomer.id != id;
        })
        this.customers = remainingCustomers;
        return this.customers;
    };

    getSingleCustomer(id){
        for(let singleCustomer of this.customers){
            if(singleCustomer.id == id){
            console.log("Customer info fetched",singleCustomer);
            return singleCustomer;
            }
        }
        console.log("no customer found");
        return null;
    }

    getAllCustomers() {
        console.log("Total Customers", this.customers);
    }
}

class Customer {
    id;
    name;
    account_no;
    dob;
    address;

    constructor(id, name, account_no, dob, address) {
        this.id = id;
        this.name = name;
        this.account_no = account_no;
        this.dob = dob;
        this.address = address;
    }


    login() {
        console.log("customer logged in")
    };

    openAccount(account_type) {
        if (account_type == "savings") {
            let new_account = new SavingsAccount(this.account_no,this.name,0,"active",0);
            console.log(new_account);
        }

        if (account_type == "current") {
            let new_account = new CurrentAccount(this.account_no,this.name,0,"active",7);
            console.log(new_account);
        }

        if (account_type == "both") {
            let new_savings_account = new SavingsAccount(this.account_no,this.name,0,"active",0);
            let new_current_account = new CurrentAccount(this.account_no,this.name,0,"active",7);
            console.log(new_current_account);
            console.log(new_savings_account);
        }
    };


    logout() {
        console.log("customer logged out");
    };
}

class Employee {
    id;
    name;
    designation;
    salary;

    constructor(id, name, designation, salary) {
        this.id = id;
        this.name = name;
        this.designation = designation;
        this.salary = salary;
    }

    updateCustomerInfo(customer_id) {
        //to do
    };
}

class BankAccount {
    account_number;
    holder_name;
    balance;
    status;

    constructor(account_number, holder_name, balance, status) {
        this.account_number = account_number;
        this.holder_name = holder_name;
        this.balance = balance;
        this.status = status;
    }

    checkBalance() {
        return this.balance;
    };
}

class SavingsAccount extends BankAccount {
    min_balance;
    constructor(account_number, holder_name, balance, status, min_balance) {
        super(account_number, holder_name, balance, status);
        this.min_balance = min_balance;
    }
    deposit(amount) {
        this.min_balance = this.min_balance + amount;
        console.log(`${amount} Deposited`)
    };
    transfer(account_number, amount) {
        if (amount > this.min_balance) {
            console.log("Not Enough Balance")
        } else {
            this.min_balance = this.min_balance - amount;
            console.log(`${amount} Transferred`)
        }
    };
    withdrawn(amount) {
        if (amount > this.min_balance) {
            console.log("Not Enough Balance")
        } else {
            this.min_balance = this.min_balance - amount;
            console.log(`${amount} Deducted`)
        }
    };
}

class CurrentAccount extends BankAccount {
    interest_rate;
    constructor(account_number, holder_name, balance, status, interest_rate) {
        super(account_number, holder_name, balance, status);
        this.interest_rate = interest_rate;
    }
    deposit(amount) {
        this.min_balance = this.min_balance + amount;
        console.log(`${amount} Deposited`)
    };
    transfer(account_number, amount) {
        if (amount > this.min_balance) {
            console.log("Not Enough Balance")
        } else {
            this.min_balance = this.min_balance - amount;
            console.log(`${amount} Transferred`)
        }
    };
    withdrawn(amount) {
        if (amount > this.min_balance) {
            console.log("Not Enough Balance")
        } else {
            this.min_balance = this.min_balance - amount;
            console.log(`${amount} Deducted`)
        }
    };
}


const main = () =>{
    console.log("Banking System Started");
    let bank1 = new Bank(101,"State Bank Of India (SBI)");
    let bank2 = new Bank(102,"Bank Of India (BOI)")
    let bank3 = new Bank(103,"Punjab National Bank (PNB)")
    let bank4 = new Bank(104,"INDUSIND BANK");

    
    bank1.addCustomer(1,"Tej pratap",1234,"16/03/2002","Patna");
    bank1.addCustomer(2,"Satyam Mishra",1235,"13/10/2000","Banaras");
    bank1.addCustomer(3,"Ranjeet Singh",1236,"11/04/1999","Delhi");
    bank1.getAllCustomers();
    const bank_customer = bank1.getSingleCustomer(2);
    console.log(bank_customer.name);



};

main();