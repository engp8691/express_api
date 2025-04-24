# Express API with PostgreSQL and Prisma

This is a TypeScript-based Express API project using PostgreSQL (via Docker) and Prisma ORM.

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

---

### 1. 🐳 Start PostgreSQL using Docker

```
docker-compose up -d
```

Make sure you have Docker installed. This will start a PostgreSQL container locally.

---

### 2. 🛠️ Set Up the Database

Create the database and apply the schema migrations using Prisma:

```
cd prisma
# Follow the README inside the prisma folder
```

---

### 3. 📦 Install Dependencies

Clone this repo and install the required packages:

```
git clone https://github.com/engp8691/express_api.git
cd ts-node-express
npm install
```

---

### 4. 🚴‍♂️ Start the Development Server

```
npm run dev
```

The server will start on `http://localhost:3000/api`.

---

### 5. 🧪 Test the API with Postman

Use the provided Postman collection to test the API:

1. Open Postman.
2. Import the file:  
   `/docs/express.postman_collection.json`
3. Start testing the endpoints!

---

## 📚 Documentation

- Swagger docs available at:  
  [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

- Prisma schema and more setup info inside the `prisma/README.md`.

---

## 📦 Tech Stack

- **Node.js + Express**
- **TypeScript**
- **Prisma ORM**
- **PostgreSQL (via Docker)**
- **Swagger for API Docs**
- **Postman for API Testing**

---

## 🧑‍💻 Contributing

PRs are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📝 License

MIT
