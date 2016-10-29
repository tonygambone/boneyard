import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Marionette from 'backbone.marionette';
import Router from './router';
import NavbarView from './views/NavbarView';
import PageView from './views/PageView';

const app = new Marionette.Application({
    onStart: () => {
        const AppLayout = Marionette.View.extend({
            el: '#app',
            template: require('./templates/layout.html'),
            regions: {
                navbarRegion: '#navbar-region',
                pageRegion: '#page-region'
            }
        });
        const layout = new AppLayout();
        layout.render();

        const router = new Router();
        router.on('route', (name, path, args) => {
            if (['home', 'about', 'contact'].includes(name)) {
                layout.showChildView('navbarRegion', new NavbarView({ activeItem: name }));
                layout.showChildView('pageRegion', new PageView({ page: name }));
            }
        });
        Backbone.history.start();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    app.start();
});