import Marionette from 'backbone.marionette';
import Card from '../models/Card';
import CardCollectionView from './CardCollectionView';
import { inlineEditHandler } from '../helpers';

// Marionette view for a single list and its cards. Handles
// list title editing, card drop, and add/remove functions.

export default Marionette.View.extend({
    initialize: function(options) {
        this.model = options.model;
    },
    modelEvents: {
        'change:name': 'render',
    },
    events: {
        // inline editing of list name
        'click .list-title': function(e) {
            inlineEditHandler(e, 'h3', 'input', (id, text) => {
                const attrs = { 'name': text, 'new': false };
                this.model.set(attrs);
                this.model.save(attrs, { patch: true });
            });
        },
        // show valid drop target for dragged cards
        'dragover': function(e) {
            e.preventDefault();
            const dt = e.originalEvent.dataTransfer;
            dt.dropEffect = 'move';
        },
        // handle card drop - get card and update list ID
        'drop': function(e) {
            e.preventDefault();
            const dt = e.originalEvent.dataTransfer;
            const cardId = Number(dt.getData('text'));
            const card = this.model.get('board').getCard(cardId);
            if (card && card.get('list') !== this.model.get('id')) {
                card.save({ list: this.model.get('id') }, { patch: true });
            }
        },
        // handle card adding
        'click .add-card': function(e) {
            this.model.get('cards').add(new Card({ title: "New unsaved card", new: true, list: this.model.get('id') }));
        },
        // handle list removal (prompt)
        'click .remove-list': function(e) {
            $(e.target).popover({
                content: 'Are you sure? <button class="btn btn-sm btn-danger delete-list">Yep</button> <button class="btn btn-sm cancel-delete-list">Nope</button>',
                html: true,
                placement: 'auto bottom'
            }).popover('show');
        },
        // handle list removal (confirmed)
        'click .delete-list': function(e) {
            this.model.destroy();
        },
        // handle list removal (cancelled)
        'click .cancel-delete-list': function(e) {
            $(this.el).find('.remove-list').popover('destroy');
        }
    },
    template: require('../templates/list.html'),
    regions: {
        'cardRegion': '#card-region'
    },
    onRender: function() {
        this.showChildView('cardRegion', new CardCollectionView({ collection: this.model.get('cards') }));
        if (this.model.get('new')) {
            // drop right into editing new lists
            setTimeout(() => { $(this.el).find('.list-title h3').click(); }, 100);
        }
    }
});