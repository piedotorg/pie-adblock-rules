function DidomiLoader(source, args) {
  function DidomiLoader(source) {
    function UserConsentStatusForVendorSubscribe() {}
    UserConsentStatusForVendorSubscribe.prototype.filter = function () {
      return new UserConsentStatusForVendorSubscribe();
    };
    UserConsentStatusForVendorSubscribe.prototype.subscribe = noopFunc;
    function UserConsentStatusForVendor() {}
    UserConsentStatusForVendor.prototype.first = function () {
      return new UserConsentStatusForVendorSubscribe();
    };
    UserConsentStatusForVendor.prototype.filter = function () {
      return new UserConsentStatusForVendorSubscribe();
    };
    UserConsentStatusForVendor.prototype.subscribe = noopFunc;
    var DidomiWrapper = {
      isConsentRequired: falseFunc,
      getUserConsentStatusForPurpose: trueFunc,
      getUserConsentStatus: trueFunc,
      getUserStatus: noopFunc,
      getRequiredPurposes: noopArray,
      getUserConsentStatusForVendor: trueFunc,
      Purposes: {
        Cookies: 'cookies',
      },
      notice: {
        configure: noopFunc,
        hide: noopFunc,
        isVisible: falseFunc,
        show: noopFunc,
        showDataProcessing: trueFunc,
      },
      isUserConsentStatusPartial: falseFunc,
      on() {
        return {
          actions: {},
          emitter: {},
          services: {},
          store: {},
        };
      },
      shouldConsentBeCollected: falseFunc,
      getUserConsentStatusForAll: noopFunc,
      getObservableOnUserConsentStatusForVendor() {
        return new UserConsentStatusForVendor();
      },
    };
    window.Didomi = DidomiWrapper;
    var didomiStateWrapper = {
      didomiExperimentId: '',
      didomiExperimentUserGroup: '',
      didomiGDPRApplies: 1,
      didomiIABConsent: '',
      didomiPurposesConsent: '',
      didomiPurposesConsentDenied: '',
      didomiPurposesConsentUnknown: '',
      didomiVendorsConsent: '',
      didomiVendorsConsentDenied: '',
      didomiVendorsConsentUnknown: '',
      didomiVendorsRawConsent: '',
      didomiVendorsRawConsentDenied: '',
      didomiVendorsRawConsentUnknown: '',
    };
    window.didomiState = didomiStateWrapper;
    var tcData = {
      eventStatus: 'tcloaded',
      gdprApplies: false,
      listenerId: noopFunc,
      vendor: {
        consents: [],
      },
      purpose: {
        consents: [],
      },
    };
    var __tcfapiWrapper = function __tcfapiWrapper(command, version, callback) {
      if (typeof callback !== 'function' || command === 'removeEventListener') {
        return;
      }
      callback(tcData, true);
    };
    window.__tcfapi = __tcfapiWrapper;
    var didomiEventListenersWrapper = {
      stub: true,
      push: noopFunc,
    };
    window.didomiEventListeners = didomiEventListenersWrapper;
    var didomiOnReadyWrapper = {
      stub: true,
      push(arg) {
        if (typeof arg !== 'function') {
          return;
        }
        if (document.readyState !== 'complete') {
          window.addEventListener('load', function () {
            setTimeout(arg(window.Didomi));
          });
        } else {
          setTimeout(arg(window.Didomi));
        }
      },
    };
    window.didomiOnReady = window.didomiOnReady || didomiOnReadyWrapper;
    if (Array.isArray(window.didomiOnReady)) {
      window.didomiOnReady.forEach(function (arg) {
        if (typeof arg === 'function') {
          try {
            setTimeout(arg(window.Didomi));
          } catch (e) {}
        }
      });
    }
    hit(source);
  }
  function hit(source) {
    if (source.verbose !== true) {
      return;
    }
    try {
      var log = console.log.bind(console);
      var trace = console.trace.bind(console);
      var prefix = '';
      if (source.domainName) {
        prefix += ''.concat(source.domainName);
      }
      prefix += "#%#//scriptlet('".concat(source.name, "', '").concat(source.args.join(', '), "')");
      log(''.concat(prefix, ' trace start'));
      if (trace) {
        trace();
      }
      log(''.concat(prefix, ' trace end'));
    } catch (e) {}
    if (typeof window.__debug === 'function') {
      window.__debug(source);
    }
  }
  function noopFunc() {}
  function noopArray() {
    return [];
  }
  function trueFunc() {
    return true;
  }
  function falseFunc() {
    return false;
  }
  const updatedArgs = args ? [].concat(source).concat(args) : [source];
  if (!window._scriptletdedupe) {
    window._scriptletdedupe = {};
  }
  if (window._scriptletdedupe[source.name]) {
    if (window._scriptletdedupe[source.name].includes(JSON.stringify(args))) {
      return;
    }
  } else {
    window._scriptletdedupe[source.name] = [];
  }
  window._scriptletdedupe[source.name].push(JSON.stringify(args));
  try {
    DidomiLoader.apply(this, updatedArgs);
  } catch (e) {
    console.log(e);
  }
}

export default DidomiLoader;
