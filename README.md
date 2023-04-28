# Библиотека

В рамках данного проекта необходимо разработать бэкэнд, моделирующий работу библиотеки.

## Функционал приложения

В приложении будут реализованы три основные сущности: пользователь, книга, бронирование книги.

## Пользователь

- Пользователи могут иметь одну из двух ролей: user, admin

- Регистрация пользователя происходит по электронной почте, имени
пользователя и паролю. Email должен быть уникальным. Пароль должен
состоять не менее чем из 8 латинских символов нижнего и верхнего
регистра, как минимум одной цифры и как минимум одного спецсимвола
(!'@#$%^&*()_+=). Имя пользователя должно иметь длину не менее 5 и не
более 256 символов.

- Вход в аккаунт осуществляется по email и паролю.

- Пользователь с ролью “admin” создается с помощью миграции (установить
стандартные параметры для входа: email: admin@аdmin.com, password:
admin123, username: admin).

## Книга

- Пользователь с ролью “admin” может добавлять, редактировать и удалять
книги. Книга содержит название, жанр, автора, описание.

- Любой пользователь может просматривать список книг. Список предполагает
пагинацию, сортировку по названию, автору, фильтрацию по жанру и по
автору, поиск по названию и по имени автора. В списке видны названия,
жанры и авторы, состояние книги (забронирована/не забронирована).

- Можно просмотреть конкретную книгу по идентификатору, в таком случае
запрос возвращает название, жанр, автора и описание книги, состояние
книги (забронирована/не забронирована).

## Бронирование

- Авторизованный пользователь может забронировать книгу на определенный
промежуток времени, начиная с момента бронирования, но не более, чем на
1 месяц. Нельзя забронировать книгу, которая в данный момент
забронирована кем-то другим.

- Авторизованный пользователь может вернуть книгу.
Авторизованный пользователь может просмотреть список забронированных
им книг на данный момент, а также список книг, которые он бронировал
ранее. Списки должны включать пагинацию, поиск по названию книги и
автору, сортировку по дате бронирования.
У пользователей есть рейтинг от 0 до 5, за каждую вовремя возвращенную
книгу рейтинг увеличивается на 0.1, если он еще не достиг 5. За каждую
просроченную книгу рейтинг уменьшается на 0.1 в день. Как только рейтинг
становится 0, пользователь блокируется и не может бронировать книги, пока
админ его не разблокирует.

- Любой пользователь может просматривать лидерборд юзеров по рейтингу.
Когда админ добавляет новую книгу, уведомлять всех пользователей.

# API

## General DTOS

  ```TypeScript
  SuccessDTO {
    status: "OK"
  }
  ```

  ```TypeScript
  GetBookDTO {
    name: string,
    genre: string,
    author: string,
    description: string
  }
  ```

  ```TypeScript
  ErrorDTO {
    status: number,
    message: string,
    details: any
  }
  ```

## Авторизация

### DTOS Auth

  ```TypeScript
  SignUpDTO {
    username: string,
    email: string,
    id: string
  }
  ```

  ```TypeScript
  LoginDTO {
    token: string
  }
  ```

### Регистрация

- `POST api/v1/auth/signup` - эндпоинт для создания регистрации. Ожидает следующее тело запроса:

  ```TypeScript
  {
    username: string,
    password: string,
    email: string
  }
  ```

  Возвращает `SignUpDTO`, может вернуть `ErrorDTO 400 (Bad Request) или 422 (Unprocessable Entity)`

### Вход

- `POST api/v1/auth/login` - эндпоинт для входа в аккаунт. Ожидает следующее тело запроса:

  ```TypeScript
  {
    password: string,
    email: string,
  }
  ```

  Возвращает `LoginDTO`, может вернуть `ErrorDTO 400 (Bad Request) или 401 (Unauthorized)`

## Книги

### DTOS BOOKS

  ```TypeScript
  UpdateBookDTO {
    name: string,
    genre: string,
    author: string,
    description: string
  }
  ```

  ```TypeScript
  AddBookDTO {
    status: "OK",
    id: number
  }
  ```

### Просмотр списка

- `GET api/v1/book/all` - эндпоинт для получения списка книг, принимает query-параметры:

  ```TypeScript
  {
    offset: number,
    limit: number,
    sort[type]: 'asc' | 'desc',
    sort[field]: 'name' | 'author',
    filter['genre' | 'author']: string
  }
  ```

  Возвращает `GetBookDTO[]`, может вернуть `ErrorDTO 400 (Bad Request) или 401 (Unauthorized)`

### Получение книги по ID

- `GET api/v1/book/:id` - эндпоинт для получения книги по ID.
  Возвращает `GetBookDTO`, может вернуть `ErrorDTO 400 (Bad Request), 401 (Unauthorized) или 404 (Not Found)`

### Добавление книг

Доступен для ролей:  ['admin']

- `POST api/v1/book` - эндпоинт для добавления книги. Ожидает следующее тело запроса:

  ```TypeScript
  {
    name: string,
    genre: string,
    author: string,
    description: string,
  }
  ```

  Возвращает `AddBookDTO`, может вернуть `ErrorDTO 401 (Unauthorized) или 400 (Bad Request) или 403 (Forbidden)`

### Редактирование книг

Доступен для ролей:  ['admin']

- `PATCH api/v1/book/:id` - эндпоинт для редактирования книги. Ожидает следующее тело запроса:

  ```TypeScript
  {
    name?: string,
    genre?: string,
    author?: string,
    description?: string;
  }
  ```

  Возвращает  `UpdateBookDTO`, может вернуть `ErrorDTO 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden) или 404(Not Found)`

### Удаление книг

Доступен для ролей:  ['admin']

- `DELETE api/v1/book/:id` - эндпоинт для удаления книги.
  Возвращает  `SuccessDTO`, может вернуть `ErrorDTO 403 (Forbidden), 401 (Unauthorized) или 404 (Not Found)`

## Бронирование книг

### Borrowing DTOS

```TypeScript
  BorrowingDTO {
    borrowingId: number,
    returnDate: Date,
    returnetAt: null | Date,
  }
```

### Просмотр списка брони

- `GET api/v1/borrowing/all` - эндпоинт для списка бронированных книг, возвращает `GetBookDTO[]`, может вернуть `ErrorDTO 401 (Unauthorized)`

### Бронь книг

- `POST api/v1/borrowing` - эндпоинт для бронирования книги. Ожидает следующее тело запроса:

  ```TypeScript
  {
    bookId: number,
    days: number
  }
  ```

  Возвращает  `BorrowingDTO`, может вернуть `ErrorDTO 400 (Bad Request), 401 (Unauthorized) или 404 (Not Found)`

### Возврат книги

- `POST api/v1/borrowing/return` - эндпоинт для снятия брони с книги. Ожидает следующее тело запроса:

  ```TypeScript
  {
    borrowingId: number
  }
  ```
  
  Возвращает  `BorrowingDTO`, может вернуть `ErrorDTO 400 (Bad Request), 401 (Unauthorized) или 404 (Not Found)`

## Пользователи

### DTOS

  ```TypeScript
  UserDTO {
    username: string,
    rating: number,
    isBanned: boolean
  }
  ```

### Просмотр пользователей по рейтингу

- GET `api/v1/user/leaderboard` - эндпоинт для просмотра списка пользователей по рейтингу. Принимает query-параметры

  ```TypeScript
  {
    sort[type]: 'asc' | 'desc',
    sort[field]: 'rating' | 'username'
  }
  ```

 Возвращает `UserDTO[]`, может вернуть `ErrorDTO 400 (Bad Request) или 401 (Unauthorized)`

### Разблокировка пользователя

Доступен для ролей:  ['admin']

- POST `api/v1/user/unban` - эндпоинт для снятия блокировки с пользователя, принимает следующее тело запроса:

  ```TypeScript
  {
    id: number
  }
  ```

  Возвращает `SuccessDTO`, может вернуть `ErrorDTO 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden) или 404 (Not Found)`
