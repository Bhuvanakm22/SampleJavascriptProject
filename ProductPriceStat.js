

console.log('SainsPriceStat');
const SainsApiUrl = "https://s3.eu-west-1.amazonaws.com/hackajob-assets1.p.hackajob/challenges/sainsbury_products/products.json";
let arrayResponseData;
// const contactForm = document.getElementById('contact-form');

// contactForm.addEventListener('submit', (event) => 
//     {
//         event.preventDefault();
//         const formData = new FormData(contactForm);
//         const requestOptions = {
//             method: 'POST',
//             body: formData,
//         };
//         fetch(apiUrl, requestOptions)
//         .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.text();
//         })
//         .then(data => {
//         responseMessage.textContent = data;
//         })
//         .catch(error => {
//         console.error('Error:', error);
//         });
//     }
// );

fetch(SainsApiUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        //alert("Network error");
        return response.json();
    })
    .then(data => {
        console.log(data);
        arrayResponseData=data;
        const product_uid = arrayResponseData[0].product_uid;
        const retail_price = arrayResponseData[0].retail_price.price;
        const reviews = arrayResponseData[0].reviews.total;
        const outputElement = document.getElementById('ProductPrice_response-message');
        outputElement.innerHTML = `<p>product id: ${product_uid}</br> Price: ${retail_price}</p>
                               <p>Reviews in total count: ${reviews}</p>
                               </br> JSON Formated outputs are </br> ${fnFindProducts(["66565","6447344","3052068","7511786"])}`;   
                                             
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Error");
    });
function fnFindProducts(ProductUids)
{
    
    // biome-ignore lint/style/useConst: <explanation>
    let lines=new Array();
    let total_item_count=0;
    let total =0.00;
    let subtot=0.00;
    for(const prodUId of ProductUids)
    {
        //lines= array of line item objects as defines below
        /* lines:
        {
         uid: unique product identifier
         quantity: Number of UIDs present in an input array. Integer i.e., in fnFindProducts(ProductUids)
         subtotal : Price of this quantity of the product. Float 
        } 
         total_item_count: Number of valid product uids in an input array. integer. This will be the same as sum of all quantities
         total : total retail price for all the valid products in an input array. float
         */
        let subtotal=0.00;

        const product= arrayResponseData.find(p=> p.product_uid===prodUId);
        if(product)
        {
            const quantity=ProductUids.filter(res=> res===prodUId).length;  
            subtotal=quantity * product.retail_price.price;
            /*Below can be possible if we're checking all the JSON data inputs
             const productsprice = arrayResponseData.filter((p)=>p.product_uid===prodUId)
             for(const item of productsprice)
                 {
                     subtotal+=item.retail_price.price;
                 } 
             */
                 const productsprice = arrayResponseData.filter((p)=>p.product_uid===prodUId)
                                        .map(item=>item.retail_price.price)

                                        subtot +=   productsprice.reduce((accumulater,currentvalue)=>   {
                                            accumulater+currentvalue
                                        });            
                                     console.log(subtot)
                                     
            lines.push({"uid":prodUId,"quantity":quantity,"subtotal":subtotal});
            total_item_count+=quantity;
            total+=subtotal;
            
        }

          
      
    }
    const finalProducts=[{
        "lines":lines,
        "total_item_count":total_item_count,
        "total":total
    }];

    return JSON.stringify(finalProducts);
}

