const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        PORT: JSON.stringify(process.env.PORT),
        POSTGRES_USER: JSON.stringify(process.env.POSTGRES_USER),
        POSTGRES_PASSWORD: JSON.stringify(process.env.POSTGRES_PASSWORD),
        POSTGRES_HOST: JSON.stringify(process.env.POSTGRES_HOST),
        POSTGRES_PORT: JSON.stringify(process.env.POSTGRES_PORT),
        POSTGRES_DATABASE: JSON.stringify(process.env.POSTGRES_DATABASE),
      },
    }),
  ],
  target: 'node',
};
