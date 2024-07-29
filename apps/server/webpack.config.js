import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  target: 'node',
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, 'dist'),
    filename: 'app.js',
  },
  mode: 'production',
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      },
    ],
  },
};
