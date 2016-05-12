function ativaCompartilhamento(elmnt, classe) {
  
    var infos = $(elmnt).parent();
    var div = $(elmnt).parent().next('.compartilharDiv');
  
    $(infos).slideUp();
    $(div).addClass(classe).slideDown();
}
function compartilhatwitter() {
    
    twttr.widgets.createShareButton(
  "https:\/\/dev.twitter.com\/web\/tweet-button",
  document.getElementById("tweet-container"),
  {
      size: "large",
      via: "twitterdev",
      related: "twitterapi,twitter",
      text: "custom share text",
      hashtags: "example,demo"
  }
);
}
function compartilhaFaceBook(elem) {
    
   
    postToFeed(jQuery(elem).data('title'), jQuery(elem).data('desc'), jQuery(elem).data('link'), jQuery(elem).data('image'));
    return false;
}
window.fbAsyncInit = function () {
    FB.init({
        appId: '619256671445990', status: true, cookie: true, xfbml: true
    });
};
(function (d, debug) {
    var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement('script'); js.id = id;
    js.async = true; js.src = "//connect.facebook.net/en_US/all" + (debug ? "/debug" : "") + ".js";
    ref.parentNode.insertBefore(js, ref);
}(document, /*debug*/ false));
function postToFeed(title, desc, url, image) {
    
    var obj = { method: 'feed', link: url, picture: image, name: title, description: desc };
    function callback(response) { }
    FB.ui(obj, callback);
}
function compartilhatwitter() {
    
    twttr.widgets.createShareButton(
  "https:\/\/dev.twitter.com\/web\/tweet-button",
  document.getElementById("tweet-container"),
  {
      size: "large",
      via: "twitterdev",
      related: "twitterapi,twitter",
      text: "custom share text",
      hashtags: "example,demo"
  }
);
    jQuery('#widget a').trigger("click");
    jQuery('#widget a').hide();
}
setTimeout(function () {  jQuery(".carroselDireito").trigger("click").trigger("click") }, 10000);