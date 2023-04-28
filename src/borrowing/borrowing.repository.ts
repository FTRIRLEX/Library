import { Borrowing } from 'lib/entities/borrowing.entity';
import { BORROWING_STATUS } from './constants/status.constants';

class BorrowingRepository {
  async getAll(): Promise<Borrowing[]> {
    return Borrowing.find();
  }

  async getMyBooks(userId):Promise<Borrowing[]> {
    return Borrowing.find({
      where: {
        userId: userId,
      },
    });
  }

  async create(userId: number, bookId: number) {
    let borrowing = Borrowing.create({
      userId, bookId,
    });
    borrowing = await Borrowing.save(borrowing);
    return borrowing;
  }

  async findById(id: number): Promise<Borrowing | null> {
    return Borrowing.findOneBy({ id });
  }

  async returnBook(id: number): Promise<Borrowing | null> {
    const user = await this.findById(id);
    if (!user) {
      return null;
    }
    await Borrowing.update({ id }, { ...user, status: BORROWING_STATUS.ARCHIVED, returnedAt: new Date() });
    return this.findById(id);
  }
}

export default new BorrowingRepository();
