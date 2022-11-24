//App URL: 

const express = require("express");
const app = express();
const path = require('path');
const HTTP_PORT = process.env.PORT || 8080;
var dataPrep = require('./data_prep');

function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
} 

const exphbs = require('express-handlebars');
app.engine('.hbs', exphbs.engine({ 
  extname: '.hbs',
  defaultLayout: 'main'
}));
app.set('view engine', '.hbs');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.render('home', {
  });
});

app.get("/CPA", (req, res) => {
    dataPrep.cpa().then((data) => {
      res.render("students",{students:data});
    }).catch((err) => {
      console.log(err);
    })
});

app.get("/highGPA", (req, res) => {
  dataPrep.highGPA().then((data) => {
    res.render("student",{student:data});
  }).catch((err) => {
    console.log(err);
  })
});

app.get("/allStudents", (req, res) => {
    dataPrep.allStudents().then((data) => {
      res.render("students",{students:data});
    }).catch((err) => {
      console.log(err);
    })
  });

app.get("/addStudent", (req, res) => {
  res.sendFile(path.join(__dirname, "/test3_views/addStudent.html"));
});

app.post("/addStudent", (req, res) => {
  dataPrep.addStudent(req.body).then(()=>{
    res.render('student',{student:req.body});
  }).catch((err) => {
    console.log(err);
  })
});

app.get("/student/:studId", (req, res) => {
  dataPrep.getStudent(req.params.studId).then((data) => {
    res.render('student',{student:data});
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