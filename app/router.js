import { AppRouter } from 'backbone.marionette';

// main router controlling which page is shown

export default AppRouter.extend({
    // these don't actually have callback functions
    // listen for them using router.on('route', (name, path, args) => { ... })
    routes: {
        '': 'home',
        'home': 'home',
        'about': 'about',
        'contact': 'contact'
    }
});