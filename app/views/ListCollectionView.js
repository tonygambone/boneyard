import Marionette from 'backbone.marionette';
import ListView from './ListView';

// Marionette view for a list collection

export default Marionette.CollectionView.extend({
    initialize: function(options) {
        this.collection = options.collection;
        this.childView = ListView;
    }
});