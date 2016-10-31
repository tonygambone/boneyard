import style from './app.css';
import Backbone from 'backbone';
import $ from 'jquery';
import _ from 'underscore';
import Marionette from 'backbone.marionette';
import Router from './router';
import NavbarView from './views/NavbarView';
import PageView from './views/PageView';
import HomeView from './views/HomeView';
import Board from './models/Board';
import './polyfills.js';

// entry point of the web Application

const app = new Marionette.Application({
    onStart: () => {
        // main layout
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

        // data to be loaded
        const board = new Board({ id: 1 });
        board.fetched = false;

        // the router determines which view to show
        const router = new Router();
        router.on('route', (name, path, args) => {
            if (['about', 'contact'].includes(name)) {
                // static pages
                layout.showChildView('navbarRegion', new NavbarView({ activeItem: name }));
                layout.showChildView('pageRegion', new PageView({ page: name }));
            } else if (name === 'home') {
                // main page
                layout.showChildView('navbarRegion', new NavbarView({ activeItem: name }));
                if (!board.fetched)
                {
                    board.fetch({ success: () => {
                        board.fetched = true;
                        layout.showChildView('pageRegion', new HomeView({ model: board }));
                    }});
                } else {
                    layout.showChildView('pageRegion', new HomeView({ model: board }));
                }
            }
        });
        Backbone.history.start();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    app.start();
});