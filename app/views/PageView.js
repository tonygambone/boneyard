import Marionette from 'backbone.marionette';

// Marionette view for static pages (contact, about)
// displays a single template in the main content area

export default Marionette.View.extend({
    initialize: function(options) {
        this.pageName = options.page || 'home';
        this.template = require(`../templates/${this.pageName}.html`);
    }
});