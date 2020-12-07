import React, {useState, useContext} from "react"
import CartItem from "../components/CartItem"
import {Context} from "../Context"

function Cart() {
    const [buttonText, setButtonText] = useState("Place Order")
    const {cartItems, emptyCart} = useContext(Context)
    const cartItemElements = cartItems.map(item => <CartItem key={item.id} item={item} />)
    
    const itemCost = 5.99
    const totalCost = (cartItems.length * itemCost).toLocaleString("en-US", {style: "currency", currency: "USD"})
    
    function placeOrder() {
        setButtonText("Ordering...")
        setTimeout(() => {
            console.log("Order placed!")
            setButtonText("Place Order")
            emptyCart()
        }, 3000)
    }
    
    return (
        <main className="cart-page">
            <h1>Check out</h1>
            {cartItemElements}
            <p className="total-cost">Total: {totalCost}</p>
            {
                cartItems.length > 0 ?
                <div className="order-button">
                    <button onClick={() => placeOrder()}>{buttonText}</button>
                </div> :
                <p>You have no items in your cart.</p>
            }
        </main>
    )
}

export default Cart