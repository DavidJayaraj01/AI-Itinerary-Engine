import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES, SHADOWS} from '../constants/theme';

const DashboardScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');

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
    },
    {
      id: 2,
      name: 'Bali Retreat',
      dates: 'Aug 05 - Aug 18, 2023',
      status: 'Completed',
      color: '#FFC870',
    },
    {
      id: 3,
      name: 'NYC Business',
      dates: 'Jan 10 - Jan 14, 2023',
      status: 'Archived',
      color: '#C4B896',
    },
  ];

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
          <TouchableOpacity style={styles.profileButton}>
            <View style={styles.profileAvatar}>
              <Icon name="person" size={20} color={COLORS.white} />
            </View>
          </TouchableOpacity>
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
          <Icon
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
            <Icon name="arrow-forward" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="options-outline" size={18} color={COLORS.black} />
            <Text style={styles.filterText}>Group by</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="funnel-outline" size={18} color={COLORS.black} />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Icon name="swap-vertical-outline" size={18} color={COLORS.black} />
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

        {previousTrips.map(trip => (
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
              <Icon name="people" size={20} color={COLORS.gray} />
              <Icon
                name="heart"
                size={20}
                color={COLORS.gray}
                style={{marginLeft: 8}}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateTrip')}>
        <Icon name="add" size={24} color={COLORS.white} />
        <Text style={styles.fabText}>Plan a trip</Text>
      </TouchableOpacity>
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
    justifyContent: 'space-between',
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
  profileButton: {
    padding: SIZES.xs,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
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
});

export default DashboardScreen;
