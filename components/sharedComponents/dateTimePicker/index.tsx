import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { Box, FormControl, HStack, Input, Pressable, Text } from 'native-base';
import WarningMessage from '../warningMessage';
import { CalenderIcon } from '@/assets/icons';

interface PProps {
    date: Date;
    setDate: (date: Date) => void;
    placeHolder: string;
    isDisabled?: boolean;
    label: string;
    errorMsg?: string;
    Icon?: JSX.Element;
}

const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

const DateTimePicker: React.FC<PProps> = ({
    date,
    setDate,
    isDisabled,
    placeHolder,
    label,
    errorMsg,
    Icon,
}) => {
    let formatedDate: string = formatDate(date);
    let notSetDate = formatedDate === formatDate(new Date());

    const [open, setOpen] = useState<boolean>(false)
    const handleDateChange = (selectedDate: Date) => {

        setDate(selectedDate || date);
    };

    return (
        <>
            <Box width={'100%'}>
                <FormControl isRequired isInvalid={notSetDate}>
                    {label && (
                        <HStack>
                            <Text
                                color={"#191E3A"}
                                fontSize={14}
                                fontWeight={500}
                                fontFamily={"Cairo"}
                            >
                                {label}
                            </Text>
                        </HStack>
                    )}
                    <Pressable
                        alignItems="center"
                        justifyContent="center"
                        onPress={() => !isDisabled && setOpen(true)}
                        borderRadius={10}
                        paddingX={1}
                        marginY={2}
                    >
                        <Input
                            isDisabled={isDisabled}
                            isReadOnly={true}
                            onPressIn={() => !isDisabled && setOpen(true)}
                            placeholder={placeHolder}
                            value={formatedDate}
                            marginBottom={3}
                            fontWeight="500"
                            fontSize={12}
                            color={"#191E3A"}
                            backgroundColor={"#F3F5F5"}
                            isFocused={true}
                            height={55}
                            width={'100%'}
                            InputRightElement={<CalenderIcon />}
                            borderWidth={0}
                        />
                    </Pressable>
                    {Boolean(errorMsg) && (
                        <WarningMessage
                            title={errorMsg ?? ""}
                            stylingBox={{ marginTop: 2, marginBottom: 8 }}
                        />
                    )}
                </FormControl>
            </Box>
            <DatePicker
                modal
                mode="date"
                open={open}
                date={date ?? new Date()}
                onConfirm={date => {
                    setOpen(false);
                    handleDateChange(date)
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </>
    );
};
export default DateTimePicker;