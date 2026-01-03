import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES, SHADOWS} from '../constants/theme';

const MyTripsScreen = ({navigation}: any) => {
  const trips = [
    {
      id: 1,
      name: 'Paris Adventure',
      dates: 'Oct 15 - Oct 20, 2023',
      destinations: 3,
      status: 'Completed',
      color: '#FFB84D',
    },
    {
      id: 2,
      name: 'Bali Retreat',
      dates: 'Aug 05 - Aug 18, 2023',
      destinations: 5,
      status: 'Completed',
      color: '#FFC870',
    },
    {
      id: 3,
      name: 'NYC Business',
      dates: 'Jan 10 - Jan 14, 2023',
      destinations: 2,
      status: 'Archived',
      color: '#C4B896',
    },
    {
      id: 4,
      name: 'Tokyo Explorer',
      dates: 'Dec 01 - Dec 10, 2023',
      destinations: 4,
      status: 'Upcoming',
      color: '#FFD4A3',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return COLORS.success;
      case 'Upcoming':
        return COLORS.red;
      case 'Archived':
        return COLORS.gray;
      default:
        return COLORS.textSecondary;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Trips</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('CreateTrip')}>
          <Icon name="add" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterTabs}>
        <TouchableOpacity style={[styles.filterTab, styles.filterTabActive]}>
          <Text style={styles.filterTabTextActive}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab}>
          <Text style={styles.filterTabText}>Upcoming</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab}>
          <Text style={styles.filterTabText}>Completed</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterTab}>
          <Text style={styles.filterTabText}>Archived</Text>
        </TouchableOpacity>
      </ScrollView>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {trips.map(trip => (
          <TouchableOpacity
            key={trip.id}
            style={styles.tripCard}
            onPress={() => navigation.navigate('TripDetails', {trip})}>
            <View style={[styles.tripImage, {backgroundColor: trip.color}]}>
              <Icon name="location" size={32} color={COLORS.white} />
            </View>

            <View style={styles.tripContent}>
              <View style={styles.tripHeader}>
                <Text style={styles.tripName}>{trip.name}</Text>
                <TouchableOpacity>
                  <Icon name="ellipsis-vertical" size={20} color={COLORS.gray} />
                </TouchableOpacity>
              </View>

              <View style={styles.tripMeta}>
                <Icon
                  name="calendar-outline"
                  size={14}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.tripDates}>{trip.dates}</Text>
              </View>

              <View style={styles.tripFooter}>
                <View style={styles.destinationBadge}>
                  <Icon
                    name="location-outline"
                    size={14}
                    color={COLORS.red}
                  />
                  <Text style={styles.destinationCount}>
                    {trip.destinations} destination{trip.destinations > 1 ? 's' : ''}
                  </Text>
                </View>

                <View
                  style={[
                    styles.statusBadge,
                    {backgroundColor: `${getStatusColor(trip.status)}20`},
                  ]}>
                  <Text
                    style={[
                      styles.statusText,
                      {color: getStatusColor(trip.status)},
                    ]}>
                    {trip.status}
                  </Text>
                </View>
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="eye-outline" size={18} color={COLORS.black} />
                  <Text style={styles.actionButtonText}>View</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="create-outline" size={18} color={COLORS.black} />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton}>
                  <Icon name="trash-outline" size={18} color={COLORS.error} />
                  <Text style={[styles.actionButtonText, {color: COLORS.error}]}>
                    Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
    paddingTop: SIZES.xl,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  filterTabs: {
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.md,
  },
  filterTab: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    marginRight: SIZES.sm,
    borderRadius: SIZES.radiusRound,
    backgroundColor: COLORS.lightGray,
  },
  filterTabActive: {
    backgroundColor: COLORS.black,
  },
  filterTabText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  filterTabTextActive: {
    fontSize: SIZES.small,
    color: COLORS.white,
    fontWeight: '600',
  },
  scrollContent: {
    padding: SIZES.padding,
    paddingTop: 0,
  },
  tripCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    marginBottom: SIZES.md,
    padding: SIZES.md,
    ...SHADOWS.medium,
  },
  tripImage: {
    width: 80,
    height: 80,
    borderRadius: SIZES.radiusMd,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  tripContent: {
    flex: 1,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SIZES.xs,
  },
  tripName: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.black,
    flex: 1,
  },
  tripMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  tripDates: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginLeft: SIZES.xs,
  },
  tripFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  destinationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  destinationCount: {
    fontSize: SIZES.small,
    color: COLORS.red,
    marginLeft: SIZES.xs,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: SIZES.sm,
    paddingVertical: 4,
    borderRadius: SIZES.radiusSm,
  },
  statusText: {
    fontSize: SIZES.caption,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.lg,
  },
  actionButtonText: {
    fontSize: SIZES.small,
    color: COLORS.black,
    marginLeft: SIZES.xs,
    fontWeight: '500',
  },
});

export default MyTripsScreen;
