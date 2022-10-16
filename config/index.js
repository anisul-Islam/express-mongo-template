require("dotenv").config();

exports.dev = {
  db: {
    url: process.env.DB_URL || "",
  },
  app: {
    port: process.env.SERVER_PORT,
  },
};
