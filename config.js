exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/study-app-db';
exports.PORT = process.env.PORT || 8080;
