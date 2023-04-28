# Database Design

## ENUMS

```TypeScript
- 1.
enum USER_ROLE {
  ADMIN = 'admin',
  USER = 'user'
}

- 2.
enum BORROWING_STATUS {
  ARCHIVED = 'archived',
  ACTIVE = 'active'
}
```

## ENTITIES

  ```TypeScript
- 1. USER
  {
    id: number,
    username: string,
    email: string,
    password: string,
    role: USER_ROLE,
    isBanned: boolean,
    createdAt: Date,
    updatedAt: Date,
    rating: number
  }

- 2. BOOK
  {
    id: number,
    name: string,
    description: string,
    author: string,
    genre: string,
    createdAt: Date,
    updatedAt: Date
  } 

- 3. BORROWING
  {
    id: number,
    userId: number,
    bookId: number,
    createdAt: Date,
    updatedAt: Date,
    returnedAt: Date | null,
    status: BORROWING_STATUS
  } 
  ```

## RELATIONS

  ```TypeScript
  1. Users - Borrowing: one-to-many relation
  Users.id(PK) - Borrowing.userID(FK)

  2. Books - Borrowing: one-to-many relation
  Books.id(PK) - Borrowing.bookId(FK)
  ```
