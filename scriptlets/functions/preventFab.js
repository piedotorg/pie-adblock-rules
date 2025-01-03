function preventFab(source, args) {
  function preventFab(source) {
    hit(source);
    var Fab = function Fab() {};
    Fab.prototype.check = noopFunc;
    Fab.prototype.clearEvent = noopFunc;
    Fab.prototype.emitEvent = noopFunc;
    Fab.prototype.on = function (a, b) {
      if (!a) {
        b();
      }
      return this;
    };
    Fab.prototype.onDetected = noopThis;
    Fab.prototype.onNotDetected = function (a) {
      a();
      return this;
    };
    Fab.prototype.setOption = noopFunc;
    Fab.prototype.options = {
      set: noopFunc,
      get: noopFunc,
    };
    var fab = new Fab();
    var getSetFab = {
      get() {
        return Fab;
      },
      set() {},
    };
    var getsetfab = {
      get() {
        return fab;
      },
      set() {},
    };
    if (Object.prototype.hasOwnProperty.call(window, 'FuckAdBlock')) {
      window.FuckAdBlock = Fab;
    } else {
      Object.defineProperty(window, 'FuckAdBlock', getSetFab);
    }
    if (Object.prototype.hasOwnProperty.call(window, 'BlockAdBlock')) {
      window.BlockAdBlock = Fab;
    } else {
      Object.defineProperty(window, 'BlockAdBlock', getSetFab);
    }
    if (Object.prototype.hasOwnProperty.call(window, 'SniffAdBlock')) {
      window.SniffAdBlock = Fab;
    } else {
      Object.defineProperty(window, 'SniffAdBlock', getSetFab);
    }
    if (Object.prototype.hasOwnProperty.call(window, 'fuckAdBlock')) {
      window.fuckAdBlock = fab;
    } else {
      Object.defineProperty(window, 'fuckAdBlock', getsetfab);
    }
    if (Object.prototype.hasOwnProperty.call(window, 'blockAdBlock')) {
      window.blockAdBlock = fab;
    } else {
      Object.defineProperty(window, 'blockAdBlock', getsetfab);
    }
    if (Object.prototype.hasOwnProperty.call(window, 'sniffAdBlock')) {
      window.sniffAdBlock = fab;
    } else {
      Object.defineProperty(window, 'sniffAdBlock', getsetfab);
    }
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
  function noopThis() {
    return this;
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
    preventFab.apply(this, updatedArgs);
  } catch (e) {
    console.log(e);
  }
}

export default preventFab;