import Image from 'next/image';
import { notFound } from 'next/navigation'; // Recommended for 404/missing ID
import Link from 'next/link';

interface ProductPageProps {
  params: {
    id: string;
  }
}

const getSingleProduct = async (id: string ) => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store"
    })

    if(!response.ok) {
      console.error(`Failed to fetch product ${id}. Status: ${response.status}`);
      return undefined; 
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(`Failed to do fetch operation : ${error}`)
    return undefined
  }
}

const ProductPage = async (props: ProductPageProps) => {

  // --- CRITICAL FIX HERE ---
    // Destructure the params object, which is wrapped in a promise.
    // By placing the entire expression in parentheses and using 'await',
    // we force Next.js/React to resolve the proxy before accessing its content.
    const { id } = await props.params; 
    // If your TypeScript compiler complains, try: const { id } = props.params as any; 
    
    // Fallback if the ID is still missing (which it shouldn't be now)
    if (!id) {
        // Use Next.js notFound() for proper 404 response
        return notFound(); 
    }

    const productId = id as string;
    const product = await getSingleProduct(productId);

  // const { id } = params; 

  // 2. Add an immediate check (since the ID is now definitely resolved or undefined)
  // if (!id) {
    // This should no longer happen if the route is correct, but it's safe.
    // return <h1>Error: Product ID is missing.</h1>;
  // }

  // console.log("-----------------------------------------");
  // console.log("Full params object:", params); // Log the full object
  // console.log("-----------------------------------------");

  // const productId = params.id as string;

  // if (!productId) {
  //   // If somehow the ID is missing, we must use a fallback or notFound
  //   console.error("Error: Dynamic ID is missing from URL parameters.");
  //   // This is the cleanest way to handle a missing parameter in Next.js
  //   // You would need to import { notFound } from 'next/navigation'
  //   // notFound(); 
  //   return <h1>Error: Product ID is missing.</h1>;
  // }

  // // CRITICAL DEBUG STEP
  // console.log("-----------------------------------------");
  // console.log("Current URL Segment (params.id):", params.id);
  // console.log("Type of params.id:", typeof params.id);
  // console.log("-----------------------------------------");
  
  // const product = await getSingleProduct(id)

  // if(!product) {
  //   return <div><h1>Sorry, the page is not found</h1></div>
  // }

  // console.log(product)

  return (
    <main>

      
      <div
        className='flex flex-col h-screen'
      >

        {/* Breadcrumb */}
        <nav className="flex mb-4 pt-8 pl-4" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <span className="text-gray-400 mx-2">/</span>
            </li>
            <li>
                <Link href="/" className="text-gray-500 hover:text-gray-700">
                  Home
                </Link>
            </li>
            <li>
              <span className="text-gray-400 mx-2">/</span>
            </li>
            <li>
                <Link href="/products" className="text-gray-500 hover:text-gray-700">
                  Products
                </Link>
              <span className="text-gray-400 mx-2">/</span>
            </li>
            <li>
              <span className="text-gray-900">{product.title}</span>
            </li>
          </ol>
        </nav>

        <div
        className='flex flex-row h-screen'
        >
          {/* product content section */}
          <div
            className='flex flex-col w-3/4 p-4 self-start gap-8         '
          >
            <div
              className='flex p-4 gap-8 outline-2 outline-gray-200 rounded-xl          '
            >

              {/* image section */}
              <div
                className='flex w-1/3 self-start relative aspect-square bg-gray-50 rounded-xl overflow-hidden'
              >
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className='object-contain p-6'
                  priority
                  sizes='(max-width: 768px) 100vw, 50vw'
                />
              </div>

              {/* description section */}
              <div
              className='w-full'
              >

                {/* rating */}
                <div className="flex items-center mb-4">
                  <span className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
                    {product.category}
                  </span>
                  <div className="ml-4 flex items-center text-sm text-yellow-500">
                    {'★'.repeat(Math.round(product.rating.rate))}
                    <span className="ml-2 text-gray-500">
                      ({product.rating.count} reviews)
                    </span>
                  </div>
                </div>  

                {/* title */}
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                  {product.title}
                </h1>

                <div className="flex items-baseline mb-6">
                  <span className="text-3xl md:text-4xl font-bold text-indigo-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="ml-3 text-sm text-gray-500">USD</span>
                </div>

                <div className="prose prose-sm text-gray-500 mb-8">
                  <p>{product.description}</p>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">Highlights</h3>
                  <ul className="space-y-3 text-sm text-gray-500">
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Premium Quality
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Fast Shipping
                    </li>
                    <li className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      30-Day Return Policy
                    </li>
                  </ul>
                </div>

              </div>


            </div>

            <div
              className='flex w-full'
            >
              <div
                className='flex flex-col outline-2 outline-gray-200 rounded-xl p-4 w-full'
              >
                <div>
                  <h1
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4"
                  >
                    Similar Product
                  </h1>
                </div>
              </div>
            </div>
          </div>

          {/* add to cart section */}
          <div
            className='flex w-1/4 p-4'
          >
            <div
              className='flex flex-col p-4 rounded-xl w-full h-auto outline-2 outline-gray-200 '
            >
              <div className="space-y-4 ">
                <div
                  className='flex flex-row px-8 py-4 rounded-xl font-medium items-center justify-between border-2 border-gray-200'
                >
                  <span
                    className='cursor-pointer'
                  >-</span>
                  <span
                    className='cursor-pointer'
                  >3</span>
                  <span
                    className='cursor-pointer'
                  >+</span>
                </div>
                <button className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform ">
                  Add to Cart
                </button>
                <button className="w-full bg-white text-gray-900 px-8 py-4 rounded-xl font-medium border-2 border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-all duration-300">
                  Add to Wishlist
                </button>
              </div>

            </div>

          </div>

        </div>


      </div>
    </main>
  )
}

