import React, { useEffect, useState } from "react"


function Listado() {      
    const [list,setList] = useState([]);

    useEffect(()=>{
        fetchData();
    }, []);

    async function fetchData(){
        const url = 'https://api-v3-espaciosucm.onrender.com/api/v3/espaciosdeportivos/';
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ sessionStorage.getItem('access')
            },
        })
        .then(response => response.json())
        .then(json => setList(json))
        
    }
    console.log(list)
  return(
<div class="inline-block min-w-full py-2 sm:px-6 lg:px-8 relative overflow-x-auto  h-screen bg-[url(/src/assets/campus1.png)]">
    <table class="min-w-full text-sm text-left ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    UserID
                </th>
                <th scope="col" class="px-6 py-3">
                    ID
                </th>
                <th scope="col" class="px-6 py-3">
                    Nombre
                </th>
                <th scope="col" class="px-6 py-3">
                    Estado
                </th>
            </tr>
            {
                list.map(item =>(
                <tr key={item.id} class="bg-white dark:bg-gray-800">
                    <td class="px-6 py-4 dark:text-white border-b font-medium dark:border-neutral-500">{item.userId}</td>
                    <td class="px-6 py-4 dark:text-white border-b font-medium dark:border-neutral-500">{item.id}</td>
                    <td class="px-6 py-4 dark:text-white border-b font-medium dark:border-neutral-500">{item.nombre_espacio}</td>
                    <td class="px-6 py-4 dark:text-white border-b font-medium dark:border-neutral-500">{JSON.stringify(item.completed)}</td>
                </tr>
                ))
            }
            </table>
    </div>
  )
}
export default Listado