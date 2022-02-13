import { userStub } from "../test/stubs/user.stub";

export const UsersService = jest.fn().mockReturnValue({

    getUser: jest.fn().mockResolvedValue(userStub()),

    getUsers: jest.fn().mockResolvedValue([userStub()]),

    updateUser: jest.fn().mockResolvedValue(userStub()),

    deleteUser: jest.fn().mockResolvedValue(userStub())
    
})