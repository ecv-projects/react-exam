import React from "react";
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

const ArticleCard = ({ article }) => {
  const history = useHistory();

  return (
    <div className="w-1/3 m-6 flex flex-col items-center py-5 h-50 border cursor-pointer" onClick={() => history.push(`/articles/${article.id}`)} >
      <h4>{article.name}</h4>
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