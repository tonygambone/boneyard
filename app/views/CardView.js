import Marionette from 'backbone.marionette';
import { inlineEditHandler } from '../helpers';

export default Marionette.View.extend({
    initialize: function(options) {
        this.model = options.model;
    },
    modelEvents: {
        'change:title': 'render',
    },
    events: {
        'click .card': function(e) {
            inlineEditHandler(e, '.card-title', 'input', (id, text) => {
                const attrs = { 'title': text, 'new': false };
                this.model.set(attrs);
                this.model.save(attrs, { patch: true });
            });
        },
        'dragstart .card': function(e) {
            const dt = e.originalEvent.dataTransfer;
            // must be 'text' (IE11)
            dt.setData('text', String(this.model.get('id')));
            dt.dropEffect = 'move';
        },
        'click .remove-card': function(e) {
            $(e.target).popover({
                content: 'Are you sure? <button class="btn btn-sm btn-danger delete-card">Yep</button> <button class="btn btn-sm cancel-delete-card">Nope</button>',
                html: true,
                placement: 'auto bottom'
            }).popover('show');
        },
        'click .delete-card': function(e) {
            this.model.destroy();
        },
        'click .cancel-delete-card': function(e) {
            $(this.el).find('.remove-card').popover('destroy');
        }
    },
    template: require('../templates/card.html'),
    onRender: function() {
        if (this.model.get('new')) {
            setTimeout(() => { $(this.el).find('.card .card-title').click(); }, 100);
        }
    }
});