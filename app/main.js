import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Marionette from 'backbone.marionette';
import Router from './router';

const app = new Marionette.Application({
    onStart: () => {
        const AppLayout = Marionette.View.extend({
            el: '#app',
            template: require('./templates/layout.html'),
            regions: {
                pageRegion: '#page-region'
            }
        });
        const layout = new AppLayout();
        layout.render();

        const router = new Router();
        router.on('route', (name, path, args) => {
            if (['home', 'about'].includes(name)) {
                const PageView = Marionette.View.extend({
                    template: require(`./templates/${name}.html`)
                });
                layout.showChildView('pageRegion', new PageView());
            }
        });
        Backbone.history.start();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    app.start();
});