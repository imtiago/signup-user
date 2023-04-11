import React from 'react'

import MuiAlert, { AlertProps } from '@mui/material/Alert'

interface IAlertCustom extends AlertProps {
    message: string
}
const AlertCustom = React.forwardRef<HTMLDivElement, IAlertCustom>(
    function Alert(props, ref) {
        return (
            <MuiAlert elevation={6} ref={ref} variant="filled" {...props}>
                {props.message}
            </MuiAlert>
        )
    }
)

export default AlertCustom
