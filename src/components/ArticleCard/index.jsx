import React from "react";
import PropTypes from 'prop-types'

const ArticleCard = ({ article }) => {
  return (
    <div className="cursor-pointer" >
      <h4>{article.name}</h4>
      <p>{article.description}</p>
      <div className="product-image" style={{backgroundImage: "url(" + article.image + ")"}}>
      </div>
      <div>
        <label>
          <strong>Price:</strong>
        </label>{" "}
        {article.price} € 
      </div>
    </div>
  )
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
}

export default ArticleCard;