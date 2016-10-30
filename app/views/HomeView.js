import Marionette from 'backbone.marionette';
import BoardHeaderView from './BoardHeaderView';
import BoardContentView from './BoardContentView';
import Board from '../models/Board';

export default Marionette.View.extend({
    initialize: function(options) {
        this.model = window.board = new Board({
            id: 1,
            title: "This is the dynamic board title",
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
    },

    template: require('../templates/home.html'),

    regions: {
        boardHeader: '#board-header',
        boardContent: '#board-content'
    },

    onRender: function() {
        this.showChildView('boardHeader', new BoardHeaderView({ model: this.model }));
        this.showChildView('boardContent', new BoardContentView({ model: this.model }));
    }
});