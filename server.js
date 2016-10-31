const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

app.use(express.static('public'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use('/api', bodyParser.json());

const appData = {
    boards: [
        { id: 1, title: "Boneyard testing board" }
    ],
    lists: [
        { id: 1, board: 1, name: "List 1" },
        { id: 2, board: 1, name: "List 2" },
        { id: 3, board: 1, name: "List 3" }
    ],
    cards: [
        { id: 1, list: 1, title: "Card 1" },
        { id: 2, list: 1, title: "Card 2" },
        { id: 3, list: 2, title: "Card 3" },
        { id: 4, list: 2, title: "Card 4" },
        { id: 5, list: 2, title: "Card 5" },
    ]
};

app.get('/api/boards/:id', (req, res) => {
    const boardId = Number(req.params.id);
    var board = appData.boards.filter((b) => b.id === boardId)[0];
    if (board) {
        board = { id: board.id, title: board.title }; // create clone
        board.lists = appData.lists.filter((l) => l.board === boardId)
            .map((l) => {
                var list = { id: l.id, board: l.board, name: l.name }; // create clone
                list.cards = appData.cards.filter((c) => c.list === l.id);
                return list;
            });
        return res.json(board);
    } else {
        res.status(404).json({ error: `Boards item ${boardId} not found` });
    }
});

app.get('/api/lists/:id', (req, res) => {
    const listId = Number(req.params.id);
    var list = appData.lists.filter((l) => l.id === listId)[0];
    if (list) {
        list = { id: list.id, name: list.name, board: list.board }; // create clone
        list.cards = appData.cards.filter((c) => c.list === list.id);
        return res.json(list);
    } else {
        res.status(404).json({ error: `Lists item ${listId} not found` });
    }
});

app.get('/api/cards/:id', (req, res) => {
    const cardId = Number(req.params.id);
    var card = appData.cards.filter((c) => c.id === cardId)[0];
    if (card) {
        card = { id: card.id, title: card.title, list: card.list }; // create clone
        return res.json(card);
    } else {
        res.status(404).json({ error: `Cards item ${cardId} not found` });
    }
});

app.post('/api/:collection', (req, res) => {
    const collection = req.params.collection;

    if (!appData.hasOwnProperty(collection)) {
        return res.status(404).json({ error: `Collection ${collection} unknown` });
    }

    var item;
    if (collection === 'boards') {
        item = {
            id: appData.boards.reduce((p,c) => Math.max(p, c.id),0) + 1,
            title: req.body.title
        };
        appData.boards.push(item);
    } else if (collection === 'lists') {
        item = {
            id: appData.lists.reduce((p,c) => Math.max(p, c.id),0) + 1,
            name: req.body.name,
            board: req.body.board
        };
        appData.lists.push(item);
    } else if (collection === 'cards') {
        item = {
            id: appData.cards.reduce((p,c) => Math.max(p, c.id),0) + 1,
            title: req.body.title,
            list: req.body.list
        };
        appData.cards.push(item);
    }

    return res.status(201).json(item);
});

app.patch('/api/:collection/:id', (req, res) => {
    const collection = req.params.collection;
    const itemId = Number(req.params.id);

    if (!appData.hasOwnProperty(collection)) {
        return res.status(404).json({ error: `Collection ${collection} unknown` });
    }

    const item = appData[collection].filter((x) => x.id === itemId)[0];

    if (!item) {
        return res.status(404).json({ error: `${collection} item ${itemId} unknown` });
    }

    if (collection === 'boards') {
        item.title = req.body.title || item.title;
    } else if (collection === 'lists') {
        item.name = req.body.name || item.name;
        item.board = req.body.board || item.board;
    } else if (collection === 'cards') {
        item.title = req.body.title || item.title;
        item.list = req.body.list || item.list;
    }

    return res.json(item);
});

app.delete('/api/:collection/:id', (req, res) => {
    const collection = req.params.collection;
    const itemId = Number(req.params.id);

    if (!appData.hasOwnProperty(collection)) {
        return res.status(404).json({ error: `Collection ${collection} unknown` });
    }

    for (var i = 0; i < appData[collection].length; i++) {
        if (appData[collection][i].id === itemId) {
            appData[collection].splice(i,1);
            return res.status(204).send();
        }
    }

    return res.status(404).json({ error: `${collection} item ${itemId} unknown` });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000');
});
