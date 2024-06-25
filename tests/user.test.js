const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

let server;
let token;
let testUserId;

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const testUser = new User({
    email: "testuser@example.com",
    name: "Test User",
    age: 25,
    city: "Test City",
    zipCode: "12345",
    password: "password123",
    isDeleted: false,
  });

  await testUser.save();
  testUserId = testUser._id;

  token = jwt.sign({ id: testUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Start the server
  server = app.listen(3339, () => {
    console.log("Server is running on port 3339");
  });
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();

  // Close the server
  server.close();
});

describe("User API", () => {
  it("should list all users", async () => {
    const res = await request(app)
      .get("/worko/user")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(1);
  });

  it("should get user details by ID", async () => {
    const user = await User.findOne({ email: "testuser@example.com" });

    const res = await request(app)
      .get(`/worko/user/${user._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.email).toEqual("testuser@example.com");
  });

  it("should create a new user", async () => {
    const newUser = {
      email: "newuser@example.com",
      name: "New User",
      age: 30,
      city: "New City",
      zipCode: "67890",
      password: "newpassword123",
    };

    const res = await request(app)
      .post("/worko/user")
      .set("Authorization", `Bearer ${token}`)
      .send(newUser);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("token");
  });
});
