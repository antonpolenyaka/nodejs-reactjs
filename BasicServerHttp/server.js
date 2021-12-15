"use strict";

let user = require("./user");

let vasya = new user.User("Vasya");
let petya = new user.User("Petya");

vasya.hello(petya);