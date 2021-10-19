import React from 'react'

const order = props => {
    const ingredientSummary = props.order.ingredients.map(item => {
        return (
            <span style={{ border: "1px solid grey", borderRadius: "5px", padding: "5px", marginRight: "10px" }} key={item.type}>{item.amount}
                x <span style={{ textTransform: "capitalize" }}>{item.type}</span></span>
        )
    })

    console.log('Address:', props.order.customer)
    return (
        <div style={{ border: "1px solid grey", boxShadow: "1px 1px #888888", borderRadius: "5px", padding: "20px", margin: "10px" }} className="">
            <p>Order Number: {props.order._id}</p>
            <p>Delivery Address:  {props.order.customer.deliveryAddress}</p>
            <hr />
            {ingredientSummary}
            <hr />
            <p>Total : {props.order.price} BDT</p>
        </div>
    )
}

export default order;
