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
            inlineEditHandler(e, 'span', 'input', (id, text) => {
                const attrs = { 'title': text, 'new': false };
                this.model.set(attrs);
                this.model.save(attrs, { patch: true });
            });
        },
        'dragstart .card': function(e) {
            const dt = e.originalEvent.dataTransfer;
            dt.setData('card', this.model.get('id'));
            dt.setData('list', this.model.get('list').get('id'));
            dt.dropEffect = 'move';
        }
    },
    template: require('../templates/card.html'),
    onRender: function() {
        if (this.model.get('new')) {
            setTimeout(() => { $(this.el).find('.card span').click(); }, 100);
        }
    }
});