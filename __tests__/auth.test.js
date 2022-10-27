/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose = require("mongoose");
const request = require("supertest");
const gravatar = require("gravatar");

require("dotenv").config();

const app = require("../app");
const { User } = require("../models/user");

const {DB_TEST_HOST, PORT} = process.env;

describe("test auth routes", () => {
    let server;
    beforeAll(async () => { server = app.listen(PORT)});
    afterAll(() => server.close());

    beforeEach((done) => {
        mongoose.connect(DB_TEST_HOST).then(() => done())
    });

    afterEach((done) => {
        mongoose.connection.db.dropCollection("users", function () {
            console.log("Collection dropped");
            mongoose.connection.close(() => done());
        });
    });

    test("test create new user", async () => {
        try {
            const newUser = {
                email: "testuser@gmail.com",
                password: "123456",
                avatarURL: gravatar.url(this.email),
            };

            const validUser = new User(newUser);
            const savedUser = await validUser.save();

            expect(savedUser._id).toBeDefined();
            expect(savedUser.email).toBe(newUser.email);
            expect(validUser.password).toBe(newUser.password);
        } catch (err) {
            console.log(err);
        }
    });

    test("test login route", async () => {
        try { 
            const newUser = {
                email: "testuser@gmail.com",
                password: "123456",
                avatarURL: gravatar.url(this.email),
            };

            const user = await User.create(newUser);

            const loginUser = {
                    email: "testuser@gmail.com",
                    password: "123456",
                };

                const response = async () => {
                    await request(app).post("/api/auth/login").send(loginUser);
                    const { body } = response;
                    expect(response.statusCode).toBe(200);
                    const { token } = await User.findById(user._id);
                    expect(body.token).toBe(token);
                    expect(body.token).toBeTruthy();
                    const resObj = { email: user.email, subscription: user.subscription };
                    expect(response.body).toMatchObject(resObj);
                };
            } catch (err) {
                console.log(err);
        };
    });
});