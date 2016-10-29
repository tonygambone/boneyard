import Marionette from 'backbone.marionette';

export default Marionette.View.extend({
    template: require('../templates/navbar.html'),
    initialize: function(options) {
        this.model = new Backbone.Model({
            activeItem: options.activeItem || 'home'
        });
    }
});