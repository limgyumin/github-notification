module.exports = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.DB_SYNCHRONIZE,
  logging: process.env.DB_LOGGING,
  entities: ['dist/**/*.entity.{ts,js}'],
  charset: 'utf8mb4_unicode_ci',
};
