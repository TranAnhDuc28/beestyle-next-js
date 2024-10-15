import React from 'react'

const DetailCustomer = ({param}: {param: ICustomer}) => {
  return (
    <div>
        <p>FullName: {param.fullName}</p>
        <p>Email: {param.email}</p>
        <p>Phone Number: {param.phoneNumber}</p>
        <p>Password: {param.password}</p>
    </div>
  )
}

export default DetailCustomer