const Sequelize = require('sequelize');

var sequelize = new Sequelize('qtsvubob', 'qtsvubob', 'NFVpZO7ehl0OaOaymP6ZQEb1h4Sm0MNW', {
    host: 'peanut.db.elephantsql.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
    ssl: true
    },
    query:{raw: true}
});   

sequelize.authenticate()
.then(()=> console.log('Connection success.'))
.catch((err)=>console.log("Unable to connect to DB.", err));

var Student = sequelize.define('Student', {
    StudId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    program: Sequelize.STRING,
    gpa: Sequelize.FLOAT,
}, {
    createdAt: false,
    updatedAt: false
});

module.exports = {
    prep: function(){
        let myPromise = new Promise(function(resolve, reject){
            sequelize.sync().then(() => {
                resolve();
            }).catch(err => {
                reject("unable to sync the database");
            })
        })
        return myPromise;
    }, cpa: function(){
        return new Promise(function(resolve, reject){
            Student.findAll({
                where:{program:'cpa'}
            }).then(function(data){
                resolve(data);
            }).catch(function(){
                reject("no results returned");
            });
        }); 
    }, highGPA: function(){
        return new Promise(function(resolve, reject){
            Student.findAll({
                order:sequelize.literal('gpa DESC')
            }).then(function(data){
                resolve(data[0]);
            }).catch(function(){
                reject("no results returned");
            })
        }); 
    }, allStudents: function(){
        return new Promise(function(resolve, reject){
            Student.findAll({
            }).then(function(data){
                resolve(data);
            }).catch(function(){
                reject("no results returned");
            })
        }); 
    }, addStudent: function(student_object) {
        return new Promise(function(resolve, reject){
            Student.create(student_object).then(function(){
                resolve();
            }).catch(function(){
                reject("unable to add the student");
            })
        }); 
    }, getStudent: function(id){
        return new Promise(function(resolve, reject){
            Student.findAll({
                where:{StudId:id}
            }).then(function(data){
                resolve(data);
            }).catch(function(){
                reject("no results returned");
            })
        }); 
    }
}