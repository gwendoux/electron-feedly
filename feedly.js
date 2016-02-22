(function() {
    // Load the script
    var script = document.createElement("script");
    script.src = './node_modules/jquery/dist/jquery.js';
    script.type = 'text/javascript';
    document.getElementsByTagName("head")[0].appendChild(script);

    // Poll for jQuery to come into existance
    var checkReady = function(callback) {
        if (window.jQuery) {
            callback(jQuery);
        }
        else {
            window.setTimeout(function() { checkReady(callback); }, 100);
        }
    };

    // Start polling...
    checkReady(function($) {
        window.fluid.dockBadge = '';
        setInterval(updateDockBadge, 2000);

        function updateDockBadge() {
            var count = parseInt($("#latesttab .simpleUnreadCount").html(), 10)

            if((count === 0) || (isNaN(count))) {
                app.dock.setBadge('');
            }
            else {
                app.dock.setBadge(count);
            }
        }
    });
})();