export default ProductPage;




















// <main className="min-h-screen bg-white py-12">
//   <div className="w-full mx-auto bg-amber-200 px-4 sm:px-6 lg:px-8">

//     {/* Breadcrumb */}
//     <nav className="flex mb-8" aria-label="Breadcrumb">
//       <ol className="flex items-center space-x-2">
//         <li>
//           <span className="text-gray-400 mx-2">/</span>
//         </li>
//         <li>
//             <Link href="/" className="text-gray-500 hover:text-gray-700">
//               Home
//             </Link>
//         </li>
//         <li>
//           <span className="text-gray-400 mx-2">/</span>
//         </li>
//         <li>
//             <Link href="/products" className="text-gray-500 hover:text-gray-700">
//               Products
//             </Link>
//           <span className="text-gray-400 mx-2">/</span>
//         </li>
//         <li>
//           <span className="text-gray-900">{product.title}</span>
//         </li>
//       </ol>
//     </nav>


//     {/* product image and description */}
//     <div className="bg-amber-400 rounded-2xl shadow-lg overflow-hidden">

//       <h1>kajdjadjasd</h1>


//       <div className="bg-amber-600 md:grid md:grid-cols-3 md:gap-8">
        
//         {/* Product Image Section */}
//         <div className="p-6 md:p-8 lg:p-10">
//           <div className="relative aspect-square w-full bg-gray-50 rounded-xl overflow-hidden">
//             <Image 
//               src={product.image}
//               alt={product.title}
//               fill
//               className="object-contain p-6"
//               priority
//               sizes="(max-width: 768px) 100vw, 50vw"
//             />
//           </div>
//         </div>

//         {/* Product Details Section */}
//         <div className="p-6 md:p-8 lg:p-10">
//           <div className="mb-8">
//             <div className="flex items-center mb-4">
//               <span className="px-3 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
//                 {product.category}
//               </span>
//               <div className="ml-4 flex items-center text-sm text-yellow-500">
//                 {'★'.repeat(Math.round(product.rating.rate))}
//                 <span className="ml-2 text-gray-500">
//                   ({product.rating.count} reviews)
//                 </span>
//               </div>
//             </div>
            
//             <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
//               {product.title}
//             </h1>
            
//             <div className="flex items-baseline mb-6">
//               <span className="text-3xl md:text-4xl font-bold text-indigo-600">
//                 ${product.price.toFixed(2)}
//               </span>
//               <span className="ml-3 text-sm text-gray-500">USD</span>
//             </div>

//             <div className="prose prose-sm text-gray-500 mb-8">
//               <p>{product.description}</p>
//             </div>

//             {/* <div className="space-y-4">
//               <button className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02]">
//                 Add to Cart
//               </button>
//               <button className="w-full bg-white text-gray-900 px-8 py-4 rounded-xl font-medium border-2 border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-all duration-300">
//                 Add to Wishlist
//               </button>
//             </div> */}

//             <div className="mt-8 pt-8 border-t border-gray-200">
//               <h3 className="text-sm font-medium text-gray-900 mb-4">Highlights</h3>
//               <ul className="space-y-3 text-sm text-gray-500">
//                 <li className="flex items-center">
//                   <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                   </svg>
//                   Premium Quality
//                 </li>
//                 <li className="flex items-center">
//                   <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                   </svg>
//                   Fast Shipping
//                 </li>
//                 <li className="flex items-center">
//                   <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                   </svg>
//                   30-Day Return Policy
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>

//     {/* add to cart button */}
//     <div
//       className="bg-red-400 rounded-2xl shadow-lg overflow-hidden"
//     >
//       <div
//         className="bg-red-700 md:grid md:grid-cols-1 md:gap-8"
//       >
//         <div className="space-y-4 ">
//           <button className="w-full bg-indigo-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02]">
//             Add to Cart
//           </button>
//           <button className="w-full bg-white text-gray-900 px-8 py-4 rounded-xl font-medium border-2 border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-all duration-300">
//             Add to Wishlist
//           </button>
//         </div>
//       </div>
//     </div>

//       </div>
//     </div>



//   </div>
// </main>