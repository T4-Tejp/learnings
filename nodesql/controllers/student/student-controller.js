const studentModel = require('../../models/studentModel');
const { successResponse, errorResponse } = require('../../lib/responseHandler')

class Student {
    constructor(req, res) {
        //here we can access all type list
        this.request = req;
        this.response = res;
        this.userid = "2323"
        console.log("req params of student", req.query);
        console.log("this is runs ");

    }


    singleStudent = async (req, res) => {
        studentModel.getAll((err, data) => {
            try {
                if (err) return errorResponse(res, 400, "Could Not Fetch Students", err);
                res.tableInfo = "student table error log update";
                throw new Error("New Error buddy");
                return successResponse(res, 200, "Students Data Fetched", data);
            } catch (err) {
                errorResponse(res, 400, "Could Not Fetch Students", err);
            }
        })

    }

    updateSingleStudent = async (req, res) => {
        try {
            studentModel.getOne(req, (err, data) => {
                if (err) console.log(err);
                if (data.length === 0) {
                    return errorResponse(res, 400, "no student found", {});
                } else {
                    studentModel.update(req, (err, data) => {
                        if (err) return errorResponse(res, 400, "Could Not update Students", err);

                    })
                    studentModel.getOne(req, (err, data) => {
                        return successResponse(res, 200, "Students Data Updated", data);

                    })
    
                }

            })


        } catch (err) {
            return errorResponse(res, 500, "could not update student", err);
        }

    }

    //purely classbased function
    studentCheck = async () => {
        try {
            //here we have to access the req using the parameter only not by class reqParams
            // it is not accessible console below will throm an error
            console.log("inside class function", this.request.query);
            console.log("It is accessible in all class functions", this.userid);

            const myres = await studentModel.promiseGetOne();
            console.log(myres);
            return successResponse(this.response, 200, "Students check ", myres);
        } catch (err) {
            errorResponse(this.response, 500, "Student Check Error", err);
        }
    }
}

exports.Student = Student;

