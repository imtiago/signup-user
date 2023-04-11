import React from 'react'
import { ThemeProvider } from '@mui/material'
import theme from '../settings/theme'

interface IThemeProviderCustom {
    children: React.ReactNode
}

const ThemeProviderCustom = ({ children }: IThemeProviderCustom) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeProviderCustom
