Components.utils.import("resource://gre/modules/Services.jsm");

let appinfo = Services.appinfo;
let options = {
  application: appinfo.ID,
  appversion: appinfo.version,
  platformversion: appinfo.platformVersion,
  os: appinfo.OS,
  osversion: Services.sysinfo.getProperty("version"),
  abi: appinfo.XPCOMABI
};

let man = `
overlay  chrome://browser/content/browser.xhtml                     chrome://highlighttab/content/browserOverlay.xhtml
`;

function showRestartNotifcation(verb, window) {
  window.PopupNotifications._currentNotifications.shift();
  window.PopupNotifications.show(
    window.gBrowser.selectedBrowser,
    'addon-install-restart',
    'Save File to has been ' + verb + ', but a restart is required to ' + (verb == 'upgraded' || verb == 're-enabled' ? 'enable' : 'remove') + ' add-on functionality.',
    'addons-notification-icon',
    {
      label: 'Restart Now',
      accessKey: 'R',
      callback() {
        let cancelQuit = Cc['@mozilla.org/supports-PRBool;1'].createInstance(Ci.nsISupportsPRBool);
        Services.obs.notifyObservers(cancelQuit, 'quit-application-requested', 'restart');

        if (cancelQuit.data)
          return;

        if (Services.appinfo.inSafeMode)
          Services.startup.restartInSafeMode(Ci.nsIAppStartup.eAttemptQuit);
        else
          Services.startup.quit(Ci.nsIAppStartup.eAttemptQuit | Ci.nsIAppStartup.eRestart);
      }
    },
    [{
      label: 'Not Now',
      accessKey: 'N',
      callback: () => {},
    }],
    {
      persistent: false,
      hideClose: true,
      timeout: Date.now() + 30000,
      removeOnDismissal: true
    }
  );
}

function install() { }

function uninstall() { }

function startup(data, reason) { 

  Components.utils.import("chrome://highlighttab/content/ChromeManifest.jsm");
  Components.utils.import("chrome://highlighttab/content/Overlays.jsm");

  const window = Services.wm.getMostRecentWindow('navigator:browser');
  if (reason === ADDON_UPGRADE || reason === ADDON_DOWNGRADE) {
      showRestartNotifcation("upgraded", window);
      return;
  } else if (reason === ADDON_ENABLE) {
      showRestartNotifcation("re-enabled", window);
      return;
  }

  if (reason === ADDON_INSTALL || (reason === ADDON_ENABLE )) {
    var enumerator = Services.wm.getEnumerator(null);
    while (enumerator.hasMoreElements()) {
      var win = enumerator.getNext();

      (async function (win) {
        let chromeManifest = new ChromeManifest(function () { return man; }, options);
        await chromeManifest.parse();
        if (win.document.createXULElement) {
          Overlays.load(chromeManifest, win.document.defaultView);
        }
      })(win);
    }
  }

  (async function () {
    let chromeManifest = new ChromeManifest(function () { return man; }, options);
    await chromeManifest.parse();

    let documentObserver = {
      observe(document) {
        if (document.createXULElement) {
          Overlays.load(chromeManifest, document.defaultView);
        }
      }
    };
    Services.obs.addObserver(documentObserver, "chrome-document-loaded");
  })();
}

function shutdown(data, reason) {
  const window = Services.wm.getMostRecentWindow('navigator:browser');
  if (reason === ADDON_DISABLE) {
      showRestartNotifcation("disabled", window);
      return;
  } else if (reason === ADDON_UNINSTALL ) {
      showRestartNotifcation("uninstalled", window);
      return;
  }
}
