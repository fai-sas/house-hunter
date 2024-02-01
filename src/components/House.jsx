/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const House = ({ house }) => {
  const {
    name,
    address,
    city,
    bedrooms,
    bathrooms,
    rentPerMonth,
    roomSize,
    image,
  } = house

  return (
    <div className='grid grid-cols-1 md:grid-cols-3'>
      <div>
        <img src={image} alt={name} />
        <h1>{name}</h1>
        <h1>{rentPerMonth}</h1>
      </div>
    </div>
  )
}
export default House
