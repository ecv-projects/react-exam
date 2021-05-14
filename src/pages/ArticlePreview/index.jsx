import React from "react";
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  retrieveArticles
} from "../../actions/articles";

const ArticlePreview = () => {
  let { id } = useParams();
  const [article, setArticle] = useState();
  console.log('id', id)

  // retrieveArticles();

  // useEffect(() => {
  //   const currentArticle = articles.find(article => article.id === parseInt(id, 10));
  //   setArticle(currentArticle);
  // }, [id])

//   return (
// //     <div className="w-1/3 m-6 flex flex-col items-center py-5 h-50 border cursor-pointer">
// //       <h4>{article.name}</h4>
// //       <div className="product-image" style={{backgroundImage: "url(" + article.image + ")"}}>
// //       </div>
// //       <div>
// //         <label>
// //           <strong>Price:</strong>
// //         </label>{" "}
// //         {article.price} € 
// //       </div>
// //     </div>
//   )
}

ArticlePreview.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
}

export default ArticlePreview;