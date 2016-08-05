(function(global) {
  global.initSystemJS = function(recaptchaMapping, loadForms) {
    // lock in the angular package version; do not let it float to current!
    var ngVer = '@2.0.0-rc.4';
    var formsVersion = '@0.2.0';

    //map tells the System loader where to look for things
    var  map = {
        'examples':       './examples/app',

        '@angular':      'https://npmcdn.com/@angular', // sufficient if we didn't pin the version
        'rxjs':          'https://npmcdn.com/rxjs@5.0.0-beta.6',
        'ts':            'https://npmcdn.com/plugin-typescript@4.0.10/lib/plugin.js',
        'typescript':    'https://npmcdn.com/typescript@1.8.10/lib/typescript.js',
        'ng2-recaptcha': recaptchaMapping, // debug version
    };

    //packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        'examples':       { defaultExtension: 'ts' },
        'ng2-recaptcha':  { main: 'ng2-recaptcha.js', defaultExtension: 'js' },
    };

    if (loadForms) {
        map['@angular/forms'] = 'https://npmcdn.com/@angular/forms';
        packages['@angular/forms'] =  { main: 'bundles/forms.umd.js', defaultExtension: 'js' };
    }

    var ngPackageNames = [
        'common',
        'compiler',
        'core',
        'platform-browser',
        'platform-browser-dynamic',
    ];

    // Add map entries for each angular package
    // only because we're pinning the version with `ngVer`.
    ngPackageNames.forEach(function(pkgName) {
        map['@angular/'+pkgName] = 'https://npmcdn.com/@angular/' + pkgName + ngVer;
    });

    // Add package entries for angular packages
    ngPackageNames.forEach(function(pkgName) {
        packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    });

    var config = {
        // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
        transpiler: 'ts',
        typescriptOptions: {
        "target": "es5",
        "module": "system",
        "moduleResolution": "node",
        "sourceMap": false,
        "declaration": true,
        "removeComments": false,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "noImplicitAny": true,
        "listFiles": false,
        "noLib": false
        },
        meta: {
        'typescript': {
            "exports": "ts"
        }
        },
        map: map,
        packages: packages
    }

    System.config(config);
  };
})(this);
