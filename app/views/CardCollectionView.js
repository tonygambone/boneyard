import Marionette from 'backbone.marionette';
import CardView from './CardView';

export default Marionette.CollectionView.extend({
    initialize: function(options) {
        this.collection = options.collection;
        this.childView = CardView;
    }
});