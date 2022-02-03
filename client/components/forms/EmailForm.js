import Input from '@/components/fields/Input'
import Button from '@/components/button/Button'
import { useState } from 'react'
import { Oval, ThreeDots } from 'react-loading-icons'
// import { removeLocalStorageItem, setLocalStorageItem } from "@lib/utils/dom";

const EmailForm = ({ className, style }) => {
  const [email, setemail] = useState('')
  const [loading, setloading] = useState(false)

  const submitEmailForm = (e) => {
    // e.preventDefault();
    // if (loading) return;
    // const magic = buildMagicConnector(email);
    // setloading(true);
    // activate(magic, undefined, true).catch((error) => {
    //   // ignore the error if it's a user rejected request
    //   console.log(error);
    //   setloading(false);
    //   removeLocalStorageItem("_ase");
    // });
    // setLocalStorageItem("_ase", email);
  }

  return (
    <>
      <form
        onSubmit={submitEmailForm}
        style={style}
        className={`w-full rounded-lg shadow-lg dark:shadow-sm dark:bg-gray-900 overflow-hidden h-full ${className}`}
      >
        <section className="p-6 py-6">
          <h2 className="pb-1 text-xl block font-bold">Login with email</h2>
          <p className="pb-3 block text-gray-500 font-medium">
            Enter your email address below to start learning now!
          </p>
          <div className="grid grid-cols-4 flex items-center">
            <div className="col-span-4 relative">
              {loading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <ThreeDots stroke="#575BB8" fill="#575BB8" height={25} width={25} />
                </div>
              )}
              <Input
                value={email}
                type="email"
                name="email"
                label={'Receive'}
                onChange={(e) => setemail(e.currentTarget.value)}
                placeholder="example@gmail.com..."
              />
            </div>
          </div>
        </section>
        <footer className="p-6 py-3 w-full border-t-2 border-gray-100 bg-white">
          <Button type="submit" className="w-full text-center flex items-center justify-center">
            {loading ? (
              <ThreeDots stroke="#ffffff" fill="#ffffff" height={24} width={24} />
            ) : (
              'Login'
            )}
          </Button>
        </footer>
      </form>
    </>
  )
}

export default EmailForm
