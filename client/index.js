import React from 'react';
import ReactDOM from 'react-dom';
import LoadingOverlay from 'react-loading-overlay';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.body.classList.add('noScroll');
    window.onload = () => {
      setTimeout(()=>{
        document.querySelector("#search-banner > header > div > div > div > div.col-3").classList.add('launchDepartments')
        document.querySelector("#search-banner > header > div > div > div > div.col-9 > div").classList.add('launchSearchBar')
        document.querySelector("#search-banner > header > div > div > div > div.col-9 > div > form > div > div.container.dropdown-menu").classList.add('launchDropDown')
        
      },500)
      console.log('window loaded')
  }
    console.log('Proxy Script Loaded!')
    window.addEventListener('product', () => {
      document.getElementById('proxyContainer').classList.add('hideIT');
      document.getElementById('search-banner').classList.add('hideIT');
      setTimeout(()=>{
        document.getElementById('proxyContainer').classList.add('removeIT');
        document.getElementById('overviewContainer').classList.remove('removeIT');
        document.getElementById('bottomOfPage').classList.remove('removeIT');
        document.getElementById('descriptionContainer').classList.remove('removeIT');
        document.getElementById('carouselContainer').classList.remove('removeIT');
        document.querySelector("#search-banner > header > div > div > div > div.col-9 > div").classList.remove('launchSearchBar')
        document.querySelector("#search-banner > header > div > div > div > div.col-9 > div > form > div > div.container.dropdown-menu").classList.remove('launchDropDown')
        document.querySelector("#search-banner > header > div > div > div > div.col-3").classList.remove('launchDepartments');
        document.body.classList.remove('noScroll');
        setTimeout(() => {
          document.getElementById('search-banner').classList.remove('hideIT');
          document.getElementById('overviewContainer').classList.remove('hideIT');
          document.getElementById('bottomOfPage').classList.remove('hideIT');
          document.getElementById('descriptionContainer').classList.remove('hideIT');
          document.getElementById('carouselContainer').classList.remove('hideIT');
        },50)
      },500)
    })
  }


  render() {
    return (
      <div id='hero'>
        <div className="position-img-outer">
          <div className="position-img-inner">
            <img src="https://lowesproject.s3.amazonaws.com/banner-home-desk_v2.jpg" className="position-img" alt="img" style={{ height: "895px"}} />
          </div>
          </div>
      </div>
    );
  }
}

let domContainer = document.querySelector('#appProxy');
ReactDOM.render(<App />, domContainer);