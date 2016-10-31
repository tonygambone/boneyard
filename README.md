# Boneyard

This is an example [Trello](https://trello.com/)-like app built using Backbone and Marionette.
It's currently just a toy to tinker with some development and deployment technologies.
It doesn't authenticate or save its data anywhere.

Boneyard uses Backbone, Backbone-Relational, Marionette, Express, Bootstrap, and Webpack.

Boneyard is running at https://tg-boneyard.herokuapp.com/. The data will reset if it's been idle
for a while.

## Usage

Boneyard gives you a board that can have multiple lists on it. Each list can have multiple cards.
Titles of the board, lists, and cards can be edited by clicking on them. Lists and cards can be
added and removed, and cards can be dragged to other lists to move them.

The server implements a complete REST API for boards, cards, and lists.

## Getting started

I use [yarn](https://yarnpkg.com/) but npm should work too.

```sh
git clone https://github.com/tonygambone/boneyard.git
cd boneyard
yarn # or npm install
yarn run build # or npm run build
yarn start # or npm start
# navigate to http://localhost:3000/
```

## Notes

The server starts up with some example data but does not use any external storage - the data is
in the server process. So it will all be reset when the server restarts.

## License

The MIT License (MIT)

Copyright (c) 2016 Tony Gambone

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
associated documentation files (the "Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial
portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.