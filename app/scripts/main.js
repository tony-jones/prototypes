/* eslint-disable */

/* eslint-env browser */
(function() {
  'use strict';

  // Check to make sure service workers are supported in the current browser,
  // and that the current page is accessed from a secure origin. Using a
  // service worker from an insecure origin will trigger JS console errors. See
  // http://www.chromium.org/Home/chromium-security/prefer-secure-origins-for-powerful-new-features
  var isLocalhost = Boolean(window.location.hostname === 'localhost' ||
      // [::1] is the IPv6 localhost address.
      window.location.hostname === '[::1]' ||
      // 127.0.0.1/8 is considered localhost for IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
      )
    );

  if ('serviceWorker' in navigator &&
      (window.location.protocol === 'https:' || isLocalhost)) {
    navigator.serviceWorker.register('service-worker.js')
    .then(function(registration) {
      // updatefound is fired if service-worker.js changes.
      registration.onupdatefound = function() {
        // updatefound is also fired the very first time the SW is installed,
        // and there's no need to prompt for a reload at that point.
        // So check here to see if the page is already controlled,
        // i.e. whether there's an existing service worker.
        if (navigator.serviceWorker.controller) {
          // The updatefound event implies that registration.installing is set:
          // https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-container-updatefound-event
          var installingWorker = registration.installing;

          installingWorker.onstatechange = function() {
            switch (installingWorker.state) {
              case 'installed':
                // At this point, the old content will have been purged and the
                // fresh content will have been added to the cache.
                // It's the perfect time to display a "New content is
                // available; please refresh." message in the page's interface.
                break;

              case 'redundant':
                throw new Error('The installing ' +
                                'service worker became redundant.');

              default:
                // Ignore
            }
          };
        }
      };
    }).catch(function(e) {
      console.error('Error during service worker registration:', e);
    });
  }
  // Add JS below this line
  
  $('.sortable').sortable({
    axis: 'y',
    containment: '.sidebar',
    handle: 'i',
    placeholder: 'sortable-placeholder',
    revert: 100,
    cursor: 'move',
    tolerance: 'pointer',
    scroll: true
  });

  var acc = document.getElementsByClassName("extension-panel__primary");
  var move = document.getElementsByClassName("dropper-icon");
  var subtoggle = document.getElementsByClassName("c-toggle__title"); 
  
  var i;

  for (i = 0; i < move.length; i++) {
    move[i].onclick = function(e) {
      console.log(e);
      e.stopPropagation();
    }
  }

  for (i = 0; i < subtoggle.length; i++) {
    subtoggle[i].onclick = function(e) {
      this.parentNode.classList.toggle("live");
      var section = this.parentNode.children[1];
      if (section.classList.contains('visible')) {
        section.classList.remove('visible');
      }
      else {
        section.classList.add('visible');
      }
    }
  }

  for (i = 0; i < acc.length; i++) {
    acc[i].onclick = function(e) {
      //console.log(e);
      e.stopPropagation();
      this.parentNode.classList.toggle("active");
      var panel = this.parentNode.firstElementChild.nextElementSibling
      //console.log(panel);
      if (panel.classList.contains('visible')){
        //panel.style.maxHeight = null;
        panel.classList.remove('visible');
      } else {
        panel.classList.add('visible');
        //panel.style.maxHeight = panel.scrollHeight + 15 + "px";
      } 
    }
  }

})();
