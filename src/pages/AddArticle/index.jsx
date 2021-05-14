import React, { Component } from "react";
import { connect } from "react-redux";
import { createArticle } from "../../actions/articles";

class AddArticle extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.saveArticle = this.saveArticle.bind(this);
    this.newArticle = this.newArticle.bind(this);

    this.state = {
      id: null,
      name: "",
      image: "",
      description: "",
      price: "",
      date: new Date().toLocaleString(),
      published: false,
      submitted: false,
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeImage(e) {
    this.setState({
      image: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value,
    });
  }

  saveArticle() {
    const { name, image, description, price, date } = this.state;

    this.props
      .createArticle(name, image, description, price, date)
      .then((data) => {
        this.setState({
          id: data.id,
          name: data.name,
          image: image.name,
          description: data.description,
          price: data.price,
          published: data.published,
          date: data.date,
          submitted: true
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newArticle() {
    this.setState({
      id: null,
      name: "",
      image: "",
      description: "",
      price: "",
      published: false,
      submitted: false,
      date: new Date().toLocaleString()
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newArticle}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Image</label>
              <input
                type="text"
                className="form-control"
                id="image"
                required
                value={this.state.image}
                onChange={this.onChangeImage}
                name="image"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="text"
                className="form-control"
                id="price"
                required
                value={this.state.price}
                onChange={this.onChangePrice}
                name="price"
              />
            </div>
            {this.state.date}
            <button onClick={this.saveArticle} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createArticle })(AddArticle);