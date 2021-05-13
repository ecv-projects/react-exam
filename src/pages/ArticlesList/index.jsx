
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveArticles
} from "../../actions/articles";
import { Link } from "react-router-dom";

//import Pagination from "@material-ui/lab/Pagination";

class ArticlesList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveArticle = this.setActiveArticle.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handlePageSizeChange = this.handlePageSizeChange.bind(this);

    this.state = {
      articles: [],
      currentArticle: null,
      currentIndex: -1,
      searchName: "",

      page: 1,
      count: 0,
      pageSize: 3,
    };

    this.pageSizes = [3, 6, 9];
  }

  componentDidMount() {
    this.props.retrieveArticles();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
        searchName: searchName,
    });
  }


  getRequestParams(searchName, page, pageSize) {
    let params = {};

    if (searchName) {
      params["name"] = searchName;
    }

    if (page) {
      params["page"] = page - 1;
    }

    if (pageSize) {
      params["size"] = pageSize;
    }

    return params;
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

  removeAllArticles() {
    this.props
      .deleteAllArticles()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  handlePageChange(event, value) {
    this.setState(
      {
        page: value,
      },
      () => {
        this.retrieveArticles();
      }
    );
  }

  handlePageSizeChange(event) {
    this.setState(
      {
        pageSize: event.target.value,
        page: 1
      },
      () => {
        this.retrieveArticles();
      }
    );
  }

  render() {
    const { currentArticle, currentIndex } = this.state;
    const { articles } = this.props;

    return (
      <div className="list row">
        <div className="col-md-6">
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
                  {article.name}
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
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentArticle.published ? "Published" : "Pending"}
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
              <br />
              <p>Please click on an article...</p>
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