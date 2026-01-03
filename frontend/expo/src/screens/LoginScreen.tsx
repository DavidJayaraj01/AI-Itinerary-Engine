import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {COLORS, SIZES, SHADOWS} from '../constants/theme';
import CustomInput from '../components/inputs/CustomInput';
import PrimaryButton from '../components/buttons/PrimaryButton';

const LoginScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({username: '', password: ''});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = {username: '', password: ''};

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

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
          {/* Avatar/Logo */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <View style={styles.avatarIcon} />
            </View>
            <View style={styles.editBadge}>
              <Text style={styles.editIcon}>✎</Text>
            </View>
          </View>

          {/* Welcome Text */}
          <Text style={styles.title}>Welcome Back</Text>

          {/* Form */}
          <View style={styles.formContainer}>
            <CustomInput
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              icon="person-outline"
              error={errors.username}
              autoCapitalize="none"
            />

            <CustomInput
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              icon="lock-closed-outline"
              error={errors.password}
              secureTextEntry
            />

            <PrimaryButton
              title="Login →"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signupLink}>Sign up</Text>
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
    justifyContent: 'center',
    padding: SIZES.padding,
  },
  content: {
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: SIZES.xl,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  avatarIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.mediumGray,
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.red,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  editIcon: {
    color: COLORS.white,
    fontSize: 18,
  },
  title: {
    fontSize: SIZES.h2,
    fontWeight: 'bold',
    color: COLORS.black,
    marginBottom: SIZES.xl,
  },
  formContainer: {
    width: '100%',
  },
  loginButton: {
    marginTop: SIZES.md,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.lg,
  },
  signupText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  signupLink: {
    fontSize: SIZES.body,
    color: COLORS.red,
    fontWeight: '600',
  },
});

export default LoginScreen;
