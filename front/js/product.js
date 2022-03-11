
(async function (){
	const productId = getProductId()
	console.log(productId)
	
})()

function getProductId() {
	return new URL(location.href).searchParams.get("id");
}


