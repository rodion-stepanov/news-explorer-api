const { JWT_SECRET = 'bolshoySecret', PORT = 3000, DATABASE = 'mongodb://localhost:27017/newsdb' } = process.env;

module.exports = { JWT_SECRET, PORT, DATABASE };
