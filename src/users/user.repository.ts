
import { User } from 'lib/entities/user.entity';

class UsersRepository {
  async create(email: string, password: string, username: string): Promise<User> {
    let user = User.create({
      email,
      username,
      password,
    });
    user = await User.save(user);
    return user;
  }
  async findByEmail(email: string): Promise<User | null> {
    return User.findOneBy({ email });
  }

  async findById(id: number): Promise<User | null> {
    return User.findOneBy({ id });
  }

  async findAll(): Promise<User[]> {
    return User.find();
  }

  async ban(id: number): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }
    await User.update({ id }, { ...user, isBanned: true });
    return this.findById(id);
  }

  async unban(id: number): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }
    await User.update({ id }, { ...user, isBanned: false });
    return this.findById(id);
  }
}

export default new UsersRepository();
