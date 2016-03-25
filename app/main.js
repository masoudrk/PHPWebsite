require.config({

    //baseUrl: "js/scripts",
    baseUrl: "",

    // alias libraries paths
    paths: {
        "angular": "Scripts/angular",
        "angularAMD": "Scripts/angularAMD",
        "ng-animate": "Scripts/angular-animate",
        "ui-router": "Scripts/angular-ui-router",
        "ng-route": "Scripts/angular-route",
        "toaster": "js/toaster",
        "ng-progress": "js/ngprogress",
        "ui-bootstrap": "js/ui-bootstrap-tpls-1.2.5",
        "route-resolver": "js/routeResolver",

        "MainCtrl": "partials/Main/MainCtrl",
        "PostCtrl": "partials/Post/PostCtrl",
        "DefaultCtrl": "DefaultCtrl"
    },

    shim: {
        "route-resolver": ["angular"],
        "angularAMD": ["angular"],
        "ui-router": ["angular"],
        "ng-route": ["angular"],
        "ng-animate": ["angular"],
        "toaster": ["angular"],
        "ng-progress": ["angular"],
        "ui-bootstrap": ["angular"]
    },

    deps: ['app/app']
});