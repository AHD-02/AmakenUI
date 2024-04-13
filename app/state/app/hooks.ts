import { useTypedSelector } from "../store";

export const isLoading: () => boolean = () => {
    const user: boolean = useTypedSelector(state => state.app.isLoading);
    return user;
};