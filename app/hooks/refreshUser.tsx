import { useDispatch } from "react-redux"
import { useLazyGetUserQuery } from "../data/user"
import { setUser } from "../state/user/slice"

const RefreshUser = () => {
    const dispatch = useDispatch()
    const [refresh] = useLazyGetUserQuery()

    const handle = async() => {
        let res = await refresh()
        if(res.data)
            dispatch(setUser(res.data))
    }
    return {handle}
}

export default RefreshUser