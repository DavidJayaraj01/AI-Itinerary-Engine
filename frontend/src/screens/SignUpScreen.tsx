import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES, SHADOWS} from '../constants/theme';
import CustomInput from '../components/inputs/CustomInput';
import PrimaryButton from '../components/buttons/PrimaryButton';

const SignUpScreen = ({navigation}: any) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
    additionalInfo: '',
  });
  const [loading, setLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
  };

  const handleSignUp = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Main');
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Header */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={COLORS.black} />
          </TouchableOpacity>

          <Text style={styles.title}>Sign Up</Text>

          {/* Avatar */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Icon name="person-add-outline" size={40} color={COLORS.gray} />
            </View>
            <View style={styles.editBadge}>
              <Icon name="camera" size={18} color={COLORS.white} />
            </View>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <View style={styles.row}>
              <CustomInput
                label="First Name"
                placeholder="John"
                value={formData.firstName}
                onChangeText={value => updateField('firstName', value)}
                icon="person-outline"
                containerStyle={styles.halfInput}
              />
              <CustomInput
                label="Last Name"
                placeholder="Doe"
                value={formData.lastName}
                onChangeText={value => updateField('lastName', value)}
                icon="person-outline"
                containerStyle={styles.halfInput}
              />
            </View>

            <CustomInput
              label="Email Address"
              placeholder="john@example.com"
              value={formData.email}
              onChangeText={value => updateField('email', value)}
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CustomInput
              label="Phone Number"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChangeText={value => updateField('phone', value)}
              icon="call-outline"
              keyboardType="phone-pad"
            />

            <View style={styles.row}>
              <CustomInput
                label="City"
                placeholder="New York"
                value={formData.city}
                onChangeText={value => updateField('city', value)}
                icon="location-outline"
                containerStyle={styles.halfInput}
              />
              <CustomInput
                label="Country"
                placeholder="USA"
                value={formData.country}
                onChangeText={value => updateField('country', value)}
                icon="globe-outline"
                containerStyle={styles.halfInput}
              />
            </View>

            <CustomInput
              label="Additional Information"
              placeholder="Tell us more about yourself..."
              value={formData.additionalInfo}
              onChangeText={value => updateField('additionalInfo', value)}
              icon="document-text-outline"
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />

            <PrimaryButton
              title="Register User →"
              onPress={handleSignUp}
              loading={loading}
              style={styles.registerButton}
            />

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    padding: SIZES.padding,
    paddingTop: SIZES.xl,
  },
  content: {
    flex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SIZES.md,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.lg,
  },
  avatarContainer: {
    alignSelf: 'center',
    position: 'relative',
    marginBottom: SIZES.xl,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  formContainer: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  registerButton: {
    marginTop: SIZES.md,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.lg,
    marginBottom: SIZES.lg,
  },
  loginText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  loginLink: {
    fontSize: SIZES.body,
    color: COLORS.red,
    fontWeight: '600',
  },
});

export default SignUpScreen;
