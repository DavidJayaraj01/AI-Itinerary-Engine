import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import {Ionicons as Icon} from '@expo/vector-icons';
import {COLORS, SIZES, SHADOWS} from '../constants/theme';
import {tripService} from '../api/services/trip.service';
import {Trip} from '../api/types';

const MyTripsScreen = ({navigation}: any) => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'planning' | 'confirmed' | 'ongoing' | 'completed' | 'cancelled'>('all');

  const loadTrips = async () => {
    try {
      const response = await tripService.getTrips();
      if (response.success && response.data) {
        setTrips(response.data);
      }
    } catch (error) {
      console.error('Error loading trips:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTrips();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadTrips();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return COLORS.success;
      case 'ongoing':
      case 'confirmed':
        return COLORS.red;
      case 'cancelled':
        return COLORS.gray;
      default:
        return COLORS.textSecondary;
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const getTripColor = (index: number) => {
    const colors = ['#FFB84D', '#FFC870', '#C4B896', '#FFD4A3', '#7BB8D4', '#6B8E7F'];
    return colors[index % colors.length];
  };

  const filteredTrips = selectedFilter === 'all' 
    ? trips 
    : trips.filter(trip => trip.status === selectedFilter);

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
        <TouchableOpacity 
          style={[styles.filterTab, selectedFilter === 'all' && styles.filterTabActive]}
          onPress={() => setSelectedFilter('all')}>
          <Text style={selectedFilter === 'all' ? styles.filterTabTextActive : styles.filterTabText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterTab, selectedFilter === 'planning' && styles.filterTabActive]}
          onPress={() => setSelectedFilter('planning')}>
          <Text style={selectedFilter === 'planning' ? styles.filterTabTextActive : styles.filterTabText}>Planning</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterTab, selectedFilter === 'confirmed' && styles.filterTabActive]}
          onPress={() => setSelectedFilter('confirmed')}>
          <Text style={selectedFilter === 'confirmed' ? styles.filterTabTextActive : styles.filterTabText}>Confirmed</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.filterTab, selectedFilter === 'completed' && styles.filterTabActive]}
          onPress={() => setSelectedFilter('completed')}>
          <Text style={selectedFilter === 'completed' ? styles.filterTabTextActive : styles.filterTabText}>Completed</Text>
        </TouchableOpacity>
      </ScrollView>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.red} />
          <Text style={styles.loadingText}>Loading trips...</Text>
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[COLORS.red]} />
          }>
          {filteredTrips.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Icon name="airplane-outline" size={64} color={COLORS.lightGray} />
              <Text style={styles.emptyTitle}>No trips yet</Text>
              <Text style={styles.emptySubtitle}>
                Start planning your next adventure!
              </Text>
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation.navigate('CreateTrip')}>
                <Text style={styles.emptyButtonText}>Create Trip</Text>
              </TouchableOpacity>
            </View>
          ) : (
            filteredTrips.map((trip, index) => (
              <View key={trip.id} style={styles.tripCard}>
                <TouchableOpacity
                  style={styles.tripCardContent}
                  onPress={() => navigation.navigate('TripDetails', {tripId: trip.id})}>
                  <View style={[styles.tripImage, {backgroundColor: getTripColor(index)}]}>
                    <Icon name="location" size={32} color={COLORS.white} />
                  </View>

                  <View style={styles.tripContent}>
                    <View style={styles.tripHeader}>
                      <Text style={styles.tripName}>{trip.title}</Text>
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
                      <Text style={styles.tripDates}>
                        {formatDate(trip.start_date)} - {formatDate(trip.end_date)}
                      </Text>
                    </View>

                    <View style={styles.tripFooter}>
                      {trip.description && (
                        <View style={styles.descriptionBadge}>
                          <Icon
                            name="document-text-outline"
                            size={14}
                            color={COLORS.textSecondary}
                          />
                          <Text style={styles.descriptionText} numberOfLines={1}>
                            {trip.description}
                          </Text>
                        </View>
                      )}

                      <View
                        style={[
                          styles.statusBadge,
                          {backgroundColor: getStatusColor(trip.status)},
                        ]}>
                        <Text style={styles.statusText}>{getStatusLabel(trip.status)}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity 
                    style={styles.actionButton}
                    onPress={() => navigation.navigate('TripDetails', {tripId: trip.id})}>
                    <Icon name="eye-outline" size={18} color={COLORS.black} />
                    <Text style={styles.actionText}>View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Icon name="create-outline" size={18} color={COLORS.black} />
                    <Text style={styles.actionText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Icon name="trash-outline" size={18} color={COLORS.red} />
                    <Text style={[styles.actionText, {color: COLORS.red}]}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      )}
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
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    marginBottom: SIZES.md,
    padding: SIZES.md,
    ...SHADOWS.medium,
  },
  tripCardContent: {
    flexDirection: 'row',
    marginBottom: SIZES.sm,
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
  descriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.md,
    flex: 1,
  },
  descriptionText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginLeft: SIZES.xs,
    flex: 1,
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
    paddingTop: SIZES.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightGray,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SIZES.lg,
  },
  actionText: {
    fontSize: SIZES.small,
    color: COLORS.black,
    marginLeft: SIZES.xs,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: SIZES.xxl,
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
    paddingTop: SIZES.xxl * 2,
  },
  emptyTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: SIZES.lg,
  },
  emptySubtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginTop: SIZES.sm,
    marginBottom: SIZES.xl,
  },
  emptyButton: {
    backgroundColor: COLORS.red,
    paddingHorizontal: SIZES.xl,
    paddingVertical: SIZES.md,
    borderRadius: SIZES.radiusMd,
  },
  emptyButtonText: {
    color: COLORS.white,
    fontSize: SIZES.body,
    fontWeight: '600',
  },
});

export default MyTripsScreen;
