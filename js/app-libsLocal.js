
requirejs.config({
    baseUrl: "/js/lib",
    paths: {
      "app": "../app",
      "jquery": "./jquery/jquery-2.1.0.min",
      //"text": "./require/text",
      //"domReady": "./require/domReady",
      //"SVG": "./svg/svg.min"
      
      "modernizr": "./grid3d/modernizr.custom",
      "classie": "./grid3d/classie",
      "helperGrid3D": "./grid3d/helper",
      "grid3d": "./grid3d/my-grid3d"
    },
    shim: {
        'grid3d': {
            //These script dependencies should be loaded before loading grid3d.js
            deps: ['modernizr', 'classie', "helperGrid3D"],
            //Once loaded, use the global 'grid3d' as the module value.
            exports: 'grid3d'
        },
        'helperGrid3D': {
            //These script dependencies should be loaded before loading helper.js
            deps: ['modernizr'],
            //Once loaded, use the global 'helperGrid3D' as the module value.
            exports: 'helperGrid3D'
        }
    },
});

// Load the main app module to start the app
requirejs(["app/main"]);