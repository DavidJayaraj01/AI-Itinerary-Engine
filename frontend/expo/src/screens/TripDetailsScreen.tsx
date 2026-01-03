import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES, SHADOWS} from '../constants/theme';
import PrimaryButton from '../components/buttons/PrimaryButton';
import {tripService} from '../api/services/trip.service';
import {Trip} from '../api/types';

const TripDetailsScreen = ({navigation, route}: any) => {
  const {tripId} = route.params;
  const [activeTab, setActiveTab] = useState('itinerary');
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTripDetails();
  }, [tripId]);

  const loadTripDetails = async () => {
    try {
      setLoading(true);
      const response = await tripService.getTripById(tripId);
      if (response.success && response.data) {
        setTrip(response.data);
      }
    } catch (error) {
      console.error('Error loading trip:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'});
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1;
  };

  if (loading) {
    return (
      <View style={styles.container}>
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
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.red} />
          <Text style={styles.loadingText}>Loading trip details...</Text>
        </View>
      </View>
    );
  }

  if (!trip) {
    return (
      <View style={styles.container}>
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
        <View style={styles.emptyContainer}>
          <Icon name="alert-circle-outline" size={64} color={COLORS.lightGray} />
          <Text style={styles.emptyTitle}>Trip not found</Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.emptyButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

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
          <Text style={styles.tripName}>{trip.title}</Text>
          <Text style={styles.tripDates}>
            {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
          </Text>
          <View style={styles.tripStats}>
            <View style={styles.statItem}>
              <Icon name="calendar-outline" size={16} color={COLORS.red} />
              <Text style={styles.statText}>
                {calculateDays(trip.start_date, trip.end_date)} day{calculateDays(trip.start_date, trip.end_date) > 1 ? 's' : ''}
              </Text>
            </View>
            {trip.description && (
              <View style={styles.statItem}>
                <Icon name="document-text-outline" size={16} color={COLORS.red} />
                <Text style={styles.statText}>{trip.description}</Text>
              </View>
            )}
            <View style={styles.statItem}>
              <Icon name="pricetag-outline" size={16} color={COLORS.red} />
              <Text style={styles.statText}>{trip.status}</Text>
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
        <View style={styles.noDataContainer}>
          <Icon name="map-outline" size={64} color={COLORS.lightGray} />
          <Text style={styles.noDataTitle}>No itinerary yet</Text>
          <Text style={styles.noDataSubtitle}>
            Start adding destinations and activities to your trip
          </Text>
          <TouchableOpacity style={styles.addButton}>
            <Icon name="add" size={20} color={COLORS.white} />
            <Text style={styles.addButtonText}>Add Destination</Text>
          </TouchableOpacity>
        </View>
        {/* Future: Map itinerary sections here when implemented */}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: SIZES.md,
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.padding,
  },
  emptyTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: SIZES.md,
  },
  emptyButton: {
    marginTop: SIZES.lg,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.md,
    backgroundColor: COLORS.red,
    borderRadius: SIZES.radiusMd,
  },
  emptyButtonText: {
    fontSize: SIZES.body,
    color: COLORS.white,
    fontWeight: '600',
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SIZES.xl * 2,
  },
  noDataTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: SIZES.md,
  },
  noDataSubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: SIZES.sm,
    marginBottom: SIZES.lg,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.sm,
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
    backgroundColor: COLORS.red,
    borderRadius: SIZES.radiusMd,
  },
  addButtonText: {
    fontSize: SIZES.body,
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default TripDetailsScreen;
