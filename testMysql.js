/**
 * Created by pzc on 15-4-15.
 */
var Sequelize = require("sequelize");

var sequelize = new Sequelize('Test', 'root', '!@#123', {host: 'localhost'});


var Task = sequelize.define('Task', {title: Sequelize.STRING})
  , User = sequelize.define('User', {username: Sequelize.STRING})

User.hasOne(Task);
Task.belongsTo(User);


User.sync();
Task.sync();

//
//User
//  .create({username: 'ybt'})
//  .then(function (user) {
//    user
//      .createTask({title: 'you know'})
//      .then(function (result) {
//        console.log(result)
//      })
//  });


Task.findAll({include: [User]}).then(function (users) {
console.log(JSON.stringify(users));
});