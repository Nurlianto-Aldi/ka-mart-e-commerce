import Image from "next/image";

interface ProductDetail {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

interface ProductCardProps {
  productDetail: ProductDetail
}

const ProductCard: React.FC<ProductCardProps> = ({productDetail}) => {
  
  return (
    <div
      className="h-full flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl"
    >

      {/* image */}
      <div
        className="relative w-full h-64 p-4 bg-gray-100"
      >
        <Image
          src={productDetail.image}
          fill
          style={{objectFit: "contain"}}
          alt={productDetail.title} 
          sizes="(max-width: 768px) 100vw,
                 (max-width: 1200px) 50vw, 33vw"  
        />
      </div>

      {/* title, price, desc */}
      <div
        className="flex flex-col grow p-6 lg:p-4"
      >
        
        {/* title */}
        <h2
          className="font-semibold text-lg text-gray-900 mb-2 truncate"
          title={productDetail.title}
        >
          {productDetail.title}
        </h2>

        {/* description */}
        <p
          className="text-sm text-gray-600 mb-4 grow overflow-hidden line-clamp-3"
        >
          {productDetail.description}
        </p>

        {/* price */}
        <span
          className="text-2xl font-bold text-indigo-600"
        >
          ${productDetail.price}
        </span>
      </div>


    </div>
  )
}

export default ProductCard;