import React from "react"
import { useParams } from "react-router-dom"

function Product(props) {
  const { id } = useParams()

  const product = props.prodData.find((product) => {
    return product._id === id
  })

  return (
    <div className="product-page">
      <img src={product && product.imgURL} />
      <div className="product-info">
        <h1>{product && product.name}</h1>
        <h3>{product && "$" + product.price}</h3>
        <p> {product && product.description}</p>
      </div>
    </div>
  )
}

export default Product