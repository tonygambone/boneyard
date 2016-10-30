import Marionette from 'backbone.marionette';
import BoardHeaderView from './BoardHeaderView';
import BoardContentView from './BoardContentView';
import Board from '../models/Board';

export default Marionette.View.extend({
    initialize: function(options) {
        this.model = options.model;
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