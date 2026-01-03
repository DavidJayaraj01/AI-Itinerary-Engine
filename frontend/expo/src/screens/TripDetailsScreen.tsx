import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES, SHADOWS} from '../constants/theme';
import PrimaryButton from '../components/buttons/PrimaryButton';

const TripDetailsScreen = ({navigation, route}: any) => {
  const [activeTab, setActiveTab] = useState('itinerary');

  const stops = [
    {
      id: 1,
      city: 'Paris',
      country: 'France',
      days: 3,
      activities: 5,
      color: '#FFB84D',
    },
    {
      id: 2,
      city: 'Lyon',
      country: 'France',
      days: 2,
      activities: 3,
      color: '#FFC870',
    },
    {
      id: 3,
      city: 'Nice',
      country: 'France',
      days: 2,
      activities: 4,
      color: '#FFD4A3',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <Text style={styles.title}>Trip Details</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="ellipsis-vertical" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      {/* Trip Header */}
      <View style={styles.tripHeader}>
        <View style={styles.tripHeaderContent}>
          <Text style={styles.tripName}>Paris Adventure</Text>
          <Text style={styles.tripDates}>Oct 15 - Oct 20, 2023</Text>
          <View style={styles.tripStats}>
            <View style={styles.statItem}>
              <Icon name="calendar-outline" size={16} color={COLORS.red} />
              <Text style={styles.statText}>6 days</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="location-outline" size={16} color={COLORS.red} />
              <Text style={styles.statText}>3 cities</Text>
            </View>
            <View style={styles.statItem}>
              <Icon name="walk-outline" size={16} color={COLORS.red} />
              <Text style={styles.statText}>12 activities</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'itinerary' && styles.tabActive]}
          onPress={() => setActiveTab('itinerary')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'itinerary' && styles.tabTextActive,
            ]}>
            Itinerary
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'budget' && styles.tabActive]}
          onPress={() => setActiveTab('budget')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'budget' && styles.tabTextActive,
            ]}>
            Budget
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'calendar' && styles.tabActive]}
          onPress={() => setActiveTab('calendar')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'calendar' && styles.tabTextActive,
            ]}>
            Calendar
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {stops.map((stop, index) => (
          <View key={stop.id} style={styles.stopCard}>
            <View style={styles.stopHeader}>
              <View style={[styles.stopIcon, {backgroundColor: stop.color}]}>
                <Icon name="location" size={24} color={COLORS.white} />
              </View>
              <View style={styles.stopInfo}>
                <Text style={styles.stopCity}>{stop.city}</Text>
                <Text style={styles.stopCountry}>{stop.country}</Text>
              </View>
              <TouchableOpacity>
                <Icon name="ellipsis-horizontal" size={20} color={COLORS.gray} />
              </TouchableOpacity>
            </View>

            <View style={styles.stopDetails}>
              <View style={styles.stopDetailItem}>
                <Icon
                  name="time-outline"
                  size={16}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.stopDetailText}>
                  {stop.days} day{stop.days > 1 ? 's' : ''}
                </Text>
              </View>
              <View style={styles.stopDetailItem}>
                <Icon
                  name="list-outline"
                  size={16}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.stopDetailText}>
                  {stop.activities} activities
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.viewActivitiesButton}>
              <Text style={styles.viewActivitiesText}>View Activities</Text>
              <Icon name="chevron-forward" size={16} color={COLORS.red} />
            </TouchableOpacity>

            {index < stops.length - 1 && <View style={styles.connector} />}
          </View>
        ))}

        {/* Add Stop Button */}
        <TouchableOpacity
          style={styles.addStopButton}
          onPress={() => navigation.navigate('Search')}>
          <Icon name="add-circle-outline" size={24} color={COLORS.red} />
          <Text style={styles.addStopText}>Add Another Stop</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <PrimaryButton
          title="Share Trip"
          onPress={() => {}}
          variant="outline"
          style={styles.shareButton}
        />
        <PrimaryButton
          title="View Budget"
          onPress={() => navigation.navigate('Budget')}
          style={styles.budgetButton}
        />
      </View>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  tripHeader: {
    padding: SIZES.padding,
    paddingTop: 0,
  },
  tripHeaderContent: {
    backgroundColor: COLORS.lightGray,
    padding: SIZES.lg,
    borderRadius: SIZES.radiusLg,
  },
  tripName: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.xs,
  },
  tripDates: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.md,
  },
  tripStats: {
    flexDirection: 'row',
    gap: SIZES.lg,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: SIZES.small,
    color: COLORS.text,
    marginLeft: SIZES.xs,
    fontWeight: '500',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tab: {
    flex: 1,
    paddingVertical: SIZES.md,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.red,
  },
  tabText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  tabTextActive: {
    color: COLORS.red,
    fontWeight: '600',
  },
  scrollContent: {
    padding: SIZES.padding,
    paddingBottom: 120,
  },
  stopCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.md,
    marginBottom: SIZES.md,
    ...SHADOWS.medium,
  },
  stopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  stopIcon: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radiusMd,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  stopInfo: {
    flex: 1,
  },
  stopCity: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  stopCountry: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  stopDetails: {
    flexDirection: 'row',
    marginBottom: SIZES.md,
    gap: SIZES.lg,
  },
  stopDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stopDetailText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginLeft: SIZES.xs,
  },
  viewActivitiesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.sm,
  },
  viewActivitiesText: {
    fontSize: SIZES.body,
    color: COLORS.red,
    fontWeight: '600',
    marginRight: SIZES.xs,
  },
  connector: {
    width: 2,
    height: 20,
    backgroundColor: COLORS.border,
    marginLeft: 24,
    marginTop: SIZES.sm,
  },
  addStopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.lg,
    borderWidth: 2,
    borderColor: COLORS.red,
    borderRadius: SIZES.radiusLg,
    borderStyle: 'dashed',
  },
  addStopText: {
    fontSize: SIZES.body,
    color: COLORS.red,
    fontWeight: '600',
    marginLeft: SIZES.sm,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    padding: SIZES.padding,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    gap: SIZES.md,
  },
  shareButton: {
    flex: 1,
  },
  budgetButton: {
    flex: 1,
  },
});

export default TripDetailsScreen;
