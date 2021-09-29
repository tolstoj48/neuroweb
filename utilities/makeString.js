'use strict';

const faker = require('faker');

module.exports.makeString = (charLimit) => {
    let str = faker.lorem.paragraph()
    if (str.length > charLimit) {
        str = str.slice(0, charLimit - 1)
    }
    return str
}