export default class InfiniteScroll {

  constructor (element) {
    
    this._loadMore = () => {};

    element.addEventListener('scroll', (event) => {
      if (event.target.scrollTop + event.target.clientHeight >= event.target.scrollHeight) {
        this._loadMore();
      }
    });
  }

  /**
   * Callback loadMore
   * 
   * @param {Function} callback 
   */
  loadMore(callback) {
    if(typeof callback == 'function') {
      this._loadMore = callback;
    }
  }
}