import Head from 'next/head'
import { useAuth } from '../app/context/AuthContex'
import FormApplication from '../compponents/applications/FormApplication'
import Header from '../compponents/Header'
import Login from '../compponents/Login'

export default function index() {
	const { currentUser } = useAuth()

	return (
		<>
		<div>
		</div>
			<Head>
				<title>Delivery</title>
				<div>
        </div>
			</Head>
			<Header></Header>
			{!currentUser && <Login />}
			{currentUser && <FormApplication />}
		</>
	)
}
