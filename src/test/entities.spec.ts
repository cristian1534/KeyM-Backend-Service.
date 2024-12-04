import { connectTestDB, disconnectTestDB } from "./setup";
import { v4 as uuidGenerator } from "uuid";
import mongoose from "mongoose";
import supertest from "supertest";
import app from "../app";
import { response } from "express";

interface IUser {
  name: string;
  email: string;
  password: string;
}

interface ICredentials {
  email: string;
  password: string;
}

const request = supertest(app);

beforeAll(async () => {
  await connectTestDB();
});

afterAll(async () => {
  await disconnectTestDB();
});
beforeEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
});

describe("User API Service", () => {
  it("Should register a new User", async () => {
    const user: IUser = {
      name: "Gonzalo Romero",
      email: `gonzalo.romero+${uuidGenerator()}@outlook.com`,
      password: "12345678",
    };

    const response = await request.post("/users").send(user);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("name", user.name);
    expect(response.body.data).toHaveProperty("email", user.email);
  });

  it("Should not register same email address", async () => {
    const user: IUser = {
      name: "Gonzalo Romero",
      email: "gonzalo.romero@outlook.com",
      password: "12345678",
    };

    await request.post("/users").send(user);

    const response = await request.post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.data).toHaveProperty(
      "error",
      "Email already registered"
    );
  });

  it("Should not allow empty inputs", async () => {
    const user: IUser = {
      name: "",
      email: "gonzalo.romero@outlook.com",
      password: "12345678",
    };

    const response = await request.post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.data).toHaveProperty(
      "error",
      '"name" is not allowed to be empty'
    );
  });

  it("Should accept only a valid schema for email address", async () => {
    const user: IUser = {
      name: "Gonzalo Romero",
      email: "gonzalo.romero",
      password: "12345678",
    };

    const response = await request.post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.data).toHaveProperty(
      "error",
      '"email" must be a valid email'
    );
  });

  it("Should accept minimum 8 characters for password", async () => {
    const user: IUser = {
      name: "Gonzalo Romero",
      email: "gonzalo.romero@outlook.com",
      password: "12345",
    };

    const response = await request.post("/users").send(user);
    expect(response.status).toBe(400);
    expect(response.body.data).toHaveProperty(
      "error",
      '"password" length must be at least 8 characters long'
    );
  });

  it("Should authenticate a User with correct credentials", async () => {
    const user: IUser = {
      name: "Gonzalo Romero",
      email: "gonzalo.romero@outlook.com",
      password: "12345678",
    };

    await request.post("/users").send(user);

    const userCredentials: ICredentials = {
      email: "gonzalo.romero@outlook.com",
      password: "12345678",
    };
    const response = await request.post("/users/auth").send(userCredentials);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("name", "Gonzalo Romero");
    expect(response.body.data).toHaveProperty(
      "email",
      "gonzalo.romero@outlook.com"
    );
    expect(response.body.data).toHaveProperty("token");
    expect(response.body.data.token).toMatch(/^.+\..+\..+$/);
  });

  it("Should not authenticate a User with wrong credentials", async () => {
    const user: ICredentials = {
      email: "gonzalo.romero@outlook.com",
      password: "12344321",
    };

    const response = await request.post("/users/auth").send(user);
    expect(response.status).toBe(400);
    expect(response.body.data).toHaveProperty("error", "Invalid credentials");
  });

  it("Should not allow empty inputs for authentication", async () => {
    const user: ICredentials = {
      email: "",
      password: "12345678",
    };

    const response = await request.post("/users/auth").send(user);
    expect(response.status).toBe(400);
    expect(response.body.data).toHaveProperty(
      "error",
      '"email" is not allowed to be empty'
    );
  });
});

