import Marionette from 'backbone.marionette';

export default Marionette.View.extend({
    initialize: function(options) {
        this.pageName = options.page || 'home';
        this.template = require(`../templates/${this.pageName}.html`);
    }
});