import React from 'react';
import { View, StyleSheet, StatusBar, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { HomeScreenProps } from '../types';
import { COLORS, SPACING } from '../constants';
import { HomeHeader, CategoryGrid, HomeBottomActions } from '../components';

const HomeScreen: React.FC<HomeScreenProps> = () => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <HomeHeader />

          <View style={styles.mainContent}>
            <CategoryGrid />
          </View>

          <HomeBottomActions />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: SPACING.xl,
  },
});

export default HomeScreen;
