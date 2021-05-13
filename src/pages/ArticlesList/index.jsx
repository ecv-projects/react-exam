
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveArticles
} from "../../actions/articles";
import { Link } from "react-router-dom";

class ArticlesList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveArticle = this.setActiveArticle.bind(this);

    this.state = {
      articles: [],
      currentArticle: null,
      currentIndex: -1
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

  setActiveArticle(article, index) {
    this.setState({
      currentArticle: article,
      currentIndex: index,
    });
  }

  render() {
    const { currentArticle, currentIndex } = this.state;
    const { articles } = this.props;

    return (
      <div>
        <div>
          <h4>Articles List</h4>
          <ul className="list-group">
            {articles &&
              articles.map((article, index) => (
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
                    <label>
                      <strong>Description:</strong>
                    </label>{" "}
                    {article.description}
                  </div>
                  <div>
                    <label>
                      <strong>Price:</strong>
                    </label>{" "}
                    {article.price} € 
                  </div>

                    <Link
                      to={"/articles/" + article.id}
                      className="btn btn-warning"
                    >
                      Edit
                    </Link>
                  <div>
                </div>
              </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentArticle ? (
            <div>
              <h4>Article</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentArticle.name}
              </div>
              <div class="product-image" style={{backgroundImage: "url(" + currentArticle.image + ")"}}>
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentArticle.description}
              </div>
              <div>
                <label>
                  <strong>Price:</strong>
                </label>{" "}
                {currentArticle.price} € 
              </div>
              
              <div>
              </div>

              <Link
                to={"/articles/" + currentArticle.id}
                className="btn btn-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
            </div>
          )}
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
  })(ArticlesList);