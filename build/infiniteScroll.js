'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var defaultHeight = 24; //树节点行高
var loadBuffer = 3; //缓冲区数据量
var defaultRowsInView = 10; //可视区数据量

var InfiniteScroll = function (_Component) {
  _inherits(InfiniteScroll, _Component);

  function InfiniteScroll(props) {
    _classCallCheck(this, InfiniteScroll);

    //默认显示20条，rowsInView根据定高算的。在非固定高下，这个只是一个大概的值。
    // this.rowsInView = defaultRowsInView;
    //一维数组
    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.eventListenerOptions = function () {
      var options = _this.props.useCapture;

      if (_this.isPassiveSupported()) {
        options = {
          useCapture: _this.props.useCapture,
          passive: true
        };
      }
      return options;
    };

    _this.mousewheelListener = function (e) {
      // Prevents Chrome hangups
      // See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
      if (e.deltaY === 1 && !_this.isPassiveSupported()) {
        e.preventDefault();
      }
    };

    _this.scrollListener = function () {
      var el = _this.scrollComponent;
      var currentIndex = _this.currentIndex;

      // const scrollEl = window;
      var parentNode = _this.getParentElement(el);

      _this.scrollTop = parentNode.scrollTop;
      console.log('===scrollTop===', _this.scrollTop);

      var index = 0;
      var tempScrollTop = _this.scrollTop;
      //根据 scrollTop 计算 currentIndex
      while (tempScrollTop > 0) {
        tempScrollTop -= defaultHeight;
        if (tempScrollTop > 0) {
          index += 1;
        }
      }

      //true 为向下滚动， false 为向上滚动
      var isScrollDown = index - currentIndex > 0 ? true : false;

      if (index < 0) index = 0;
      //如果之前的索引和下一次的不一样则重置索引和滚动的位置
      currentIndex = currentIndex !== index && index;
      console.log('currentIndex****', currentIndex);

      var rowsInView = Math.floor(parentNode.clientHeight / defaultHeight);

      // 向下滚动 下临界值超出缓存的endIndex则重新渲染
      if (isScrollDown && rowsInView + index > endIndex - rowDiff) {
        startIndex = index - loadBuffer > 0 ? index - loadBuffer : 0;
        // endIndex = startIndex + rowsInView + loadBuffer*2;
        endIndex = startIndex + loadCount;
        if (endIndex > data.length) {
          endIndex = data.length;
        }
        if (endIndex > _this.endIndex) {
          _this.startIndex = startIndex;
          _this.endIndex = endIndex;
          _this.setState({ needRender: !needRender });
        }
      }
      // 向上滚动，当前的index是否已经加载（currentIndex），若干上临界值小于startIndex则重新渲染
      if (!isScrollDown && index < startIndex + rowDiff) {
        startIndex = index - loadBuffer;
        if (startIndex < 0) {
          startIndex = 0;
        }
        if (startIndex < _this.startIndex) {
          _this.startIndex = startIndex;
          _this.endIndex = _this.startIndex + loadCount;
          _this.setState({ needRender: !needRender });
        }
        // console.log(
        //   "**index**" + index,
        //   "**startIndex**" + this.startIndex,
        //   "**endIndex**" + this.endIndex
        // );
      }

      // let offset;
      // if (this.props.useWindow) {
      //   const doc =
      //     document.documentElement || document.body.parentNode || document.body;
      //   const scrollTop =
      //     scrollEl.pageYOffset !== undefined
      //       ? scrollEl.pageYOffset
      //       : doc.scrollTop;
      //   if (this.props.isReverse) {
      //     offset = scrollTop;
      //   } else {
      //     offset = this.calculateOffset(el, scrollTop);
      //   }
      // } else if (this.props.isReverse) {
      //   offset = parentNode.scrollTop;
      // } else {
      //   offset = el.scrollHeight - parentNode.scrollTop - parentNode.clientHeight;
      // }

      // Here we make sure the element is visible as well as checking the offset
      // if (
      //   offset < Number(this.props.threshold) &&
      //   (el && el.offsetParent !== null)
      // ) {
      //   this.detachScrollListener();
      //   this.beforeScrollHeight = parentNode.scrollHeight;
      //   this.beforeScrollTop = parentNode.scrollTop;
      // Call loadMore after detachScrollListener to allow for non-async loadMore functions
      //   if (typeof this.props.loadMore === 'function') {
      //     this.props.loadMore((this.pageLoaded += 1));
      //     this.loadMore = true;
      //   }
      // }
    };

    _this.treeList = props.treeList;
    //一次加载多少数据
    // this.loadCount = loadBuffer ? this.rowsInView + loadBuffer * 2 : 16; 
    //可视区第一条数据的 index
    _this.currentIndex = 0;
    _this.startIndex = _this.currentIndex; //数据开始位置
    _this.endIndex = _this.currentIndex + _this.loadCount; //数据结束位置
    return _this;
  }

  InfiniteScroll.prototype.componentDidMount = function componentDidMount() {
    this.options = this.eventListenerOptions();
    this.attachScrollListener();
  };

  InfiniteScroll.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.props.isReverse && this.loadMore) {
      var parentElement = this.getParentElement(this.scrollComponent);
      parentElement.scrollTop = parentElement.scrollHeight - this.beforeScrollHeight + this.beforeScrollTop;
      this.loadMore = false;
    }
    this.attachScrollListener();
  };

  InfiniteScroll.prototype.componentWillUnmount = function componentWillUnmount() {
    this.detachScrollListener();
    this.detachMousewheelListener();
  };

  InfiniteScroll.prototype.isPassiveSupported = function isPassiveSupported() {
    var passive = false;

    var testOptions = {
      get passive() {
        passive = true;
      }
    };

    try {
      document.addEventListener('test', null, testOptions);
      document.removeEventListener('test', null, testOptions);
    } catch (e) {
      // ignore
    }
    return passive;
  };

  // Set a defaut loader for all your `InfiniteScroll` components
  InfiniteScroll.prototype.setDefaultLoader = function setDefaultLoader(loader) {
    this.defaultLoader = loader;
  };
  /**
   * 解除mousewheel事件监听
   */


  InfiniteScroll.prototype.detachMousewheelListener = function detachMousewheelListener() {
    var scrollEl = window;
    if (this.props.useWindow === false) {
      scrollEl = this.scrollComponent.parentNode;
    }

    scrollEl.removeEventListener('mousewheel', this.mousewheelListener, this.options ? this.options : this.props.useCapture);
  };
  /**
   * 解除scroll事件监听
   */


  InfiniteScroll.prototype.detachScrollListener = function detachScrollListener() {
    var scrollEl = window;
    if (this.props.useWindow === false) {
      scrollEl = this.getParentElement(this.scrollComponent);
    }

    scrollEl.removeEventListener('scroll', this.scrollListener, this.options ? this.options : this.props.useCapture);
    scrollEl.removeEventListener('resize', this.scrollListener, this.options ? this.options : this.props.useCapture);
  };
  /**
   * 获取父组件(用户自定义父组件或者当前dom的parentNode)
   * @param {*} el 
   */


  InfiniteScroll.prototype.getParentElement = function getParentElement(el) {
    var scrollParent = this.props.getScrollParent && this.props.getScrollParent();
    if (scrollParent != null) {
      return scrollParent;
    }
    return el && el.parentNode;
  };

  InfiniteScroll.prototype.filterProps = function filterProps(props) {
    return props;
  };
  /**
   * 绑定scroll事件
   */


  InfiniteScroll.prototype.attachScrollListener = function attachScrollListener() {
    var parentElement = this.getParentElement(this.scrollComponent);

    if (!parentElement) {
      return;
    }

    var scrollEl = parentElement;
    var scrollY = scrollEl && scrollEl.clientHeight;

    //默认显示20条，rowsInView根据定高算的。在非固定高下，这个只是一个大概的值。
    this.rowsInView = scrollY ? Math.floor(scrollY / defaultHeight) : defaultRowsInView;

    scrollEl.addEventListener('mousewheel', this.mousewheelListener, this.options ? this.options : this.props.useCapture);
    scrollEl.addEventListener('scroll', this.scrollListener, this.options ? this.options : this.props.useCapture);
    scrollEl.addEventListener('resize', this.scrollListener, this.options ? this.options : this.props.useCapture);

    if (this.props.initialLoad) {
      this.scrollListener();
    }
  };
  /**
   * 
   */


  InfiniteScroll.prototype.calculateOffset = function calculateOffset(el, scrollTop) {
    if (!el) {
      return 0;
    }

    return this.calculateTopPosition(el) + (el.offsetHeight - scrollTop - window.innerHeight);
  };

  InfiniteScroll.prototype.calculateTopPosition = function calculateTopPosition(el) {
    if (!el) {
      return 0;
    }
    return el.offsetTop + this.calculateTopPosition(el.offsetParent);
  };

  InfiniteScroll.prototype.render = function render() {
    var _this2 = this;

    var renderProps = this.filterProps(this.props);

    var children = renderProps.children,
        element = renderProps.element,
        hasMore = renderProps.hasMore,
        initialLoad = renderProps.initialLoad,
        isReverse = renderProps.isReverse,
        loader = renderProps.loader,
        loadMore = renderProps.loadMore,
        pageStart = renderProps.pageStart,
        ref = renderProps.ref,
        threshold = renderProps.threshold,
        useCapture = renderProps.useCapture,
        useWindow = renderProps.useWindow,
        getScrollParent = renderProps.getScrollParent,
        treeList = renderProps.treeList,
        props = _objectWithoutProperties(renderProps, ['children', 'element', 'hasMore', 'initialLoad', 'isReverse', 'loader', 'loadMore', 'pageStart', 'ref', 'threshold', 'useCapture', 'useWindow', 'getScrollParent', 'treeList']);

    props.ref = function (node) {
      _this2.scrollComponent = node;
      if (ref) {
        ref(node);
      }
    };

    var childrenArray = [children];
    // if (hasMore) {
    //   if (loader) {
    //     isReverse ? childrenArray.unshift(loader) : childrenArray.push(loader);
    //   } else if (this.defaultLoader) {
    //     isReverse
    //       ? childrenArray.unshift(this.defaultLoader)
    //       : childrenArray.push(this.defaultLoader);
    //   }
    // }
    return _react2["default"].createElement(element, props, childrenArray);
  };

  return InfiniteScroll;
}(_react.Component);

InfiniteScroll.propTypes = {
  children: _propTypes2["default"].node.isRequired,
  element: _propTypes2["default"].node,
  hasMore: _propTypes2["default"].bool,
  initialLoad: _propTypes2["default"].bool,
  isReverse: _propTypes2["default"].bool,
  loader: _propTypes2["default"].node,
  loadMore: _propTypes2["default"].func.isRequired,
  pageStart: _propTypes2["default"].number,
  ref: _propTypes2["default"].func,
  getScrollParent: _propTypes2["default"].func,
  threshold: _propTypes2["default"].number,
  useCapture: _propTypes2["default"].bool,
  useWindow: _propTypes2["default"].bool,
  //=====
  treeList: _propTypes2["default"].array
};
InfiniteScroll.defaultProps = {
  element: 'div',
  hasMore: false,
  initialLoad: true,
  pageStart: 0,
  ref: null,
  threshold: 250,
  useWindow: true,
  isReverse: false,
  useCapture: false,
  loader: null,
  getScrollParent: null,
  //=====
  treeList: []
};
exports["default"] = InfiniteScroll;
module.exports = exports['default'];