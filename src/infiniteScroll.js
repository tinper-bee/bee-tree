import React, { Component } from 'react';
import PropTypes from 'prop-types';

const defaultHeight = 24; //树节点行高
const loadBuffer = 3; //缓冲区数据量
const defaultRowsInView = 10; //可视区数据量

export default class InfiniteScroll extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    element: PropTypes.node,
    hasMore: PropTypes.bool,
    initialLoad: PropTypes.bool,
    isReverse: PropTypes.bool,
    loader: PropTypes.node,
    loadMore: PropTypes.func.isRequired,
    pageStart: PropTypes.number,
    ref: PropTypes.func,
    getScrollParent: PropTypes.func,
    threshold: PropTypes.number,
    useCapture: PropTypes.bool,
    useWindow: PropTypes.bool,
    //=====
    treeList: PropTypes.array,
  };

  static defaultProps = {
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
    treeList: [],
  };

  constructor(props) {
    super(props);

    //默认显示20条，rowsInView根据定高算的。在非固定高下，这个只是一个大概的值。
    // this.rowsInView = defaultRowsInView;
    //一维数组
    this.treeList = props.treeList;
    //一次加载多少数据
    // this.loadCount = loadBuffer ? this.rowsInView + loadBuffer * 2 : 16; 
    //可视区第一条数据的 index
    this.currentIndex = 0;
    this.startIndex = this.currentIndex; //数据开始位置
    this.endIndex = this.currentIndex + this.loadCount; //数据结束位置
  }

  componentDidMount() {
    this.options = this.eventListenerOptions();
    this.attachScrollListener();
  }

  componentDidUpdate() {
    if (this.props.isReverse && this.loadMore) {
      const parentElement = this.getParentElement(this.scrollComponent);
      parentElement.scrollTop =
        parentElement.scrollHeight -
        this.beforeScrollHeight +
        this.beforeScrollTop;
      this.loadMore = false;
    }
    this.attachScrollListener();
  }

  componentWillUnmount() {
    this.detachScrollListener();
    this.detachMousewheelListener();
  }

  isPassiveSupported() {
    let passive = false;

    const testOptions = {
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
  }

  eventListenerOptions = () => {
    let options = this.props.useCapture;

    if (this.isPassiveSupported()) {
      options = {
        useCapture: this.props.useCapture,
        passive: true
      };
    }
    return options;
  }

  // Set a defaut loader for all your `InfiniteScroll` components
  setDefaultLoader(loader) {
    this.defaultLoader = loader;
  }
  /**
   * 解除mousewheel事件监听
   */
  detachMousewheelListener() {
    let scrollEl = window;
    if (this.props.useWindow === false) {
      scrollEl = this.scrollComponent.parentNode;
    }

    scrollEl.removeEventListener(
      'mousewheel',
      this.mousewheelListener,
      this.options ? this.options : this.props.useCapture
    );
  }
  /**
   * 解除scroll事件监听
   */
  detachScrollListener() {
    let scrollEl = window;
    if (this.props.useWindow === false) {
      scrollEl = this.getParentElement(this.scrollComponent);
    }

    scrollEl.removeEventListener(
      'scroll',
      this.scrollListener,
      this.options ? this.options : this.props.useCapture
    );
    scrollEl.removeEventListener(
      'resize',
      this.scrollListener,
      this.options ? this.options : this.props.useCapture
    );
  }
  /**
   * 获取父组件(用户自定义父组件或者当前dom的parentNode)
   * @param {*} el 
   */
  getParentElement(el) {
    const scrollParent =
      this.props.getScrollParent && this.props.getScrollParent();
    if (scrollParent != null) {
      return scrollParent;
    }
    return el && el.parentNode;
  }

  filterProps(props) {
    return props;
  }
  /**
   * 绑定scroll事件
   */
  attachScrollListener() {
    const parentElement = this.getParentElement(this.scrollComponent);

    if (!parentElement) {
      return;
    }

    let scrollEl = parentElement;
    let scrollY = scrollEl && scrollEl.clientHeight;

    //默认显示20条，rowsInView根据定高算的。在非固定高下，这个只是一个大概的值。
    this.rowsInView = scrollY ? Math.floor(scrollY / defaultHeight) : defaultRowsInView;

    scrollEl.addEventListener(
      'mousewheel',
      this.mousewheelListener,
      this.options ? this.options : this.props.useCapture
    );
    scrollEl.addEventListener(
      'scroll',
      this.scrollListener,
      this.options ? this.options : this.props.useCapture
    );
    scrollEl.addEventListener(
      'resize',
      this.scrollListener,
      this.options ? this.options : this.props.useCapture
    );

    if (this.props.initialLoad) {
      this.scrollListener();
    }
  }

  mousewheelListener = (e) => {
    // Prevents Chrome hangups
    // See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
    if (e.deltaY === 1 && !this.isPassiveSupported()) {
      e.preventDefault();
    }
  }
  /**
   * 
   */
  scrollListener = () => {
    const el = this.scrollComponent;
    let currentIndex = this.currentIndex,
        startIndex = this.startIndex,
        endIndex = this.endIndex;

    // const scrollEl = window;
    const parentNode = this.getParentElement(el);

    this.scrollTop = parentNode.scrollTop;
    console.log('===scrollTop===',this.scrollTop)

    let index = 0;
    let tempScrollTop = this.scrollTop;
    //根据 scrollTop 计算 currentIndex
    while (tempScrollTop > 0) {
      tempScrollTop -= defaultHeight;
      if (tempScrollTop > 0) {
        index += 1;
      }
    }

    //true 为向下滚动， false 为向上滚动
    const isScrollDown = index - currentIndex > 0 ? true : false;

    if (index < 0) index = 0;
    //如果之前的索引和下一次的不一样则重置索引和滚动的位置
    currentIndex = currentIndex !== index && index;
    console.log('currentIndex****', currentIndex);

    let rowsInView = Math.floor(parentNode.clientHeight/defaultHeight);
    {/* 
    // 向下滚动 下临界值超出缓存的endIndex则重新渲染
    if (isScrollDown && rowsInView + index > endIndex - rowDiff) {
      startIndex = index - loadBuffer > 0 ? index - loadBuffer : 0;
      // endIndex = startIndex + rowsInView + loadBuffer*2;
      endIndex = startIndex + loadCount;
      if (endIndex > data.length) {
        endIndex = data.length;
      }
      if (endIndex > this.endIndex ) {
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        this.setState({ needRender: !needRender });
      }
    }
    // 向上滚动，当前的index是否已经加载（currentIndex），若干上临界值小于startIndex则重新渲染
    if (!isScrollDown && index < startIndex + rowDiff) {
      startIndex = index - loadBuffer;
      if (startIndex < 0) {
        startIndex = 0;
      }
      if (startIndex < this.startIndex) {
        this.startIndex = startIndex;
        this.endIndex = this.startIndex + loadCount;
        this.setState({ needRender: !needRender });
      }
      // console.log(
      //   "**index**" + index,
      //   "**startIndex**" + this.startIndex,
      //   "**endIndex**" + this.endIndex
      // );
    }
    */}

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
  }

  calculateOffset(el, scrollTop) {
    if (!el) {
      return 0;
    }

    return (
      this.calculateTopPosition(el) +
      (el.offsetHeight - scrollTop - window.innerHeight)
    );
  }

  calculateTopPosition(el) {
    if (!el) {
      return 0;
    }
    return el.offsetTop + this.calculateTopPosition(el.offsetParent);
  }

  render() {
    const renderProps = this.filterProps(this.props);
    const {
      children,
      element,
      hasMore,
      initialLoad,
      isReverse,
      loader,
      loadMore,
      pageStart,
      ref,
      threshold,
      useCapture,
      useWindow,
      getScrollParent,
      treeList,
      ...props
    } = renderProps;

    props.ref = node => {
      this.scrollComponent = node;
      if (ref) {
        ref(node);
      }
    };

    const childrenArray = [children];
    // if (hasMore) {
    //   if (loader) {
    //     isReverse ? childrenArray.unshift(loader) : childrenArray.push(loader);
    //   } else if (this.defaultLoader) {
    //     isReverse
    //       ? childrenArray.unshift(this.defaultLoader)
    //       : childrenArray.push(this.defaultLoader);
    //   }
    // }
    return React.createElement(element, props, childrenArray);
  }
}
