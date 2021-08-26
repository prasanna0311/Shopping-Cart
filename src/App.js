import React from "react";
import ReactStars from "react-rating-stars-component";
import "./App.css";
import Header from "./components/header/header.component";
import HeroMessage from "./components/hero/hero.component";
import SHOPPING_DATA from "./data";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      data: SHOPPING_DATA,
      cartCount: 0,
    };
  }

  ratingChanged = (newRating) => {
    console.log(newRating);
  };

  addToCart = (event) => {
    console.log(event.target.dataset.id);

    let index = parseInt(event.target.dataset.id);

    let tempData = this.state.data;
    tempData[index].cart = true;
    this.setState({ cartCount: this.state.cartCount + 1 });
    this.setState({ data: tempData });
  };

  removeFromCart = (event) => {
    let index = parseInt(event.target.dataset.id);

    let tempData = this.state.data;
    tempData[index].cart = false;

    if (this.state.cartCount > 0) {
      this.setState({ cartCount: this.state.cartCount - 1 });
    }

    this.setState({ data: tempData });
  };

  render() {
    return (
      <div className="App">
        <Header count={this.state.cartCount} />
        <HeroMessage />

        <div className="container">
          <div className="row">
            {this.state.data.map((item, index) => (
              <div
                key={item.id}
                className="col-12 col-sm-12 col-md-4 col-lg-4 pb-2 pt-2"
              >
                <div className="card" style={{ width: "18rem" }}>
                  <img
                    src="https://media.wired.com/photos/5c9040ee4950d24718d6da99/16:9/w_2400,h_1350,c_limit/shoppingcart-1066110386.jpg"
                    className="card-img-top"
                    alt="cartItem"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.price}$</p>
                    <p className="ps-5 ms-4">
                      <ReactStars
                        count={5}
                        value={item.rating}
                        onChange={this.ratingChanged}
                        size={24}
                        edit={false}
                        isHalf={true}
                        activeColor="#ffd700"
                        classNames="card-text"
                      />
                    </p>
                    {item.cart === false ? (
                      <button
                        className="btn btn-dark"
                        data-id={index}
                        onClick={(event) => this.addToCart(event)}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        data-id={index}
                        onClick={(event) => this.removeFromCart(event)}
                      >
                        Remove from cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <footer class="py-5 bg-dark">
          <div class="container">
            <p class="m-0 text-center text-white">Copyright © StarBootstraps</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default App;
