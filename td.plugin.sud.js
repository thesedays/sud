/**
 * @author: verdyckb @troti13
 * @name: TD.browser
 * @version: 0.0.1
 * @date: 17/01/12
 * @dependencies:
 * @copyright: These Days
 */

/* jslint devel: true, browser: true, maxerr: 50, indent: 4 */
(function (window, TD) {
    'use strict';

    /*
     *  @name:          TD.browser
     *  @Description:   All browser info
     *  @Parameters:    None
     *  @Usage:         TD.browser || TD.browser.webkit
    */
	TD.browser = (function() {

		var appName, vendor, userAgent, chrome, safari, ie, firefox, opera, browser, tmpArray, version;

		browser = {};

		appName = navigator.appName.toLowerCase();
		userAgent = navigator.userAgent.toLowerCase();
		vendor = navigator.vendor;

		browser.webkit = false;
		browser.chrome = false;
		browser.safari = false;
		browser.msie = false;
		browser.firefox = false;
		browser.opera = false;
		browser.name = 'unknown';
		browser.version = 'unknown';

		ie = 'msie';
		firefox = 'firefox';
		opera = 'presto';

		// vendor exists in Chrome & Safari
		if(vendor) {
			vendor = vendor.toLowerCase();
			chrome = vendor.indexOf('google');
			safari = vendor.indexOf('apple');

			if(chrome > -1 || safari > -1) {
				browser.webkit = true;

				if(chrome > -1) {
					browser.chrome = true;
					browser.name = 'Google Chrome';
				}
				if(safari > -1) {
					browser.safari = true;
					browser.name = 'Safari';
				}
			}
		}

		// else it's IE, FF, Opera or other
		if(userAgent.indexOf(ie) > -1) {
			browser.msie = true;
			browser.name = 'Microsoft Internet Explorer';
		}
		if(userAgent.indexOf(firefox) > -1) {
			browser.firefox = true;
			browser.name = 'Mozilla Firefox';
		}
		if(userAgent.indexOf(opera) > -1) {
			browser.opera = true;
			browser.name = 'Opera';
		}

		if(browser.msie) {
			tmpArray = userAgent.split('; ');
			if(tmpArray[1]) {
				version = tmpArray[1].split(' ');
				if(version[1]) {
					version = version[1];
				}
			}
		}
		if(browser.opera) {
			tmpArray = userAgent.split('version/');
			if(tmpArray[1]) {
				version = tmpArray[1];
			}
		}
		if(browser.chrome) {
			tmpArray = userAgent.split('chrome/');
			if(tmpArray[1]) {
				version = tmpArray[1].split(' ');
				if(version[0]) { version = version[0]; }
			}
		}
		if(browser.safari) {
			tmpArray = userAgent.split('version/');
			if(tmpArray[1]) {
				version = tmpArray[1].split(' ');
				if(version[0]) { version = version[0]; }
			}
		}
		if(browser.firefox) {
			tmpArray = userAgent.split('firefox/');
			if(tmpArray[1]) {
				version = tmpArray[1];
			}
		}

		if(version) {
			browser.version = version;
		}

		return browser;

	}());

	window.TD = TD;
}(window, window.TD || {}));

/**
 * @author: verdyckb
 * @name: TD.os
 * @version: 0.0.1
 * @date: 17/01/12
 * @dependencies:
 * @copyright: These Days
 */

