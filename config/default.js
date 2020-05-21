module.exports = {
  app: 'backend-spotify',
  rest_endpoints: {
    spotify_api: 'https://api.spotify.com/v1/',
    spotify_accounts: 'https://accounts.spotify.com/api/'
  },
  client_id: '5e03c04072654260a7c983e65ebf373d',
  client_secret: 'cd8820466a2a4e75aa25524d92945268',
  db: {
    host: "ec2-34-224-229-81.compute-1.amazonaws.com",
    user: "txwvpxtosndabr",
    password: "dfd8a4a6eb5f219fe6dae72ab9a01af979f8ae034f61ad5067cc07e9765dd3f6",
    database: "dblgj092pffm6t",
    port: "5432",
    dialect: "postgres"
  }
}