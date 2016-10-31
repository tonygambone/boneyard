import Marionette from 'backbone.marionette';
import { inlineEditHandler } from '../helpers';
import List from '../models/List';

// Marionette view for the board header. Renders the board title
// area and controls for the entire board.  Handles list add functions.

export default Marionette.View.extend({
    initialize: function(options) {
        this.model = options.model;
    },
    modelEvents: {
        'change:title': 'render'
    },
    events: {
        'click #board-title': function(e) {
            inlineEditHandler(e, 'h2', 'input', (id, text) => {
                const attrs = { 'title': text };
                this.model.set(attrs);
                this.model.save(attrs, { patch: true });
            });
        },
        'click .add-list': function(e) {
            this.model.get('lists').add(new List({ name: "New unsaved list", board: this.model.get('id'), new: true }));
        }
    },
    template: require('../templates/boardHeader.html')
});