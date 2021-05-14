
import React, { Component } from "react";
import { useHistory } from 'react-router-dom'
import { connect } from "react-redux";
import {
  retrieveArticles,
  findArticlesByName,
  findArticleById
} from "../../actions/articles";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import ArticleCard from "../ArticleCard"

class ArticlesList extends Component {
  constructor(props) {
    super(props);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveArticle = this.setActiveArticle.bind(this);
    this.findByName = this.findByName.bind(this);
    this.findById = this.findById.bind(this);


    this.state = {
      articles: [],
      currentArticle: null,
      currentIndex: -1,
      searchName: "",
      searchId: ""
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

  onChangeSearchName(e) {
    const searchName = e.target.value;

    console.log('searchName',searchName)

    // this.setState({
    //   searchName: searchName,
    // });
  }

  
  findByName() {
    this.refreshData();

    this.props.findArticlesByName(this.state.searchName);
  }

  findById() {
    this.refreshData();

    this.props.findArticleById(this.state.searchId);
  }

  render() {
    const { searchName, searchId, currentArticle, currentIndex } = this.state;
    const { articles } = this.props;
    //const history = useHistory();

    return (
      <div>
        <div>
          <h4>Articles List</h4>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByName}
              >
                Search
              </button>
            </div>
          </div>
          <ul className="list-group">
            {articles &&
              articles.map((article, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  // onClick={() => this.setActiveArticle(article, index)}
                  // onClick={() =>
                  //   {
                  //     history.push(`/articles/${article.id}`);
                  //     const article = article;

                  //   } 
                  // }
                  key={index}
                >
                  <ArticleCard article={article} />
                  <div className="action-edit">
                    <Link
                      to={"/articles/edit/" + article.id}
                      className="btn btn-warning"
                    >
                      Edit
                    </Link>
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
    retrieveArticles,
    findArticlesByName,
    findArticleById
  })(ArticlesList);