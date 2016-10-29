import Marionette from 'backbone.marionette';
import CardCollectionView from './CardCollectionView';

export default Marionette.View.extend({
    initialize: function(options) {
        this.model = options.model;
    },
    modelEvents: {
        'change:name': 'render',
    },
    template: require('../templates/list.html'),
    regions: {
        'cardRegion': '#card-region'
    },
    onRender: function() {
        this.showChildView('cardRegion', new CardCollectionView({ collection: this.model.get('cards') }));
    }
});