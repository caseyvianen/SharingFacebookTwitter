angular.module("sharing.facebooktwitter",[])
    .directive('twitterButton', function() {

        return {
            restrict: "E",
            scope: {
                tweetText: '@text',
                callback: '&callback'

            },
            link: function(scope, element) {
                window.twttr = (function(d, s, id) {
                    var js, fjs = d.getElementsByTagName(s)[0],
                        t = window.twttr || {};
                    if (d.getElementById(id)) return t;
                    js = d.createElement(s);
                    js.id = id;
                    js.src = "https://platform.twitter.com/widgets.js";
                    fjs.parentNode.insertBefore(js, fjs);

                    t._e = [];
                    t.ready = function(f) {
                        t._e.push(f);
                    };

                    return t;
                }(document, "script", "twitter-wjs"));
                twttr.ready(function() {
                    twttr.events.bind('tweet', function(event) {

                    });
                    twttr.widgets.createShareButton(
                        'http://www.iamprogrez.com/products/iam-it/',
                        document.getElementById('container'), {
                            text: scope.tweetText,
                            hashtags: "iamprogrez,iam-it",
                        });
                });

            }
        }
    })

.directive('facebookButton', function($q) {
    window.fbAsyncInit = function() {
        FB.init({
            appId: '1535286526768732',
            xfbml: true,
            version: 'v2.5'
        });
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


    return {
        restric: "E",
        scope: {
            facebookText: '@text',
            facebookPicture: '@picture',
            callback: '&callback'
        },
        link: function(scope, element) {
            element[0].addEventListener('click', function(e) {
              var deferred = $q.defer();
               FB.ui(
                {
                  method: 'feed',
                  link:'http://www.iamprogrez.com/products/iam-it/',
                  description:scope.facebookText,
                  picture:scope.facebookPicture,

                },
                function(response)
                {

                    if (response)
                    {
                      deferred.resolve(response);

                    }
                    else
                    {
                      deferred.reject('Error Ocurred');

                    }

              });
          return deferred.promise;
                    scope.callback({
                        response: response
                    })
                });
            }
        }
    })
