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

app.patch('/api/:collection/:id', (req, res) => {
    const collection = req.params.collection;
    const itemId = Number(req.params.id);

    if (!appData.hasOwnProperty(collection)) {
        res.status(404).json({ error: `Collection ${collection} unknown` });
        return;
    }

    const item = appData[collection].filter((x) => x.id === itemId)[0];

    if (!item) {
        res.status(404).json({ error: `${collection} item ${itemId} unknown` });
        return;
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

app.listen(3000, function () {
    console.log('Example app listening on port 3000');
});
