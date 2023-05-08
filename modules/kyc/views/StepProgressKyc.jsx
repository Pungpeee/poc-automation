import { Avatar, styled, useTheme } from "@mui/material";
import Text from "../../../components/Text";
import { PRIMARY_COLOR, GRAY666, GRAYC4 } from "../../../theme/color";

const stepsDetail = [
  {
    index: 1,
    displayName: "Personal Information",
  },
  {
    index: 2,
    displayName: "Upload Documents",
  },
  {
    index: 3,
    displayName: "Verify",
  },
];

const Wrapper = styled("div")({
  display: "flex",
  gap: 20,
});

const Divider = styled("div")({
  width: "100%",
  height: 1,
  background: "#979797",
  marginTop: 15,
});

const ItemWrapper = styled("div")({
  width: 80,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StepProgressKyc = (props) => {
  const { activeIndex } = props;
  return (
    <Wrapper>
      {stepsDetail.map((data, index) => {
        const isLast = index === stepsDetail.length - 1;
        const isActive = data.index <= Number(activeIndex);
        return isLast ? (
          <Item
            index={data.index}
            isActive={isActive}
            displayName={data.displayName}
          />
        ) : (
          <>
            <Item
              index={data.index}
              isActive={isActive}
              displayName={data.displayName}
            />
            <Divider sx={{ bgcolor: isActive ? PRIMARY_COLOR : GRAYC4 }} />
          </>
        );
      })}
    </Wrapper>
  );
};

const Item = (props) => {
  const { isActive } = props;
  const theme = useTheme();
  return (
    <ItemWrapper>
      <Avatar
        sx={{
          bgcolor: isActive ? PRIMARY_COLOR : GRAYC4,
          width: 30,
          height: 30,
          [theme.breakpoints.down("md")]: {
            width: 20,
            height: 20,
          },
        }}
      >
        <Text mobileType="14" color="white" as="div" textAlign="center">
          {props.index}
        </Text>
      </Avatar>
      <Text
        color={isActive ? "primary" : "gray666"}
        mobileType="14"
        as="div"
        textAlign="center"
      >
        {props.displayName}
      </Text>
    </ItemWrapper>
  );
};

export default StepProgressKyc;
