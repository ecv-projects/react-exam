import React, { Component } from "react";
import { connect } from "react-redux";
import { updateArticle, deleteArticle } from "../../actions/articles";
import ArticleDataService from "../../services/article.service";

class Article extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.getArticle = this.getArticle.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeArticle = this.removeArticle.bind(this);

    this.state = {
      currentArticle: {
        id: null,
        name: "",
        image: "",
        description: "",
        price: "",
        published: false,
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getArticle(this.props.match.params.id);
  }

  onChangeImage(e) {
    const image = e.target.value;

    this.setState(function (prevState) {
      return {
        currentArticle: {
          ...prevState.currentArticle,
          image: image,
        },
      };
    });
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentArticle: {
          ...prevState.currentArticle,
          name: name,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentArticle: {
        ...prevState.currentArticle,
        description: description,
      },
    }));
  }

  onChangePrice(e) {
    const price = e.target.value;

    this.setState(function (prevState) {
      return {
        currentArticle: {
          ...prevState.currentArticle,
          price: price,
        },
      };
    });
  }

  getArticle(id) {
    ArticleDataService.get(id)
      .then((response) => {
        this.setState({
          currentArticle: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateArticle(this.state.currentArticle.id, this.state.currentArticle)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The article was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeArticle() {
    this.props
      .deleteArticle(this.state.currentArticle.id)
      .then(() => {
        this.props.history.push("/articles");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentArticle } = this.state;

    return (
      <div>
        {currentArticle ? (
          <div className="edit-form">
            <h4>Article</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentArticle.name}
                  onChange={this.onChangename}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Image</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentArticle.image}
                  onChange={this.onChangeImage}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentArticle.description}
                  onChange={this.onChangeDescription}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Price</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentArticle.price}
                  onChange={this.onChangePrice}
                />
              </div>
            </form>

            <button
              className="btn btn-danger mr-2"
              onClick={this.removeArticle}
            >
              Delete
            </button>

            <button
              type="submit"
              className="btn btn-light"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a article...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateArticle, deleteArticle })(Article);