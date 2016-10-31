import Marionette from 'backbone.marionette';
import { inlineEditHandler } from '../helpers';

// Marionette view for a card. Handles title editing, card drag,
// and card removal functions.

export default Marionette.View.extend({
    initialize: function(options) {
        this.model = options.model;
    },
    modelEvents: {
        'change:title': 'render',
    },
    events: {
        // inline editing of card title
        'click .card': function(e) {
            inlineEditHandler(e, '.card-title', 'input', (id, text) => {
                const attrs = { 'title': text, 'new': false };
                this.model.set(attrs);
                this.model.save(attrs, { patch: true });
            });
        },
        // card drag start event, capture card ID
        'dragstart .card': function(e) {
            const dt = e.originalEvent.dataTransfer;
            // must be 'text' (IE11)
            dt.setData('text', String(this.model.get('id')));
            dt.dropEffect = 'move';
        },
        // handle card removal (prompt)
        'click .remove-card': function(e) {
            $(e.target).popover({
                content: 'Are you sure? <button class="btn btn-sm btn-danger delete-card">Yep</button> <button class="btn btn-sm cancel-delete-card">Nope</button>',
                html: true,
                placement: 'auto bottom'
            }).popover('show');
        },
        // handle card removal (confirmed)
        'click .delete-card': function(e) {
            this.model.destroy();
        },
        // handle card removal (cancelled)
        'click .cancel-delete-card': function(e) {
            $(this.el).find('.remove-card').popover('destroy');
        }
    },
    template: require('../templates/card.html'),
    onRender: function() {
        if (this.model.get('new')) {
            // drop right into editing new cards
            setTimeout(() => { $(this.el).find('.card .card-title').click(); }, 100);
        }
    }
});