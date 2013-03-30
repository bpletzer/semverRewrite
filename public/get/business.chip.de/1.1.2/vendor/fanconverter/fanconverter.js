/**
 * User: hschaeidt
 * Date: 15.03.13
 * Time: 14:27
 */

/**
 * Frontend Controller Package for Wetpaint overlay.
 *
 * The package gives a fully external configurable interface to the overlays.
 * The module is mostly constructed to be called via annotation loading.
 *
 * @author asterz@chip.de (Alexander Sterz)
 * @author hschaeidt@chip.de (Hendrik Schaeidt)
 *
 * @return {Object}
 */
define(
    ["vendor/mustache/mustache", "jquery", "vendor/core/mediator", 'vendor/core/currpage',
        "http://fanconverter.wetpaint.me/1.2.0/application-fanconverter.js"],
    function(mustache, $, mediator, currpage, Wetpaint) {

        /**
         * Decoded config from config element (CSS class "json")
         */
        var parameters;

        /**
         * Element where to display the FanConverter
         */
        var fanConverterEl;

        /**
         * Global google analytics
         */
        window._gaq = window._gaq || [];


        /**
         * Initializes the package
         *
         * Relevant mustache templates must have following class names:
         * <ul>
         *     <li>Mustache Template: tpl
         *     <li>Config JSON parameters: json
         *     <li>CSS: css
         * </ul>
         *
         * @param {Element} el the hidden element
         */
        function init(el)
        {
            var tpl,
                config,
                style;

            tpl = $(".tpl", el).html();
            parameters = $.parseJSON($('.json', el).html());

            if (parameters["filter"]) {
                if (!filter(parameters["filter"])) {
                    return false;
                }
            }

            fanConverterEl = $(parameters["displayEl"]);

            style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = $(".css", el).html();
            document.getElementsByTagName('head')[0].appendChild(style);

            config = {
                accountId: 'none',
                el: fanConverterEl,                         // element in which to render the fan converter
                socialUrls: null,
                topOffset: null,
                containerWidth: null,
                containerHeight: null,
                supressCSS: true,
                force: false,                               // forces fan converter to be shown
                expires: 60,                                // expiration date if user likes or follows
                dismissExpires: 60,                         // expiration date if user dismisses fan converter
                pageViewsGreaterThan: 2,                    // show only after defined number of page views
                referrerMatch:/.*/,                         // regular expression to match referrer
                debug:  false,
                applicationShouldDisplay: applicationShouldDisplay,
                template:{
                    jsTemplate: tpl,                        // uncompiled mustache template
                    attributes: parameters["attributes"],

                    afterRender: afterRender,
                    onClose: onClose
                }
            }

            //Extend the parameters with valid offset values, depending on the target element
            $.extend(parameters, calculateOffsets(parameters["displayEl"]));

            //Merge parameters into config
            $.extend(config, parameters);

            var fanConverter = new Wetpaint.FanConverter.App(config);

            var simulatePageView = document.getElementById('simulatePageView');
            $(simulatePageView).bind('click', function (e) {
                fanConverter.forcePageView();
            });

            var setPageView = document.getElementById('setPageView');
            $(setPageView).bind('click', function (e) {
                fanConverter.setPageView(0);
            });

            var likedCallback = function (resp) {
                _gaq.push(["c._trackEvent", "FanConverter "+parameters["attributes"].channel, "fc_liked", document.URL]);
            };

            var unlikedCallback = function (resp) {
                _gaq.push(["c._trackEvent", "FanConverter "+parameters["attributes"].channel, "fc_unliked", document.URL]);
            };

            var followCallback = function (resp) {
            };

            var unfollowCallback = function (resp) {
            };

            fanConverter.subscribe('liked', likedCallback);
            fanConverter.subscribe('unliked', unlikedCallback);
            fanConverter.subscribe('followed', followCallback);
            fanConverter.subscribe('unfollowed', unfollowCallback);
        };

        /**
         * Calculates the height of the overlay
         *
         * Recalculates the offset after ads are rendered
         *
         * @param {String} container
         * @returns {{containerHeight: *, topOffset: *}}
         */
        var calculateOffsets = function(container)
        {
            if ($(container).length > 0 && $('span.general2').length > 0) {
                var heightSelector = $('span.general2:first');
                var numEl = $('span.general2').length;
                var containerHeight;
                var topOffset;

                if (numEl > 1) {
                    heightSelector = $('span.general2').eq(1);
                }

                containerHeight = (($(container).offset().top + $(container).outerHeight()) - $(heightSelector).offset().top);
                topOffset = $(heightSelector).offset().top - $(container).offset().top;

                mediator.subscribe('ad_view.wstv3', function(){
                    var adjustPain = function(){
                        var afterAdHeight = ($(container).offset().top + $(container).outerHeight()) - $(heightSelector).offset().top;
                        var afterAdTop = $(heightSelector).offset().top - $(container).offset().top;

                        $('#wetpaint-overlay').css({height : afterAdHeight, top : afterAdTop});
                    };
                    if ($('#wetpaint-overlay').length > 0) {
                        adjustPain();
                    }
                    mediator.subscribe('fanconverter.afterRender', adjustPain);
                });

                return {
                    containerHeight: containerHeight,
                    topOffset: topOffset
                }
            }

        }

        /**
         * Google analytics tracking
         *
         * @param viewObj
         */
        var afterRender = function(viewObj)
        {
            contentObstructionShowing(true);
            _gaq.push(['c._trackEvent', 'FanConverter '+parameters["attributes"].channel, 'fc_open', document.URL]);

            var fcReadMore = document.getElementById('fc-read-more');
            var fcNoFacebook = document.getElementById('fc-no-facebook');
            var fcAlreadyLike = document.getElementById('fc-already-like');

            $(fcNoFacebook).bind('click', function (e) {
                viewObj.noThanks();
                _gaq.push(
                    ['c._trackEvent', 'FanConverter '+parameters["attributes"].channel, 'fc_no-facebook', document.URL]
                );
                //Wetpaint.FanConverter.debugLog("No Facebook event on " + document.URL);
            });

            $(fcReadMore).bind('click', function (e) {
                viewObj.noThanks();
                _gaq.push(
                    ['c._trackEvent', 'FanConverter '+parameters["attributes"].channel, 'fc_read-more', document.URL]
                );
                //Wetpaint.FanConverter.debugLog("Read more event on " + document.URL);
            });

            $(fcAlreadyLike).bind('click', function (e) {
                viewObj.alreadyLike();
                _gaq.push(
                    ['c._trackEvent', 'FanConverter '+parameters["attributes"].channel, 'fc_already-like', document.URL]
                );
                //Wetpaint.FanConverter.debugLog("Already like event on " + document.URL);
            });

            mediator.publish('fanconverter.afterRender');
        };

        /**
         * Close tracking
         *
         * @param viewObj
         */
        var onClose = function(viewObj)
        {
            contentObstructionShowing(false);
            _gaq.push(['c._trackEvent', 'FanConverter '+parameters["attributes"].channel, 'fc_close', document.URL]);
        };

        /**
         * Changes the overlay visibility
         *
         * @param blnShow
         */
        var contentObstructionShowing = function (blnShow)
        {
            if (blnShow) {
                fanConverterEl.addClass('fanConverterClipped ');
            } else {
                fanConverterEl.removeClass('fanConverterClipped ');
            }
        };

        /**
         * Checks if the application should be displayed.
         *
         * With the force you can skip the execution of this.
         * Should not display on mobile user agents.
         *
         * @returns {boolean}
         */
        var applicationShouldDisplay = function()
        {
            var currentURL,
                store = Wetpaint.Utils.storeManager;

            if (store.getSession('currentURL') == null ) {
                store.setSession('currentURL', window.location.href);
                currentURL = window.location.href;
            } else {
                currentURL = store.getSession('currentURL');
            }

            if (is_mobile()) {
                return false;
            } else {
                return true;
            }
        };

        /**
         * Checks if we've got a mobile user agent
         *
         * @see http://detectmobilebrowsers.com/ 130214
         * @returns {boolean}
         */
        var is_mobile = function()
        {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
                return true;
            } else {
                return false;
            }
        };

        /**
         * Filters the currpage by given filters.
         *
         * A filter can be everything within the currpage variable. Names and values must match.
         *
         * @param {Array|Object} filters
         * @returns {boolean}
         */
        var filter = function(filters)
        {
            for (filter in filters) {
                for (filterKey in filters[filter]) {
                    if (currpage.get(filter) == filters[filter][filterKey]) {
                        return true;
                    }
                }
            }

            return false;
        }

        return {
            init: init
        };
    });