import Marionette from 'backbone.marionette';

// Marionette view for the navbar. Displays the
// navbar template and highlights the active item.

export default Marionette.View.extend({
    template: require('../templates/navbar.html'),
    initialize: function(options) {
        this.model = new Backbone.Model({
            activeItem: options.activeItem || 'home'
        });
    }
});