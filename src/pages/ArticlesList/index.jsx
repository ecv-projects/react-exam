
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveArticles
} from "../../actions/articles";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import Button from "../../components/Button"
import Quantity from "../../components/Quantity"
import ArticleCard from "../../components/ArticleCard"

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
          <p>Select an article to see more...</p>
          <div className="col-md-6 selected-article">
          {currentArticle ? (
            <div>
              <h4>Article selected</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentArticle.name}
              </div>
              <div className="product-image" style={{backgroundImage: "url(" + currentArticle.image + ")"}}>
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
              <Quantity />
              <Button text="Add to cart" />
            </div>
          ) : (
            <div>
            </div>
          )}
        </div>
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
                  <ArticleCard article={article} />
                    <Link
                      to={"/articles/edit/" + article.id}
                      className="btn btn-warning edit-button"
                    >
                      Edit
                    </Link>
                  <div>
                </div>
              </li>
              ))}
          </ul>
        </div>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
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