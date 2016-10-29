import Marionette from 'backbone.marionette';
import ListView from './ListView';

export default Marionette.CollectionView.extend({
    initialize: function(options) {
        this.collection = options.collection;
        this.childView = ListView;
    }
});