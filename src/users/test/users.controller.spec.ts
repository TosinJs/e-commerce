import { Test, TestingModule } from '@nestjs/testing';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { userStub } from './stubs/user.stub';

jest.mock("../users.service")

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
      imports: []
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe("findOne", () => {
    describe("When findOne is called", () => {
      let user

      beforeEach(async () => {
        user = await controller.findOne(userStub().id)
      })

      test("it should call userService", () => {
        expect(service.getUser).toBeCalledWith(userStub().id);
      })
      
      test("then it should return a user", () => {
        expect(user).toEqual(userStub())
      })
    })
  })

  describe("findAll", () => {
    describe("When findAll is called", () => {
      let users

      beforeEach(async () => {
        users = await controller.findAll()
      })

      test("it should call userService", () => {
        expect(service.getUsers).toBeCalled()
      })

      test("then should return an array of users", () => {
        expect(users).toEqual([userStub()])
      })
    })
  })

  describe("updateUser", () => {
    describe("when updateUser is called", () => {
      let user
      let updateUserDto: UpdateUserDto

      beforeEach(async () => {
        user = await controller.updateUser(updateUserDto, userStub().id)
      })

      test("it should call userService", () => {
        expect(service.updateUser).toBeCalledWith(userStub().id, updateUserDto)
      })

      test("then it should return the user", () => {
        expect(user).toEqual(userStub())
      })
    })
  })

  describe("remove", () => {
    describe("when remove is called", () => {
      let user

      beforeEach(async () => {
        user = await controller.remove(userStub().id)
      })

      test("it should call userService", () => {
        expect(service.deleteUser).toBeCalledWith(userStub().id)
      })

      test("then, it should return the deleted user", () => {
        expect(user).toEqual(userStub())
      })
    })
  })
});
