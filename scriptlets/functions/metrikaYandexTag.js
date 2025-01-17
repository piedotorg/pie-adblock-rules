function metrikaYandexTag(source, args) {
  function metrikaYandexTag(source) {
    var asyncCallbackFromOptions = function asyncCallbackFromOptions(id, param) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = options.callback;
      var ctx = options.ctx;
      if (typeof callback === 'function') {
        callback = ctx !== undefined ? callback.bind(ctx) : callback;
        setTimeout(function () {
          return callback();
        });
      }
    };
    var addFileExtension = noopFunc;
    var extLink = asyncCallbackFromOptions;
    var file = asyncCallbackFromOptions;
    var getClientID = function getClientID(id, cb) {
      if (!cb) {
        return;
      }
      setTimeout(cb(null));
    };
    var hitFunc = asyncCallbackFromOptions;
    var notBounce = asyncCallbackFromOptions;
    var params = noopFunc;
    var reachGoal = function reachGoal(id, target, params, callback, ctx) {
      asyncCallbackFromOptions(null, null, {
        callback: callback,
        ctx: ctx,
      });
    };
    var setUserID = noopFunc;
    var userParams = noopFunc;
    var destruct = noopFunc;
    var api = {
      addFileExtension: addFileExtension,
      extLink: extLink,
      file: file,
      getClientID: getClientID,
      hit: hitFunc,
      notBounce: notBounce,
      params: params,
      reachGoal: reachGoal,
      setUserID: setUserID,
      userParams: userParams,
      destruct: destruct,
    };
    function ym(id, funcName) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }
      return api[funcName] && api[funcName](id, ...args);
    }
    function init(id) {
      window['yaCounter'.concat(id)] = api;
      document.dispatchEvent(new Event('yacounter'.concat(id, 'inited')));
    }
    if (typeof window.ym === 'undefined') {
      window.ym = ym;
      ym.a = [];
    } else if (window.ym && window.ym.a) {
      ym.a = window.ym.a;
      window.ym = ym;
      window.ym.a.forEach(function (params) {
        var id = params[0];
        init(id);
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
    metrikaYandexTag.apply(this, updatedArgs);
  } catch (e) {
    console.log(e);
  }
}

export default metrikaYandexTag;