/* jslint devel: true, browser: true, maxerr: 50, indent: 4 */
(function (window, TD) {
    'use strict';

    /*
     *  @name:          TD.os
     *  @Description:   All os info
     *  @Parameters:    None
     *  @Usage:         TD.os || TD.os.win
    */
	TD.os = (function() {
		var appVersion, userAgent, os, win, linux, mac, unix, tmpArray, version, android, iphone, ipod, ipad;

		os = {};
		appVersion = navigator.appVersion.toLowerCase();
		userAgent = navigator.userAgent.toLowerCase();

		win = 'win';
		mac = 'mac';
		unix = 'x11';
		linux = 'linux';
		android = 'android';
		iphone = 'iphone';
		ipod = 'ipod';
		ipad = 'ipad';

		os.win = false;
		os.mac = false;
		os.unix = false;
		os.linux = false;
		os.android = false;
		os.ios = false;
		os.phone = false;
		os.iphone = false;
		os.ipad = false;

		os.name = 'unknown';
		os.version = 'unknown';

		if(appVersion.indexOf(win) > -1) {
			os.win = true;
		}
		if(appVersion.indexOf(mac) > -1) {
			os.mac = true;
		}
		if(appVersion.indexOf(unix) > -1) {
			os.unix = true;
		}
		if(appVersion.indexOf(linux) > -1) {
			os.linux = true;
		}
		if(userAgent.indexOf(android) > -1) {
			os.android = true;
			os.phone = true;
		}
		if(userAgent.indexOf(ipod) > -1 || userAgent.indexOf(iphone) > -1 || userAgent.indexOf(ipad) > -1) {
			os.ios = true;
			os.mac = false;
			os.phone = true;

			if(userAgent.indexOf(ipod) > -1 || userAgent.indexOf(iphone) > -1) {
				os.iphone = true;
			} else {
				os.ipad = true;
			}
		}

		if(os.win) {
			if(appVersion.indexOf('win16') >= -1) { version = '3.11'; }
			if(appVersion.indexOf('95') >= -1) { version = '95'; }
			if(appVersion.indexOf('98') >= -1) { version = '98'; }
			if(appVersion.indexOf('4.0') >= -1 || appVersion.indexOf('winnt') >= -1) { version = 'NT 4.0'; }
			if(appVersion.indexOf('2000') >= -1 || appVersion.indexOf('nt 5.0') >= -1) { version = '2000'; }
			if(appVersion.indexOf(' me ') >= -1) { version = 'ME'; }
			if(appVersion.indexOf('xp') >= -1 || appVersion.indexOf('nt 5.1') >= -1) { version = 'XP'; }
			if(appVersion.indexOf('nt 5.2') >= -1) { version = 'Server 2003'; }
			if(appVersion.indexOf('nt 6.0') >= -1) { version = 'Vista'; }
			if(appVersion.indexOf('nt 7.0') >= -1 || appVersion.indexOf('nt 6.1') >= -1) { version = '7'; }

			os.name = 'Microsoft Windows';
			os.version = version;
		}
		if(os.mac) {
			tmpArray = userAgent.split('mac os x ');
			if(tmpArray[1]) {
				version = tmpArray[1];
				version = version.split(';');
				if(version[0]) {
					version = version[0];
					version = version.replace(/_/g, '.');
				}
			} else {
				version = 'unknown';
			}
			os.version = 'OS X ' + version;
			os.name = 'Mac';
		}
		if(os.unix) {
			os.name = 'Unix';
		}
		if(os.linux) {
			os.name = 'Linux';
		}
		if(os.android) {
			tmpArray = userAgent.split('android ');
			if(tmpArray[1]) {
				version = tmpArray[1].split(';');
				version = version[0];
			}
			os.version = version;
			os.name = 'Android';
		}
		if(os.ios) {
			tmpArray = userAgent.split(' os ');
			version = tmpArray[1];
			version = version.split(' ');
			if(version[0]) {
				version = version[0];
				version = version.replace(/_/g, '.');
			}
			os.version = version;
			os.name = 'iOS';
			if(os.iphone) {
				os.name = 'iOS iPhone/iPod';
			}
			if(os.ipad) {
				os.name = 'iOS iPad';
			}
		}

		return os;
	}());

	window.TD = TD;
}(window, window.TD || {}));

/**
 * @author: verdyckb
 * @name: MediaQuery
 * @version: 0.0.1
 * @date: 4/11/11
 * @dependencies:
 * @copyright: These Days
 */

(function (window, TD, undefined) {
    /**
     *  @name:          MediaQuery
     *  @description:   Get the right type of a js object
     *  @parameters:    None
     *  @usage:         TD.mq || TD.mq.screen || ...
     */
    TD.mq = (function() {
        var mq = {};

        mq.minRegex = /min-width:(.*)[px]/i;
        mq.maxRegex = /max-width:(.*)[px]/i;

        mq.selectStylesheets = function(sheets) {
            var i, length, selected, sheet;

            selected = [];

            for(i = 0, length = sheets.length; i < length; i += 1) {
                sheet = sheets[i];

                if(sheet.rel && sheet.rel === "stylesheet" && sheet.media) {
                    selected.push(sheet);
                }
            }

            return selected;
        };

        mq.getMediaQueries = function(sheets) {
            var i, length, sheet, media, layouts, layout;

            layouts = [];

            for(i = 0, length = sheets.length; i < length; i += 1) {
                sheet = sheets[i];
                if(!sheet.media) { continue; }
                media = sheet.media;

                layout = {};
                layout.min = media.match(this.minRegex);
                layout.max = media.match(this.maxRegex);

	            if(!layout.min && !layout.max) { continue; }

                if(layout.min) {
                    layout.min = parseInt(layout.min[1], 10);
                } else {
                    layout.min = null;
                }

                if(layout.max) {
                    layout.max = parseInt(layout.max[1], 10);
                } else {
                    layout.max = null;
                }

                layout.query = media;
                layouts.push(layout);
            }

            layouts.sort(function(a, b) {
                return (a.min - b.min);
            });

            return layouts;
        };

        mq.getCurrentMediaQuery = function(layouts) {
            var i, length, layout, windowWidth;

	        if(window.innerWidth) {
                windowWidth = window.innerWidth;
	        } else {
		        windowWidth = document.body.clientWidth;
	        }

            for(i = 0, length = layouts.length; i < length; i += 1) {
                layout = layouts[i];

                if(windowWidth > layout.min) {
                    if(layout.max) {
                        if(windowWidth < layout.max) {
	                        mq.currentMQ = layout;
                            return i + 1;
                        }
                    } else {
	                    mq.currentMQ = layout;
                        return i + 1;
                    }
                }
            }
        };

	    mq.onResizeTick = function() {
		    mq.screen = mq.getCurrentMediaQuery(mq.layouts);
	    };

        mq.resize = function() {
	        mq.windowWidth = window.innerWidth;
            clearTimeout(mq.resizeTimer);
            mq.resizeTimer = setTimeout(mq.onResizeTick, 10);
        };

        if(document.querySelectorAll) {
            mq.stylesheets = document.querySelectorAll('link[rel=stylesheet][media]');
        } else {
            mq.stylesheets = document.getElementsByTagName('link');
            mq.stylesheets = mq.selectStylesheets(mq.stylesheets);
        }

        mq.windowWidth = window.innerWidth;
        mq.layouts = mq.getMediaQueries(mq.stylesheets);
        mq.screen = mq.getCurrentMediaQuery(mq.layouts);

	    if(window.addEventListener) {
            window.addEventListener('resize', mq.resize, true);
	    } else {
		    window.attachEvent('onresize', mq.resize);
	    }

	    return mq;
    }());

	window.TD = TD;
}(window, window.TD || {}));

