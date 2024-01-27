/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
const House = ({ house }) => {
  const { name, address, city, bedrooms, bathrooms, rentPerMonth, roomSize } =
    house

  return (
    <div>
      <h1>{name}</h1>
      <h1>{rentPerMonth}</h1>
    </div>
  )
}
export default House
