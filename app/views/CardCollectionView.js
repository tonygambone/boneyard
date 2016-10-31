import Marionette from 'backbone.marionette';
import CardView from './CardView';

// Marionette view for a card collection

export default Marionette.CollectionView.extend({
    initialize: function(options) {
        this.collection = options.collection;
        this.childView = CardView;
    }
});