module.exports = {
  // database: `mongodb://127.0.0.1:27017/`,
  database: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.0fzejk3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
};
