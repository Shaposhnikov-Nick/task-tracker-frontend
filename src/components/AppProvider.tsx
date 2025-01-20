import {FC, JSX, ReactNode} from 'react'
import {Container} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { ru } from "date-fns/locale";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

type AppProviderProps = {
    children: ReactNode
}

const AppProvider: FC<AppProviderProps> = ({children}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
            {/* HEADER */}
            {/* BODY CONTENT */}
            <Container>
                {children}
            </Container>
            {/*/!* FOOTER *!/*/}
        </LocalizationProvider>
    )
}

export default AppProvider