import Marionette from 'backbone.marionette';
import ListCollectionView from './ListCollectionView';

// Marionette view for the board content area. Delegates to
// the list collection view.

export default Marionette.View.extend({
    initialize: function(options) {
        this.model = options.model;
    },
    template: require('../templates/boardContent.html'),
    regions: {
        listRegion: '#list-region'
    },
    onRender: function() {
        this.showChildView('listRegion', new ListCollectionView({ collection: this.model.get('lists') }));
    }
});