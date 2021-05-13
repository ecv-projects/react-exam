
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveArticles
} from "../../actions/articles";

class LastThree extends Component {
  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    };

  }

  componentDidMount() {
    this.props.retrieveArticles();
  }

  render() {
    const { currentIndex } = this.state;
    const { articles } = this.props;
    const lastThree = articles.slice(Math.max(articles.length - 3, 0));

    return (
      <div>
        <div>
          <h4>3 derniers articles</h4>

          <ul className="list-group">
            {lastThree &&
              lastThree.map((article, index) => (
                <li
                  className={
                    "list-group-item "
                  }
                  key={index}
                >
                  <h4>{article.name}</h4>
                  <div class="product-image" style={{backgroundImage: "url(" + article.image + ")"}}>
                  </div>
                  <div>
                  </div>
                  <div>
                    <label>
                      <strong>Price:</strong>
                    </label>{" "}
                    {article.price} € 
                  </div>
                  <div>
                </div>
              </li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => {
    return {
      articles: state.articles,
    };
  };
  
  export default connect(mapStateToProps, {
    retrieveArticles
  })(LastThree);