import { Grid, styled, Box } from '@mui/material'
import React from 'react'
import { Button, Text, TextField } from '../../../components'
import { CardStyled } from '../../Login/Container_Old'

const HeaderStyled = styled(CardStyled)(({ theme }) => ({
    background: 'none',
    padding: '0 0 24px 0',
    [theme.breakpoints.down('md')]: {
        padding: '0 0 24px 0',
    }
}))

const ContainButton = styled('div')(({ theme }) => ({
    margin: 'auto',
    width: '250px',
    [theme.breakpoints.down('sm')]: {
        width: '100%'
    }
}))

const ForgotForm = ({
    control,
    formRules,
    onSubmit
}) => {

    return (
        <>
            <HeaderStyled >
                <Grid container>
                    <Grid item xs={6} md={12}>
                        <Text type="36" color="black" fontWeight={700}>FORGOT PASSWORD</Text>
                    </Grid>
                </Grid>
            </HeaderStyled>
            <CardStyled>
                <Grid container sx={{ marginTop: '-32px' }} >
                    <Grid item xs={12} md={12}>
                        <Box mt={4}>
                            <TextField
                                name="email"
                                control={control}
                                label="E-MAIL"
                                placeholder="E-mail"
                                fullWidth
                                rules={formRules.email}
                            />
                        </Box>
                    </Grid>

                    <Grid container spacing="22px" sx={{ my: 2 }} >
                        <Grid item md={12} xs={12} sx={{ textAlign: 'center' }}>
                            <ContainButton>
                                <Button variant="contained_rounded" onClick={onSubmit} fullWidth >
                                    <Text type="20" fontWeight={700} color="white">Forgot Password</Text>
                                </Button>
                            </ContainButton>
                        </Grid>
                    </Grid>
                </Grid>
            </CardStyled>
        </>
    )
}



export default ForgotForm