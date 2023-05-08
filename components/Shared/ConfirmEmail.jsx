import { Grid } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { Button, Text } from '..'
import { CardStyled } from '../../modules/Login/Container_Old'

const ConfirmEmail = ({
    title1,
    title2,
    meta1,
    meta2,
    onSubmit
}) => {
    return (
        <CardStyled>
            <Grid container sx={{ textAlign: 'center', mt: 2 }} >
                <Grid item xs={12} md={12} mb={5}>
                    <Image
                        src="/email.svg"
                        alt=" "
                        width={97}
                        height={69}
                    />
                </Grid>

                <Grid item xs={12} md={12}>
                    <Text type="20" fontWeight={700} color="black">{title1}</Text>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Text type="20" fontWeight={700} color="black">{title2}</Text>
                </Grid>
                <Grid item xs={12} md={12} sx={{ textTransform: 'uppercase' }} mt={3}>
                    <Text type="14" fontWeight={500} color="grey800" as="div" textAlign="center">
                        {meta1}
                    </Text>
                    <Text type="14" fontWeight={500} color="grey800" as="div" textAlign="center">
                        {meta2}
                    </Text>
                </Grid>

                <Grid item md={12} xs={12} sx={{ textAlign: 'center', mx: 5, mt: 4, mb: 3 }}>
                    <Button variant="contained_rounded" onClick={onSubmit} fullWidth >
                        <Text type="20" fontWeight={700} color="white">Done</Text>
                    </Button>
                </Grid>

                <Grid container sx={{ textAlign: 'left', textTransform: 'uppercase' }}>
                    <Grid item xs={12} md={12}>
                        <Text type="14" fontWeight={500} color="gray600" as="p">
                            If you haven’t received the email, please try the following:
                        </Text>
                    </Grid>

                    <Grid item xs={12} md={12} ml={1}>
                        <Text type="14" fontWeight={500} color="gray600" as="li">
                            Make sure the email address you provided is correct, Check your spam or Junk mail folders.
                        </Text>
                    </Grid>

                    <Grid item xs={12} md={12} ml={1}>
                        <Text type="14" fontWeight={500} color="gray600" as="li">
                            Make sure that the email server is not blocking us.
                        </Text>
                    </Grid>

                    <Grid item xs={12} md={12} ml={1}>
                        <Text type="14" fontWeight={500} color="gray600" as="li">
                            Please contact customer support.
                        </Text>
                    </Grid>
                </Grid>
            </Grid>
        </CardStyled>
    )
}

export default ConfirmEmail