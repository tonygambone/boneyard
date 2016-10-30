import Marionette from 'backbone.marionette';
import { inlineEditHandler } from '../helpers';

export default Marionette.View.extend({
    initialize: function(options) {
        this.model = options.model;
    },
    modelEvents: {
        'change:title': 'render',
    },
    events: {
        'click .card': function(e) {
            inlineEditHandler(e, 'span', 'input', (id, text) => {
                const attrs = { 'title': text };
                this.model.set(attrs);
                this.model.save(attrs, { patch: true });
            });
        }
    },
    template: require('../templates/card.html')
});