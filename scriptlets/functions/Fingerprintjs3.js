function Fingerprintjs3(source, args) {
  function Fingerprintjs3(source) {
    var visitorId = (function () {
      var id = '';
      for (var i = 0; i < 8; i += 1) {
        id += (Math.random() * 65536 + 4096).toString(16).slice(-4);
      }
      return id;
    })();
    var FingerprintJS = function FingerprintJS() {};
    FingerprintJS.prototype = {
      load() {
        return Promise.resolve(new FingerprintJS());
      },
      get() {
        return Promise.resolve({
          visitorId: visitorId,
        });
      },
      hashComponents: noopStr,
    };
    window.FingerprintJS = new FingerprintJS();
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
  function noopStr() {
    return '';
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
    Fingerprintjs3.apply(this, updatedArgs);
  } catch (e) {
    console.log(e);
  }
}

export default Fingerprintjs3;
