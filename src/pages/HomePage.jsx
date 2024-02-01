import FileUploadForm from '../components/FileUploadForm'
import Houses from '../components/Houses'

const HomePage = () => {
  return (
    <>
      <h1 className='text-4xl font-bold '>HomePage</h1>
      <Houses />
      <FileUploadForm />
    </>
  )
}
export default HomePage
