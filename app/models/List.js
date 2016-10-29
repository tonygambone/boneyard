import Backbone from 'backbone';
import CardCollection from '../collections/CardCollection';

export default Backbone.Model.extend({
    set: function(attributes, options) {
        if (attributes.cards !== undefined && !(attributes.cards instanceof CardCollection)) {
            attributes.cards = new CardCollection(attributes.cards);
        }
        return Backbone.Model.prototype.set.call(this, attributes, options);
    }
});