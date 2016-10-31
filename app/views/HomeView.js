import Marionette from 'backbone.marionette';
import BoardHeaderView from './BoardHeaderView';
import BoardContentView from './BoardContentView';
import Board from '../models/Board';

// Marionette view for the main app page. Lays out the
// child views for app content.

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