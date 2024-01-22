const sql = require('./db');

const Student = function (student) {
    const { name, email, city_id, tut_id } = student;
    this.name = name;
    this.email = email;
    this.city_id = city_id;
    this.tut_id = tut_id;
}


Student.getAll = (result) => {
    let query;
    //query = "SELECT name,email,c_name FROM students JOIN cities ON city_id = c_id";
    //query = "SELECT * FROM students JOIN cities ON city_id = c_id";
    query = "SELECT * FROM students JOIN cities ON students.city_id = cities.c_id JOIN tutorials ON students.tut_id = tutorials.id";
    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result("Error Getting students", err);
            return;
        }

        //console.log("students: ", res);
        result(null, res);
    })
};

Student.getOne = (req, result) => {
    let query = "SELECT * FROM students WHERE s_id = ?";
    let params = [req.body.id];
    sql.query(query, params, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result("Error getting single student", err);
            return;
        }

        console.log("students: ", res);
        result(null, res);
    })
};


Student.update = async (req, result) => {
    let query, where, params = [];

    query = "UPDATE students SET email = ?";
    where = "WHERE s_id = ?";
    params = [req.body.email, req.body.id];

    if (where) {
        query = query + " " + where;
    }

    sql.query(query, params, (err, res) => {
        if (err) return result(err, null)

        console.log("query executed successfully");
        console.log(res);
        return result(null, res)
    });


};



Student.promiseGetOne = () =>{
    return new Promise((resolve,reject)=>{
        let query = "SELECT * FROM students WHERE s_id=58585 LIMIT 1";
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(err);
            }

            //console.log("students: ", res);
            resolve(res);
        });
    })
}

module.exports = Student;