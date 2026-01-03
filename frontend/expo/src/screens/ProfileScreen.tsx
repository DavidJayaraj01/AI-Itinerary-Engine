import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES, SHADOWS} from '../constants/theme';
import CustomInput from '../components/inputs/CustomInput';
import PrimaryButton from '../components/buttons/PrimaryButton';
import {useAuth} from '../contexts/AuthContext';

const ProfileScreen = ({navigation}: any) => {
  const {user, logout: authLogout} = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    language: 'English',
  });

  // Load user data from AuthContext
  useEffect(() => {
    if (user) {
      setProfileData({
        name: `${user.first_name} ${user.last_name}`,
        email: user.email || '',
        phone: user.phone || '',
        city: user.city || '',
        country: user.country || '',
        language: 'English',
      });
    }
  }, [user]);

  const updateField = (field: string, value: string) => {
    setProfileData(prev => ({...prev, [field]: value}));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data
  };

  const handleLogout = async () => {
    await authLogout();
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Profile & Settings</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(!isEditing)}>
          <Icon
            name={isEditing ? 'close' : 'create-outline'}
            size={24}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Profile Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Icon name="person" size={50} color={COLORS.white} />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Icon name="camera" size={18} color={COLORS.white} />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{profileData.name}</Text>
          <Text style={styles.userEmail}>{profileData.email}</Text>
        </View>

        {/* Profile Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>

          {isEditing ? (
            <>
              <CustomInput
                label="Full Name"
                value={profileData.name}
                onChangeText={value => updateField('name', value)}
                icon="person-outline"
              />
              <CustomInput
                label="Email"
                value={profileData.email}
                onChangeText={value => updateField('email', value)}
                icon="mail-outline"
                keyboardType="email-address"
              />
              <CustomInput
                label="Phone"
                value={profileData.phone}
                onChangeText={value => updateField('phone', value)}
                icon="call-outline"
                keyboardType="phone-pad"
              />
              <View style={styles.row}>
                <CustomInput
                  label="City"
                  value={profileData.city}
                  onChangeText={value => updateField('city', value)}
                  icon="location-outline"
                  containerStyle={styles.halfInput}
                />
                <CustomInput
                  label="Country"
                  value={profileData.country}
                  onChangeText={value => updateField('country', value)}
                  icon="globe-outline"
                  containerStyle={styles.halfInput}
                />
              </View>
            </>
          ) : (
            <>
              <View style={styles.infoRow}>
                <Icon name="person-outline" size={20} color={COLORS.gray} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Name</Text>
                  <Text style={styles.infoValue}>{profileData.name}</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Icon name="mail-outline" size={20} color={COLORS.gray} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{profileData.email}</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Icon name="call-outline" size={20} color={COLORS.gray} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Phone</Text>
                  <Text style={styles.infoValue}>{profileData.phone}</Text>
                </View>
              </View>
              <View style={styles.infoRow}>
                <Icon name="location-outline" size={20} color={COLORS.gray} />
                <View style={styles.infoContent}>
                  <Text style={styles.infoLabel}>Location</Text>
                  <Text style={styles.infoValue}>
                    {profileData.city}, {profileData.country}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.preferenceRow}>
            <View style={styles.preferenceInfo}>
              <Icon name="notifications-outline" size={20} color={COLORS.gray} />
              <View style={styles.preferenceText}>
                <Text style={styles.preferenceLabel}>Notifications</Text>
                <Text style={styles.preferenceDescription}>
                  Receive trip updates and reminders
                </Text>
              </View>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{false: COLORS.lightGray, true: COLORS.red}}
              thumbColor={COLORS.white}
            />
          </View>

          <View style={styles.preferenceRow}>
            <View style={styles.preferenceInfo}>
              <Icon name="moon-outline" size={20} color={COLORS.gray} />
              <View style={styles.preferenceText}>
                <Text style={styles.preferenceLabel}>Dark Mode</Text>
                <Text style={styles.preferenceDescription}>
                  Enable dark theme
                </Text>
              </View>
            </View>
            <Switch
              value={darkModeEnabled}
              onValueChange={setDarkModeEnabled}
              trackColor={{false: COLORS.lightGray, true: COLORS.red}}
              thumbColor={COLORS.white}
            />
          </View>

          <TouchableOpacity style={styles.preferenceRow}>
            <View style={styles.preferenceInfo}>
              <Icon name="language-outline" size={20} color={COLORS.gray} />
              <View style={styles.preferenceText}>
                <Text style={styles.preferenceLabel}>Language</Text>
                <Text style={styles.preferenceDescription}>
                  {profileData.language}
                </Text>
              </View>
            </View>
            <Icon name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        {/* Saved Destinations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Destinations</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="bookmark-outline" size={20} color={COLORS.gray} />
            <Text style={styles.menuItemText}>Wishlist</Text>
            <Icon name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="heart-outline" size={20} color={COLORS.gray} />
            <Text style={styles.menuItemText}>Favorites</Text>
            <Icon name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
        </View>

        {/* Account Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="lock-closed-outline" size={20} color={COLORS.gray} />
            <Text style={styles.menuItemText}>Change Password</Text>
            <Icon name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="shield-checkmark-outline" size={20} color={COLORS.gray} />
            <Text style={styles.menuItemText}>Privacy Policy</Text>
            <Icon name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Icon name="help-circle-outline" size={20} color={COLORS.gray} />
            <Text style={styles.menuItemText}>Help & Support</Text>
            <Icon name="chevron-forward" size={20} color={COLORS.gray} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.menuItem, styles.dangerItem]} onPress={handleLogout}>
            <Icon name="log-out-outline" size={20} color={COLORS.error} />
            <Text style={[styles.menuItemText, {color: COLORS.error}]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        {isEditing && (
          <PrimaryButton
            title="Save Changes"
            onPress={handleSave}
            style={styles.saveButton}
          />
        )}

        <TouchableOpacity style={styles.deleteAccount}>
          <Text style={styles.deleteAccountText}>Delete Account</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  editButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: SIZES.padding,
    paddingTop: 0,
    paddingBottom: SIZES.xxl,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: SIZES.xl,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SIZES.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.black,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  userName: {
    fontSize: SIZES.h3,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.xs,
  },
  userEmail: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  section: {
    marginBottom: SIZES.xl,
  },
  sectionTitle: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    padding: SIZES.md,
    borderRadius: SIZES.radiusMd,
    marginBottom: SIZES.sm,
  },
  infoContent: {
    flex: 1,
    marginLeft: SIZES.md,
  },
  infoLabel: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '500',
  },
  preferenceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  preferenceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  preferenceText: {
    marginLeft: SIZES.md,
    flex: 1,
  },
  preferenceLabel: {
    fontSize: SIZES.body,
    color: COLORS.text,
    fontWeight: '500',
    marginBottom: 2,
  },
  preferenceDescription: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SIZES.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuItemText: {
    flex: 1,
    fontSize: SIZES.body,
    color: COLORS.text,
    marginLeft: SIZES.md,
  },
  dangerItem: {
    borderBottomWidth: 0,
  },
  saveButton: {
    marginTop: SIZES.md,
  },
  deleteAccount: {
    alignItems: 'center',
    marginTop: SIZES.xl,
    paddingVertical: SIZES.md,
  },
  deleteAccountText: {
    fontSize: SIZES.body,
    color: COLORS.error,
    fontWeight: '500',
  },
});

export default ProfileScreen;
