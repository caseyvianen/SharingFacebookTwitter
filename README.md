# SharingFacebookTwitter
Callback function on Facebook and Twitter

### If you dont have bower:
```sh
$ npm install -g bower

```

**Then just put sharing.facebooktwitter in youre module dependencies.**

###After that put this in youre html BODY:
```sh
  <twitter-button text=""  callback="callbackTwitter(response)" hastags="" urltext=""></twitter-button>
    <facebook-button url="" text="" picture="" callback="callbackFacebook(response)" id="" class="facebook-share">Share</facebook-button>
```

###Last but not least you put the following code in youre head to define Angular and the Facebook API and the css file:
```sh
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.0-rc.2/angular.min.js"></script>
<script type="text/javascript" src="https://connect.facebook.net/en_US/sdk.js"></script>
```