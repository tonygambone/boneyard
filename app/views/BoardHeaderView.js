import Marionette from 'backbone.marionette';
import { inlineEditHandler } from '../helpers';

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
        }
    },
    template: require('../templates/boardHeader.html')
});