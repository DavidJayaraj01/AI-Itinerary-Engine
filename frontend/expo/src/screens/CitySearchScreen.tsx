import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {Ionicons as Icon} from '@expo/vector-icons';
import {COLORS, SIZES, SHADOWS} from '../constants/theme';
import {cityService} from '../api/services/city.service';

const CitySearchScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cities, setCities] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear previous timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Debounce search
    if (searchQuery.length >= 2) {
      const timeout = setTimeout(() => {
        searchCities(searchQuery);
      }, 500);
      setSearchTimeout(timeout);
    } else {
      setCities([]);
    }

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchQuery]);

  const searchCities = async (query: string) => {
    try {
      setLoading(true);
      const response = await cityService.searchCities(query);
      if (response.success && response.data) {
        setCities(response.data);
      }
    } catch (error) {
      console.error('Error searching cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRandomColor = (index: number) => {
    const colors = ['#D4A574', '#FFB84D', '#A8C4A0', '#C4B896', '#FFD4A3', '#D4C5A0'];
    return colors[index % colors.length];
  };

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
          placeholder="Search for cities (min 2 characters)..."
          placeholderTextColor={COLORS.placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {loading ? (
          <ActivityIndicator size="small" color={COLORS.red} />
        ) : searchQuery.length > 0 ? (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="close-circle" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        ) : null}
      </View>

      {/* Cities List */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {searchQuery.length < 2 ? (
          <View style={styles.emptyState}>
            <Icon name="search-outline" size={64} color={COLORS.lightGray} />
            <Text style={styles.emptyTitle}>Search for cities</Text>
            <Text style={styles.emptySubtitle}>
              Type at least 2 characters to start searching
            </Text>
          </View>
        ) : cities.length === 0 && !loading ? (
          <View style={styles.emptyState}>
            <Icon name="location-outline" size={64} color={COLORS.lightGray} />
            <Text style={styles.emptyTitle}>No cities found</Text>
            <Text style={styles.emptySubtitle}>
              Try searching with a different name
            </Text>
          </View>
        ) : (
          cities.map((city, index) => (
            <TouchableOpacity key={city.id || index} style={styles.cityCard}>
              <View style={[styles.cityImage, {backgroundColor: getRandomColor(index)}]}>
                <Icon name="location" size={28} color={COLORS.white} />
              </View>

              <View style={styles.cityInfo}>
                <Text style={styles.cityName}>{city.name}</Text>
                <Text style={styles.cityCountry}>{city.country}</Text>

                <View style={styles.cityMeta}>
                  <View style={styles.metaItem}>
                    <Icon
                      name="globe-outline"
                      size={14}
                      color={COLORS.textSecondary}
                    />
                    <Text style={styles.metaText}>
                      Pop: {city.population ? city.population.toLocaleString() : 'N/A'}
                    </Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.addButton}>
                <Icon name="add" size={24} color={COLORS.white} />
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
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
  scrollContent: {
    padding: SIZES.padding,
    paddingTop: 0,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SIZES.xxl * 2,
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
    textAlign: 'center',
    marginTop: SIZES.sm,
    paddingHorizontal: SIZES.xl,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CitySearchScreen;
