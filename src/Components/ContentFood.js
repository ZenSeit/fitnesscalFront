import React from 'react'
import Food from './Food';
import '../Stylesheets/contentfood.css'

export const ContentFood = ({dataFood, updateDataRel,deleteFood,messageNoData,clickDiv,getData,Button1,Button2,refresh}) => {

    const fDay = dataFood.map((fDay) => {
        return (
          <Food
            key={fDay.id}
            id={fDay.id}
            name={fDay.fd?.name ?? fDay.name}
            quantity={
              fDay.formQuantity
                ? `${fDay.quantityuser} units`
                : `${(fDay?.quantityuser) ?? (fDay.referenceQuantity===1 ? fDay.referenceQuantity+" unit":fDay.referenceQuantity+" g")}`
            }
            description={fDay.fd?.description ?? fDay.description}
            day={fDay.day}
            updateFood={updateDataRel}
            delButton={deleteFood}
            clickDiv={clickDiv}
            getData={getData}
            Button1={Button1}
            Button2={Button2}
            refresh={refresh}
          />
        );
      });


  return (
    <div className="content--food">
            {fDay.length === 0 ? <h4>{messageNoData}</h4> : fDay}
          </div>
  )
}
