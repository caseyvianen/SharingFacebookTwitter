angular.module("Appshare",[])
.directive('twitterButton', function() {

  return {
      restrict: "E",
      scope: {
          tweetText: '@text',
          callback: '&callback',
          hashtags: "@hashtags",
          url:'@urltext'
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
                  scope.url,
                  document.getElementById('container'), {
                      text: scope.tweetText,
                      hashtags:scope.hashtags,
                  });
          });

      }
  }
})

.directive('facebookButton', function($q) {


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
      urlink:'@url',
      facebookText: '@text',
      facebookPicture: '@picture',
      callback: '&callback',
      appie: '@apid'

  },
  link: function(scope, element) {
    window.fbAsyncInit = function() {
      FB.init({
          appId: scope.appie,
          xfbml: true,
          version: 'v2.5'
      });
    };
      element[0].addEventListener('click', function(e) {
        var deferred = $q.defer();
         FB.ui(
          {
            method: 'feed',
            link:scope.urlink,
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
  
