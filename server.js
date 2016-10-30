const
    express = require('express'),
    app = express();

app.use(express.static('public'));

app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

app.get('/api/boards/:id', (req, res) => {
    res.json({
        id: Number(req.params.id),
        title: "Boneyard testing board",
        lists: [
            { id: 2, name: "List 1", cards: [
                { id: 3, title: "Card 1" },
                { id: 4, title: "Card 2" }
            ] },
            { id: 5, name: "List 2", cards: [
                { id: 6, title: "Card 3" },
                { id: 7, title: "Card 4" },
                { id: 8, title: "Card 5" }
            ] },
            { id: 9, name: "List 3", cards: [] },
        ]
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000');
});
