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
                this.model.set('title', text);
                this.model.save();
            });
        }
    },
    template: require('../templates/boardHeader.html')
});