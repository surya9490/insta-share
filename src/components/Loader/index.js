import Loader from 'react-loader-spinner'

function LoaderView() {
  return (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )
}

export default LoaderView
