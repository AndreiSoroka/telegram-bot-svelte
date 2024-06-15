import { UserEntity } from "../entities/UserEntity.mjs";
import { appDataSource } from "../index.mjs";
import { Like, Repository } from "typeorm";

class UserService {
  userRepositoryPromise: Promise<Repository<UserEntity>>;

  constructor() {
    this.userRepositoryPromise = appDataSource.then((source) =>
      source.getRepository(UserEntity),
    );
  }

  public async addUser(userId: string, firstName: string) {
    const userEntity = new UserEntity();
    userEntity.telegramID = userId;
    userEntity.firstName = firstName;
    userEntity.createdAt = new Date();

    const repo = await this.userRepositoryPromise;
    await repo.save(userEntity);
  }

  public async getUserById(id: string) {
    const repo = await this.userRepositoryPromise;
    return await repo.findOne({
      where: {
        telegramID: id,
      },
    });
  }

  async removeUserById(id: string) {
    let repo = await this.userRepositoryPromise;
    return await repo.delete({
      telegramID: id,
    });
  }

  async getUsersStream(
    fn: (users: UserEntity[]) => Promise<void>,
    searchString = "",
    limit = 10,
    maxUsers = 100,
  ) {
    let repo = await this.userRepositoryPromise;
    let hasMore = true;
    let offset = 0;

    while (hasMore) {
      const users = await repo.find({
        skip: offset,
        take: limit,
        where: {
          firstName: Like(`%${searchString}%`),
        },
      });
      hasMore = users.length >= limit && offset + limit < maxUsers;
      offset += limit;
      await fn(users);
    }
  }
}

export const userService = new UserService();
