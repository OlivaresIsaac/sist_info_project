import { useUserContext } from '../../contexts/UserContext'

export function ProfilePage() {
    const {user} = useUserContext()


    return (<div>
        <h1>Soy {user.displayName}</h1>
        
    </div>
    )
}
