import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "../users.service";
import { userStub } from "./stubs/user.stub";
import { JwtService } from "@nestjs/jwt";
import { RolesService } from "../../roles/roles.service";
import { getModelToken } from "@nestjs/sequelize";
import { User } from "../models/user.model";
import { Roles } from "../../roles/models/roles.model";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

describe("Users service", () => {
  let usersService: UsersService;
  const mockUsersModel = {
    create: jest.fn().mockImplementation(userStub),
    update: jest.fn().mockImplementation(userStub),
    findOne: jest.fn().mockImplementation(userStub),
    findAll: jest.fn().mockImplementation(() => [userStub()]),
    findByPk: jest.fn().mockImplementation(userStub),
    remove: jest.fn(),
  };
  const mockRolesModel = {
    findOne: jest.fn().mockImplementation((value: string) => "USER"),
  };
  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UsersService,
        JwtService,
        RolesService,
        {
          provide: getModelToken(User),
          useValue: mockUsersModel,
        },
        {
          provide: getModelToken(Roles),
          useValue: mockRolesModel,
        },
      ],
    }).compile();
    usersService = moduleRef.get<UsersService>(UsersService);
  });
  it("should be defined", () => {
    expect(usersService).toBeDefined();
  });

  describe("createUser", () => {
    describe("when create  user is called", () => {
      let createUsersDto: CreateUserDto;
      let newUser: User;
      beforeEach(async () => {
        createUsersDto = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password,
          role_value: userStub().role_value,
        };
        newUser = await usersService.create(createUsersDto);
      });
      it("should be create new user", async () => {
        expect(newUser).toMatchObject({
          ...userStub(),
          roles: ["USER"],
        });
      });
    });
  });

  describe("getOneUser", () => {
    describe("when get one user is called", () => {
      test("then it should call usersService", async () => {
        expect(await usersService.findOne(userStub().id)).toEqual(userStub());
      });
    });
  });

  describe("getAllUsers", () => {
    describe("when getAllUsers is called", () => {
      test("then it should call usersService", async () => {
        expect(await usersService.findAll()).toEqual([userStub()]);
      });
    });
  });

  describe("updateUser", () => {
    describe("when updateUser is called", () => {
      let updateUserDto: UpdateUserDto;
      let updatedUser: any;
      beforeEach(async () => {
        updateUserDto = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password,
          role_value: userStub().role_value,
        };
        updatedUser = await usersService.update(userStub().id, updateUserDto);
      });
      it("then it should call usersService", async () => {
        expect(updatedUser).toEqual({
          ...userStub(),
        });
      });
    });
  });
});
