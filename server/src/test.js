"use strict";
exports.__esModule = true;
exports.createRandomUser = exports.USERS = void 0;
var faker_1 = require("@faker-js/faker");
exports.USERS = [];
function createRandomUser() {
    return {
        id: faker_1.faker.datatype.uuid(),
        avatar: faker_1.faker.image.avatar(),
        name: faker_1.faker.internet.userName(),
        major: faker_1.faker.music.songName(),
        grade: faker_1.faker.random.numeric(),
        sex: '男',
        phone: faker_1.faker.phone.imei(),
        email: faker_1.faker.internet.email()
    };
}
exports.createRandomUser = createRandomUser;
Array.from({ length: 10 }).forEach(function () {
    exports.USERS.push(createRandomUser());
});
console.log(createRandomUser());
