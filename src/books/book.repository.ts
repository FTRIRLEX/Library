import { Book } from 'lib/entities/book.entity';

class BookRepository {
  async create(title: string, genre: string, author: string, description: string) {
    let book = Book.create({
      title,
      genre,
      author,
      description,
    });
    book = await Book.save(book);
    return book;
  }
  async update(id: number, props: Partial<Book> = {}): Promise<Book | null> {
    const currentPost = await this.findById(id);
    if (!currentPost) {
      return null;
    }
    await Book.update({ id }, { ...currentPost, ...props });
    return this.findById(id);
  }

  findById(id: number): Promise<Book | null> {
    return Book.findOneBy({ id });
  }

  async delete(id: number): Promise<void | null> {
    const deletablePost = await this.findById(id);
    if (!deletablePost) {
      return null;
    }
    await Book.delete({ id });
  }
  findAll(): Promise<Book[]> {
    return Book.find();
  }
}

export default new BookRepository();
