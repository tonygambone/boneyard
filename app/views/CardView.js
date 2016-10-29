import Marionette from 'backbone.marionette';

export default Marionette.View.extend({
    initialize: function(options) {
        this.model = options.model;
    },
    modelEvents: {
        'change:title': 'render',
    },
    template: require('../templates/card.html')
});