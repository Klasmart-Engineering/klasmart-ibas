import { useRouter } from 'next/dist/client/router'
import { useForm } from 'react-hook-form'
import { setCookie } from '../../lib/utils/cookies'
import { api } from '../../lib/utils/requests'

const SigninPage = () => {
  const { register, handleSubmit } = useForm()
  const router = useRouter()

  const onSubmit = (values) => {
    api()
      .post('auth/local', {
        identifier: values.email,
        password: values.password,
      })
      .then((res) => {
        setCookie('_kdslp_dash', res.data.jwt)
        router.push('/admin')
      })
      .catch((err) => {
        console.log(err)
        // formMethods.setError("email", {
        //   type: "manual",
        //   message: "Your email and password do not match",
        // });
        // setSubmitting(false);
      })
  }

  return (
    <div className="flex items-center justify-center h-screen w-full">
      <div className="rounded p-4 min-w-[320px] shadow-lg">
        <h1 className="text-center font-bold text-xl mb-6">DASHBOARD</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm mb-1 px-2" htmlFor="name">
              Email
            </label>
            <input
              required
              className="w-full bg-transparent border rounded px-2 py-1"
              id="name"
              name="email"
              type="email"
              placeholder="Email"
              {...register('email')}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1 px-2" htmlFor="password">
              Password
            </label>
            <input
              required
              className="w-full bg-transparent border rounded px-2 py-1"
              id="password"
              name="pasword"
              type="password"
              placeholder="Password"
              {...register('password')}
            />
          </div>
          <div>
            <button className="w-full bg-blue-400 text-white px-2 py-1 rounded">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SigninPage
