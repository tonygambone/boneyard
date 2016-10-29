import Marionette from 'backbone.marionette';
import BoardHeaderView from './BoardHeaderView';
import BoardContentView from './BoardContentView';
import Board from '../models/Board';

export default Marionette.View.extend({
    initialize: function(options) {
        this.model = window.board = new Board({
            title: "This is the dynamic board title",
            lists: [
                { name: "List 1", cards: [
                    { title: "Card 1" },
                    { title: "Card 2" }
                ] },
                { name: "List 2", cards: [
                    { title: "Card 3" },
                    { title: "Card 4" },
                    { title: "Card 5" }
                ] },
                { name: "List 3", cards: [] },
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