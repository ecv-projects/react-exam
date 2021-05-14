
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveArticles
} from "../../actions/articles";
import ArticleCard from '../../components/ArticleCard'


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
    const { articles } = this.props;
    const lastThree = articles.slice(Math.max(articles.length - 3, 0));

    return (
      <div>
        <div className="container-home">
          <h4>Last 3 articles ...</h4>
          <ul className="list-group">
            {lastThree &&
              lastThree.map((article, index) => (
                <li className="list-group-item " key={index}>
                  <ArticleCard  article={article} />
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