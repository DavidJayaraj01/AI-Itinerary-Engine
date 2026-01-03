import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES, SHADOWS} from '../constants/theme';
import CustomInput from '../components/inputs/CustomInput';
import PrimaryButton from '../components/buttons/PrimaryButton';
import DateTimePicker from '@react-native-community/datetimepicker';

const CreateTripScreen = ({navigation}: any) => {
  const [place, setPlace] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  const onStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const onEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndPicker(Platform.OS === 'ios');
    if (selectedDate) {
      setEndDate(selectedDate);
    }
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

  const handleCreateTrip = () => {
    navigation.navigate('TripDetails');
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
                {showStartPicker && (
                  <DateTimePicker
                    value={startDate}
                    mode="date"
                    display="default"
                    onChange={onStartDateChange}
                    minimumDate={new Date()}
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
                {showEndPicker && (
                  <DateTimePicker
                    value={endDate}
                    mode="date"
                    display="default"
                    onChange={onEndDateChange}
                    minimumDate={startDate}
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
          onPress={handleCreateTrip}
          style={styles.createButton}
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
});

export default CreateTripScreen;
