export const fetchProducts = async () => {
    try {
        const { data } = await fetch("./adidas.json");
        console.log(data)
    } catch (error) {
        throw new Error('Something Wrong', { cause: error })
    }
}
