import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Ionicons as Icon} from '@expo/vector-icons';
import {COLORS, SIZES, SHADOWS} from '../constants/theme';

const ActivitySearchScreen = ({navigation}: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    {id: 'all', name: 'All', icon: 'grid-outline'},
    {id: 'sightseeing', name: 'Sightseeing', icon: 'eye-outline'},
    {id: 'food', name: 'Food & Drink', icon: 'restaurant-outline'},
    {id: 'adventure', name: 'Adventure', icon: 'bicycle-outline'},
    {id: 'culture', name: 'Culture', icon: 'library-outline'},
    {id: 'relaxation', name: 'Relaxation', icon: 'sunny-outline'},
  ];

  const activities = [
    {
      id: 1,
      name: 'Eiffel Tower Visit',
      category: 'Sightseeing',
      duration: '2-3 hours',
      cost: '$$$',
      rating: 4.8,
      description: 'Iconic iron tower with stunning city views',
    },
    {
      id: 2,
      name: 'Seine River Cruise',
      category: 'Sightseeing',
      duration: '1 hour',
      cost: '$$',
      rating: 4.6,
      description: 'Scenic boat tour through Paris',
    },
    {
      id: 3,
      name: 'Louvre Museum',
      category: 'Culture',
      duration: '3-4 hours',
      cost: '$$$',
      rating: 4.9,
      description: 'World-renowned art museum',
    },
    {
      id: 4,
      name: 'French Cooking Class',
      category: 'Food & Drink',
      duration: '3 hours',
      cost: '$$$$',
      rating: 4.7,
      description: 'Learn authentic French cuisine',
    },
    {
      id: 5,
      name: 'Versailles Day Trip',
      category: 'Adventure',
      duration: 'Full day',
      cost: '$$$$',
      rating: 4.8,
      description: 'Explore the magnificent palace',
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
        <Text style={styles.title}>Activities & Experiences</Text>
        <View style={{width: 40}} />
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
          placeholder="Search activities..."
          placeholderTextColor={COLORS.placeholder}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}>
        {categories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}>
            <Icon
              name={category.icon}
              size={18}
              color={
                selectedCategory === category.id ? COLORS.white : COLORS.black
              }
            />
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive,
              ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Filter Options */}
      <View style={styles.filterRow}>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="options-outline" size={18} color={COLORS.black} />
          <Text style={styles.filterButtonText}>Duration</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="cash-outline" size={18} color={COLORS.black} />
          <Text style={styles.filterButtonText}>Price</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Icon name="star-outline" size={18} color={COLORS.black} />
          <Text style={styles.filterButtonText}>Rating</Text>
        </TouchableOpacity>
      </View>

      {/* Activities List */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.resultsText}>{activities.length} activities found</Text>

        {activities.map(activity => (
          <TouchableOpacity key={activity.id} style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <View style={styles.activityIcon}>
                <Icon name="fitness-outline" size={24} color={COLORS.red} />
              </View>
              <View style={styles.activityInfo}>
                <Text style={styles.activityName}>{activity.name}</Text>
                <Text style={styles.activityCategory}>{activity.category}</Text>
              </View>
              <TouchableOpacity style={styles.favoriteButton}>
                <Icon name="heart-outline" size={22} color={COLORS.gray} />
              </TouchableOpacity>
            </View>

            <Text style={styles.activityDescription}>
              {activity.description}
            </Text>

            <View style={styles.activityMeta}>
              <View style={styles.metaItem}>
                <Icon
                  name="time-outline"
                  size={16}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.metaText}>{activity.duration}</Text>
              </View>
              <View style={styles.metaItem}>
                <Icon
                  name="cash-outline"
                  size={16}
                  color={COLORS.textSecondary}
                />
                <Text style={styles.metaText}>{activity.cost}</Text>
              </View>
              <View style={styles.metaItem}>
                <Icon name="star" size={16} color="#FFB84D" />
                <Text style={styles.metaText}>{activity.rating}</Text>
              </View>
            </View>

            <View style={styles.activityActions}>
              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addActivityButton}>
                <Icon name="add-circle" size={20} color={COLORS.white} />
                <Text style={styles.addActivityButtonText}>Add to Trip</Text>
              </TouchableOpacity>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: SIZES.h4,
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
  categoriesContainer: {
    paddingLeft: SIZES.padding,
    marginBottom: SIZES.md,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    marginRight: SIZES.sm,
    borderRadius: SIZES.radiusRound,
    backgroundColor: COLORS.lightGray,
    gap: SIZES.xs,
  },
  categoryChipActive: {
    backgroundColor: COLORS.red,
  },
  categoryText: {
    fontSize: SIZES.small,
    color: COLORS.black,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: COLORS.white,
    fontWeight: '600',
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.md,
    gap: SIZES.sm,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radiusMd,
    gap: SIZES.xs,
  },
  filterButtonText: {
    fontSize: SIZES.small,
    color: COLORS.black,
  },
  scrollContent: {
    padding: SIZES.padding,
    paddingTop: 0,
  },
  resultsText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SIZES.md,
  },
  activityCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.md,
    marginBottom: SIZES.md,
    ...SHADOWS.medium,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  activityIcon: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radiusMd,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  activityInfo: {
    flex: 1,
  },
  activityName: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: 2,
  },
  activityCategory: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  favoriteButton: {
    padding: SIZES.xs,
  },
  activityDescription: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: SIZES.md,
    lineHeight: 20,
  },
  activityMeta: {
    flexDirection: 'row',
    marginBottom: SIZES.md,
    gap: SIZES.lg,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.xs,
  },
  metaText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  activityActions: {
    flexDirection: 'row',
    gap: SIZES.sm,
  },
  detailsButton: {
    flex: 1,
    paddingVertical: SIZES.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.red,
    borderRadius: SIZES.radiusMd,
  },
  detailsButtonText: {
    fontSize: SIZES.small,
    color: COLORS.red,
    fontWeight: '600',
  },
  addActivityButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.sm,
    backgroundColor: COLORS.red,
    borderRadius: SIZES.radiusMd,
    gap: SIZES.xs,
  },
  addActivityButtonText: {
    fontSize: SIZES.small,
    color: COLORS.white,
    fontWeight: '600',
  },
});

export default ActivitySearchScreen;
