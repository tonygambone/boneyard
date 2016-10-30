import Backbone from 'backbone';
import Card from '../models/Card';

export default Backbone.Collection.extend({
    model: Card,
    url: '/api/cards'
});