import React, { SetStateAction, useEffect, useState } from 'react';
import CountryPicker, { getAllCountries, CountryFilter } from 'react-native-country-picker-modal';
import { useColorScheme } from 'react-native';

import { Text, Input, Box } from 'native-base';
import Colors from '@/constants/Colors';

interface IProps {
    errorMsg?: string;
    showErrorMsg: boolean;
    setMobileNumber: (arg: string) => void;
    mobileNumber: string;
    setCountryCode: (arg: string) => void;
    countryCode: string;
    setCountry?: (arg: string) => void;
}
enum FlagType {
    FLAT = 'flat',
    EMOJI = 'emoji',
}

const flag: FlagType = FlagType.EMOJI;
const PhoneInput = ({
    showErrorMsg,
    errorMsg,
    setMobileNumber,
    mobileNumber,
    setCountryCode,
    countryCode,
    setCountry,
}: IProps) => {
    const [filter, setFilter] = useState('');
    const [filteredCountries, setFilteredCountries] = useState([]);
    const colorScheme = useColorScheme()
    const color = Colors[colorScheme ?? 'light']
    const [pickerKey, setPickerKey] = useState(0);
    const [focusedInput, setFocusedInput] = useState(false);

    useEffect(() => {
        setPickerKey((prevKey) => prevKey + 1);
        const fetchAndFilterCountries = async () => {
            const allCountries = await getAllCountries(flag);


            const newFilteredCountries = allCountries.filter(country =>
                country.name.toString().toLowerCase().startsWith(filter.toLowerCase())
            );

            setFilteredCountries(newFilteredCountries as SetStateAction<never[]>);
        }


        fetchAndFilterCountries();
    }, [filter]);

    const onSelectCountryCode = (country: any) => {
        setCountryCode(country.cca2);
        setCountry && setCountry(country);
    };

    const renderFilter = () => {
        return (
            <CountryFilter
                style={{ width: '90%' }}
                placeholder="Filter..."
                onChangeText={(text) => setFilter(text)}
            />

        );
    };
    return (
        <>
            <Box
                width={'360'}
                flexDirection="row"
                height={60}
                backgroundColor={"#F3F5F5"}
                // borderWidth={1}
                // borderColor={focusedInput ? color.primary : '#F3F5F5'}
                borderRadius={10}
                paddingX={1}
                marginBottom={2}
            >
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    width="30%">
                    <CountryPicker
                        renderCountryFilter={renderFilter}
                        // flatListProps={{ renderItem: filteredCountries }}

                        countryCode={countryCode as any}
                        theme={{ onBackgroundTextColor: color.gray }}
                        withCallingCode
                        withCallingCodeButton
                        withAlphaFilter={filter.length == 0 ? true : false}
                        withFlag
                        withFilter
                        onSelect={i => { onSelectCountryCode(i); setMobileNumber('') }}
                    />
                </Box>
                <Input
                    onFocus={() => setFocusedInput(true)}
                    placeholder={'000 000 000'}
                    width="70%"
                    fontSize={14}
                    fontWeight="600"
                    selectionColor={"#191E3A"}
                    color={"#191E3A"}
                    autoCorrect={false}
                    textContentType={'telephoneNumber'}
                    keyboardType={'numeric'}
                    onChangeText={i => {
                        let specialCharsRegex =
                            /[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi;
                        if (!specialCharsRegex.test(i)) {
                            setMobileNumber(i.toLowerCase().trim());
                        }
                    }}
                    value={mobileNumber}
                    autoCapitalize="none"
                />
            </Box>
            {showErrorMsg && <Text style={{ color: 'red' }}>{errorMsg}</Text>}
        </>
    );
};

export default PhoneInput;
