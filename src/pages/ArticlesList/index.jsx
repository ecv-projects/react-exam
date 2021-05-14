
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveArticles
} from "../../actions/articles";
import { Link } from "react-router-dom";
import Button from "../../components/Button"
import Quantity from "../../components/Quantity"
import ArticleCard from "../../components/ArticleCard"

class ArticlesList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveArticle = this.setActiveArticle.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      articles: [],
      currentArticle: null,
      currentIndex: -1,
      currentPage: 1,
      articlesPerPage: 3
    };
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
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
    const { currentArticle, currentIndex, currentPage, articlesPerPage } = this.state;
    const { articles } = this.props;

    // Logic for displaying todos
    const indexOfLastTodo = currentPage * articlesPerPage;
    const indexOfFirstTodo = indexOfLastTodo - articlesPerPage;
    const visibleArticles = articles.slice(indexOfFirstTodo, indexOfLastTodo);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(articles.length / articlesPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          onClick={this.handleClick}
          class="page-item page-link mt-2"
        >
        {number}
        </li>
      );
    });

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
            {visibleArticles &&
              visibleArticles.map((article, index) => (
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
          <ul id="page-numbers" class="pagination">
            {renderPageNumbers}
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
  })(ArticlesList);