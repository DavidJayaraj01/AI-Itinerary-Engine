import React, {useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {COLORS, SIZES, SHADOWS} from '../constants/theme';

const DashboardScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter, Sort, and Group By states
  const [showGroupByModal, setShowGroupByModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showSortByModal, setShowSortByModal] = useState(false);
  
  const [groupBy, setGroupBy] = useState<'none' | 'status' | 'date' | 'destination'>('none');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState({
    status: 'all', // 'all' | 'completed' | 'archived' | 'ongoing'
    dateRange: 'all', // 'all' | 'thisYear' | 'lastYear' | 'custom'
  });

  const regionalDestinations = [
    {id: 1, name: 'Kyoto', country: 'JAPAN', color: '#D4A574'},
    {id: 2, name: 'Cinque Terre', country: 'ITALY', color: '#A8B5A0'},
    {id: 3, name: 'Vancouver', country: 'CANADA', color: '#A0C4B5'},
  ];

  const previousTrips = [
    {
      id: 1,
      name: 'Paris Adventure',
      dates: 'Oct 15 - Oct 20, 2023',
      status: 'Completed',
      color: '#FFB84D',
      year: 2023,
    },
    {
      id: 2,
      name: 'Bali Retreat',
      dates: 'Aug 05 - Aug 18, 2023',
      status: 'Completed',
      color: '#FFC870',
      year: 2023,
    },
    {
      id: 3,
      name: 'NYC Business',
      dates: 'Jan 10 - Jan 14, 2023',
      status: 'Archived',
      color: '#C4B896',
      year: 2023,
    },
    {
      id: 4,
      name: 'Tokyo Experience',
      dates: 'Mar 05 - Mar 12, 2024',
      status: 'Completed',
      color: '#A8D5B0',
      year: 2024,
    },
    {
      id: 5,
      name: 'London Exploration',
      dates: 'Dec 20 - Dec 28, 2024',
      status: 'Ongoing',
      color: '#B8A8D5',
      year: 2024,
    },
  ];

  // Process trips based on filters, sorting, and grouping
  const processedTrips = useMemo(() => {
    let filtered = [...previousTrips];

    // Apply filters
    if (filters.status !== 'all') {
      filtered = filtered.filter(trip => trip.status.toLowerCase() === filters.status.toLowerCase());
    }

    if (filters.dateRange !== 'all') {
      const currentYear = new Date().getFullYear();
      if (filters.dateRange === 'thisYear') {
        filtered = filtered.filter(trip => trip.year === currentYear);
      } else if (filters.dateRange === 'lastYear') {
        filtered = filtered.filter(trip => trip.year === currentYear - 1);
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = a.year - b.year;
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    // Apply grouping
    if (groupBy === 'none') {
      return [{ title: null, data: filtered }];
    }

    const grouped = filtered.reduce((acc: any, trip) => {
      let key = '';
      switch (groupBy) {
        case 'status':
          key = trip.status;
          break;
        case 'date':
          key = trip.year.toString();
          break;
        case 'destination':
          key = trip.name.split(' ')[0]; // Use first word as destination group
          break;
      }

      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(trip);
      return acc;
    }, {});

    return Object.keys(grouped).map(key => ({
      title: key,
      data: grouped[key],
    }));
  }, [previousTrips, filters, sortBy, sortOrder, groupBy]);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <View style={styles.logoIcon} />
            <Text style={styles.logoText}>
              Global<Text style={styles.logoTextRed}>Trotter</Text>
            </Text>
          </View>
        </View>

        {/* Featured Destination */}
        <View style={styles.featuredCard}>
          <Image
            source={{
              uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
            }}
            style={styles.featuredImage}
          />
          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredLabel}>Featured Destination</Text>
            <Text style={styles.featuredTitle}>Explore the{'\n'}Unknown</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons
            name="search"
            size={20}
            color={COLORS.gray}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Where do you want to go?"
            placeholderTextColor={COLORS.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="arrow-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity 
            style={[styles.filterButton, groupBy !== 'none' && styles.filterButtonActive]}
            onPress={() => setShowGroupByModal(true)}>
            <Ionicons name="options-outline" size={18} color={groupBy !== 'none' ? COLORS.white : COLORS.black} />
            <Text style={[styles.filterText, groupBy !== 'none' && styles.filterTextActive]}>Group by</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.filterButton, (filters.status !== 'all' || filters.dateRange !== 'all') && styles.filterButtonActive]}
            onPress={() => setShowFilterModal(true)}>
            <Ionicons name="funnel-outline" size={18} color={(filters.status !== 'all' || filters.dateRange !== 'all') ? COLORS.white : COLORS.black} />
            <Text style={[styles.filterText, (filters.status !== 'all' || filters.dateRange !== 'all') && styles.filterTextActive]}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.filterButton}
            onPress={() => setShowSortByModal(true)}>
            <Ionicons name="swap-vertical-outline" size={18} color={COLORS.black} />
            <Text style={styles.filterText}>Sort by</Text>
          </TouchableOpacity>
        </View>

        {/* Top Regional Selections */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Regional Selections</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.regionalContainer}>
          {regionalDestinations.map(dest => (
            <TouchableOpacity key={dest.id} style={styles.regionalCard}>
              <View
                style={[styles.regionalImage, {backgroundColor: dest.color}]}
              />
              <Text style={styles.regionalName}>{dest.name}</Text>
              <Text style={styles.regionalCountry}>{dest.country}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Previous Trips */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Previous Trips</Text>
        </View>

        {processedTrips.map((section, sectionIndex) => (
          <View key={sectionIndex}>
            {section.title && (
              <Text style={styles.groupTitle}>{section.title}</Text>
            )}
            {section.data.map((trip: any) => (
              <TouchableOpacity key={trip.id} style={styles.tripCard}>
                <View
                  style={[styles.tripImage, {backgroundColor: trip.color}]}
                />
                <View style={styles.tripInfo}>
                  <Text style={styles.tripName}>{trip.name}</Text>
                  <Text style={styles.tripDates}>{trip.dates}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{trip.status}</Text>
                  </View>
                </View>
                <View style={styles.tripIcons}>
                  <Ionicons name="people" size={20} color={COLORS.gray} />
                  <Ionicons
                    name="heart"
                    size={20}
                    color={COLORS.gray}
                    style={{marginLeft: 8}}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateTrip')}>
        <Ionicons name="add" size={24} color={COLORS.white} />
        <Text style={styles.fabText}>Plan a trip</Text>
      </TouchableOpacity>

      {/* Group By Modal */}
      <Modal
        visible={showGroupByModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowGroupByModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Group By</Text>
            {[
              { key: 'none', label: 'No Grouping' },
              { key: 'status', label: 'Status' },
              { key: 'date', label: 'Year' },
              { key: 'destination', label: 'Destination' },
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.modalOption,
                  groupBy === option.key && styles.modalOptionSelected
                ]}
                onPress={() => {
                  setGroupBy(option.key as any);
                  setShowGroupByModal(false);
                }}>
                <Text style={[
                  styles.modalOptionText,
                  groupBy === option.key && styles.modalOptionTextSelected
                ]}>{option.label}</Text>
                {groupBy === option.key && (
                  <Ionicons name="checkmark" size={20} color={COLORS.white} />
                )}
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowGroupByModal(false)}>
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Filter Modal */}
      <Modal
        visible={showFilterModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowFilterModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Options</Text>
            
            <Text style={styles.filterSectionTitle}>Status</Text>
            {[
              { key: 'all', label: 'All Trips' },
              { key: 'completed', label: 'Completed' },
              { key: 'ongoing', label: 'Ongoing' },
              { key: 'archived', label: 'Archived' },
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.modalOption,
                  filters.status === option.key && styles.modalOptionSelected
                ]}
                onPress={() => setFilters(prev => ({ ...prev, status: option.key }))}>
                <Text style={[
                  styles.modalOptionText,
                  filters.status === option.key && styles.modalOptionTextSelected
                ]}>{option.label}</Text>
                {filters.status === option.key && (
                  <Ionicons name="checkmark" size={20} color={COLORS.white} />
                )}
              </TouchableOpacity>
            ))}

            <Text style={styles.filterSectionTitle}>Date Range</Text>
            {[
              { key: 'all', label: 'All Years' },
              { key: 'thisYear', label: 'This Year' },
              { key: 'lastYear', label: 'Last Year' },
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.modalOption,
                  filters.dateRange === option.key && styles.modalOptionSelected
                ]}
                onPress={() => setFilters(prev => ({ ...prev, dateRange: option.key }))}>
                <Text style={[
                  styles.modalOptionText,
                  filters.dateRange === option.key && styles.modalOptionTextSelected
                ]}>{option.label}</Text>
                {filters.dateRange === option.key && (
                  <Ionicons name="checkmark" size={20} color={COLORS.white} />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowFilterModal(false)}>
              <Text style={styles.modalCloseText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Sort By Modal */}
      <Modal
        visible={showSortByModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSortByModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort By</Text>
            {[
              { key: 'name', label: 'Name' },
              { key: 'date', label: 'Date' },
              { key: 'status', label: 'Status' },
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.modalOption,
                  sortBy === option.key && styles.modalOptionSelected
                ]}
                onPress={() => setSortBy(option.key as any)}>
                <Text style={[
                  styles.modalOptionText,
                  sortBy === option.key && styles.modalOptionTextSelected
                ]}>{option.label}</Text>
                {sortBy === option.key && (
                  <Ionicons name="checkmark" size={20} color={COLORS.white} />
                )}
              </TouchableOpacity>
            ))}

            <Text style={styles.filterSectionTitle}>Order</Text>
            {[
              { key: 'asc', label: 'Ascending' },
              { key: 'desc', label: 'Descending' },
            ].map((option) => (
              <TouchableOpacity
                key={option.key}
                style={[
                  styles.modalOption,
                  sortOrder === option.key && styles.modalOptionSelected
                ]}
                onPress={() => setSortOrder(option.key as any)}>
                <Text style={[
                  styles.modalOptionText,
                  sortOrder === option.key && styles.modalOptionTextSelected
                ]}>{option.label}</Text>
                {sortOrder === option.key && (
                  <Ionicons name="checkmark" size={20} color={COLORS.white} />
                )}
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowSortByModal(false)}>
              <Text style={styles.modalCloseText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: SIZES.padding,
    paddingTop: SIZES.xl,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.red,
    marginRight: SIZES.sm,
  },
  logoText: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  logoTextRed: {
    color: COLORS.red,
  },
  featuredCard: {
    margin: SIZES.padding,
    height: 200,
    borderRadius: SIZES.radiusLg,
    overflow: 'hidden',
    ...SHADOWS.medium,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
  },
  featuredOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: SIZES.lg,
    justifyContent: 'flex-end',
  },
  featuredLabel: {
    fontSize: SIZES.small,
    color: COLORS.white,
    marginBottom: SIZES.xs,
  },
  featuredTitle: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.md,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radiusRound,
    paddingHorizontal: SIZES.md,
  },
  searchIcon: {
    marginRight: SIZES.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: SIZES.md,
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.lg,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radiusMd,
    marginRight: SIZES.sm,
  },
  filterText: {
    marginLeft: SIZES.xs,
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.md,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  seeAllText: {
    fontSize: SIZES.small,
    color: COLORS.red,
    fontWeight: '600',
  },
  regionalContainer: {
    paddingLeft: SIZES.padding,
    marginBottom: SIZES.xl,
  },
  regionalCard: {
    width: 120,
    marginRight: SIZES.md,
  },
  regionalImage: {
    width: 120,
    height: 120,
    borderRadius: SIZES.radiusMd,
    marginBottom: SIZES.sm,
  },
  regionalName: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.black,
  },
  regionalCountry: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  tripCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.md,
    padding: SIZES.md,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    ...SHADOWS.small,
  },
  tripImage: {
    width: 60,
    height: 60,
    borderRadius: SIZES.radiusMd,
    marginRight: SIZES.md,
  },
  tripInfo: {
    flex: 1,
  },
  tripName: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: SIZES.xs,
  },
  tripDates: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: SIZES.sm,
    paddingVertical: 2,
    backgroundColor: '#E8F9F0',
    borderRadius: SIZES.radiusSm,
  },
  statusText: {
    fontSize: SIZES.caption,
    color: COLORS.success,
    fontWeight: '600',
  },
  tripIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: SIZES.xl,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.red,
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.lg,
    borderRadius: SIZES.radiusRound,
    ...SHADOWS.large,
  },
  fabText: {
    marginLeft: SIZES.sm,
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.white,
  },
  // Filter button styles
  filterButtonActive: {
    backgroundColor: COLORS.red,
  },
  filterTextActive: {
    color: COLORS.white,
  },
  // Group title style
  groupTitle: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.black,
    marginVertical: SIZES.md,
    marginHorizontal: SIZES.padding,
    paddingBottom: SIZES.xs,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: SIZES.radiusLg,
    borderTopRightRadius: SIZES.radiusLg,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.lg,
    paddingBottom: SIZES.xl,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.lg,
    textAlign: 'center',
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.md,
    paddingHorizontal: SIZES.md,
    borderRadius: SIZES.radiusMd,
    marginBottom: SIZES.xs,
    backgroundColor: COLORS.lightGray,
  },
  modalOptionSelected: {
    backgroundColor: COLORS.red,
  },
  modalOptionText: {
    fontSize: SIZES.body,
    color: COLORS.black,
    fontWeight: '500',
  },
  modalOptionTextSelected: {
    color: COLORS.white,
    fontWeight: '600',
  },
  modalCloseButton: {
    marginTop: SIZES.lg,
    paddingVertical: SIZES.md,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radiusMd,
    alignItems: 'center',
  },
  modalCloseText: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.black,
  },
  filterSectionTitle: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.black,
    marginTop: SIZES.lg,
    marginBottom: SIZES.md,
  },
});

export default DashboardScreen;
