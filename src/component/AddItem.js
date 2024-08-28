
import React, {useState} from 'react'

const AddItem = () => {

    const handelInputChange = (index, event) => {
      const values = [...formData];
      values[index][event.target.name] = event.target.value
        setFormData(values);
      };
    
      const handelFormSubmit = (event) => {
        console.log("Length: "+formData.length);
        for(var i = 0; i<formData.length; i++)
        {
          if(formData[i].itemName == '' || formData[i].price == 0 || formData[i].description == '' || formData[i].model == '')
          {
            alert("Input field require.")
            return;
          }

          fetch("http://localhost:5000/addItem",{
            method:"POST",
            crossDomain: true,
            headers:{
                "Content-Type" : "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
                itemName: formData[i].itemName,
                price: formData[i].price,
                description: formData[i].description,
                model: formData[i].model,
                date: formData[i].date,
            })
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data, "itemAdded");
            
        });
        }
         window.location.reload();        
    }
const [formData, setFormData] = useState([{
    itemName: "",
    price: 0,
    description: "",
    model: "",
    date: Date,
  },
]);

const handleAddField = () => {
  setFormData([...formData,   {
    itemName: "",
    price: 0,
    description: "",
    model: "",
    date: Date,
  }])
}
  return (
    <div className='border border-gray-200 w-1/2 h-3/4 mt-32 shadow-xl bg-gradient-to-r from-green-100 ml-[370px]'>
     <form> 
     
     <center><h1  class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-5xl dark:text-white mt-2"><span class="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">Add Item</span></h1></center>
     <button type='button' onClick={()=> handleAddField()} className="ml-3 text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800">Add</button>
     {
      formData.map((inputField, index)=>(
        <div key={index}>
      <input type='text' placeholder='Item Name' onChange={event => handelInputChange(index, event)} id='itemName' name='itemName' value={inputField.itemName} className="m-2 p-1"  />
      <input type='number' placeholder='Price' value={inputField.price} id='price' name='price' className="m-2 p-1" onChange={event => handelInputChange(index, event)} />
      <input type='text' placeholder='Description' value={inputField.description} id='description' name='description' className="m-2 p-1" onChange={event => handelInputChange(index, event)} />
      <input type='text' placeholder='Model' value={inputField.image} id='model' name='model' className="m-2 p-1" onChange={event => handelInputChange(index, event)} />
      <input type='date' value={inputField.date} id='date' name='date' onChange={event => handelInputChange(index, event)} className='m-2 p-1'/>
        </div>
      ))
     }  
      
      <button onClick={()=> handelFormSubmit()} className="ml-3 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800">Save</button>
    </form>
    
    </div>
  )
}

export default AddItem
