import React from "react";
import { connect } from "react-redux";
import { createArticle } from "../../actions/articles";

// class AddArticle extends Component {
//   constructor(props) {
//     super(props);
//     this.onChangeName = this.onChangeName.bind(this);
//     this.onChangeImage = this.onChangeImage.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.onChangePrice = this.onChangePrice.bind(this);
//     this.saveArticle = this.saveArticle.bind(this);
//     this.newArticle = this.newArticle.bind(this);

//     this.state = {
//       id: null,
//       name: "",
//       image: "",
//       description: "",
//       price: "",
//       published: false,
//       submitted: false
//     };
//   }

//   onChangeName(e) {
//     this.setState({
//       name: e.target.value,
//     });
//   }

//   onChangeImage(e) {
//     this.setState({
//       image: e.target.value,
//     });
//   }

//   onChangeDescription(e) {
//     this.setState({
//       description: e.target.value,
//     });
//   }

//   onChangePrice(e) {
//     this.setState({
//       price: e.target.value,
//     });
//   }

//   saveArticle() {
//     const { name, image, description, price } = this.state;

//     this.props
//       .createArticle(name, image, description, price)
//       .then((data) => {
//         this.setState({
//           id: data.id,
//           name: data.name,
//           image: image.name,
//           description: data.description,
//           price: data.price,
//           published: data.published,
//           submitted: true
//         });
//         console.log(data);
//       })
//       .catch((e) => {
//         console.log(e);
//       });
//   }

//   newArticle() {
//     this.setState({
//       id: null,
//       name: "",
//       image: "",
//       description: "",
//       price: "",
//       published: false,
//       submitted: false
//     });
//   }

//   render() {
//     return (
//       <div className="submit-form">
//         {this.state.submitted ? (
//           <div>
//             <h4>You submitted successfully!</h4>
//             <button className="btn btn-success" onClick={this.newArticle}>
//               Add
//             </button>
//           </div>
//         ) : (
//           <div>
//             <div className="form-group">
//               <label htmlFor="name">Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 required
//                 value={this.state.name}
//                 onChange={this.onChangeName}
//                 name="name"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="image">Image</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="image"
//                 required
//                 value={this.state.image}
//                 onChange={this.onChangeImage}
//                 name="image"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="description"
//                 required
//                 value={this.state.description}
//                 onChange={this.onChangeDescription}
//                 name="description"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="price">Price</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="price"
//                 required
//                 value={this.state.price}
//                 onChange={this.onChangePrice}
//                 name="price"
//               />
//             </div>

//             <button onClick={this.saveArticle} className="btn btn-success">
//               Submit
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   }
// };

import { useState } from 'react'
import Button from '../../components/Button'
import Textarea from '../../components/Textarea'
import Input from '../../components/Input'
import Banner from '../../components/Banner'

const AddArticle = () => {
  const [displayBanner, setDisplayBanner] = useState(false)
  const [fields, setFields] = useState({
    name: '',
    image: '',
    description: '',
    price: '0.00'
  })
  // setFields({
  //   id: null,
  //   name: "",
  //   image: "",
  //   description: "",
  //   price: "",
  //   published: false,
  //   submitted: false
  // })

  const handleChangeField = ({ target: { name, value } }) => {
    setFields({ 
      ...fields, 
      [name]: value
    })
  }

  const closeBanner = () => setDisplayBanner(false)

  const submitForm = (e, ...fields) => {
    e.preventDefault();
    const checkRequired = Object.keys(fields).find(key => fields[key] === '')
    if (checkRequired || fields.price === '0.00') {
      return;
    }
    setDisplayBanner(true)
    // setFields({
    //   name: '',
    //   image: '',
    //   description: '',
    //   price: '0.00'
    // })
    setFields({
      id: fields.id,
      name: fields.name,
      image: fields.image,
      description: fields.description,
      price: fields.price,
      published: fields.published,
      submitted: true
    });
  }

  return (
    <>
      <form onSubmit={submitForm} className="w-2/3 mx-auto">
      {displayBanner && <Banner text="Article ajoute !" close={closeBanner} />}
        <Input 
          type="text"
          label="Name"
          id="name"
          name="name"
          className="mt-10"
          value={fields.name}
          handleChange={handleChangeField}
        />
        <Input 
          type="text"
          label="Image"
          id="image"
          name="image"
          className="mt-10"
          value={fields.image}
          handleChange={handleChangeField}
        />
        <Textarea 
          label="Description"
          id="description"
          name="description"
          value={fields.description}
          handleChange={handleChangeField}
        />      
        <Input 
          label="Price"
          id="price"
          name="price"
          type="number"
          value={fields.price}
          handleChange={handleChangeField}
        />
        <Button type="submit" text="Add article" />
      </form>
    </>
  )
}

//export default AddArticle;

export default connect(null, { createArticle })(AddArticle);