(function (window, TD) {
	var resizeTimer;

	if(!TD.mq.screen) { alert('No responsive stylesheets found in head'); return false; }

	function init() {
		var html, wrapper, clearfix, clear, left, right, browser, close, os, mqinfo;

		wrapper = document.createElement('div');
		clearfix = document.createElement('div');
		left = document.createElement('div');
		right = document.createElement('div');
		browser = document.createElement('div');
		os = document.createElement('div');
		mqinfo = document.createElement('div');
		clear = document.createElement('div');
		close = document.createElement('a');

		left.innerHTML = TD.mq.screen;
		browser.innerHTML = TD.browser.name + ' ' + TD.browser.version;
		os.innerHTML = TD.os.name + ' ' + TD.os.version;
		mqinfo.innerHTML =  '<span style="font-size:12px; margin-right:10px;">min: ' + TD.mq.currentMQ.min + 'px</span><span style="font-size:12px; margin-right:10px;">max: ' + TD.mq.currentMQ.max + 'px</span><span style="font-size:12px;">current:' + TD.mq.windowWidth + 'px</span>';
		close.innerHTML = 'close x';

		wrapper.style.background = '#333333';

		wrapper.style.color = '#FFFFFF';
		wrapper.style.font = 'bold 14px/normal sans-serif';
		wrapper.style.left = '10px';
		wrapper.style.opacity = '0.6';
		wrapper.style.padding = '10px';
		wrapper.style.position = 'fixed';
		wrapper.style.top = '10px';
		wrapper.style.zIndex = '9999';
		wrapper.style.filter = 'alpha(opacity=60,style=0)';
		wrapper.id = 'td_plugin_sud_wrapper';

		close.style.color = '#FFFFFF';
		close.style.font = 'normal 10px/normal sans-serif';
		close.style.position = 'absolute';
		close.style.right = '12px';
		close.style.textDecoration = 'none';
		close.style.top = '5px';
		close.id = 'td_plugin_sud_close';
		close.href = '#';

		clear.style.clear = 'both';

		left.style.fontSize = '50px';
		left.style.cssFloat = 'left';
		left.style.padding = '25px';
		left.style.width = '50px';
		left.id = 'td_plugin_sud_screen';

		right.style.cssFloat = 'right';
		right.style.width = '200px';

		browser.style.borderBottom = '1px solid #FFFFFF';
		browser.style.padding = '20px 5px';

		mqinfo.id = 'td_plugin_sud_mqinfo';

		os.style.padding = '20px 5px';

		right.appendChild(browser);
		right.appendChild(os);

		clearfix.appendChild(left);
		clearfix.appendChild(right);

		wrapper.appendChild(close);
		wrapper.appendChild(clearfix);
		wrapper.appendChild(clear);
		wrapper.appendChild(mqinfo);

		document.body.appendChild(wrapper);
	}

	function onClose(e) {
		var wrapper = document.getElementById('td_plugin_sud_wrapper');

		e.preventDefault();

		document.body.removeChild(wrapper);
	}

	function onResize() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(function() {
			var screen, mqinfo;
			screen = document.getElementById('td_plugin_sud_screen');
			screen.innerHTML = TD.mq.screen;

			mqinfo = document.getElementById('td_plugin_sud_mqinfo');
			mqinfo.innerHTML =  '<span style="font-size:12px; margin-right:10px;">min: ' + TD.mq.currentMQ.min + 'px</span><span style="font-size:12px; margin-right:10px;">max: ' + TD.mq.currentMQ.max + 'px</span><span style="font-size:12px;">current:' + TD.mq.windowWidth + 'px</span>';
		}, 10);
	}

	init();

	if(window.addEventListener) {
        window.addEventListener('resize', onResize, true);
		document.getElementById('td_plugin_sud_close').addEventListener('click', onClose, true);
    } else {
	    window.attachEvent('onresize', onResize);
		document.getElementById('td_plugin_sud_close').attachEvent('onclick', onClose);
    }

}(window, window.TD || {}));