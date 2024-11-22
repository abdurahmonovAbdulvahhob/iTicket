import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../src/app.module";

describe("User (e2e)", () => {
  let app: INestApplication;
  let token: String;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    // app.setGlobalPrefix("api")
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    const response = await request(app.getHttpServer())
      .post("/auth/signin")
      .send({
        login: "john@mail.uz",
        hashed_password: "qwerty123",
      });
    token = response.body.token;
    console.log("token", token);
  });
  it("/admin/all (GET) --> 200 OK", () => {
    return request(app.getHttpServer())
      .get("/admin/all")
      .set("Authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  it('/users/all (GET) --> 401 "Unauthorized" error', () => {
    return (
      request(app.getHttpServer())
        .get("/admin/all")
        // .set('Authorization', `Bearer ${token}`)
        .expect("Content-Type", /json/)
        .expect(401)
    );
  });

  // it("/auth/signup (POST) --> 201", async () => {
  //   return request(app.getHttpServer())
  //     .post("/auth/signup")
  //     .send({
  //       name: "user22",
  //       email: "user22@mail.uz",
  //       password: "Uzbek1$t0n",
  //       role_value: "admin",
  //     })
  //     .expect("Content-Type", /json/)
  //     .expect(201)
  //     .then((response) => {
  //       expect(response.body).toMatchObject({
  //         token: expect.any(String),
  //       });
  //     });
  // });

  // it("/auth/signup (POST) --> 400", () => {
  //   return request(app.getHttpServer())
  //     .post("/auth/signup")
  //     .send({
  //       name: "Karimjon",
  //       email: "karimjondomla@mail.uz",
  //       password: "Uzbek!$t0n",
  //       role_value: "admin",
  //     })
  //     .expect("Content-Type", /json/)
  //     .expect(400)
  //     .expect({
  //       message: "Bunday Foydalanuvchi mavjud",
  //       error: "Bad Request",
  //       statusCode: 400,
  //     });
  // });

  // it("/auth/signup (POST) --> 400 on Validation error", () => {
  //   return request(app.getHttpServer())
  //     .post("/auth/signup")
  //     .send({
  //       name: "user2",
  //       password: "123",
  //       email: "user215@mail.uz",
  //       role_value: "admin",
  //     })
  //     .expect("Content-Type", /json/)
  //     .expect(400)
  //     .expect({
  //       statusCode: 400,
  //       message: ["password is not strong enough"],
  //       error: "Bad Request",
  //     });
  // });

  // afterAll(async () => {
  //   await app.close();
  // });
});
