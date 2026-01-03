import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES, SHADOWS} from '../constants/theme';

const CitySearchScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const cities = [
    {
      id: 1,
      name: 'Kyoto',
      country: 'Japan',
      costIndex: '$$$',
      popularity: 'High',
      color: '#D4A574',
    },
    {
      id: 2,
      name: 'Paris',
      country: 'France',
      costIndex: '$$$$',
      popularity: 'Very High',
      color: '#FFB84D',
    },
    {
      id: 3,
      name: 'Bali',
      country: 'Indonesia',
      costIndex: '$$',
      popularity: 'High',
      color: '#A8C4A0',
    },
    {
      id: 4,
      name: 'New York',
      country: 'USA',
      costIndex: '$$$$',
      popularity: 'Very High',
      color: '#C4B896',
    },
    {
      id: 5,
      name: 'Barcelona',
      country: 'Spain',
      costIndex: '$$$',
      popularity: 'High',
      color: '#FFD4A3',
    },
    {
      id: 6,
      name: 'Dubai',
      country: 'UAE',
      costIndex: '$$$$',
      popularity: 'High',
      color: '#D4C5A0',
    },
  ];

  const regions = ['All', 'Europe', 'Asia', 'Americas', 'Africa', 'Oceania'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Discover Cities</Text>
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
          placeholder="Search cities..."
          placeholderTextColor={COLORS.placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close-circle" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        )}
      </View>

      {/* Region Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}>
        {regions.map(region => (
          <TouchableOpacity
            key={region}
            style={[
              styles.filterChip,
              selectedFilter === region.toLowerCase() && styles.filterChipActive,
            ]}
            onPress={() => setSelectedFilter(region.toLowerCase())}>
            <Text
              style={[
                styles.filterChipText,
                selectedFilter === region.toLowerCase() &&
                  styles.filterChipTextActive,
              ]}>
              {region}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Cities List */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {cities.map(city => (
          <TouchableOpacity key={city.id} style={styles.cityCard}>
            <View style={[styles.cityImage, {backgroundColor: city.color}]}>
              <Icon name="location" size={28} color={COLORS.white} />
            </View>

            <View style={styles.cityInfo}>
              <Text style={styles.cityName}>{city.name}</Text>
              <Text style={styles.cityCountry}>{city.country}</Text>

              <View style={styles.cityMeta}>
                <View style={styles.metaItem}>
                  <Icon
                    name="cash-outline"
                    size={14}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.metaText}>{city.costIndex}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Icon
                    name="trending-up-outline"
                    size={14}
                    color={COLORS.textSecondary}
                  />
                  <Text style={styles.metaText}>{city.popularity}</Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.addButton}>
              <Icon name="add-circle" size={32} color={COLORS.red} />
            </TouchableOpacity>
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
    padding: SIZES.padding,
    paddingTop: SIZES.xl,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.md,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radiusMd,
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
  filterContainer: {
    paddingLeft: SIZES.padding,
    marginBottom: SIZES.md,
  },
  filterChip: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.sm,
    marginRight: SIZES.sm,
    borderRadius: SIZES.radiusRound,
    backgroundColor: COLORS.lightGray,
  },
  filterChipActive: {
    backgroundColor: COLORS.black,
  },
  filterChipText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  scrollContent: {
    padding: SIZES.padding,
    paddingTop: 0,
  },
  cityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.md,
    marginBottom: SIZES.md,
    ...SHADOWS.medium,
  },
  cityImage: {
    width: 70,
    height: 70,
    borderRadius: SIZES.radiusMd,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  cityInfo: {
    flex: 1,
  },
  cityName: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 2,
  },
  cityCountry: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SIZES.sm,
  },
  cityMeta: {
    flexDirection: 'row',
    gap: SIZES.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginLeft: SIZES.xs,
  },
  addButton: {
    padding: SIZES.xs,
  },
});

export default CitySearchScreen;
