import Marionette from 'backbone.marionette';

export default Marionette.View.extend({
    initialize: function(options) {
        this.model = options.model;
    },
    modelEvents: {
        'change:name': 'render',
    },
    template: require('../templates/list.html')
});