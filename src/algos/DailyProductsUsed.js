const getDailyProductUsed = (product) => {
    if (!product || typeof product !== 'string') return '';
  
    // Remove all spaces from the input
    const cleanedProduct = product.replace(/\s+/g, '');
  
    return cleanedProduct;
  };
  
  export default getDailyProductUsed;
  