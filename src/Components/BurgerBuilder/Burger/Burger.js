import React from 'react';
import Ingredient from '../Ingredient/Ingredient';
import './Burger.css';

const Burger = props => {
    let ingredientsArr = props.ingredients.map(item => {
        let amountArr = [...Array(item.amount).keys()];
        //console.log(amountArr);
        return amountArr.map(_ => {
            return <Ingredient type={item.type} key={Math.random()} />
        });
    })
        .reduce((arr, element) => {
            return arr.concat(element);
        }, []);
    if (ingredientsArr.length === 0) {
        ingredientsArr = <p>Please Add some ingredients</p>
    }
    return (
        <div className="Burger">
            <Ingredient type="bread-top" />
            {ingredientsArr}
            {/* <Ingredient type="Salad" /> */}
            <Ingredient type="bread-bottom" />
        </div>
    );
}
export default Burger;