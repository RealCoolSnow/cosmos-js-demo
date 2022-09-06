import Cosmwasm from '@/cosmos/cosm-wasm'
import { useEffect } from 'react'


const Index = () => {
  const cos: Cosmwasm = new Cosmwasm()
  const connect = async () => {
    const client = await cos.connect()
  }
  useEffect(() => {
    connect()
  }, [])
  return <div className='flex flex-col items-center py-2'>test</div>
}

export default Index