describe("Booking API Service", () => {
  it("Should create a new Booking", async () => {
    const user = await request.post("/users").send({
      name: "Gonzalo Romero",
      email: `gonzalo.romero+${uuidGenerator()}@outlook.com`,
      password: "12345678",
    });

    const loginCredentials = {
      email: user.body.data.email,
      password: "12345678",
    };

    const authResponse = await request
      .post("/users/auth")
      .send(loginCredentials);
    const token = authResponse.body.data.token;

    const booking = {
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 86400000),
      user: user.body.data.name,
    };

    const response = await request
      .post(`/booking`)
      .set("Authorization", `Bearer ${token}`)
      .send(booking);
    expect(response.status).toBe(200);
  });
  it("Should not create a Booking with invalid date", async () => {
    const user = await request.post("/users").send({
      name: "Gonzalo Romero",
      email: `gonzalo.romero+${uuidGenerator()}@outlook.com`,
      password: "12345678",
    });

    const loginCredentials = {
      email: user.body.data.email,
      password: "12345678",
    };

    const authResponse = await request
     .post("/users/auth")
     .send(loginCredentials);
    const token = authResponse.body.data.token;

    const booking = {
      date: "wrong data",
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 86400000),
      user: user.body.data.name,
    };

    const response = await request
     .post(`/booking`)
  })
  it("Should Not allow to create a Booking without Log In", async() => {
    const booking = {
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 86400000),
      user: "Gonzalo Romero",
    };

    const response = await request
     .post(`/booking`)
     .send(booking);
    expect(response.status).toBe(401);
  })
  it("Should Not allow to create a Booking with invalid token", async() => {
    const user = await request.post("/users").send({
      name: "Gonzalo Romero",
      email: `gonzalo.romero+${uuidGenerator()}@outlook.com`,
      password: "12345678",
    });

    const loginCredentials = {
      email: user.body.data.email,
      password: "12345678",
    };

    const authResponse = await request
     .post("/users/auth")
     .send(loginCredentials);
    const token = authResponse.body.data.token.split(" ")[1] + "Hello KeyM!";

    const booking = {
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 86400000),
      user: user.body.data.name,
    };

    const response = await request
  })
  it("Should GET all the Bookings", async () => {
    const user = await request.post("/users").send({
      name: "Gonzalo Romero",
      email: `gonzalo.romero+${uuidGenerator()}@outlook.com`,
      password: "12345678",
    });
  
    const loginCredentials = {
      email: user.body.data.email,
      password: "12345678",
    };
  
    const authResponse = await request
      .post("/users/auth")
      .send(loginCredentials);
    const token = authResponse.body.data.token;
  
    const booking = {
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 86400000),
      user: user.body.data.name,
    };
  
    const createResponse = await request
      .post("/booking")
      .set("Authorization", `Bearer ${token}`)
      .send(booking);
  
    expect(createResponse.status).toBe(200);
    expect(createResponse.body.data).toHaveProperty("user", user.body.data.name);
  
    const getResponse = await request
      .get("/booking")
      .set("Authorization", `Bearer ${token}`);
  
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.data).toBeInstanceOf(Array);
    expect(getResponse.body.data.length).toBeGreaterThan(0);
    expect(getResponse.body.data.some((booking:any) => booking.user === user.body.data.name)).toBe(true);
  });
  it("Should GET a booking by uuid", async () => {
    const user = await request.post("/users").send({
      name: "Gonzalo Romero",
      email: `gonzalo.romero+${uuidGenerator()}@outlook.com`,
      password: "12345678",
    });
  
    const loginCredentials = {
      email: user.body.data.email,
      password: "12345678",
    };
  
    const authResponse = await request
      .post("/users/auth")
      .send(loginCredentials);
    const token = authResponse.body.data.token;
  
    const booking = {
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 86400000),
      user: user.body.data.name,
    };
  
    const createResponse = await request
      .post("/booking")
      .set("Authorization", `Bearer ${token}`)
      .send(booking);
  
    expect(createResponse.status).toBe(200);
    const bookingUuid = createResponse.body.data.uuid; 
  
    const getResponse = await request
      .get(`/booking/${bookingUuid}`)
      .set("Authorization", `Bearer ${token}`);
  
    expect(getResponse.status).toBe(200);
    expect(getResponse.body.data).toHaveProperty("uuid", bookingUuid);
    expect(getResponse.body.data).toHaveProperty("user", user.body.data.name);
    expect(getResponse.body.data).toHaveProperty("date", booking.date.toISOString());
  });
  it("Should Delete Booking by uuid", async() => {
    const user = await request.post("/users").send({
      name: "Gonzalo Romero",
      email: `gonzalo.romero+${uuidGenerator()}@outlook.com`,
      password: "12345678",
    });
  
    const loginCredentials = {
      email: user.body.data.email,
      password: "12345678",
    };
  
    const authResponse = await request
      .post("/users/auth")
      .send(loginCredentials);
    const token = authResponse.body.data.token;
  
    const booking = {
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(new Date().getTime() + 86400000),
      user: user.body.data.name,
    };
  
    const createResponse = await request
      .post("/booking")
      .set("Authorization", `Bearer ${token}`)
      .send(booking);
  
    expect(createResponse.status).toBe(200);
    const bookingUuid = createResponse.body.data.uuid; 
  
    const getResponse = await request
      .delete(`/booking/${bookingUuid}`)
      .set("Authorization", `Bearer ${token}`);
  
    expect(getResponse.status).toBe(200);
  })
});
