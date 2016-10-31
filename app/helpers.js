import $ from 'jquery';

// handle editing some text inline on click. initial structure:
// <parent>
//   <text>the text</text>
//   <input style="display:none" value="the text" data-id="123">
// </parent>
// when accepted calls callback(123, "the new text");
export const inlineEditHandler =
    function(e, textSelector, inputSelector, callback) {
        $(e.target).closest(textSelector).hide().siblings(inputSelector).show().select()
            .on('keyup', function(e) {
                if (e.which === 13) { // enter
                    var input = $(this);
                    // go ahead and update the UI even though we will probably re-render
                    // in case it is the same text which will not trigger a change
                    input.hide().off('keyup').siblings(textSelector)
                        .text(input.val()).show();
                    if (callback && typeof callback === 'function') {
                        callback(input.data('id'), input.val());
                    }
                } else if (e.which == 27) { // esc
                    var input = $(this);
                    input.hide().off('keyup').val(input.siblings(textSelector).text())
                        .siblings(textSelector).show();
                }
            });
    };