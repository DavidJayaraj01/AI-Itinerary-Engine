import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Ionicons as Icon} from '@expo/vector-icons';
import {COLORS, SIZES, SHADOWS} from '../constants/theme';
import CustomInput from '../components/inputs/CustomInput';
import PrimaryButton from '../components/buttons/PrimaryButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import cityService, {City} from '../api/services/city.service';
import {tripService} from '../api/services/trip.service';

const CreateTripScreen = ({navigation}: any) => {
  const [place, setPlace] = useState('');
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [searchingCities, setSearchingCities] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // Debounce city search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (place.trim().length >= 2) {
        setSearchingCities(true);
        try {
          const response = await cityService.searchCities(place);
          if (response.success && response.data) {
            setCities(response.data);
            setShowCityDropdown(true);
          }
        } catch (error) {
          console.error('Error searching cities:', error);
        } finally {
          setSearchingCities(false);
        }
      } else {
        setCities([]);
        setShowCityDropdown(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [place]);

  const selectCity = (city: City) => {
    setSelectedCity(city);
    setPlace(city.displayName);
    setShowCityDropdown(false);
    setCities([]);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const onStartDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || startDate;
    setShowStartPicker(false); // Always close on all platforms
    setStartDate(currentDate);
  };

  const onEndDateChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || endDate;
    setShowEndPicker(false); // Always close on all platforms
    setEndDate(currentDate);
  };

  const suggestions = [
    {
      id: 1,
      name: 'Alps Trekking',
      location: 'Switzerland',
      image: 'mountain',
      color: '#6B8E7F',
    },
    {
      id: 2,
      name: 'Island Hopping',
      location: 'Maldives',
      image: 'beach',
      color: '#7BB8D4',
    },
    {
      id: 3,
      name: 'Aurora View',
      location: 'Iceland',
      image: 'aurora',
      color: '#4A6B7C',
    },
    {
      id: 4,
      name: 'Culture Walk',
      location: 'Kyoto',
      image: 'temple',
      color: '#8B7355',
    },
  ];

  const [creating, setCreating] = useState(false);

  const handleCreateTrip = async () => {
    // Validate inputs
    if (!selectedCity) {
      Alert.alert('Error', 'Please select a destination city');
      return;
    }

    if (endDate < startDate) {
      Alert.alert('Error', 'End date must be after start date');
      return;
    }

    setCreating(true);
    try {
      // Create trip data
      const tripData = {
        title: `${selectedCity.name} Trip`,
        description: `Trip to ${selectedCity.displayName}`,
        start_date: startDate.toISOString().split('T')[0], // Format: YYYY-MM-DD
        end_date: endDate.toISOString().split('T')[0],
        status: 'planning' as const,
      };

      // Save to database
      const response = await tripService.createTrip(tripData);

      if (response.success && response.data) {
        Alert.alert(
          'Success!',
          'Your trip has been created successfully.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('TripDetails', { tripId: response.data.id }),
            },
          ]
        );
      }
    } catch (error: any) {
      console.error('Error creating trip:', error);
      Alert.alert(
        'Error',
        error.response?.data?.error || 'Failed to create trip. Please try again.',
        [{text: 'OK'}]
      );
    } finally {
      setCreating(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={COLORS.black} />
        </TouchableOpacity>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>
            Global<Text style={styles.logoTextRed}>Trotter</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <View style={styles.profileAvatar}>
            <Icon name="person" size={18} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Title */}
        <Text style={styles.title}>Plan a new trip</Text>
        <Text style={styles.subtitle}>
          Where will your next adventure take you?
        </Text>

        {/* Form */}
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Icon
              name="location"
              size={20}
              color={COLORS.red}
              style={styles.inputIcon}
            />
            <View style={styles.inputWrapper}>
              <Text style={styles.inputLabel}>SELECT A PLACE</Text>
              <CustomInput
                placeholder="e.g. Kyoto, Japan"
                value={place}
                onChangeText={setPlace}
              />
              {searchingCities && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color={COLORS.red} />
                  <Text style={styles.loadingText}>Searching cities...</Text>
                </View>
              )}
              {showCityDropdown && cities.length > 0 && (
                <View style={styles.cityDropdown}>
                  <FlatList
                    data={cities}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                      <TouchableOpacity
                        style={styles.cityItem}
                        onPress={() => selectCity(item)}>
                        <Icon name="location" size={16} color={COLORS.red} />
                        <Text style={styles.cityName}>{item.displayName}</Text>
                        <Text style={styles.cityPopulation}>
                          {item.population > 0 ? `${(item.population / 1000).toFixed(0)}k` : ''}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>
          </View>

          <View style={styles.dateContainer}>
            <View style={styles.inputContainer}>
              <Icon
                name="calendar"
                size={20}
                color={COLORS.red}
                style={styles.inputIcon}
              />
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>START DATE</Text>
                <TouchableOpacity style={styles.dateInput} onPress={() => setShowStartPicker(true)}>
                  <Text style={styles.dateText}>{formatDate(startDate)}</Text>
                  <Icon name="calendar-outline" size={20} color={COLORS.gray} />
                </TouchableOpacity>
                {showStartPicker && Platform.OS !== 'web' && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={onStartDateChange}
                    minimumDate={new Date()}
                  />
                )}
                {showStartPicker && Platform.OS === 'web' && (
                  <input
                    type="date"
                    value={startDate.toISOString().split('T')[0]}
                    onChange={(e) => {
                      setStartDate(new Date(e.target.value));
                      setShowStartPicker(false);
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                    }}
                  />
                )}
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Icon
                name="calendar"
                size={20}
                color={COLORS.red}
                style={styles.inputIcon}
              />
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>END DATE</Text>
                <TouchableOpacity style={styles.dateInput} onPress={() => setShowEndPicker(true)}>
                  <Text style={styles.dateText}>{formatDate(endDate)}</Text>
                  <Icon name="calendar-outline" size={20} color={COLORS.gray} />
                </TouchableOpacity>
                {showEndPicker && Platform.OS !== 'web' && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={onEndDateChange}
                    minimumDate={startDate}
                  />
                )}
                {showEndPicker && Platform.OS === 'web' && (
                  <input
                    type="date"
                    value={endDate.toISOString().split('T')[0]}
                    onChange={(e) => {
                      setEndDate(new Date(e.target.value));
                      setShowEndPicker(false);
                    }}
                    min={startDate.toISOString().split('T')[0]}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                    }}
                  />
                )}
              </View>
            </View>
          </View>
        </View>

        {/* Suggestions */}
        <View style={styles.suggestionsHeader}>
          <Text style={styles.suggestionsTitle}>
            Suggestions for Places to Visit
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.suggestionsGrid}>
          {suggestions.map(suggestion => (
            <TouchableOpacity key={suggestion.id} style={styles.suggestionCard}>
              <View
                style={[
                  styles.suggestionImage,
                  {backgroundColor: suggestion.color},
                ]}>
                {/* Placeholder for actual images */}
                <Icon name="image-outline" size={40} color={COLORS.white} />
              </View>
              <Text style={styles.suggestionName}>{suggestion.name}</Text>
              <Text style={styles.suggestionLocation}>
                {suggestion.location}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Create Trip Button */}
        <PrimaryButton
          title="✈ Create Trip"
          onPress={handleCreateTrip}          loading={creating}          style={styles.createButton}
        />
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  logoText: {
    fontSize: SIZES.h4,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: SIZES.padding,
    paddingBottom: SIZES.xxl,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.xs,
  },
  subtitle: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: SIZES.xl,
  },
  formContainer: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    marginBottom: SIZES.xl,
    ...SHADOWS.medium,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SIZES.lg,
  },
  inputIcon: {
    marginTop: SIZES.lg,
    marginRight: SIZES.sm,
  },
  inputWrapper: {
    flex: 1,
  },
  inputLabel: {
    fontSize: SIZES.caption,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: SIZES.xs,
  },
  dateContainer: {
    marginTop: SIZES.md,
  },
  dateInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radiusMd,
    padding: SIZES.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dateText: {
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  suggestionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  suggestionsTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  viewAllText: {
    fontSize: SIZES.small,
    color: COLORS.red,
    fontWeight: '600',
  },
  suggestionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: SIZES.xl,
  },
  suggestionCard: {
    width: '48%',
    marginBottom: SIZES.md,
  },
  suggestionImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: SIZES.radiusLg,
    marginBottom: SIZES.sm,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.small,
  },
  suggestionName: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 2,
  },
  suggestionLocation: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  createButton: {
    marginTop: SIZES.md,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.sm,
    paddingHorizontal: SIZES.sm,
  },
  loadingText: {
    marginLeft: SIZES.sm,
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  cityDropdown: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    maxHeight: 200,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusMd,
    ...SHADOWS.medium,
    zIndex: 1000,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  cityName: {
    flex: 1,
    marginLeft: SIZES.sm,
    fontSize: SIZES.body,
    color: COLORS.text,
  },
  cityPopulation: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
});

export default CreateTripScreen;
