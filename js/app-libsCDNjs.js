
requirejs.config({
    "baseUrl": "js/lib",
    "paths": {
      "app": "../app",
      "jquery": "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.0/jquery.min"
      //"text": "//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text.min",
      //"domReady": "//cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady.min",
      //"SVG": "//cdnjs.cloudflare.com/ajax/libs/svg.js/1.0rc3/svg.min"
    }
});

// Load the main app module to start the app
requirejs(["app/main"]);