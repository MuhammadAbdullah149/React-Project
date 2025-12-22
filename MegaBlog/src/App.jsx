import { useEffect, useState } from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {useDispatch} from 'react-redux'
import authServices from './appwrite-services/auth'
import {login , logout} from './store/authSlice'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authServices.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>{
      setLoading(false)
    })
  },[])



  return !loading? (
    <div className='min-h-screen flex flex-wrap justify-center content-center bg-gray-300'>
      <div className='w-full block text-center'>
        <Header/>
        <main>
          TODO :{/* <Outlet/> */}
        </main>
        <Footer/>
      </div>
    </div>
  ): null

}

export default App
