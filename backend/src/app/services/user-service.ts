import {
    Profile,
    UserRepository
} from '../models/repositories/user-repository';

export class UserService {
    public async getProfile(userId: number): Promise<Profile> {
        const profile = await UserRepository.findProfile(userId);
        return profile;
    }
}

const userService = new UserService();
export default userService;
