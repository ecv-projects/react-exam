
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

  refreshData() {
    this.setState({
      currentArticle: null,
      currentIndex: -1,
    });
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
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveArticle(article, index)}
                  key={index}
                >
                  <h4>Article</h4>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {article.name}
                  </div>
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