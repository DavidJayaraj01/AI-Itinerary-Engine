import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES, SHADOWS} from '../constants/theme';

const {width} = Dimensions.get('window');

const BudgetScreen = ({navigation}: any) => {
  const [viewMode, setViewMode] = useState<'overview' | 'breakdown'>('overview');

  const budgetData = {
    total: 2450,
    spent: 1820,
    remaining: 630,
    categories: [
      {id: 1, name: 'Transport', amount: 450, percentage: 25, icon: 'airplane'},
      {id: 2, name: 'Accommodation', amount: 720, percentage: 40, icon: 'bed'},
      {id: 3, name: 'Activities', amount: 380, percentage: 21, icon: 'walk'},
      {id: 4, name: 'Meals', amount: 270, percentage: 14, icon: 'restaurant'},
    ],
    dailyAverage: 303,
    overbudgetDays: ['Oct 17', 'Oct 19'],
  };

  const getCategoryColor = (index: number) => {
    const colors = ['#FF3B30', '#000000', '#FF6B63', '#8E8E93'];
    return colors[index % colors.length];
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
        <Text style={styles.title}>Trip Budget</Text>
        <TouchableOpacity style={styles.menuButton}>
          <Icon name="ellipsis-vertical" size={24} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Budget Summary Card */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Budget</Text>
          <Text style={styles.summaryAmount}>${budgetData.total}</Text>

          <View style={styles.budgetBar}>
            <View
              style={[
                styles.budgetBarFill,
                {
                  width: `${(budgetData.spent / budgetData.total) * 100}%`,
                },
              ]}
            />
          </View>

          <View style={styles.budgetStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Spent</Text>
              <Text style={[styles.statValue, {color: COLORS.red}]}>
                ${budgetData.spent}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Remaining</Text>
              <Text style={[styles.statValue, {color: COLORS.success}]}>
                ${budgetData.remaining}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Daily Avg</Text>
              <Text style={styles.statValue}>${budgetData.dailyAverage}</Text>
            </View>
          </View>
        </View>

        {/* View Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'overview' && styles.toggleButtonActive,
            ]}
            onPress={() => setViewMode('overview')}>
            <Text
              style={[
                styles.toggleText,
                viewMode === 'overview' && styles.toggleTextActive,
              ]}>
              Overview
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'breakdown' && styles.toggleButtonActive,
            ]}
            onPress={() => setViewMode('breakdown')}>
            <Text
              style={[
                styles.toggleText,
                viewMode === 'breakdown' && styles.toggleTextActive,
              ]}>
              Breakdown
            </Text>
          </TouchableOpacity>
        </View>

        {/* Category Breakdown */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cost Breakdown</Text>
        </View>

        {budgetData.categories.map((category, index) => (
          <View key={category.id} style={styles.categoryCard}>
            <View
              style={[
                styles.categoryIcon,
                {backgroundColor: getCategoryColor(index)},
              ]}>
              <Icon name={category.icon} size={24} color={COLORS.white} />
            </View>

            <View style={styles.categoryInfo}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryAmount}>${category.amount}</Text>
              </View>

              <View style={styles.categoryBar}>
                <View
                  style={[
                    styles.categoryBarFill,
                    {
                      width: `${category.percentage}%`,
                      backgroundColor: getCategoryColor(index),
                    },
                  ]}
                />
              </View>

              <Text style={styles.categoryPercentage}>
                {category.percentage}% of total budget
              </Text>
            </View>
          </View>
        ))}

        {/* Alerts */}
        {budgetData.overbudgetDays.length > 0 && (
          <View style={styles.alertCard}>
            <View style={styles.alertHeader}>
              <Icon name="warning" size={24} color={COLORS.warning} />
              <Text style={styles.alertTitle}>Budget Alerts</Text>
            </View>
            <Text style={styles.alertText}>
              You exceeded your daily budget on{' '}
              {budgetData.overbudgetDays.join(' and ')}
            </Text>
          </View>
        )}

        {/* Chart Placeholder */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Daily Spending Trend</Text>
          <View style={styles.chartPlaceholder}>
            <Icon name="bar-chart-outline" size={80} color={COLORS.mediumGray} />
            <Text style={styles.chartPlaceholderText}>
              Chart visualization would appear here
            </Text>
          </View>
        </View>

        {/* Pie Chart Placeholder */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Budget Distribution</Text>
          <View style={styles.pieChartContainer}>
            <View style={styles.pieChartPlaceholder}>
              <Icon name="pie-chart-outline" size={80} color={COLORS.mediumGray} />
            </View>
            <View style={styles.legendContainer}>
              {budgetData.categories.map((category, index) => (
                <View key={category.id} style={styles.legendItem}>
                  <View
                    style={[
                      styles.legendDot,
                      {backgroundColor: getCategoryColor(index)},
                    ]}
                  />
                  <Text style={styles.legendText}>{category.name}</Text>
                  <Text style={styles.legendValue}>{category.percentage}%</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
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
  scrollContent: {
    padding: SIZES.padding,
    paddingBottom: SIZES.xxl,
  },
  summaryCard: {
    backgroundColor: COLORS.red,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    marginBottom: SIZES.lg,
    ...SHADOWS.large,
  },
  summaryLabel: {
    fontSize: SIZES.body,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: SIZES.xs,
  },
  summaryAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SIZES.md,
  },
  budgetBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 4,
    marginBottom: SIZES.md,
    overflow: 'hidden',
  },
  budgetBarFill: {
    height: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 4,
  },
  budgetStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: SIZES.small,
    color: COLORS.white,
    opacity: 0.9,
    marginBottom: SIZES.xs,
  },
  statValue: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radiusMd,
    padding: 4,
    marginBottom: SIZES.lg,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: SIZES.sm,
    alignItems: 'center',
    borderRadius: SIZES.radiusMd,
  },
  toggleButtonActive: {
    backgroundColor: COLORS.white,
    ...SHADOWS.small,
  },
  toggleText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  toggleTextActive: {
    color: COLORS.black,
    fontWeight: '600',
  },
  sectionHeader: {
    marginBottom: SIZES.md,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  categoryCard: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.md,
    marginBottom: SIZES.md,
    ...SHADOWS.small,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radiusMd,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.md,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SIZES.xs,
  },
  categoryName: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.black,
  },
  categoryAmount: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  categoryBar: {
    height: 6,
    backgroundColor: COLORS.lightGray,
    borderRadius: 3,
    marginBottom: SIZES.xs,
    overflow: 'hidden',
  },
  categoryBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  categoryPercentage: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  alertCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: SIZES.radiusLg,
    padding: SIZES.md,
    marginBottom: SIZES.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.warning,
  },
  alertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  alertTitle: {
    fontSize: SIZES.body,
    fontWeight: 'bold',
    color: COLORS.warning,
    marginLeft: SIZES.sm,
  },
  alertText: {
    fontSize: SIZES.small,
    color: COLORS.text,
    lineHeight: 20,
  },
  chartCard: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radiusLg,
    padding: SIZES.lg,
    marginBottom: SIZES.lg,
    ...SHADOWS.medium,
  },
  chartTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.md,
  },
  chartPlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.radiusMd,
  },
  chartPlaceholderText: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginTop: SIZES.sm,
  },
  pieChartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pieChartPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SIZES.lg,
  },
  legendContainer: {
    flex: 1,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SIZES.sm,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: SIZES.sm,
  },
  legendText: {
    flex: 1,
    fontSize: SIZES.small,
    color: COLORS.text,
  },
  legendValue: {
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.text,
  },
});

export default BudgetScreen;
