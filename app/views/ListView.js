import Marionette from 'backbone.marionette';
import CardCollectionView from './CardCollectionView';
import { inlineEditHandler } from '../helpers';

export default Marionette.View.extend({
    initialize: function(options) {
        this.model = options.model;
    },
    modelEvents: {
        'change:name': 'render',
    },
    events: {
        'click .list-title': function(e) {
            inlineEditHandler(e, 'h3', 'input', (id, text) => {
                this.model.set('name', text);
                this.model.save();
            });
        }
    },
    template: require('../templates/list.html'),
    regions: {
        'cardRegion': '#card-region'
    },
    onRender: function() {
        this.showChildView('cardRegion', new CardCollectionView({ collection: this.model.get('cards') }));
    }
});