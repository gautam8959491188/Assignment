import React, { useEffect, useState } from 'react'
import moment from 'moment';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';

const ShowItem = () => {
    const [itemData, setItemData] = useState([]);
    
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const records = itemData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(itemData.length / recordsPerPage);
    const numbers = [...Array(npage + 1).keys()].slice(1)
    const [startDate, setStartDate] = useState(new Date);
    const [endDate, setEndDate] = useState(new Date);
    const [record,setRecord] = useState(records);
    const[defaultSearch, setDefaultSearch] = useState(false);
    useEffect(()=>{
    getAllItem();
          
    },[]);
    const getAllItem = async() => {
        await fetch("http://localhost:5000/getAllItem",{
            method:"GET"
        })
        .then((res)=>res.json())
        .then((data)=>{
            console.log(data, "itemData");
            setItemData(data.data);
          
            
        });
    }
    console.log(search);

    const nextPage = () => {
      if(currentPage !== npage)
      {
        setCurrentPage(currentPage + 1)
      }
    }

    const prevPage = () => {
      if(currentPage !== 1)
        {
          setCurrentPage(currentPage - 1)
        }
    }

    const changeCurrentPage = (id) => {
      setCurrentPage(id)
    }

    const selectionRange = {
      startDate: startDate,
      endDate: endDate,
      key: 'selection',
    }
    const handleSelect = (date) => {
      setDefaultSearch(true);
      console.log(date);
      let filtered = records.filter((product)=>{

        let productDate = new Date(product.date)
        console.log("Date:  "+productDate)
        return(
          productDate >= date.selection.startDate &&
          productDate <= date.selection.endDate 
        )
      })
      setStartDate(date.selection.startDate)
      setEndDate(date.selection.endDate)
      console.log(filtered)
      setRecord(filtered)
    }

  return (
    <div>
      <h1>Items List</h1>
      <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      /><br />
      <input type='text' placeholder='Search Item' className='border border-black m-2 p-1' onChange={(e)=>{setSearch(e.target.value)}}/>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
            <th className='px-6 py-3'>Model</th>
            <th className='px-6 py-3'>Item Name</th>
            <th className='px-6 py-3'>Price</th>
            <th className='px-6 py-3'>Description</th>
            <th className='px-6 py-3'>Date</th>
            </tr>
        </thead>
        <tbody>
            {

            defaultSearch?
              
                record.filter((item)=> {
                  
                    return search.toLowerCase() === '' ? item : item.itemName.toLowerCase().includes(search);
                    

                    
                 
                }).map((item)=>(
                    <tr key={item._id}>
                    <td>{item.model}</td>
                    <td >{item.itemName}</td>
                    <td>{item.price}</td>
                    <td>{item.description}</td>
                    <td>{moment(item.date).utc().format('DD-MM-YYYY')}</td> 
                    </tr>
                )):
                
              
                  records.filter((item)=> {
                    
                      return search.toLowerCase() === '' ? item : item.itemName.toLowerCase().includes(search);
                      
  
                      
                   
                  }).map((item)=>(
                      <tr key={item._id}>
                      <td className='px-6 py-3'> {item.model}</td>
                      <td className='px-6 py-3'>{item.itemName}</td>
                      <td className='px-6 py-3'>{item.price}</td>
                      <td className='px-6 py-3'>{item.description}</td>
                      <td className='px-6 py-3'>{moment(item.date).utc().format('DD-MM-YYYY')}</td> 
                      </tr>
                  ))
              
            }



        </tbody>
      </table>
      <nav aria-label="Page navigation example"> 
        <ul className="inline-flex -space-x-px text-sm">
            <li>
              <a href='#' className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' onClick={prevPage}>Previous Page</a>
            </li>
            {

              numbers.map((n,i)=>(
                <li className={`${currentPage === n ? "active" : ""}`} key={i}>
                    <a href='#' className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' onClick={()=>changeCurrentPage(n)}>{n}</a>
                </li>
              ))
            }
             <li className=''>
              <a href='#' className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white' onClick={nextPage}>Next Page</a>
            </li>
        </ul>
      </nav>
    </div>
  )
}


export default ShowItem
