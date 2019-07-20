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
    window.addEventListener('product', (e) => {
      localStorage.setItem('lowesMockProject_selectedProduct', e.detail.product_id);
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
        }, () => {
          // setting the launch page
          const { departmentMenu, searchBar, dropDown } = this.state.search;
          departmentMenu.classList.add('launchDepartments')
          searchBar.classList.add('launchSearchBar')
          dropDown.classList.add('launchDropDown')

          //if refershed, navigate back to product
          if (window.performance) {
            console.info("window.performance works fine on this browser");
            if (performance.navigation.type == 1) {
              let item = Number(localStorage.getItem('lowesMockProject_selectedProduct'));
              window.dispatchEvent(new CustomEvent('product',{detail: {product_id: item}}))
            } else {
              console.info("No Refersh");
            }
          }
        })
      },100)
  }
    window.addEventListener('product', () => {
      if(this.state.isFirstChoice) {
        this.fadeLaunchPage();
        this.toggleScrollLock();
      } else {
        requestAnimationFrame(() => {
          this.toggleProductPage();
          this.fadeProductPage();
        })
      }
        if(this.state.isFirstChoice) {
          setTimeout(()=>{
          this.toggleProductPage();
          this.toggleProxy();
          this.resetSearchBannerItems();
          setTimeout(() => {
            this.fadeProductPage();
            this.setState({isFirstChoice : false});
          }, 50);
        },500)
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

  resetSearchBannerItems() {
    const { departmentMenu, searchBar, dropDown } = this.state.search;
    searchBar.classList.remove('launchSearchBar')
    dropDown.classList.remove('launchDropDown')
    departmentMenu.classList.remove('launchDepartments');
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