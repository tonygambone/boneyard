import Backbone from 'backbone';
import Card from '../models/Card';

// Backbone collection of card models

export default Backbone.Collection.extend({
    model: Card,
    url: '/api/cards'
});