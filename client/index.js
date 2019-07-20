import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(()=>{
      document.body.classList.add('noScroll');
      document.querySelector("#search-banner > header > div > div > div > div.col-9 > div").classList.add('launchSearchBar')
      document.querySelector("#search-banner > header > div > div > div > div.col-9 > div > form > div > div.container.dropdown-menu").classList.add('launchDropDown')
      document.querySelector("#search-banner > header > div > div > div > div.col-3").classList.add('launchDepartments');
    },300)
    console.log('Proxy Script Loaded!')
    window.addEventListener('product', () => {
      setTimeout(()=>{
        document.getElementById('proxyContainer').style.display = 'none';
        document.getElementById('overviewContainer').style.display = 'block';
        document.getElementById('descriptionContainer').style.display = 'block';
        document.getElementById('carouselContainer').style.display = 'block';
        document.querySelector("#search-banner > header > div > div > div > div.col-9 > div").classList.remove('launchSearchBar')
        document.querySelector("#search-banner > header > div > div > div > div.col-9 > div > form > div > div.container.dropdown-menu").classList.remove('launchDropDown')
        document.querySelector("#search-banner > header > div > div > div > div.col-3").classList.remove('launchDepartments');
        document.body.classList.remove('noScroll');
      },200)
    })
  }


  render() {
    return (
      <div id='hero'>
        <div class="position-img-outer">
          <div class="position-img-inner">
            <img src="https://lowesproject.s3.amazonaws.com/banner-home-desk_v2.jpg" class="position-img" alt="img" style={{ height: "895px"}} />
          </div>
          </div>
      </div>
    );
  }
}

let domContainer = document.querySelector('#appProxy');
ReactDOM.render(<App />, domContainer);