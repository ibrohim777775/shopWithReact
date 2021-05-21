import React, { useContext, useState, useEffect } from 'react';
import { IoClose } from "react-icons/io5";
import CounterForCard from "../Components/CounterForCard";
import { BasketContext } from '../context/basket';
import products from '../db/products';

import { StyledDiv, Btn } from '../Style/components/BasketListStyled';

const BasketList = () => {
  const { shopCart, setShopCart, deleteItem, display } = useContext(BasketContext);
  const [isTrue, setIsTrue] = useState(false)
  // let items = [];
  const [items, setItems] = useState([]);

  const fetchData = async (id) => {
    try {
      let dat = await fetch(`https://themealdb.p.rapidapi.com/lookup.php?i=${id}`, {
        "method": "GET",
        "headers": {
          "x-rapidapi-key": "3263a16283msh6bfe5b19d610724p10ba1ejsn213622b85edc",
          "x-rapidapi-host": "themealdb.p.rapidapi.com"
        }

      })
      dat.json().then(item => {
        let fake = items;
        fake.push(item.meals[0])
        setItems(fake);
        // setIsTrue(!isTrue);
        shopCart.length === items.length && setIsTrue(!isTrue);
        // console.log(item.meals[0], 'itemmmm')
        console.log(items, 'itemssss')
      })
      // console.log(dat.json().then, 'asyn')
    } catch (error) {
      console.log(error, 'errorrrr')
    }
    // fetch(`https://themealdb.p.rapidapi.com/lookup.php?i=${id}`, {
    //   "method": "GET",
    //   "headers": {
    //     "x-rapidapi-key": "3263a16283msh6bfe5b19d610724p10ba1ejsn213622b85edc",
    //     "x-rapidapi-host": "themealdb.p.rapidapi.com"
    //   }
    // })
    //     .then(response => response.json())
    //     .then(res => {
    //       let data = [res.meals[0]];
    //       // console.log(res.meals[0])
    //       console.log(data[0], 'dataaa');
    //       let arr = items.concat(data);
    //       setItems([...items, data[0]]);
    //       console.log(items, 'itemmm');
    //       // // console.log(res);
    //       // let newObj = res.meals[0];
    //       // let arr = items.concat(newObj)
    //       // setItems([...arr])
    //     })
    //     .catch(err => {
    //       console.error(err);
    //     });
    //   // return data;
  }
  const updateItems = () => {
    shopCart.map((item) => {
      fetchData(item.id);

      console.log(item.id, 'iddd')

    })
  }
  console.log(shopCart, ' savatcha')
  // console.log(items)
  useEffect(() => {
    updateItems();
  }, []);
  // useEffect(() => {
  //   updateItems();
  // }, [deleteItem]);
  // console.log(items, 'sdfsdfsd')

  return (
    <StyledDiv>
      <section className="shopping__items">
        <h1>Salom</h1>
        {items.map((item, index) => (
          <section key={index} className="shopping__product" style={{ display: { display } }}>
            <Btn  >
              <IoClose onClick={() => deleteItem(item.id)} className="product__remove-from" />
            </Btn>
            <section className="product__img">
              <img src={item.strMealThumb} />
            </section>
            <h4 className="product__title">{item.title}</h4>
            <CounterForCard
              id={item.id}
              // addCount={add}
              // removeCount={del}
              className="product__counter"
            />
            <h6 className="product__price">

              {item.price * shopCart.find(list => list.id === item.id)?.count} ₽
                </h6>
          </section>
        ))}
      </section>
    </StyledDiv>
  );
}

export default BasketList;
