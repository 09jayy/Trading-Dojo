import { useContext } from "react";
import { signedInContext } from "../../../AppContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { Logo } from "../../../components/Logo";
import { Pressable } from "react-native";

export const SignTemplate = ({children}) => {
    const {setSignedIn} = useContext(signedInContext)

    return (
        <SafeAreaView>
            <Pressable onLongPress={()=>setSignedIn(true)}>
                <Logo size={0.6} debug={true}/>
            </Pressable>
            {children}
        </SafeAreaView>
    )
}