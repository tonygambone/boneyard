import Marionette from 'backbone.marionette';
import Card from '../models/Card';
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
                const attrs = { 'name': text, 'new': false };
                this.model.set(attrs);
                this.model.save(attrs, { patch: true });
            });
        },
        'dragover': function(e) {
            e.preventDefault();
            const dt = e.originalEvent.dataTransfer;
            dt.dropEffect = 'move';
        },
        'drop': function(e) {
            e.preventDefault();
            const dt = e.originalEvent.dataTransfer;
            const cardId = dt.getData('card');
            const card = this.model.get('board').getCard(cardId);
            if (card && card.get('list') !== this.model.get('id')) {
                card.save({ list: this.model.get('id') }, { patch: true });
            }
        },
        'click .add-card': function(e) {
            this.model.get('cards').add(new Card({ title: "New unsaved card", new: true, list: this.model.get('id') }));
        }
    },
    template: require('../templates/list.html'),
    regions: {
        'cardRegion': '#card-region'
    },
    onRender: function() {
        this.showChildView('cardRegion', new CardCollectionView({ collection: this.model.get('cards') }));
        if (this.model.get('new')) {
            setTimeout(() => { $(this.el).find('.list-title h3').click(); }, 100);
        }
    }
});