import React from 'react';
import SelectUnstyled from '@mui/base/SelectUnstyled';
import OptionUnstyled from '@mui/base/OptionUnstyled';
import PopperUnstyled from '@mui/base/PopperUnstyled';
import OptionGroupUnstyled from '@mui/base/OptionGroupUnstyled';
import { styled } from '@mui/system';
import { Box } from '@mui/material';
import { Button, Text } from '../components';
import { COLORS } from '../theme';
import { MENUS } from '../contexts/menu/Provider';
import { useRouter } from 'next/router';
import useSignout from '../hooks/useSignout';
import { STATUS } from './Header';
import Image from 'next/image'
import { StylesCustom } from '../components/Button';
import { useState } from 'react';

const blue = {
    100: '#DAECFF',
    200: '#99CCF3',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    900: '#003A75',
};

const grey = {
    100: '#E7EBF0',
    200: '#E0E3E7',
    300: '#CDD2D7',
    400: '#B2BAC2',
    500: '#A0AAB4',
    600: '#6F7E8C',
    700: '#3E5060',
    800: '#2D3843',
    900: '#1A2027',
};

const StyledButton = styled('button')(
    ({ theme }) => `
    border: 0;
    border-radius: 100px;
    padding: 5px 6px 5px 16px;
    background: ${COLORS.PRIMARY_COLOR25};
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    cursor: pointer;
    span {
        color: ${COLORS.WHITE};
    }
  `,
);

const StyledListbox = styled('ul')(
    ({ theme }) => `
    border-radius: 10px;
    padding: 16px;
    min-width: 300px;
    background: ${COLORS.WHITE};
    margin-top: 10px;
    box-sizing: border-box;
    overflow: auto;
    box-sizeing: border-box;
  `,
);

const StyledOption = styled('div')(
    ({ theme, error }) => `
    list-style: none;
    padding: 8px 24px;
    text-align: center;
    cursor: pointer;
    text-transform: uppercase;
    background: ${error && COLORS.RED};
    border-radius: 30px;
    span {
        color: ${error && COLORS.WHITE};
    }
    display: ${error ? 'none' : 'block'};
  `,
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1000;
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
    const components = {
        Root: StyledButton,
        Listbox: StyledListbox,
        Popper: StyledPopper,
        ...props.components,
    };

    return <SelectUnstyled {...props} ref={ref} components={components} />;
});


const StyledGroupRoot = styled('li')`
  list-style: none;
`;

const StyledGroupOptions = styled('ul')`
  list-style: none;
  margin-left: 0;
  padding: 0;

  > li {
    padding-left: 20px;
  }
`;

// eslint-disable-next-line react/display-name
const withAttrs = (Component, attrs) => props => (
    <Box sx={{ mb: 1 }}>
        <Component {...attrs} {...props} />
    </Box>
)

const CustomOptionGroup = React.forwardRef(function CustomOptionGroup(props, ref) {


    const StyledGroupHeader = withAttrs(Text, {
        type: 12,
        fontWeight: 500,
        textAlign: 'center',
        color: 'red200',
        as: 'div',
        sx: {
            cursor: 'pointer'
        },
    })

    const components = {
        Root: StyledGroupRoot,
        Label: StyledGroupHeader,
        List: StyledGroupOptions,
        ...props.components,
    };

    return <OptionGroupUnstyled
        {...props}
        ref={ref}
        components={components}
    />;
});

export const NameIcon = styled('div')(({ theme }) => ({
    textTransform: 'uppercase',
    width: '48px',
    height: '48px',
    background: COLORS.GREEN_PROFILE,
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
}))

export const WrapperStatus = ({ children, variant, borderColor, bgColor }) => {
    return <Box sx={{ ...StylesCustom({ borderColor, bgColor })[variant], display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 24px', gap: '5px', cursor: 'default' }}>
        {children}
    </Box>
}

const Menus = ({
    profileData,
    kycStatus
}) => {

    const router = useRouter()
    const [open, setOpen] = useState(false)
    const { signOut } = useSignout()

    const onSelect = (path) => {
        setOpen(!open)
        if (typeof path === 'function') {
            return path()
        }

        return router.push(path ?? '/')
    }

    return (
        <CustomSelect
            renderValue={() => {
                return (
                    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', gap: 1, textTransform: 'uppercase' }}>
                        <Text type="14" fontWeight={700} color="black">
                            {profileData?.email}
                        </Text>
                        <NameIcon>
                            <Text type="20" fontWeight={400}>
                                {profileData?.email?.slice(0, 1)}
                            </Text>
                        </NameIcon>
                    </Box>
                )
            }}
            onListboxOpenChange={() => setOpen(!open)}
            listboxOpen={open}
        >
            <CustomOptionGroup  >
                <Text type={12} fontWeight={500} color="red200" sx={{ mb: 1, cursor: 'pointer' }} as="div" textAlign="center" onClick={() => onSelect(MENUS.KYCPage)}>{kycStatus === STATUS[-1] || kycStatus === STATUS[1] ? 'NOT VERIFIED' : null}</Text>
                <StyledOption    >
                    {
                        kycStatus === STATUS[3] ? (
                            <WrapperStatus variant="outlined_rounded" borderColor={COLORS.GRAY}>
                                <Image src="/verified.svg" width={21} height={21} alt="" />
                                <Text type={14} fontWeight={500} color="label" textAlign="center">
                                    VERIFIED
                                </Text>
                            </WrapperStatus>
                        ) : kycStatus === STATUS[-1] || kycStatus === STATUS[1] ? (
                            <WrapperStatus variant="contained_rounded" bgColor={COLORS.RED}>
                                <Text type={14} fontWeight={500} color="white" textAlign="center">
                                    VERIFY ACCOUNT
                                </Text>
                            </WrapperStatus>
                        ) : (
                            <WrapperStatus variant="outlined_rounded" borderColor={COLORS.ORANGE}>
                                <Image src="/orange-circle.svg" width={21} height={21} alt="" />
                                <Text type={14} fontWeight={500} color="orange" textAlign="center">
                                    VERIFY PENDING
                                </Text>
                            </WrapperStatus>
                        )
                    }
                </StyledOption>
                <StyledOption onClick={() => onSelect(MENUS.WalletPage)}  >
                    <Text type="14" fontWeight={500} color="black" >
                        Wallet
                    </Text>
                </StyledOption>
                <StyledOption onClick={() => onSelect(MENUS.TopupByCoinPage)}  >
                    <Text type="14" fontWeight={500} color="black">
                        Top-up
                    </Text>
                </StyledOption>
                <StyledOption onClick={() => onSelect(MENUS.HistoryPage)} >
                    <Text type="14" fontWeight={500} color="black">
                        History
                    </Text>
                </StyledOption>
                <StyledOption onClick={() => onSelect(MENUS.ResetPage)} >
                    <Text type="14" fontWeight={500} color="black">
                        Change password
                    </Text>
                </StyledOption>
                <StyledOption  onClick={() => onSelect(MENUS.DeleteRequest)}>
                    <Text type="14" fontWeight={500} color="black">
                        Delete Account
                    </Text>
                </StyledOption>
                <StyledOption onClick={() => onSelect(signOut)} >
                    <Text type="14" fontWeight={500} color="black">
                        Sign out
                    </Text>
                </StyledOption>
            </CustomOptionGroup>
        </CustomSelect >
    );
}

export default Menus