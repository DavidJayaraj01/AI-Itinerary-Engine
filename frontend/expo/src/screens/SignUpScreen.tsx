import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS, SIZES, SHADOWS} from '../constants/theme';
import CustomInput from '../components/inputs/CustomInput';
import PrimaryButton from '../components/buttons/PrimaryButton';
import {useAuth} from '../contexts/AuthContext';

const SignUpScreen = ({navigation}: any) => {
  const {register} = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
    country: '',
    additionalInfo: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}));
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone || undefined,
        city: formData.city || undefined,
        country: formData.country || undefined,
        additional_info: formData.additionalInfo || undefined,
      });

      // Successfully registered and logged in, navigate to main screen
      navigation.replace('Main');
    } catch (error: any) {
      Alert.alert(
        'Registration Failed',
        error.message || 'An error occurred during registration. Please try again.',
        [{text: 'OK'}]
      );
    } finally {
      setLoading(false);
    }
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
                error={errors.firstName}
              />
              <CustomInput
                label="Last Name"
                placeholder="Doe"
                value={formData.lastName}
                onChangeText={value => updateField('lastName', value)}
                icon="person-outline"
                containerStyle={styles.halfInput}
                error={errors.lastName}
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
              error={errors.email}
            />

            <CustomInput
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChangeText={value => updateField('password', value)}
              icon="lock-closed-outline"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              error={errors.password}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={COLORS.gray}
                  />
                </TouchableOpacity>
              }
            />

            <CustomInput
              label="Confirm Password"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChangeText={value => updateField('confirmPassword', value)}
              icon="lock-closed-outline"
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              error={errors.confirmPassword}
              rightIcon={
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Icon
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={COLORS.gray}
                  />
                </TouchableOpacity>
              }
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
