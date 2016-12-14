var modelUser = require('./users');
var modelDessy = require('./dessy');
var modelDessynta = require('./dessynta');

modelDessy.belongsTo(modelUser);
modelUser.hasMany(modelDessy);

modelDessynta.belongsTo(modelUser);
modelUser.hasMany(modelDessynta);

module.exports = {
    users: modelUser,
    dessy: modelDessy,
    dessynta: modelDessynta,
    sync: () => {
        modelUser.sync();
        modelDessy.sync();
        modelDessynta.sync();
    }
}