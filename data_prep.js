const students = [];
module.exports = {
    prep: function(){
        let fs = require('fs');
        let myPromise = new Promise(function(resolve, reject){
            try {
                fs.readFile('./student.json', 'utf-8', (err,data)=>{
                    if(err) throw err;
                    else{
                        students.push(JSON.parse(data));
                }})
                resolve();
            }
            catch(error){
                reject("unable to read file");
            }
        })
        return myPromise;
    }, cpa: function(){
        let cpaStudents = [];
        return new Promise(function(resolve, reject){
            for(let i = 0; i < students[0].length; i++){
                if(students[0][i].program == 'CPA'){
                    cpaStudents.push(students[0][i]);
                }
            }
            if(cpaStudents.length > 0){
                resolve(cpaStudents);
            }
            else {
                reject("no results returned");
            }
        }); 
    }, highGPA: function(){
        let highestGPA = students[0][0];
        return new Promise(function(resolve, reject){
            for(let i = 0; i < students[0].length; i++){
                if(students[0][i].gpa > highestGPA.gpa){
                    highestGPA = students[0][i];
                }
            }
            if(highestGPA){
                resolve(highestGPA);
            }
            else{
                reject("Failed finding the student with the highest GPA");
            }
        }); 
    }, allStudents: function(){
        return new Promise(function(resolve, reject){
            if(students[0].length > 0){
                resolve(students[0]);
            }
            else{
                reject("no results returned");
            }
        }); 
    }, addStudent: function(student_object) {
        return new Promise(function(resolve, reject){
            students[0].push(student_object);
            resolve();
        }); 
    }, getStudent: function(id){
        let studentNum = [];
        return new Promise(function(resolve, reject){
            for(let i = 0; i < students[0].length; i++){
                if(students[0][i].studId == id){
                    studentNum.push(students[0][i]);
                }
            }
            if(studentNum.length > 0){
                resolve(studentNum[0]);
            }
            else{
                reject("no results returned");
            }
        }); 
    }
}