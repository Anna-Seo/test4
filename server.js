//App URL: https://tame-puce-tadpole-toga.cyclic.app

const express = require("express");
const app = express();
const path = require('path');
const HTTP_PORT = process.env.PORT || 8080;
var dataPrep = require('./data_prep');

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

app.use(express.static('ggg'));

app.get("/", (req, res) => {
    res.send("<h2>Declaration (Instruction: test size in heading 2):</h2><p>The rest text is displayed in paragraph as shown in screenshot.<br /><br />I acknowledge the College's academic integrity policy - and my own integrity - remain in effect whether my work is done remotely or onsite. Any test or assignment is an act of trust between me and my instructor, and especially with my classmates... even when no one is watching. I declare I will not break that trust.<br /><br /> Name: <mark>Anna Seo</mark> <br /><br /> Student Number: <mark>110186202</mark> <br /><br /><ul><li><a href='/CPA'>CPA Students</a></li><li><a href='/highGPA'>Highest GPA</a></li><li><a href='/allStudents'>All Students</a></li><li><a href='/addStudent'>Add A New Student</a></li><li>Note: Locate specific student by student Id, e.g., http://localhost:8080/student/3</li></ul></p>");
});

app.get("/CPA", (req, res) => {
    dataPrep.cpa().then((data) => {
      res.json(data);
    }).catch((err) => {
      console.log(err);
    })
});

app.get("/highGPA", (req, res) => {
  dataPrep.highGPA().then((data) => {
    const Html = "<h2>Highest GPA:</h2>" + "Student ID: " + data.studId + "<br /><br />" + "Name: " + data.name + "<br /><br />" + "Program: " + data.program + "<br /><br />" + "GPA: " + data.gpa;
    res.send(Html);
  }).catch((err) => {
    console.log(err);
  })
});

app.get("/allStudents", (req, res) => {
    dataPrep.allStudents().then((data) => {
        res.json(data);
    }).catch((err) => {
      console.log(err);
    })
  });

app.get("/addStudent", (req, res) => {
    res.sendFile(path.join(__dirname, "/test3_views/addStudent.html"));
});

app.post("/addStudent", (req, res) => {
    dataPrep.addStudent(req.body).then((data)=>{
        const Html = "<h2>The New Student Information</h2>" + "Student ID: " + data.studId + "<br /><br />" + "Student name: " + data.name + "<br /><br />" + "Program: " + data.program + "<br /><br />" + "GPA: " + data.gpa + "<a href='/allStudents'>All Students</a><br /><a href='/'>Go Home</a>";
        res.json(Html);
    }).catch((err) => {
        console.log(err);
    })
});

app.get("/student/:studId", (req, res) => {
    dataPrep.getStudent(req.params.studId).then((data) => {
    const Html = "<h2>This Student Information</h2>" + "Student ID: " + data.studId + "<br /><br />" + "Student name: " + data.name + "<br /><br />" + "Program: " + data.program + "<br /><br />" + "GPA: " + data.gpa + "<br /><br /><a href='/allStudents'>All Students</a><br /><a href='/'>Go Home</a>";
      res.send(Html);
    }).catch((err) => {
      console.log(err);
    })
  });

app.use((req, res) => {
  res.status(404).send("Error 404:page not found.");
});

dataPrep.prep()
.then(() => {
    app.listen(HTTP_PORT, onHttpStart);
})
.catch(function(err) {
    console.log(err);
})