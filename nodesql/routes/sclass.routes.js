const express = require('express');

const router = express.Router();
const { Student } = require('../controllers/student/student-controller');



router.use('*',(req,res,next)=>{
   console.log("running it every routing file");
   //we can check which route is being hit
   console.log("URL Hit",req.originalUrl)
   res.myCustomId = "thisismycustomid";
   var commonStudentObj = new Student(req,res);


   next();
})

router.route('/')
   .get((req, res) => {
      //here we will use functinal api log function to create api log and in success and error response we will write
      //function to update the api log that was created here
      let sclassObj = new Student(req);
      sclassObj.singleStudent(req, res);
   })

   .patch((req,res)=>{
      let sclassObj = new Student(req,res);
      sclassObj.updateSingleStudent(req,res);
   });


router.route('/student-check')
   .get((req, res) => {
      let sclassObj = new Student(req,res);
      sclassObj.studentCheck();
   })





module.exports = router;