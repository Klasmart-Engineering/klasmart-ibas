import Footer from './Footer'
import Header from './Header'

const LayoutWrapper = ({ children }) => {
  return (
    <>
      {/* <div className="flex flex-col max-w-3xl px-4 mx-auto sm:px-6 xl:max-w-5xl xl:px-0 min-h-screen"> */}
      <Header />
      <main className="mb-auto w-full min-h-full overflow-x-hidden">{children}</main>
      <Footer />
    </>
  )
}

export default LayoutWrapper
