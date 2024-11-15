
const ProductCard = props => {
  const {productData} = props
  const {title,author, topic} = productData

  return (
    <li className="product-item">
      
      <h1 className="title">{title}</h1>
      <p className="brand">by {author}</p>
      
        <p className="price">Rs {topic}/-</p>
        
       
    
    </li>
  )
}
export default ProductCard