import Cosmwasm from '@/cosmos/cosm-wasm'
import { useEffect } from 'react'


const Index = () => {
  const cos: Cosmwasm = new Cosmwasm()
  const test = async () => {
    const client = await cos.test()
  }
  useEffect(() => {
    test()
  }, [])
  return <div className='flex flex-col items-center py-2'>test</div>
}

export default Index
