import React from 'react'
import '../Stylesheets/infofood.css'


export default function InfoFood({food}) {


  return (
    <>
    {food && <div className='summary--food'>
        <div>
            <h3>{food?.name}</h3>
        </div>
        <div className='factsSummary--food'>
            <h4>Protein: {food.proteinQGr} g</h4>
            <h4>Carbs: {food.carbsQGr} g</h4>
            <h4>Fat: {food.fatQGr} g</h4>
        </div>
        <div>
            <h5>Reference Quantity: {food.referenceQuantity} g</h5>
        </div>
        <div>
            <h5>Description</h5>
            {food.description}
        </div>
    </div>}
    </>
    
  )
}
