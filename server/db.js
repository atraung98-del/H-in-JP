import sqlite3 from "sqlite3";

sqlite3.verbose();

const db = new sqlite3.Database("./data.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("SQLite connected");
  }
});

export default db;