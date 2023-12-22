import React from 'react'

function Table(props) {
    // const data = localStorage.getItem("myData")
    const data = JSON.parse(localStorage.getItem('myData'))
    console.log(data)
    const fieldNames = Object.keys(data[0]);
  return (
    <div>
         <table>
      <thead>
        <tr>
          {fieldNames.map((fieldName, index) => (
            <th key={index}>{fieldName}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            {fieldNames.map((fieldName, innerIndex) => (
              <td key={innerIndex}>{item[fieldName]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  )
}

export default Table