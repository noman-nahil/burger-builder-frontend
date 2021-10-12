import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Button } from 'reactstrap';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
]

const BuildControl = props => {
    return (
        <div className="d-flex">
            <div className="mr-auto ml-5" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{props.label}</div>
            <Button className="btn btn-danger btn-sm m-1" onClick={props.removeIngredientHandler}>-</Button>
            <Button className="btn btn-success btn-sm m-1" onClick={props.addIngredientdHandler}>+</Button>
        </div>
    )
}
const Controls = props => {
    return (
        <div className="container ml-md-5" style={{ textAlign: "center" }}>
            <Card style={{ marginTop: "30px", marginBottom: "30px", textAlign: "center" }}>
                <CardHeader style={{ backgroundColor: "#D70F64", color: "white" }}><h4>Add Ingredients</h4></CardHeader>
                <CardBody>
                    {
                        controls.map(item => {
                            return <BuildControl
                                addIngredientdHandler={() => props.addIngredientdHandler(item.type)}
                                removeIngredientHandler={() => props.removeIngredientHandler(item.type)}
                                label={item.label}
                                type={item.type}
                                key={Math.random()}
                            />
                        })
                    }
                </CardBody>
                <CardFooter><h5>Price: <strong>{props.price}</strong> BDT</h5></CardFooter>
                <Button disabled={!props.purchaseAble} onClick={props.toggleModal} style={{ backgroundColor: "#D70F64" }}>Order Now</Button>
            </Card>
        </div>
    )
}

export default Controls;

