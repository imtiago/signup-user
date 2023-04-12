import { MouseEvent, useState } from 'react'
import { object, string, InferType } from 'yup'
import { useForm } from 'react-hook-form'
import {
    Typography,
    Box,
    TextField,
    Button,
    List,
    ListItem,
    ListItemButton,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Stack,
    IconButton,
    Snackbar,
    AlertColor,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { yupResolver } from '@hookform/resolvers/yup'
import AlertCustom from './components/Alert'
import FormHelperText from '@mui/material/FormHelperText'

let createrUserSchema = object({
    name: string().required('O nome é obrigatório'),
    email: string().email().required('O e-mail é obrigatório'),
    password: string()
        .required('A senhe é obrigatório')
        .min(8, 'Minimo 8 digitos'),
})

type createrUser = InferType<typeof createrUserSchema>

function App() {
    const [users, setUsers] = useState<createrUser[]>([])
    const [showPassword, setShowPassword] = useState(false)
    const [alert, setAlert] = useState(false)
    const [severity, setSeverity] = useState<AlertColor>('success')
    const [message, setMessage] = useState('')

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<createrUser>({
        resolver: yupResolver(createrUserSchema),
    })

    const handleAlert = (message: string, severity: AlertColor) => {
        setSeverity(severity)
        setMessage(message)
        setAlert(true)
    }
    const handleCloseAlert = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }

        setAlert(false)
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }
    const checkUserExist = (user: createrUser) => {
        return users.some((u) => u.email === user.email)
    }
    const handlerCreate = (data: createrUser) => {
        const exist = checkUserExist(data)
        if (exist) return handleAlert('usuário ja cadastrado', 'error')
        setUsers((oldUsers) => [...oldUsers, data])
        handleAlert('usuário cadastrado com sucesso', 'success')
        reset()
    }
    const handlerDelete = (user: createrUser) => {
        const exist = checkUserExist(user)
        if (!exist) return handleAlert('usuário não cadastrado', 'error')
        setUsers((oldUsers) => oldUsers.filter((u) => u.email !== user.email))
        handleAlert('usuário deletado com sucesso', 'success')
    }
    return (
        <Box
            display="flex"
            flexDirection="column"
            minHeight={800}
            gap={2}
            alignItems={'center'}
            justifyContent={'center'}
        >
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
                p={2}
                border={1}
                borderRadius={1}
            >
                <Typography variant="h3" color="initial">
                    Cadastro de usuário
                </Typography>
                <form onSubmit={handleSubmit(handlerCreate)}>
                    <Stack direction="column" spacing={2}>
                        <TextField
                            error={!!errors.name}
                            type="text"
                            label="Nome"
                            {...register('name')}
                            helperText={errors.name?.message}
                        />
                        <TextField
                            error={!!errors.email}
                            type="text"
                            label="Email"
                            {...register('email')}
                            helperText={errors.email?.message}
                        />
                        <FormControl
                            variant="outlined"
                            error={!!errors.password}
                        >
                            <InputLabel htmlFor="password">Senha</InputLabel>
                            <OutlinedInput
                                {...register('password')}
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={
                                                handleMouseDownPassword
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                            <FormHelperText id="component-error-text">
                                {errors.password?.message}
                            </FormHelperText>
                        </FormControl>

                        <Button variant="contained" type="submit">
                            cadastrar
                        </Button>
                    </Stack>
                </form>
            </Box>
            <Box>
                <List
                    dense
                    sx={{
                        width: '100%',
                        maxWidth: 360,
                        bgcolor: 'background.paper',
                    }}
                >
                    {users.map((value, index) => {
                        const { name } = value
                        return (
                            <ListItem
                                key={index}
                                disablePadding
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        aria-label="delete"
                                        onClick={() => handlerDelete(value)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar alt={name} src="#" />
                                    </ListItemAvatar>
                                    <ListItemText primary={name} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
            <Snackbar
                open={alert}
                autoHideDuration={3000}
                onClose={handleCloseAlert}
            >
                <AlertCustom severity={severity} message={message} />
            </Snackbar>
        </Box>
    )
}

export default App
