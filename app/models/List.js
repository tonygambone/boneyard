import Backbone from 'backbone';
import Relational from 'backbone-relational';
import Card from './Card';
import CardCollection from '../collections/CardCollection';

// Backbone model of a list

export default Backbone.RelationalModel.extend({
    relations: [{
        type: Backbone.HasMany,
        key: 'cards',
        relatedModel: Card,
        collectionType: CardCollection,
        reverseRelation: {
            key: 'list',
            includeInJSON: Backbone.Model.prototype.idAttribute
        }
    }]
});