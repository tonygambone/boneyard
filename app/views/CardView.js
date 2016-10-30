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
                this.model.set('title', text);
                this.model.save();
            });
        }
    },
    template: require('../templates/card.html')
});