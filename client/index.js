import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search : {
        search: null,
        departmentMenu : null,
        searchBar: null,
        dropDown: null,
      },
      proxy : null,
      overview: null,
      description : null,
      carousel: null,
      footer : null,
      isFirstChoice: null,
      body : null,
      isFirstChoice : true
    }
  }

  componentDidMount() {
    //debugging Event Listeners
    this.debugEventListeners();

    //Browswer Route listener
    window.onpopstate = (e) => {
      console.log('browser rouote state:', e.state)
      if(e.state && e.state.product_id) {
        window.dispatchEvent(new CustomEvent('product', {detail:{product_id: e.state.product_id, browser_route: true}}))
      } else {
        this.fadeProductPage();
        setTimeout(() => {
          this.toggleProductPage();
          this.toggleScrollLock();
          this.toggleSearchBarAdjustments();
          setTimeout(() => {
            this.toggleProxy();
            window.requestAnimationFrame(()=> {
              this.fadeLaunchPage();
              this.setState({isFirstChoice: true})
            })
          }, 50);
        }, 550);
      }
    }

    // Product change Event Listener
    window.addEventListener('product', (e) => {
      const id = Number(e.detail.product_id);
        if(id < 1 || id > 100) {
          window.history.pushState({product_id: 0}, 'Welcome to Lowe\'s', '/')
          this.fadeProductPage();
          setTimeout(() => {
            this.toggleProductPage();
            this.toggleScrollLock();
            this.toggleSearchBarAdjustments();
            setTimeout(() => {
              this.toggleProxy();
              window.requestAnimationFrame(()=> {
                this.fadeLaunchPage();
                this.setState({isFirstChoice: true})
              })
            }, 50);
          }, 550);
        } else {
          localStorage.setItem('lowesMockProject_selectedProduct', id);
          if(!e.detail.browser_route) {
            window.history.pushState({product_id: id}, 'Lowe\'s product detail for item: ' + id, '/' + id)
          }
        }

    })
    // prevent body scrolling
    this.setState({body : document.body}, ()=> {
      setTimeout(() => {
        this.toggleScrollLock()
      }, 800)
    })

    //on window load
    window.onload = () => {
      // waiting for elements to render to DOM
      setTimeout(()=>{
        // saving elements to state
        this.setInitialState(() => {
          // setting the launch page
          this.toggleSearchBarAdjustments();

          //if refreshed, navigate back to product
          this.handlePageRefresh();
        })
      },500)
  }

  //Listen for Item Selections
    window.addEventListener('product', () => {
      //if item selected from the launch page
      if(this.state.isFirstChoice) {
        this.fadeLaunchPage();
        this.toggleScrollLock();
      } else {
        //if item selected from a product details page
        requestAnimationFrame(() => {
          this.toggleProductPage();
          this.fadeProductPage();
        })
      }
        if(this.state.isFirstChoice) {
          setTimeout(()=>{
          this.toggleProductPage();
          this.toggleProxy();
          this.toggleSearchBarAdjustments();
          setTimeout(() => {
            this.fadeProductPage();
            this.setState({isFirstChoice : false});
          }, 50);
        },550)
        } else {
          setTimeout(() => {
            this.toggleProductPage();
            setTimeout(() => {
              this.fadeProductPage();
            }, 50);
          }, 100);
        }      
    })
  }


  setInitialState(cb) {
    this.setState({
      search : {
        search: document.getElementById('search-banner'),
        departmentMenu : document.querySelector("#search-banner > header > div > div > div > div.col-3"),
        searchBar: document.querySelector("#search-banner > header > div > div > div > div.col-9 > div"),
        dropDown: document.querySelector("#search-banner > header > div > div > div > div.col-9 > div > form > div > div.container.dropdown-menu")
      },
      proxy : document.getElementById('proxyContainer'),
      overview : document.getElementById('overviewContainer'),
      description : document.getElementById('descriptionContainer'),
      carousel : document.getElementById('carouselContainer'),
      footer : document.getElementById('bottomOfPage'),
      isFirstChoice: true
    }, cb)
  }

  handlePageRefresh() {
    if (window.performance) {
      if (performance.navigation.type == 1) {
        let item = Number(localStorage.getItem('lowesMockProject_selectedProduct'));
        window.dispatchEvent(new CustomEvent('product',{detail: {product_id: item, browser_route: true}}))
      } else {
        console.info("No Refresh");
        if(window.location.pathname.length > 1) {
          let path = Number(window.location.pathname.split('/')[1]);
          if(path > 0 && path <= 100) {
            window.dispatchEvent(new CustomEvent('product',{detail: {product_id: path, browser_route: true}}))
          }   
        }
      }
    }
  }


  fadeLaunchPage() {
    this.state.proxy.classList.toggle('hideIT');
    this.state.search.search.classList.toggle('hideIT');
  }

  fadeProductPage() {
    const { search, overview, description, carousel, footer } = this.state;
    search.search.classList.toggle('hideIT');
    overview.classList.toggle('hideIT');
    description.classList.toggle('hideIT');
    carousel.classList.toggle('hideIT');
    footer.classList.toggle('hideIT');
  }

  toggleScrollLock() {
    this.state.body.classList.toggle('noScroll');
  }


  toggleProxy() {
    this.state.proxy.classList.toggle('removeIT');
    this.state.search.search.classList.toggle('removeIT');
  }

  toggleProductPage() {
    const { search, overview, footer, description, carousel } = this.state;
    search.search.classList.toggle('removeIT');
    overview.classList.toggle('removeIT');
    footer.classList.toggle('removeIT');
    description.classList.toggle('removeIT');
    carousel.classList.toggle('removeIT');
  }

  toggleSearchBarAdjustments() {
    const { departmentMenu, searchBar, dropDown } = this.state.search;
    searchBar.classList.toggle('launchSearchBar')
    dropDown.classList.toggle('launchDropDown')
    departmentMenu.classList.toggle('launchDepartments');
  }

  debugEventListeners() {
    window.addEventListener('product', (e)=> {console.log('product: ', e.detail)})
    window.addEventListener('favorite', (e)=> {console.log('favorite: ', e.detail)})
    window.addEventListener('loggedIn', (e)=> {console.log('loggedIn: ', e.detail)})
    window.addEventListener('loggedOut', (e)=> {console.log('loggedOut: ', e.detail)})
    window.addEventListener('stars', (e)=> {console.log('stars: ', e.detail)})
    window.addEventListener('cart', (e)=> {console.log('cart: ', e.detail)})
  }

  render() {
    return (
      <div id='hero'>
        <div className="position-img-outer">
          <div className="position-img-inner">
            <img src="https://lowesproject.s3.amazonaws.com/banner-home-desk_v2.jpg" className="position-img" alt="img" style={{ height: "95vh"}} />
          </div>
          </div>
      </div>
    );
  }
}

let domContainer = document.querySelector('#appProxy');
ReactDOM.render(<App />, domContainer);