
// Array#includes polyfill for IE11
if (!Array.prototype.includes) {
    Array.prototype.includes = function() {
        'use strict';
        return Array.prototype.indexOf.apply(this, arguments) !== -1;
    };
}