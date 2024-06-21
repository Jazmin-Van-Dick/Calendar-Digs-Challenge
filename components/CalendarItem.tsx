import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MapPinIcon, CheckCircleIcon } from "react-native-heroicons/solid";
import { Action } from '@/app/models/ChallengeData';
import { ClockIcon } from 'react-native-heroicons/outline';

interface CalendarItemProps {
    action?: Action;
}

const CalendarItem: React.FC<CalendarItemProps> = ({ action }) => {
    const colorScheme = useColorScheme();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Scheduled':
                return '#00B47D';
            case 'Completed':
                return '#006A4B';
            case 'Unscheduled':
                return '#011638';
            default:
                return ;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Scheduled':
                return <CheckCircleIcon color={'#00B47D'} size={15} />;
            case 'Completed':
                return <ClockIcon color={'#00B47D'} size={15} />;
            default:
                return;
        }
    };

    const commonTextStyles = {
        fontSize: 12,
        color: '#fff',
    };

    const CardItemStyles = StyleSheet.create({
        CardWrapper: {
            paddingHorizontal: 16,
            paddingTop: 9,
            paddingBottom: 14,
            borderRadius: 4,
            backgroundColor: action ? getStatusColor(action.status) : '#848FA5',
            flex: 1,
            flexDirection: 'column',
            gap: 10,
            justifyContent: 'space-between'
        },
        InfoContainer: {
            flexDirection: 'column',
            gap: 1,
        },
        Name: {
            ...commonTextStyles,
            fontSize: 16,
            fontWeight: 'bold',
        },
        VendorName: commonTextStyles,
        VendorPhoneNumber: {
            ...commonTextStyles,
            fontWeight: 'bold',
        },
        CustomerStreetWrapper: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 2,
        },
        CustomerStreet: commonTextStyles,
        Status: commonTextStyles,
    });

    const Styles = StyleSheet.create({
        Wrapper: {
            flexDirection: 'row',
            gap: 15,
            marginBottom: 5,
        },
    });

    const DateStatus = StyleSheet.create({
        Wrapper: {
            width: 25,
            flexDirection: 'column',
            alignItems: 'center',
            gap: 5,
        },
        DayName: {
            fontSize: 9,
            color: Colors[colorScheme ?? 'light'].text,
            opacity: 0.6,
            fontWeight: 'bold',
            textAlign: 'center',
        },
        Day: {
            fontSize: 20,
            color: Colors[colorScheme ?? 'light'].text,
            fontWeight: 'bold',
            marginBottom: 3,
            textAlign: 'center',
        },
    });

    if (!action) {
        return (
            <View style={Styles.Wrapper}>
                <View style={DateStatus.Wrapper}></View>
                
                <View style={CardItemStyles.CardWrapper}>
                    <Text style={CardItemStyles.Name}>No Maintenance Scheduled</Text>
                </View>
            </View>
        );
    }

    const getDateInfo = (scheduledDate: string | undefined) => {
        if (!scheduledDate) return { dayOfWeek: 'ABT'};
    
        const date = new Date(scheduledDate);
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
        const day = date.getDate().toString();
    
        return { day, dayOfWeek };
    };
    

    const { day, dayOfWeek } = getDateInfo(action?.scheduledDate);

    
    return (
        <View style={Styles.Wrapper}>
            <View style={DateStatus.Wrapper}>
                <Text style={DateStatus.DayName}>{dayOfWeek}</Text>
                <Text style={DateStatus.Day}>{day}</Text>
                {getStatusIcon(action.status)}
            </View>

            <View style={CardItemStyles.CardWrapper}>
                <View style={CardItemStyles.InfoContainer}>
                    <Text style={CardItemStyles.Name}>{action.name}</Text>
                    {action.vendor && (
                        <>
                            <Text style={CardItemStyles.VendorName}>{action.vendor.vendorName}</Text>
                            <Text style={CardItemStyles.VendorPhoneNumber}>{action.vendor.phoneNumber}</Text>
                        </>
                    )}
                </View>

                <View style={CardItemStyles.InfoContainer}>
                    {action.vendor?.streetAddress && (
                        <View style={CardItemStyles.CustomerStreetWrapper}>
                            <MapPinIcon color={'#fff'} size={10}/>
                            <Text style={CardItemStyles.CustomerStreet}>{action.vendor.streetAddress}</Text>
                        </View>
                    )}
                    <Text style={CardItemStyles.Status}>{action.status}</Text>
                </View>
            </View>
        </View>
    );
};

export default CalendarItem;
