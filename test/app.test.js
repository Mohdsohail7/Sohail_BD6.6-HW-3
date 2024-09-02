const { getAllBooks, getBookById } = require("../controllers/books");
const { app } = require("../index");
const request = require("supertest");
const http = require("http");

jest.mock("../controllers/books", () => ({
  ...jest.requireActual("../controllers/books"),
  getAllBooks: jest.fn(),
  getBookById: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(4000);
});

afterAll(async () => {
  server.close();
});

describe("Controllers test ", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("getAllBooks should return all the books", async () => {
    const mockData = [
      {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
      {
        bookId: 2,
        title: "1984",
        author: "George Orwell",
        genre: "Dystopian",
      },
      {
        bookId: 3,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
      },
    ];
    getAllBooks.mockReturnValue(mockData);

    const result = await getAllBooks();
    expect(result.length).toBe(3);
    expect(result).toEqual(mockData);
  });
});

describe("API Endpoint Test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("GET /books should return all the books of list", async () => {
    const result = await request(server).get("/books");

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      books: [
        {
          bookId: 1,
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          genre: "Fiction",
        },
        {
          bookId: 2,
          title: "1984",
          author: "George Orwell",
          genre: "Dystopian",
        },
        {
          bookId: 3,
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          genre: "Classic",
        },
      ],
    });
  });

  it("GET /books/details/:id should return a book by given id", async () => {
    const mockBook = {
      bookId: 1,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      genre: "Fiction",
    };
    getBookById.mockReturnValue(mockBook);
    const result = await request(server).get("/books/details/1");

    expect(result.status).toBe(200);
    expect(result.body).toEqual({
      book: {
        bookId: 1,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        genre: "Fiction",
      },
    });
  });
});
