import { useMemo } from "react";
import { useTypedSelector } from "../store";
import { useColorScheme } from "react-native";

export const useTheme = () => {
    const colorScheme = useColorScheme();
    const theme = useTypedSelector(state => state.user.theme);
    return useMemo(() => theme ? theme : colorScheme ?? 'light', [theme]);
};

export const useUserInfo = () => {
    const user = useTypedSelector(state => state.user.userModel);
    return useMemo(() => user, [user]);
}

export const useIsLoggedIn = () => {
    const token = useTypedSelector(state => state.user.accessToken);
    return useMemo(() => Boolean(token), [token]);
}

export const useIsEventSaved = (id: string) => {
    const user = useTypedSelector(state => state.user.userModel);
    return useMemo(() => user?.savedEvents?.includes(id ?? ''), [user, id]) ?? false;
}