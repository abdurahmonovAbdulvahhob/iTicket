import { JwtService } from "@nestjs/jwt";
import { UsersController } from "../users.controller";
import { UsersService } from "../users.service";
import { Test } from "@nestjs/testing";
import { User } from "../models/user.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { userStub } from "./stubs/user.stub";

jest.mock("../users.service");

describe("Users Controllerga test", () => {
  let usersController: UsersController;
  let usersService: UsersService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it("users controller should be defined", () => {
    expect(usersController).toBeDefined();
  });
  it("users service should be defined", () => {
    expect(usersService).toBeDefined();
  });

  describe("create", () => {
    describe("when creating user is called", () => {
      let user: User;
      let createUserDto: CreateUserDto;
      beforeAll(async () => {
        createUserDto = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password,
          role_value: userStub().role_value,
        };
        user = await usersController.create(createUserDto);
      });
      it("should return the created user", () => {
        expect(usersService.create).toHaveBeenCalledWith(createUserDto);
      });
      test("should return user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe("findAll users", () => {
    describe("when findAll users is called", () => {
      let users: User[];
      beforeAll(async () => {
        users = await usersController.findAll();
      });
      it("then it should call userService ", () => {
        expect(usersService.findAll).toHaveBeenCalled();
      });
      it("should return all users", () => {
        expect(users).toEqual([userStub()]);
      });
    });
  });

  describe("findOne", () => {
    describe("when findOne is called", () => {
      let user: User;
      beforeAll(async () => {
        user = await usersController.findOne(String(userStub().id));
      });
      it("then it should call userService ", () => {
        expect(usersService.findOne).toHaveBeenCalledWith(userStub().id);
      });

      it("should return the user", () => {
        expect(user).toEqual(userStub());
      });
    });
  });

  describe("delete", () => {
    describe("when delete is called", () => {
      let result: number;
      beforeAll(async () => {
        result = await usersController.remove(String(userStub().id));
      });
      it("then it should call userService ", () => {
        expect(usersService.remove).toHaveBeenCalledWith(userStub().id);
      });
      it("should return number", () => {
        expect(result).toBeTruthy();
      });
    });
  });
});
