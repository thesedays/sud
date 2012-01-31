# [SUD - Screen's Up Display]()

We've been having problems with debugging responsive websites. We get bugreports saying something broke, with a screenshot, but no other info.
With this plugin, we hope to resolve this issue, giving us a lot of info in a little widget on screen.

# install
create a new bookmark and put this in the url: javascript:(function(){s=document.createElement('script');s.type='text/javascript';s.src='https://thesedays.blob.core.windows.net/labs-thesedays-com/sud/td.plugin.sud.min.js?v='+parseInt(Math.random()*99999999);document.body.appendChild(s);})();